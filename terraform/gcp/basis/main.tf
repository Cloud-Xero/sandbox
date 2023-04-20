data "google_compute_zones" "available" {
  region = "asia-northeast1"
  status = "UP"
}

resource "google_compute_instance" "default" {
  for_each     = toset(data.google_compute_zones.available.names)
  name         = "test-${each.key}"
  machine_type = "e2-medium"
  zone         = each.value

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }

  network_interface {
    network = "default"
  }
}

output "instance_names" {
  description = "Names of instances"
  value       = [for i in google_compute_instance.default : i.name]
  # value       = values(google_compute_instance.default)[*].name
}

output "instance_zones" {
  description = "Zone of instances"
  value       = [for i in google_compute_instance.default : i.zone]
  # value       = values(google_compute_instance.default)[*].zone
}
