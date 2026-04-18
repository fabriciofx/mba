output "instance_id" {
  description = "ID da instância EC2"
  value       = aws_instance.nodejs_app.id
}

output "instance_public_ip" {
  description = "IP público da instância EC2"
  value       = aws_instance.nodejs_app.public_ip
}

output "instance_private_ip" {
  description = "IP privado da instância EC2"
  value       = aws_instance.nodejs_app.private_ip
}

output "nodejs_app_url" {
  description = "URL de acesso à aplicação Express.js (via Nginx na porta 80)"
  value       = "http://${aws_instance.nodejs_app.public_ip}"
}

output "nodejs_app_health_check" {
  description = "Endpoint de health check da aplicação"
  value       = "http://${aws_instance.nodejs_app.public_ip}/health"
}

output "nodejs_app_api_info" {
  description = "Endpoint de informações da API"
  value       = "http://${aws_instance.nodejs_app.public_ip}/api/info"
}

output "nodejs_app_direct_port" {
  description = "Porta direta Express.js (apenas via SSH tunnel)"
  value       = "3000"
}

output "vpc_id" {
  description = "ID da VPC"
  value       = aws_vpc.nodejs_vpc.id
}

output "subnet_id" {
  description = "ID da Subnet Pública"
  value       = aws_subnet.nodejs_public_subnet.id
}

output "security_group_id" {
  description = "ID do Security Group"
  value       = aws_security_group.nodejs_sg.id
}

output "ssh_command" {
  description = "Comando SSH para acessar a instância"
  value       = "ssh -i /path/to/key.pem ubuntu@${aws_instance.nodejs_app.public_ip}"
}

output "application_endpoints" {
  description = "Resumo dos endpoints da aplicação"
  value = {
    home_page = "http://${aws_instance.nodejs_app.public_ip}/"
    health    = "http://${aws_instance.nodejs_app.public_ip}/health"
    api_info  = "http://${aws_instance.nodejs_app.public_ip}/api/info"
  }
}
