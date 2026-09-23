# Projeto Microbiano

## Visão geral

Este projeto consiste em:
- `backend/`: API Node.js com Express e SQLite para gerenciamento de amostras de microbioma
- arquivos estáticos na raiz: cliente web simples em HTML/CSS/JavaScript

## Backend

### Tecnologias
- Node.js
- Express 5
- better-sqlite3
- CORS
- SQLite para persistência local

### Estrutura principal
- `backend/server.js`: configura servidor Express e monta rotas em `/api`
- `backend/routes/samples.js`: rotas CRUD de amostras e relatórios
- `backend/db/store.js`: camada SQLite de leitura/gravação
- `backend/middlewares/validateSample.js`: validação de payload
- `backend/package.json`: dependências e scripts

### Endpoints disponíveis
- `GET /api/samples` - lista amostras
- `GET /api/samples/:id` - busca uma amostra por id
- `POST /api/samples` - cria nova amostra
- `PUT /api/samples/:id` - atualiza amostra
- `DELETE /api/samples/:id` - remove amostra
- `GET /api/samples/stats` - estatísticas de amostras
- `GET /api/samples/report` - relatório detalhado com últimos registros

### Executando o backend

No diretório `backend`:

```bash
npm install
npm run dev
```

O servidor ficará disponível em `http://localhost:3000`.

## Cliente

Os arquivos do cliente estão no diretório raiz e incluem:
- `index.html`
- `login.html`
- `cadastro.html`
- `dashboard.html`
- `perfil.html`
- `receitas.html`
- `diario.html`
- `semana1.html` a `semana6.html`
- `app.js`
- `style.css`

### Como usar o cliente
Basta abrir um dos arquivos HTML no navegador. Se quiser conectar ao backend, atualize `app.js` para apontar para `http://localhost:3000/api`.

## Publicação no GitHub

Este ambiente não está inicializado como repositório Git. Para publicar no GitHub:

1. Crie um repositório no GitHub.
2. No diretório `projeto-microbiano`:
   ```bash
   git init
   git add .
   git commit -m "Projeto Microbiano completo"
   git branch -M main
   git remote add origin <URL do repositório>
   git push -u origin main
   ```

## Observações de deploy

- Se quiser hospedar a parte cliente como site estático, use GitHub Pages ou outro serviço de hospedagem estática.
- O backend pode ser implantado em qualquer serviço que suporte Node.js e SQLite.

## Artefatos gerados

- `client.zip`: pacote ZIP com os arquivos do cliente
- `MANUAL.md`: documentação do projeto

---

> Nota: a publicação direta no GitHub ou em uma página pública (`Bankpage`) não pôde ser realizada automaticamente neste ambiente, pois não há repositório Git configurado nem acesso remoto de publicação.
