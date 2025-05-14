# Variáveis de Ambiente Necessárias

Para que este projeto funcione corretamente, é necessário configurar as seguintes variáveis de ambiente:

```
VITE_SUPABASE_URL=sua_url_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_supabase
```

## Configuração na Vercel

Ao fazer deploy na Vercel, adicione essas variáveis na configuração do projeto:

1. Acesse o dashboard da Vercel
2. Vá em "Settings" > "Environment Variables" 
3. Adicione as variáveis acima com seus respectivos valores
4. Lembre-se de preservar exatamente os mesmos nomes (com o prefixo VITE_) 