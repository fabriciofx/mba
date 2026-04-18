# todo-api

API simples para práticas de DevOps.

## Endpoints
- `GET /live` — liveness (não depende do banco)
- `GET /ready` — readiness (valida conexão no banco)
- `GET /version` — versão/build (via `APP_VERSION`)
- `GET /todos` — lista
- `POST /todos` — cria (`{ "title": "..." }`)
- `PATCH /todos/:id` — marca concluído (`{ "done": true }`)
