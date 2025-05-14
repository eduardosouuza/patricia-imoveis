// Não foi possível criar o arquivo porque a pasta scripts/ não existe.
// Você pode criar este script manualmente seguindo estas instruções:

/*
1. Instale a biblioteca favicons:
   npm install --save-dev favicons

2. Crie uma pasta scripts/ na raiz do projeto:
   mkdir -p scripts

3. Crie o arquivo scripts/generate_favicons.js com o seguinte conteúdo:

```javascript
const favicons = require('favicons');
const fs = require('fs');
const path = require('path');

// Caminho para o logo/favicon source
const source = path.resolve(__dirname, '../src/assets/logo.png'); 
const outputDir = path.resolve(__dirname, '../public');

// Configurações dos favicons
const configuration = {
  path: '/', // Caminho onde os favicons estarão disponíveis
  appName: 'Patricia Imóveis',
  appShortName: 'Patricia',
  appDescription: 'Especialista em imóveis de alto padrão',
  background: '#6B001A', // Cor primária do site
  theme_color: '#D2B048', // Cor de destaque do site
  appleStatusBarStyle: 'black-translucent',
  display: 'standalone',
  orientation: 'portrait',
  scope: '/',
  start_url: '/',
  version: '1.0',
  logging: true,
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: true,
    favicons: true,
    windows: true,
    yandex: false
  }
};

// Gerar favicons
(async () => {
  try {
    const response = await favicons(source, configuration);
    
    // Salvar os arquivos
    await Promise.all(response.images.map(image => {
      return fs.promises.writeFile(
        path.join(outputDir, image.name),
        image.contents
      );
    }));
    
    await Promise.all(response.files.map(file => {
      return fs.promises.writeFile(
        path.join(outputDir, file.name),
        file.contents
      );
    }));
    
    // Adicionar tags ao HTML
    const htmlHead = response.html.join('\n');
    console.log('🎉 Favicons gerados com sucesso!');
    console.log('Cole as seguintes tags no seu HTML head:');
    console.log(htmlHead);
    
  } catch (error) {
    console.error('Erro ao gerar favicons:', error);
  }
})();
```

4. Adicione o script ao package.json:
   Na seção "scripts", adicione:
   "generate-favicons": "node scripts/generate_favicons.js"

5. Execute o script:
   npm run generate-favicons
*/ 