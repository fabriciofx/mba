# Docker


## Comandos

### Para se autenticar em um registry (repositório de imagens)

```bash
docker login
```

### Para dar logout de um registry

```bash
docker logout
```

### Enviar uma imagem a um registry

```bash
docker push <sua-imagem>
```

### Baixar uma imagem privada de um registry

```bash
docker pull <sua-imagem>
```

### Remover todos os containers parados

```bash
docker container prune
```

### Listar os IDs de todos os containers (executando e parados)

```bash
docker ps -aq
```

### Listar os IDs de todos os containers em execução

```bash
docker ps -q
```

### Listar os IDs de todas as imagens

```bash
docker images -q
```

### Limpeza total

Apaga containers parados, imagens, networks não usadas, cache de build e volumes não usados:

```bash
docker system prune -a --volumes
```
