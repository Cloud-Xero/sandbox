terraform {
  required_version = "~> 1.2"
  required_providers {
    google = ">= 4.32.0"
  }
}

provider "google" {
  # [YOUR PROJECT]を自身のGCPプロジェクト名に置き換える
  project = "kouzoh-p-tmp-h-komamiya"
  zone    = "asia-northeast1-b"
}

resource "google_compute_instance_template" "default" {
  name_prefix  = "default-"
  machine_type = "e2-medium"

  disk {
    source_image = "debian-cloud/debian-11"
  }

  network_interface {
    network = "default"
  }
}

resource "google_compute_region_instance_group_manager" "default" {
  name   = "default"
  region = "asia-northeast1"

  version {
    instance_template = google_compute_instance_template.default.self_link
  }

  base_instance_name = "mig"
  target_size        = 6
}

resource "google_compute_region_autoscaler" "default" {
  name = "default"

  target = google_compute_region_instance_group_manager.default.self_link

  autoscaling_policy {
    max_replicas = 10
    min_replicas = 6
  }
}
