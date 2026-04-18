# Lab 01 — Docker

## Objetivo
Rodar a aplicação em container, entender configuração por ambiente e subir dependências com `docker compose`.

## Passos
1) Build e run:
```powershell
cd devops-bootcamp\services\todo-api
docker build -t todo-api:dev .
docker run --rm -p 3000:3000 -e PORT=3000 todo-api:dev
```
2) Compose (API + Postgres):
```powershell
cd devops-bootcamp
docker compose up --build
```
3) Teste endpoints:
- `GET /live` (liveness)
- `GET /ready` (readiness, depende do banco)

## Entrega
- Dockerfile atualizado (boas práticas, usuário não-root, variáveis).
- `docker-compose.yml` funcionando e documentado.
