variable "vm_enable" {
  type    = bool
  default = false
}
resource "google_compute_instance" "default" {
  count = var.vm_enable ? 1 : 0

  name         = "test"
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
}
