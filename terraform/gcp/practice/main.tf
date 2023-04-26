resource "google_compute_instance_template" "default" {
  name_prefix  = "default"
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
