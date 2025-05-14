# Projeto Imobiliária

Um site moderno para uma imobiliária, construído com React, TypeScript, Tailwind CSS e Framer Motion.

## Estrutura do Projeto

O projeto foi organizado seguindo boas práticas de desenvolvimento React:

```
project/
├── src/
│   ├── assets/            # Arquivos estáticos (imagens, ícones, etc.)
│   ├── components/
│   │   ├── common/        # Componentes reutilizáveis (botões, inputs, cards)
│   │   ├── layout/        # Componentes de layout (header, footer, sidebar)
│   │   ├── home/          # Componentes específicos da página home
│   │   ├── properties/    # Componentes específicos da página de propriedades
│   │   ├── about/         # Componentes específicos da página about
│   │   ├── contact/       # Componentes específicos da página de contato
│   │   ├── auth/          # Componentes de autenticação
│   │   └── utils/         # Componentes utilitários
│   ├── contexts/          # Contextos React
│   ├── data/              # Dados estáticos
│   ├── hooks/             # Hooks personalizados
│   ├── pages/             # Componentes de página
│   ├── services/          # Serviços (API, autenticação, etc.)
│   ├── styles/            # Estilos globais
│   ├── types/             # Tipos TypeScript
│   └── utils/             # Funções utilitárias
```

## Melhorias Realizadas

- **Modularização:** Componentes foram divididos em partes menores e reutilizáveis
- **Separação de Dados:** Dados estáticos foram movidos para arquivos específicos
- **Reutilização:** Criação de componentes comuns que podem ser usados em várias partes do site
- **Animações:** Centralização das configurações de animação em um único arquivo
- **Elementos Decorativos:** Criação de componentes para elementos visuais reutilizáveis
- **Tipagem:** Adição de interfaces TypeScript para melhor segurança de tipos

### Componentes Reutilizáveis

Foram criados os seguintes componentes reutilizáveis:

- **StatCard:** Card para exibição de estatísticas com efeitos de hover
- **Testimonial:** Componente para exibição de depoimentos/citações
- **DecorativeElements:** Conjunto de elementos decorativos para as seções

### Otimização de Código

- Uso de constantes para animações
- Separação entre lógica e apresentação
- Componentes funcionais com tipagem adequada
- Comentários detalhados para facilitar a manutenção

## Tecnologias Utilizadas

- **React:** Biblioteca para criação de interfaces de usuário
- **TypeScript:** Adiciona tipagem estática ao JavaScript
- **Tailwind CSS:** Framework CSS utility-first
- **Framer Motion:** Biblioteca para animações
- **React Router:** Gerenciamento de rotas
- **Supabase:** Backend as a Service

## Como Executar

```bash
# Instalação das dependências
npm install

# Execução em ambiente de desenvolvimento
npm run dev

# Build para produção
npm run build

# Execução dos testes
npm test
```

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.

## 📋 Requisitos

- Node.js 16+ e npm
- Conta no Supabase para o backend

## 🚀 Como preparar para produção

1. **Configurar variáveis de ambiente**:
   Crie um arquivo `.env.production` na raiz do projeto com as seguintes variáveis:
   ```
   VITE_SUPABASE_URL=seu_supabase_url
   VITE_SUPABASE_ANON_KEY=sua_supabase_anon_key
   VITE_SITE_URL=https://seusite.com
   VITE_SITE_TITLE=Patricia Imóveis
   VITE_SITE_DESCRIPTION=Especialista em imóveis de alto padrão
   ```

2. **Build do projeto**:
   ```bash
   npm run build
   ```
   Isso criará uma pasta `dist` com os arquivos otimizados para produção.

3. **Testar o build localmente**:
   ```bash
   npm run preview
   ```

4. **Deploy para produção**:
   
   **Vercel**:
   - Instale a CLI da Vercel: `npm i -g vercel`
   - Execute `vercel` e siga as instruções
   
   **Netlify**:
   - Instale a CLI do Netlify: `npm i -g netlify-cli`
   - Execute `netlify deploy` e siga as instruções
   
   **Firebase**:
   - Instale a CLI do Firebase: `npm i -g firebase-tools`
   - Execute `firebase init` e configure o hosting
   - Execute `firebase deploy`

## 🔧 Checklist para produção

- [ ] Todas as imagens estão otimizadas
- [ ] Variáveis de ambiente configuradas
- [ ] SEO otimizado (títulos, descrições, meta tags)
- [ ] Certificado SSL configurado
- [ ] Testes realizados em diversos navegadores e dispositivos
- [ ] Google Analytics ou outra ferramenta de analytics configurada
- [ ] Monitoramento de erros configurado (ex: Sentry)
- [ ] Sitemap e robots.txt criados

## 📊 Monitoramento após o deploy

1. Use o [PageSpeed Insights](https://pagespeed.web.dev/) para verificar a performance
2. Monitore o Core Web Vitals via Google Search Console
3. Configure alertas para erros via Sentry ou similar
4. Monitore o tráfego via Google Analytics

## 🧰 Manutenção

Para atualizações de conteúdo:
1. Edite os arquivos necessários
2. Teste localmente: `npm run dev`
3. Faça o build novamente: `npm run build`
4. Faça o deploy novamente

---

&copy; 2023 Patricia Imóveis. Todos os direitos reservados. 