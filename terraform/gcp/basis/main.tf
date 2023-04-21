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

resource "google_compute_instance" "default" {
  name         = "test2"
  machine_type = "e2-medium"

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }

  network_interface {
    network = "default"
  }
}

output "project" {
  description = "Names of project"
  value       = google_compute_instance.default.project
}

output "zone" {
  description = "Names of zone"
  value       = google_compute_instance.default.zone
}
