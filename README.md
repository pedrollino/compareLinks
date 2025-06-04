# Comparador Visual de URLs

Este projeto é uma aplicação fullstack que permite comparar visualmente páginas web entre dois ambientes (ex: local e servidor) usando screenshots com Puppeteer e Pixelmatch.

## 🔧 Tecnologias
- **Frontend:** React (Vite)
- **Backend:** Node.js + Express + Puppeteer + Pixelmatch

---

## ▶️ Como rodar

### 1. Backend

```bash
cd backend
npm install
node server.js
```

Servidor será iniciado em: `http://localhost:4000`

---

### 2. Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Acesse no navegador: `http://localhost:5173`

---

## 🧪 Como usar

1. Preencha os campos:
   - **URL Local:** Ex: `http://localhost:8080/`
   - **URL Servidor:** Ex: `http://192.168.0.10:8080/web/group/`
   - **Links para comparar:** coloque um por linha (ex: `cleveland`, `test-gating-form`...)

2. Clique em **"Analisar URLs"**

3. Os resultados serão exibidos nos campos de:
   - **URLs OK** (sem diferença visual)
   - **URLs com diferença** (com screenshots salvos na pasta `backend/prints`)

---

## 📂 Estrutura de pastas

```
comparador-visual-app/
├── backend/
│   ├── server.js
│   └── prints/               # Imagens geradas
├── frontend/
│   ├── index.html
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
```

---

## 💡 Observações
- O backend utiliza Puppeteer com `headless: 'new'`, mas pode mudar para `false` se quiser ver o navegador abrindo.
- Imagens de diferença são salvas como `.png` na pasta `backend/prints`.
- Certifique-se de que o backend está acessível antes de testar o frontend.

---

Autor @RodrigoCavalcantii.