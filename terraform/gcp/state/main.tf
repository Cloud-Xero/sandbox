terraform {
  backend "gcs" {
    bucket = "tf-state-test01"
    prefix = "terraform/state"
  }
}

provider "google" {
  project = "kouzoh-p-tmp-h-komamiya"
  region  = "asia-northeast1"
  zone    = "asia-northeast1-c"
}

resource "google_compute_instance" "default" {
  name         = "test"
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
