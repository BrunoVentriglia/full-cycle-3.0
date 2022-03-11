# full-cycle-3.0

Este repositório contêm o código-fonte dos desafios propostos durante o curso Full Cycle 3.0.

## Docker

O primeiro módulo apresenta dois desafios.

1. Uma aplicação Golang para printar a mensagem "Code.education Rocks!" quando rodar o container. O Dockerfile deve gerar uma imagem com no máximo 2mb.
2. Uma aplicação Node.js que se comunica com o banco de dados para ler um nome cadastrado no momento de build. Está aplicação é disponibilizada através de um proxy reverso implementado pelo Nginx.

### Aplicação Golang
Está aplicação deverá mostrar na tela a mensagem "Code.education Rocks!" quando executada. A aplicação está disponível através de uma imagem Docker armazenada no Docker Hub. Para executá-la, basta rodar o comando a seguir:

```bash
    docker run --rm brunovtr/codeeducation
```

O código-fonte da aplicação está disponível em [docker/desafio-go](docker/desafio-go).

<!-- 
### Aplicação Node
Está aplicação deverá listar a mensagem "Full Cycle Rocks!" juntamente com a listagem de nomes cadastrados no banco de dados. Para iniciá-la, basta rodar o comando a seguir:

```bash
    npm run serve
```

Ou, alternativamente:

```bash
    docker-compose up -d
```

O código-fonte da aplicação está disponível em [docker/desafio-node](docker/desafio-node).
-->
