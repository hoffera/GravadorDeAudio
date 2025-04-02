# GravadorDeAudio


Este é um aplicativo de **Web Component** que permite gravar audios, baixar eles e ver a transcrição. Ele utiliza a API de `Service Worker` para melhorar o desempenho offline e o armazenamento de links.
Os links são armazenados no `localStorage` para persistência de dados, e o app utiliza Media Session API  para gravar e reproduzir áudios e a Speech recognition API que permite realizar a transcrição das gravações .

## 🚀 Funcionalidades
- 🎙 Gravação de áudio diretamente pelo navegador.
- 📥 Download dos arquivos de áudio gravados.
- 📝 Transcrição automática dos áudios usando reconhecimento de fala.
- 🌐 Funciona offline com Service Worker.
- 📌 Persistência de dados no localStorage.
- 🔊 Integração com Media Session API para melhor controle de reprodução.

## 🛠 Tecnologias Utilizadas
-React: Framework para construção da interface.
- Web Components: Utilizado para criar componentes reutilizáveis e encapsulados.
- Shadow DOM: Para isolar estilos e estrutura dos componentes.
- LocalStorage: Para armazenar as gravações de forma persistente.
- Service Worker: Para cache de recursos e funcionamento offline.
- Media Session API: Para interação com o sistema de reprodução de mídia do navegador.
- Speech Recognition API: Para transcrição automática dos áudios.

## Como Rodar o Aplicativo
### 1. Acessar pelo Site hospedado

```bash
https://gravador-de-audio-3xrf.vercel.app/
```
### 2. Clonar o Repositório

Clone o repositório do GitHub para o seu computador:

```bash
git clone https://github.com/hoffera/GravadorDeAudio
```

Instalar a extensão:

```bash
Live Server
```

Após instalado, só clicar no botão Live Server para rodar a aplicação com melhor proveito.
