.PHONY: help init-eks init-wordpress validate-eks validate-wordpress \
         plan-eks plan-wordpress apply-eks apply-wordpress \
         destroy-eks destroy-wordpress destroy-all \
         fmt-eks fmt-wordpress output-eks output-wordpress

# Variáveis
TF_DIR_EKS := infra/terraform/aws-eks
TF_DIR_WP := infra/terraform/aws-ec2-wordpress

# Cores
BLUE := \033[0;34m
GREEN := \033[0;32m
YELLOW := \033[1;33m
RED := \033[0;31m
NC := \033[0m

.DEFAULT_GOAL := help

help: ## Mostrar este menu de ajuda
	@echo "$(BLUE)════════════════════════════════════════════$(NC)"
	@echo "$(BLUE)  DevOps Bootcamp - Terraform Makefile$(NC)"
	@echo "$(BLUE)════════════════════════════════════════════$(NC)"
	@echo ""
	@echo "$(GREEN)INICIALIZAÇÃO:$(NC)"
	@echo "  make init-eks                - Inicializar Terraform EKS"
	@echo "  make init-wordpress          - Inicializar Terraform EC2 WordPress"
	@echo "  make init-all                - Inicializar ambos"
	@echo ""
	@echo "$(GREEN)VALIDAÇÃO:$(NC)"
	@echo "  make validate-eks            - Validar configuração EKS"
	@echo "  make validate-wordpress      - Validar configuração WordPress"
	@echo "  make validate-all            - Validar ambos"
	@echo ""
	@echo "$(GREEN)PLANEJAMENTO:$(NC)"
	@echo "  make plan-eks                - Planejar EKS"
	@echo "  make plan-wordpress          - Planejar WordPress"
	@echo "  make plan-all                - Planejar ambos"
	@echo ""
	@echo "$(GREEN)APLICAÇÃO:$(NC)"
	@echo "  make apply-eks               - Aplicar EKS"
	@echo "  make apply-wordpress         - Aplicar WordPress"
	@echo "  make apply-all               - Aplicar ambos (EKS depois WordPress)"
	@echo ""
	@echo "$(GREEN)OUTPUTS:$(NC)"
	@echo "  make output-eks              - Mostrar outputs EKS"
	@echo "  make output-wordpress        - Mostrar outputs WordPress"
	@echo "  make output-all              - Mostrar todos os outputs"
	@echo ""
	@echo "$(GREEN)DESTRUIÇÃO:$(NC)"
	@echo "  make destroy-eks             - Destruir EKS"
	@echo "  make destroy-wordpress       - Destruir WordPress"
	@echo "  make destroy-all             - Destruir TUDO (cuidado!)"
	@echo ""
	@echo "$(GREEN)FORMATAÇÃO:$(NC)"
	@echo "  make fmt-eks                 - Formatar código EKS"
	@echo "  make fmt-wordpress           - Formatar código WordPress"
	@echo "  make fmt-all                 - Formatar ambos"
	@echo ""
	@echo "$(GREEN)LIMPEZA:$(NC)"
	@echo "  make clean                   - Remover arquivos temporários"
	@echo ""

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# INICIALIZAÇÃO
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

init-eks: ## Inicializar Terraform EKS
	@echo "$(BLUE)→ Inicializando EKS...$(NC)"
	@cd $(TF_DIR_EKS) && terraform init

init-wordpress: ## Inicializar Terraform EC2 WordPress
	@echo "$(BLUE)→ Inicializando EC2 WordPress...$(NC)"
	@cd $(TF_DIR_WP) && terraform init

init-all: init-eks init-wordpress ## Inicializar ambos
	@echo "$(GREEN)✓ Ambos inicializados$(NC)"

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# VALIDAÇÃO
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

validate-eks: ## Validar configuração EKS
	@echo "$(BLUE)→ Validando EKS...$(NC)"
	@cd $(TF_DIR_EKS) && terraform validate

validate-wordpress: ## Validar configuração WordPress
	@echo "$(BLUE)→ Validando EC2 WordPress...$(NC)"
	@cd $(TF_DIR_WP) && terraform validate

validate-all: validate-eks validate-wordpress ## Validar ambos
	@echo "$(GREEN)✓ Ambos validados$(NC)"

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# PLANEJAMENTO
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

plan-eks: init-eks ## Planejar EKS
	@echo "$(BLUE)→ Planejando EKS...$(NC)"
	@cd $(TF_DIR_EKS) && terraform plan

plan-wordpress: init-wordpress ## Planejar WordPress
	@echo "$(BLUE)→ Planejando EC2 WordPress...$(NC)"
	@cd $(TF_DIR_WP) && terraform plan

plan-all: plan-eks plan-wordpress ## Planejar ambos
	@echo "$(GREEN)✓ Todos os planos gerados$(NC)"

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# APLICAÇÃO
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

apply-eks: plan-eks ## Aplicar EKS
	@echo "$(YELLOW)⚠ Aplicando EKS...$(NC)"
	@cd $(TF_DIR_EKS) && terraform apply -auto-approve
	@echo "$(GREEN)✓ EKS aplicado$(NC)"

apply-wordpress: plan-wordpress ## Aplicar WordPress
	@echo "$(YELLOW)⚠ Aplicando EC2 WordPress...$(NC)"
	@cd $(TF_DIR_WP) && terraform apply -auto-approve
	@echo "$(GREEN)✓ EC2 WordPress aplicado$(NC)"

apply-all: apply-eks apply-wordpress ## Aplicar ambos
	@echo "$(GREEN)✓ Ambos foram aplicados$(NC)"

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# OUTPUTS
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

output-eks: ## Mostrar outputs EKS
	@echo "$(BLUE)═══ Outputs EKS ═══$(NC)"
	@cd $(TF_DIR_EKS) && terraform output || echo "$(YELLOW)EKS não foi deployado$(NC)"

output-wordpress: ## Mostrar outputs WordPress
	@echo "$(BLUE)═══ Outputs EC2 WordPress ═══$(NC)"
	@cd $(TF_DIR_WP) && terraform output || echo "$(YELLOW)WordPress não foi deployado$(NC)"

output-all: ## Mostrar todos os outputs
	@echo "$(BLUE)════════════════════════════════$(NC)"
	@$(MAKE) output-eks
	@echo ""
	@echo "$(BLUE)════════════════════════════════$(NC)"
	@$(MAKE) output-wordpress
	@echo "$(BLUE)════════════════════════════════$(NC)"

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# DESTRUIÇÃO
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

destroy-eks: ## Destruir EKS
	@echo "$(RED)!!! Destruindo EKS !!!$(NC)"
	@cd $(TF_DIR_EKS) && terraform destroy

destroy-wordpress: ## Destruir WordPress
	@echo "$(RED)!!! Destruindo EC2 WordPress !!!$(NC)"
	@cd $(TF_DIR_WP) && terraform destroy

destroy-all: ## Destruir TUDO (cuidado!)
	@echo "$(RED)╔════════════════════════════════════════╗$(NC)"
	@echo "$(RED)║  ⚠ AVISO: DESTRUINDO TUDO!  ⚠          ║$(NC)"
	@echo "$(RED)╚════════════════════════════════════════╝$(NC)"
	@$(MAKE) destroy-wordpress
	@$(MAKE) destroy-eks

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# FORMATAÇÃO
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

fmt-eks: ## Formatar código EKS
	@echo "$(BLUE)→ Formatando EKS...$(NC)"
	@cd $(TF_DIR_EKS) && terraform fmt -recursive

fmt-wordpress: ## Formatar código WordPress
	@echo "$(BLUE)→ Formatando EC2 WordPress...$(NC)"
	@cd $(TF_DIR_WP) && terraform fmt -recursive

fmt-all: fmt-eks fmt-wordpress ## Formatar ambos
	@echo "$(GREEN)✓ Ambos formatados$(NC)"

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# LIMPEZA
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

clean: ## Remover arquivos temporários
	@echo "$(BLUE)→ Limpando arquivos temporários...$(NC)"
	@find $(TF_DIR_EKS) -name "*.tfplan" -delete
	@find $(TF_DIR_WP) -name "*.tfplan" -delete
	@echo "$(GREEN)✓ Limpeza concluída$(NC)"
