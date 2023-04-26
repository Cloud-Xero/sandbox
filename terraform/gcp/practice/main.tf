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
