output "self_link" {
  description = "A self link of a instance"
  value       = google_compute_instance.default.self_link
}
