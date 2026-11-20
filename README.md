# 🎵 Seraphine ASCII Live Stream

> Transmissão em tempo real de uma animação ASCII a cores da *teamfight* da Seraphine (League of Legends), reproduzida diretamente no terminal via `curl` e hospedada na Cloudflare Workers.

---

## ⚡ Como Assistir (Quick Start)

Abre o teu terminal (PowerShell, Bash, Zsh ou Windows Terminal) e executa o seguinte comando:

```bash
curl.exe -sN [https://seraphine-live.thesheng04.workers.dev/](https://seraphine-live.thesheng04.workers.dev/)
```

> **Dica:** Para obteres a melhor experiência visual, utiliza um terminal compatível com **ANSI 24-bit TrueColor** (como o Windows Terminal, iTerm2 ou Alacritty) e reduz ligeiramente o tamanho da fonte.

---

## 🌟 Funcionalidades

- **ANSI TrueColor (24-bit):** Animação a cores com compressão de sequências de escape para manter o streaming estável.
- **Server-Sent Streaming:** Usa a API nativa `ReadableStream` do Cloudflare Workers para enviar fotogramas contínuos sem descarregar ficheiros pesados.
- **Deteção de Cliente:** Diferencia pedidos de browser (onde apresenta instruções) de pedidos vindos do `curl` (onde inicia o stream contínuo).
- **Sem Dependências Pesadas:** Corre 100% no edge da Cloudflare sem necessidade de base de dados ou servidores dedicados.

---

## 📁 Estrutura do Repositório

```text
├── coloured_frames.js        # Fotogramas em ASCII com cores ANSI em formato ES Module
├── frames.js                 # Fotogramas originais em ASCII monocromático
├── ascii_frames.json         # Dados em bruto dos fotogramas em JSON
├── worker.js                 # Lógica do Cloudflare Worker (ReadableStream HTTP)
├── wrangler.toml             # Ficheiro de configuração do Cloudflare Wrangler
├── test_coloured_frames.py   # Servidor HTTP local para testar a versão colorida
├── test_frames.py            # Servidor local para testar a versão monocromática
└── main.js                   # Scripts auxiliares do projeto
```

---

## 🛠️ Desenvolvimento Local

Se quiseres clonar e testar as animações na tua máquina antes de publicar:

### 1. Clonar o repositório

```bash
git clone [https://github.com/TheSh3ng04/My-ascii-live.git](https://github.com/TheSh3ng04/My-ascii-live.git)
cd My-ascii-live
```

### 2. Iniciar o servidor local de testes (Python)

Podes testar o streaming localmente sem recorrer ao Cloudflare:

```bash
# Para a versão a cores
python test_coloured_frames.py

# Ou para a versão monocromática
python test_frames.py
```

### 3. Visualizar o stream local noutra janela

Com o servidor ativo, abre uma nova janela de terminal e corre:

```bash
curl.exe -sN http://localhost:8080
```

---

## 🚀 Publicação no Cloudflare Workers

O projeto utiliza o **Wrangler** para gestão e deploy:

```bash
# Autenticar na Cloudflare (caso ainda não esteja feito)
npx wrangler login

# Publicar o Worker em produção
npx wrangler deploy
```

---

## 🎮 Contexto

Este projeto foi construído transformando um clipe de cerca de 10 segundos da ultimate da campeã **Seraphine** em League of Legends. O vídeo foi dividido em fotogramas PNG individuais, convertido em caracteres ASCII mapeados pela luminância dos píxeis e enriquecido com códigos ANSI RGB para renderização fiel das cores da habilidade no terminal.