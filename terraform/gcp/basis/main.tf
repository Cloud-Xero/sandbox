resource "google_compute_instance" "default" {
  name         = "test3"
  machine_type = "e2-medium"
  zone         = "asia-northeast1-b"
  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }

  network_interface {
    network = "default"
  }

  lifecycle {
    ignore_changes = [name]
  }
}
