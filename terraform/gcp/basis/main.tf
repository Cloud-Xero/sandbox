resource "google_compute_instance" "default" {
  name         = "test"
  machine_type = "f1_micro"
  zone         = "asia-northeast1-c"
  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }

  network_interface {
    network = "default"
  }
}
