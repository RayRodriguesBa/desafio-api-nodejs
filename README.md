# API Simples

## Descrição

Esta é uma API simples desenvolvida para fins de estudo e demonstração de conceitos básicos de desenvolvimento backend.

## Instalação

```bash
git clone <url-do-repositório>
cd <nome-da-pasta>
npm install
```

## Uso

```bash
npm start
```

Acesse `http://localhost:3000` para utilizar a API.

## Funcionalidades

- CRUD de recursos
- Validação de dados
- Rotas RESTful
- Respostas em JSON

## Diagrama de Fluxo

```mermaid
flowchart TD
    A[Requisição do Cliente] --> B{Rota da API}
    B -- GET/POST/PUT/DELETE --> C[Controlador]
    C --> D[Serviço]
    D --> E[Banco de Dados]
    E --> D
    D --> C
    C --> F[Resposta ao Cliente]
```