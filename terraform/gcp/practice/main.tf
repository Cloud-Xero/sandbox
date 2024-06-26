terraform {
  required_version = "~> 1.2"
  required_providers {
    google = ">= 4.32.0"
  }
}

provider "google" {
  # [YOUR PROJECT]を自身のGCPプロジェクト名に置き換える
  project = "[YOUR PROJECT]"
  zone    = "asia-northeast1-b"
}

resource "google_compute_instance_template" "default" {
  name_prefix  = "default-"
  machine_type = "e2-medium"

  metadata_startup_script = file("./gceme.sh.tpl")

  tags = ["allow-ssh", "allow-service"]
  labels = {
    "key" = "value"
  }

  disk {
    source_image = "debian-cloud/debian-11"
  }

  service_account {
    scopes = ["cloud-platform"]
  }

  network_interface {
    network    = "default"
    subnetwork = "default"
  }
}

resource "google_compute_region_instance_group_manager" "default" {
  name   = "default"
  region = "asia-northeast1"

  version {
    instance_template = google_compute_instance_template.default.self_link
  }

  base_instance_name = "mig"
  target_size        = null

  auto_healing_policies {
    health_check      = google_compute_health_check.mig_health_check.self_link
    initial_delay_sec = 30
  }

  // Initial instance verification can take 10-15m when a health check is present.
  timeouts {
    create = "15m"
  }
}

resource "google_compute_region_autoscaler" "default" {
  name = "default"

  target = google_compute_region_instance_group_manager.default.self_link

  autoscaling_policy {
    max_replicas = 10
    min_replicas = 6
  }
}

resource "google_compute_health_check" "mig_health_check" {
  name = "default"
  http_health_check {
    port = 80
  }
}

resource "google_compute_firewall" "mig_health_check" {
  name    = "health-check"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = [80]
  }

  source_ranges = ["130.211.0.0/22", "35.191.0.0/16"]
  target_tags   = ["allow-service"]
}

resource "google_compute_firewall" "default_ssh" {
  name    = "default-ssh"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = [22]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["allow-ssh"]
}

resource "google_compute_router" "default" {
  name    = "default"
  network = "default"
  region  = "asia-northeast1"
}

resource "google_compute_router_nat" "default" {
  name                               = "default"
  router                             = google_compute_router.default.name
  region                             = google_compute_router.default.region
  source_subnetwork_ip_ranges_to_nat = "ALL_SUBNETWORKS_ALL_IP_RANGES"
  nat_ip_allocate_option             = "AUTO_ONLY"
}
