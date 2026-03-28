# Madaleno's Paws Pro

Aplicacao React + Vite para gestao de petshop.

## Deploy no GitHub Pages

Este projeto ja esta configurado para publicar automaticamente no GitHub Pages via GitHub Actions.

### 1. Ativar Pages no repositorio

1. No GitHub, abra Settings > Pages.
2. Em Build and deployment, selecione Source: GitHub Actions.

### 2. Publicar

1. Faça push para a branch main.
2. Aguarde o workflow Deploy to GitHub Pages finalizar.
3. A URL publicada aparecera na aba Actions e em Settings > Pages.

## Rodando localmente

```bash
npm install
npm run dev
```

## Build local

```bash
npm run build
```

Observacao: o script de build tambem gera um arquivo dist/404.html para fallback de rotas SPA no GitHub Pages.
