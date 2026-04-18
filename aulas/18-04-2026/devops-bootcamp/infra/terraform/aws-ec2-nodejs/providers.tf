provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project = "devops-bootcamp"
      Owner   = "pos-graduacao"
    }
  }
}
