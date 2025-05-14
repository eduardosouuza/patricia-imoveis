// Script de build para Vercel
// Usando sintaxe CommonJS para compatibilidade
const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');

// Configurando mais memória para Node
process.env.NODE_OPTIONS = '--max-old-space-size=4096';

// Relatando informações do ambiente
console.log('🔍 Ambiente de build:');
console.log(`Node version: ${process.version}`);
console.log(`Working directory: ${process.cwd()}`);
console.log('------------------------');

console.log('🔧 Iniciando processo de build otimizado para Vercel...');

try {
  // Navegando para a pasta do projeto
  console.log('📂 Acessando a pasta do projeto...');
  process.chdir(path.join(process.cwd(), 'project'));
  console.log(`Novo diretório: ${process.cwd()}`);
  
  // Verificando conteúdo do diretório
  console.log('📑 Listando arquivos:');
  const files = fs.readdirSync('.');
  console.log(files.join(', '));
  
  // Instalando dependências
  console.log('📦 Instalando dependências...');
  childProcess.execSync('npm install --no-fund --no-audit', { 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });
  
  // Executando build
  console.log('🚀 Executando build...');
  childProcess.execSync('npm run build', { 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });
  
  // Verificando se a pasta dist foi criada
  if (fs.existsSync(path.join(process.cwd(), 'dist'))) {
    console.log('✅ Build concluído com sucesso!');
    process.exit(0);
  } else {
    console.error('❌ Build falhou: pasta dist não foi criada');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Erro durante o build:');
  console.error(error);
  process.exit(1);
} 