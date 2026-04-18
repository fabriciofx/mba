variable "aws_region" {
  description = "Região AWS para provisionamento."
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Ambiente de deployment."
  type        = string
  default     = "development"
}

variable "instance_type" {
  description = "Tipo de instância EC2 para aplicação Express."
  type        = string
  default     = "t3.medium"
}

variable "instance_name" {
  description = "Nome da instância EC2."
  type        = string
  default     = "devops-bootcamp-express"
}

variable "vpc_cidr" {
  description = "CIDR da VPC."
  type        = string
  default     = "10.1.0.0/16"
}

variable "enable_public_ip" {
  description = "Habilitar IP público para a instância."
  type        = bool
  default     = true
}

variable "storage_size" {
  description = "Tamanho do armazenamento EBS em GB."
  type        = number
  default     = 20
}

variable "storage_type" {
  description = "Tipo de volume EBS."
  type        = string
  default     = "gp3"
}

variable "node_port" {
  description = "Porta da aplicação Express.js."
  type        = number
  default     = 3000
}

variable "node_env" {
  description = "Ambiente Node.js (development, staging, production)."
  type        = string
  default     = "development"

  validation {
    condition     = contains(["development", "staging", "production"], var.node_env)
    error_message = "node_env deve ser 'development', 'staging' ou 'production'."
  }
}
