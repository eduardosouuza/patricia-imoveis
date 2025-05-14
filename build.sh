#!/bin/bash

# Definir limite de memória para o Node.js
export NODE_OPTIONS="--max-old-space-size=4096"

# Navegar para a pasta do projeto
cd project || exit 1

# Limpar cache do npm
echo "Limpando o cache do npm..."
npm cache clean --force

# Instalar dependências com opções otimizadas
echo "Instalando dependências..."
npm install --no-fund --no-audit --prefer-offline --no-optional

# Executar build com flags de otimização
echo "Executando o build..."
npm run build

# Verificar resultado do build
if [ -d "dist" ]; then
  echo "Build concluído com sucesso!"
  exit 0
else
  echo "Falha no build. Verifique os logs acima."
  exit 1
fi 