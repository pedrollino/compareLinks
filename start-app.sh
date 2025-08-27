#!/bin/bash

# Define cores para os logs
GREEN='\033[0;32m'
NC='\033[0m' # Sem cor

echo -e "${GREEN}Iniciando o processo de setup do ambiente...${NC}"

# --- Backend ---
echo -e "\n${GREEN}Configurando o Backend...${NC}"
cd backend || { echo "Pasta 'backend' não encontrada!"; exit 1; }

echo "Instalando dependências do backend (npm install)..."
npm install

echo "Iniciando o servidor do backend em segundo plano (node server.js)..."
node server.js &
BACKEND_PID=$!
echo -e "Servidor backend iniciado com o PID: ${GREEN}$BACKEND_PID${NC}"


# --- Frontend ---
echo -e "\n${GREEN}Configurando o Frontend...${NC}"
cd ../frontend || { echo "Pasta 'frontend' não encontrada!"; exit 1; }

echo "Instalando dependências do frontend (npm install)..."
npm install

echo "Iniciando o ambiente de desenvolvimento do frontend (npm run dev)..."
npm run dev

# --- Finalização ---
# O script continuará executando o 'npm run dev' aqui.
# Quando você parar o processo do frontend (geralmente com Ctrl+C),
# o script continuará a partir daqui.

echo -e "\n${GREEN}Processo do frontend finalizado. Parando o servidor do backend...${NC}"
kill $BACKEND_PID
echo "Aplicação finalizada."