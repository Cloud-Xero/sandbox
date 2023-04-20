variable "compute_instance_zone" {
  description = "A zone used in compute instance"
  type        = string
  default     = "asia-northeast1-b"

  validation {
    condition     = contains(["asia-northeast1-a", "asia-northeast1-b", "asia-northeast1-c"], var.compute_instance_zone)
    error_message = "The compute_instance_zone must be in asia-northeast1 region."
  }
}

resource "google_compute_instance" "default" {
  name         = "test3"
  machine_type = "e2-medium"
  zone         = var.compute_instance_zone
  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }

  network_interface {
    network = "default"
  }
}
