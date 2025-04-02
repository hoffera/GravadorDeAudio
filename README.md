# GravadorDeAudio


Este é um aplicativo de **Web Component** que permite gravar audios, baixar eles e ver a transcrição. Ele utiliza a API de `Service Worker` para melhorar o desempenho offline e o armazenamento de links.
Os links são armazenados no `localStorage` para persistência de dados, e o app utiliza Media Session API  para gravar e reproduzir áudios e a Speech recognition API que permite realizar a transcrição das gravações .

## Funcionalidades
- Gravar áudios
- Baixar áudios
- Transcrever os áudios
- Funcionalidade offline com Service Worker

## Tecnologias Utilizadas
- **Web Components**: Utilizado para criar o componente reutilizável.
- **Shadow DOM**: Para encapsulamento dos estilos e estrutura do componente.
- **LocalStorage**: Para persistência de dados no navegador.
- **Service Worker**: Para cache de recursos e funcionamento offline.
- **Media Session API**: Gravar e reproduzir áudios.
- **Speech recognition API**: Para realizar a transcrição dos audios.

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
