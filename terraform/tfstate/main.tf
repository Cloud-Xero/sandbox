# ----------------------------------------
# Terraform の基本設定
# ----------------------------------------
terraform {
  required_version = ">=1.00"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.53.1"
    }
  }
}

# ----------------------------------------
# Provider の指定
# ----------------------------------------
provider "google" {
  project = "terraform"
  region  = "us-central1"
  zone    = "us-central1-c"
}

# ----------------------------------------
# 外から参照できる変数を指定
# ----------------------------------------
variable "project" {
  type = string
}

variable "environment" {
  type = string
}
