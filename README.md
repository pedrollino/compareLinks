# Comparador Visual de URLs

Este projeto é uma aplicação fullstack que permite comparar visualmente páginas web entre dois ambientes (ex: local e servidor) usando screenshots com Puppeteer e Pixelmatch.

## 🔧 Tecnologias
- **Frontend:** React (Vite)
- **Backend:** Node.js + Express + Puppeteer + Pixelmatch

---

## ▶️ Como Rodar (Método Simplificado)

Para iniciar o backend e o frontend de uma só vez, utilize o script de automação.

### 1. Dê permissão de execução ao script (apenas na primeira vez):

```bash
chmod +x start-app.sh
```

---

### 2. Execute o script:

```bash
./start-app.sh
```

---

O script irá instalar todas as dependências necessárias e iniciar os dois servidores.

Backend estará rodando em: http://localhost:4000

Frontend estará acessível em: http://localhost:5173

Acesse http://localhost:5173 no seu navegador para usar a aplicação. Para encerrar tudo, pressione Ctrl+C no terminal.

---

## ▶️ Como rodar (Método Manual)

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

2. Etapa 1 **"Captura Local:"**
   - Clique em **"Capturar Local"**
   - O sistema acessa cada link usando a URL Local e salva os prints na pasta backend/prints com prefixo local_

3. Troque manualmente a porta/ambiente 

4. Etapa 2 **"Captura Servidor:"**
   - Clique em **"Capturar Servidor"**
   - O sistema acessa cada link usando a URL Servidor e salva os prints na pasta backend/prints com prefixo servidor_.

5. Etapa 3 **"Comparação:"**
   - Clique em **"Comparar"**
   - O backend carrega os prints local_*.png e servidor_*.png, gera os diffs (se houver) e retorna os resultados.
   - Os diffs são salvos na pasta backend/prints com o sufixo _diff.png.

6. **Resultados exibidos no frontend:**
   - *URLs OK* → sem diferença visual
   - *URLs com diferença* → diferença visual encontrada (print diff salvo em backend/prints)

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
└── start-app.sh              # Script de inicialização
```

---

## 💡 Observações
- O backend utiliza Puppeteer com `headless: 'new'`, mas pode mudar para `false` se quiser ver o navegador abrindo.
- Imagens de diferença são salvas como `.png` na pasta `backend/prints`.
- Certifique-se de que o backend está acessível antes de testar o frontend.

---

Autor @RodrigoCavalcantii.