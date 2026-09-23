# Projeto Microbiano

Este repositório contém um backend em Node.js e um cliente web estático para um projeto de microbioma.

## Estrutura do projeto

- `backend/` - API em Node.js com Express e SQLite para gerenciamento de amostras
- `app.js` - lógica do cliente web
- `style.css` - estilo do cliente
- arquivos estáticos do cliente em `frontend/` (`index.html`, `login.html`, `cadastro.html`, etc.)
- `client.zip` - pacote ZIP gerado com os arquivos do cliente
- `MANUAL.md` - documentação detalhada do projeto

## Backend

### Dependências
- `express`
- `cors`
- `better-sqlite3`
- `nodemon` (dev)

### Scripts

No diretório `backend`:

```bash
npm install
npm run dev
```

### Endpoints principais

- `GET /api/samples`
- `GET /api/samples/:id`
- `POST /api/samples`
- `PUT /api/samples/:id`
- `DELETE /api/samples/:id`
- `GET /api/samples/stats`
- `GET /api/samples/report`

## Cliente

Os arquivos do cliente são páginas HTML com CSS e JavaScript básico.
Para testar localmente, abra qualquer HTML diretamente no navegador ou sirva os arquivos com um servidor estático.

## Publicação no GitHub

Para publicar este projeto no GitHub:

```bash
git init
git add .
git commit -m "Projeto Microbiano completo"
git branch -M main
git remote add origin <URL-do-repositório>
git push -u origin main
```

## Observação

A publicação automática no GitHub não foi possível neste ambiente, pois não existe um repositório Git configurado.

## Artefatos

- `README.md` - este arquivo
- `MANUAL.md` - manual de projeto
- `client.zip` - pacote ZIP com o cliente web
