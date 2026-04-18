output "cluster_name" {
  description = "Nome do cluster EKS."
  value       = module.eks.cluster_name
}

output "cluster_endpoint" {
  description = "Endpoint da API do cluster."
  value       = module.eks.cluster_endpoint
}

output "region" {
  description = "Região AWS."
  value       = var.aws_region
}
