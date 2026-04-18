#!/bin/bash

#################################################################
# SCRIPT DE DEPLOYMENT UNIFICADO
# Terraform - EKS + EC2 WordPress
# Estrutura de Credenciais Compartilhada
#################################################################

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para print com cores
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar se está no diretório correto
if [ ! -f "docker-compose.yml" ]; then
    log_error "Script deve ser executado a partir da raiz do projeto (devops-bootcamp)"
    exit 1
fi

#################################################################
# MENU PRINCIPAL
#################################################################

show_menu() {
    echo ""
    echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║   DevOps Bootcamp - Terraform Deploy   ║${NC}"
    echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
    echo ""
    echo "1. Deploy EKS"
    echo "2. Deploy EC2 WordPress"
    echo "3. Deploy EKS + EC2 WordPress (Sequencial)"
    echo "4. Plan EKS"
    echo "5. Plan EC2 WordPress"
    echo "6. Destroy EKS"
    echo "7. Destroy EC2 WordPress"
    echo "8. Destroy Tudo"
    echo "9. Ver Outputs"
    echo "0. Sair"
    echo ""
    read -p "Escolha uma opção: " option
}

#################################################################
# FUNÇÕES DE DEPLOY
#################################################################

deploy_eks() {
    log_info "Iniciando deploy do EKS..."
    cd infra/terraform/aws-eks
    terraform init
    terraform plan -out=eks.tfplan
    terraform apply eks.tfplan
    log_success "EKS deployado com sucesso!"
    cd ../../..
}

deploy_wordpress() {
    log_info "Iniciando deploy do EC2 WordPress..."
    cd infra/terraform/aws-ec2-wordpress
    terraform init
    terraform plan -out=wordpress.tfplan
    terraform apply wordpress.tfplan
    log_success "EC2 WordPress deployado com sucesso!"
    cd ../../..
}

deploy_both() {
    log_info "Iniciando deploy de EKS + EC2 WordPress..."
    log_warning "Este processo pode levar 15-20 minutos"
    
    deploy_eks
    echo ""
    log_info "Aguardando antes de deployar WordPress..."
    sleep 5
    
    deploy_wordpress
    
    log_success "Ambas as infraestruturas foram deployadas com sucesso!"
}

#################################################################
# FUNÇÕES DE PLAN
#################################################################

plan_eks() {
    log_info "Gerando plano do EKS..."
    cd infra/terraform/aws-eks
    terraform init
    terraform plan
    cd ../../..
}

plan_wordpress() {
    log_info "Gerando plano do EC2 WordPress..."
    cd infra/terraform/aws-ec2-wordpress
    terraform init
    terraform plan
    cd ../../..
}

#################################################################
# FUNÇÕES DE DESTROY
#################################################################

destroy_eks() {
    log_warning "Você está prestes a destruir o EKS. Isso não pode ser desfeito!"
    read -p "Digite 'sim' para confirmar: " confirm
    if [ "$confirm" = "sim" ]; then
        log_info "Destruindo EKS..."
        cd infra/terraform/aws-eks
        terraform destroy -auto-approve
        log_success "EKS destruído!"
        cd ../../..
    else
        log_info "Cancelado"
    fi
}

destroy_wordpress() {
    log_warning "Você está prestes a destruir o EC2 WordPress. Isso não pode ser desfeito!"
    read -p "Digite 'sim' para confirmar: " confirm
    if [ "$confirm" = "sim" ]; then
        log_info "Destruindo EC2 WordPress..."
        cd infra/terraform/aws-ec2-wordpress
        terraform destroy -auto-approve
        log_success "EC2 WordPress destruído!"
        cd ../../..
    else
        log_info "Cancelado"
    fi
}

destroy_all() {
    log_error "AVISO: Você está prestes a destruir TODA a infraestrutura!"
    read -p "Digite 'sim' para confirmar: " confirm
    if [ "$confirm" = "sim" ]; then
        destroy_wordpress
        destroy_eks
        log_success "Toda a infraestrutura foi destruída!"
    else
        log_info "Cancelado"
    fi
}

#################################################################
# FUNÇÃO DE OUTPUTS
#################################################################

show_outputs() {
    echo ""
    log_info "=== OUTPUTS DO EKS ==="
    cd infra/terraform/aws-eks
    if [ -f "terraform.tfstate" ]; then
        terraform output
    else
        log_warning "EKS ainda não foi deployado"
    fi
    cd ../../..
    
    echo ""
    log_info "=== OUTPUTS DO EC2 WORDPRESS ==="
    cd infra/terraform/aws-ec2-wordpress
    if [ -f "terraform.tfstate" ]; then
        terraform output
    else
        log_warning "EC2 WordPress ainda não foi deployado"
    fi
    cd ../../..
}

#################################################################
# LOOP PRINCIPAL
#################################################################

while true; do
    show_menu
    
    case $option in
        1)
            deploy_eks
            ;;
        2)
            deploy_wordpress
            ;;
        3)
            deploy_both
            ;;
        4)
            plan_eks
            ;;
        5)
            plan_wordpress
            ;;
        6)
            destroy_eks
            ;;
        7)
            destroy_wordpress
            ;;
        8)
            destroy_all
            ;;
        9)
            show_outputs
            ;;
        0)
            log_info "Saindo..."
            exit 0
            ;;
        *)
            log_error "Opção inválida"
            ;;
    esac
done
