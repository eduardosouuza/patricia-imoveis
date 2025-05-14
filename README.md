# Patricia Imóveis - Site Imobiliário

![Licença](https://img.shields.io/badge/licença-MIT-blue.svg)
![Versão](https://img.shields.io/badge/versão-1.0.0-green.svg)
![React](https://img.shields.io/badge/React-18.x-61DAFB.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC.svg)

Um sistema imobiliário moderno e completo, desenvolvido com as mais recentes tecnologias web. Este projeto foi criado para oferecer uma experiência de alta qualidade para clientes em busca de imóveis, com foco em design moderno, performance e usabilidade.

## 📸 Screenshots

![Homepage](https://via.placeholder.com/800x400?text=Homepage)
![Página de Imóveis](https://via.placeholder.com/800x400?text=Página+de+Imóveis)
![Painel Administrativo](https://via.placeholder.com/800x400?text=Painel+Administrativo)

## ✨ Funcionalidades

- **Vitrine de Imóveis**: Listagem avançada com filtros e ordenação
- **Sistema de Busca**: Pesquisa por localização, preço, tipo de imóvel
- **Detalhes de Imóveis**: Páginas detalhadas com galeria de imagens, mapa e informações completas
- **Formulários de Contato**: Sistema de envio de mensagens integrado
- **Painel Administrativo**: Gerenciamento completo de imóveis, usuários e leads
- **Autenticação Segura**: Sistema de login com múltiplos níveis de acesso
- **Design Responsivo**: Experiência otimizada para todos os dispositivos
- **Animações Sofisticadas**: Transições e interações fluidas para melhor experiência do usuário

## 🛠️ Tecnologias Utilizadas

- **Frontend**:
  - [React 18](https://reactjs.org/) - Biblioteca JavaScript para construção de interfaces
  - [TypeScript](https://www.typescriptlang.org/) - Superset tipado de JavaScript
  - [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário
  - [Framer Motion](https://www.framer.com/motion/) - Biblioteca para animações
  - [React Router](https://reactrouter.com/) - Roteamento no lado do cliente

- **Backend**:
  - [Supabase](https://supabase.io/) - Alternativa open source ao Firebase
  - [Vite](https://vitejs.dev/) - Ferramenta de build moderna

- **Ferramentas de Qualidade**:
  - [ESLint](https://eslint.org/) - Linting de código
  - [Prettier](https://prettier.io/) - Formatação de código

## 🏗️ Arquitetura do Projeto

O projeto foi estruturado seguindo princípios de modularidade e reutilização:

```
project/
├── src/
│   ├── assets/            # Arquivos estáticos
│   ├── components/        # Componentes React organizados por função
│   │   ├── common/        # Componentes reutilizáveis
│   │   ├── layout/        # Componentes de layout
│   │   ├── home/          # Componentes da página inicial
│   │   ├── properties/    # Componentes de listagem/detalhe de imóveis
│   │   ├── contact/       # Formulários e componentes de contato
│   │   ├── auth/          # Componentes de autenticação
│   │   └── utils/         # Componentes utilitários
│   ├── contexts/          # Contextos React (autenticação, etc.)
│   ├── data/              # Dados estáticos e mocks
│   ├── hooks/             # Hooks personalizados
│   ├── pages/             # Componentes de página
│   ├── services/          # Serviços e APIs
│   ├── styles/            # Estilos globais
│   ├── types/             # Definições de tipos TypeScript
│   └── utils/             # Funções utilitárias
```

## 💻 Práticas Avançadas Implementadas

- **Componentização**: Componentes reutilizáveis com separação clara de responsabilidades
- **Lazy Loading**: Carregamento sob demanda para melhor performance
- **Animações Otimizadas**: Uso eficiente de animações com Framer Motion
- **Gerenciamento de Estado**: Uso de Context API e hooks personalizados
- **Tipagem Estrita**: TypeScript com configuração rigorosa para evitar bugs
- **Design Responsivo**: Design adaptativo para todos os tamanhos de tela
- **SEO Otimizado**: Meta tags e estrutura semântica para melhor indexação

## 🚀 Destaques Técnicos

1. **Sistema de Autenticação Seguro**:
   - Autenticação baseada em tokens JWT
   - Proteção de rotas administrativas
   - Gerenciamento seguro de sessões

2. **Componentes Avançados**:
   - Cards interativos com efeitos hover
   - Elementos decorativos reutilizáveis
   - Formulários com validação avançada

3. **Otimização de Performance**:
   - Code-splitting para carregamento rápido
   - Imagens otimizadas
   - Animações eficientes sem impacto no desempenho

4. **UI/UX de Alta Qualidade**:
   - Micro-interações para feedback do usuário
   - Esquema de cores consistente e acessível
   - Tipografia bem definida e escalável

## 🔧 Como Executar o Projeto

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/patricia-imoveis.git
cd patricia-imoveis

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas credenciais

# Execute em modo de desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 📚 Aprendizados e Desafios

Durante o desenvolvimento deste projeto, enfrentei e superei diversos desafios técnicos:

- Implementação de um sistema de filtragem complexo para imóveis
- Otimização de performance com grande volume de imagens
- Desenvolvimento de componentes reutilizáveis mas altamente customizáveis
- Implementação de animações suaves sem prejudicar o desempenho
- Configuração de autenticação segura com múltiplos níveis de acesso

## 📫 Contato

Para mais informações sobre este projeto ou para discutir oportunidades profissionais:

- LinkedIn: [Seu LinkedIn](https://www.linkedin.com/in/seu-perfil)
- Email: seu.email@exemplo.com
- GitHub: [Seu GitHub](https://github.com/seu-usuario)

---

📝 **Nota**: Este projeto foi desenvolvido como demonstração de habilidades e boas práticas em desenvolvimento web moderno. As tecnologias e abordagens utilizadas representam o estado da arte no desenvolvimento frontend.

© 2023 [Seu Nome]. Todos os direitos reservados. 