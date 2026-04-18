data "aws_availability_zones" "available" {
  state = "available"
}

# Obter a AMI mais recente do Ubuntu 22.04 LTS
data "aws_ami" "ubuntu_22_04" {
  most_recent = true
  owners      = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  filter {
    name   = "root-device-type"
    values = ["ebs"]
  }
}

# VPC
resource "aws_vpc" "nodejs_vpc" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "${var.instance_name}-vpc"
  }
}

# Subnet Pública
resource "aws_subnet" "nodejs_public_subnet" {
  vpc_id                  = aws_vpc.nodejs_vpc.id
  cidr_block              = cidrsubnet(var.vpc_cidr, 4, 0)
  availability_zone       = data.aws_availability_zones.available.names[0]
  map_public_ip_on_launch = var.enable_public_ip

  tags = {
    Name = "${var.instance_name}-public-subnet"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "nodejs_igw" {
  vpc_id = aws_vpc.nodejs_vpc.id

  tags = {
    Name = "${var.instance_name}-igw"
  }
}

# Rota para Internet
resource "aws_route_table" "nodejs_public_rt" {
  vpc_id = aws_vpc.nodejs_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.nodejs_igw.id
  }

  tags = {
    Name = "${var.instance_name}-public-rt"
  }
}

# Associação da subnet com tabela de rota
resource "aws_route_table_association" "nodejs_public_rt_assoc" {
  subnet_id      = aws_subnet.nodejs_public_subnet.id
  route_table_id = aws_route_table.nodejs_public_rt.id
}

# Security Group
resource "aws_security_group" "nodejs_sg" {
  name        = "${var.instance_name}-sg"
  description = "Security Group para Express.js"
  vpc_id      = aws_vpc.nodejs_vpc.id

  # SSH
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTP
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTPS
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.instance_name}-sg"
  }
}

# User Data Script para instalar Express.js
locals {
  user_data  = file("${path.module}/user_data.sh")
  //user_data1 = file("${path.module}/user_data.sh")
}

# EC2 Instance com Express.js
resource "aws_instance" "nodejs_app" {
  ami                         = data.aws_ami.ubuntu_22_04.id
  instance_type               = var.instance_type
  subnet_id                   = aws_subnet.nodejs_public_subnet.id
  vpc_security_group_ids      = [aws_security_group.nodejs_sg.id]
  associate_public_ip_address = var.enable_public_ip

  root_block_device {
    volume_type           = var.storage_type
    volume_size           = var.storage_size
    delete_on_termination = true
  }

  user_data = local.user_data

  tags = {
    Name        = var.instance_name
    Environment = var.environment
  }

  depends_on = [
    aws_internet_gateway.nodejs_igw,
    aws_route_table_association.nodejs_public_rt_assoc
  ]
}
