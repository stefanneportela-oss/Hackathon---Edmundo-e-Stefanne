# SENAI Soluções Digitais — Contexto do Projeto

Documento de passagem para quem for continuar o projeto. Explica o que é, como rodar e onde mexer.

## Sobre o projeto

Landing page (site de uma página) da **SENAI Soluções Digitais**, criada para o Hackathon.
É um site moderno com fundo animado em 3D, animações de scroll e um carrossel de soluções.

## Tecnologias

- **React 18** + **Vite 6** — base do site
- **Tailwind CSS 4** — estilização (via plugin `@tailwindcss/vite`)
- **Framer Motion** — animações de entrada e de scroll
- **Three.js** + **@react-three/fiber** + **@react-three/drei** — fundo e logo em 3D

## Como rodar o projeto

Pré-requisito: ter o **Node.js** instalado (versão 18 ou superior).

```bash
# 1. Instalar as dependências
npm install

# 2. Rodar em modo desenvolvimento (abre em http://localhost:5173)
npm run dev

# 3. Gerar a versão de produção (pasta dist/)
npm run build

# 4. Pré-visualizar a build de produção
npm run preview
```

> Observação: o arquivo `.npmrc` já vem com `legacy-peer-deps` configurado.
> Se o `npm install` reclamar de conflito de versões, ele já está tratado.

## Estrutura de pastas

```
senai-solucoes-digitais/
├── index.html              # HTML base (ponto de entrada do Vite)
├── vite.config.js          # Configuração do Vite (React + Tailwind)
├── package.json            # Dependências e scripts
├── public/                 # Arquivos estáticos (favicon, imagens públicas)
└── src/
    ├── App.jsx             # Monta a página, define a ordem das seções
    ├── assets/             # Imagens, logos e recursos usados no código
    │   ├── about/          # Imagens da seção "Sobre"
    │   ├── logos/          # Logos da marca e dos parceiros
    │   └── portraits/      # Fotos de pessoas
    └── components/         # Componentes da interface (ver abaixo)
```

## Componentes principais (em `src/components/`)

A ordem das seções na página é definida no `App.jsx`:

| Componente | O que faz |
|---|---|
| `Header.jsx` | Cabeçalho / menu de navegação |
| `Hero.jsx` | Primeira seção de destaque (topo da página) |
| `SocialProof.jsx` | Logos de parceiros / prova social |
| `TextReveal.jsx` | Bloco de texto com animação ao rolar |
| `Services.jsx` | Seção de serviços |
| `Projects.jsx` | Seção de projetos |
| `About.jsx` | Seção "Sobre" |
| `Careers.jsx` | Seção de carreiras / vagas |
| `GlobalBackground.jsx` | Fundo animado contínuo (atrás de tudo) |
| `MotionToggle.jsx` | Botão para ligar/desligar as animações |
| `LogoHologram3D.jsx` | Logo em 3D (efeito holograma) |
| `SolutionsCarousel.jsx` | Carrossel de soluções (arrasta + gira sozinho) |
| `ui/` | Componentes reutilizáveis (ex.: botões) |

> Pode existir algum componente de versão anterior (ex.: `HeroBackground.jsx`).
> O `App.jsx` mostra quais estão sendo usados de fato.

## Repositório Git

O projeto já está versionado e conectado ao GitHub:

- **Remoto:** https://github.com/stefanneportela-oss/Hackathon---Edmundo-e-Stefanne.git
- **Branch principal:** `master`

Fluxo para continuar o trabalho:

```bash
# Clonar (primeira vez)
git clone https://github.com/stefanneportela-oss/Hackathon---Edmundo-e-Stefanne.git

# Salvar alterações
git add .
git commit -m "descrição do que foi feito"
git push
```

## O que NÃO enviar / não versionar

Já está no `.gitignore`, mas vale lembrar:

- `node_modules/` — recriado com `npm install`
- `dist/` — recriado com `npm run build`
- arquivos `.env` — variáveis locais / segredos

## Deploy

O projeto está preparado para deploy no **Vercel** (a build gera a pasta `dist/`).
Comando de build: `npm run build` · Diretório de saída: `dist`.

---

Dúvidas sobre a base do código: comece lendo o `App.jsx` e vá abrindo cada
componente na ordem em que aparecem na página.
