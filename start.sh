#!/bin/bash

# Verifica se o parâmetro foi passado
if [ "$1" == "install" ]; then
  echo "Executando instalação e inicialização..."

  echo "Iniciando o backend..."
  cd backend
  npm install
  node server.js &
  cd ..

  echo "Iniciando o frontend..."
  cd frontend
  npm install

  # Abrir o navegador automaticamente (antes do npm run dev)
  xdg-open http://localhost:5173/ &

  npm run dev   # Fica em foreground com log visível

elif [ "$1" == "run" ]; then
  echo "Inicializando sem instalar..."

  echo "Iniciando o backend..."
  cd backend
  node server.js &
  cd ..

  echo "Iniciando o frontend..."
  cd frontend

  # Abrir o navegador automaticamente (antes do npm run dev)
  xdg-open http://localhost:5173/ &

  npm run dev   # Fica em foreground com log visível

else
  echo "Uso: ./start.sh [install|run]"
  exit 1
fi
