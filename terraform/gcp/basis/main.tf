variable "service_name" {
  description = "A name of the service"
  type        = string
  default     = "default"
}

variable "environment" {
  description = "An environment of the service"
  type        = string
  default     = "dev"

  validation {
    condition     = contains(["dev", "stg", "prod"], var.environment)
    error_message = "The environment must be dev, stg or prod."
  }
}

locals {
  common_labels = {
    service     = var.service_name
    environment = var.environment
  }
}

resource "google_compute_instance" "default" {
  name         = "test"
  machine_type = "e2-medium"
  zone         = "asia-northeast1-b"

  labels = local.common_labels
  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }

  network_interface {
    network = "default"
  }
}
