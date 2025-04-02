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
- Vite: Ferramenta de build para um desenvolvimento mais rápido.
- React: Framework para construção da interface.
- Web Components: Utilizado para criar componentes reutilizáveis e encapsulados.
- Shadow DOM: Para isolar estilos e estrutura dos componentes.
- LocalStorage: Para armazenar as gravações de forma persistente.
- Service Worker: Para cache de recursos e funcionamento offline.
- Media Session API: Para interação com o sistema de reprodução de mídia do navegador.
- Speech Recognition API: Para transcrição automática dos áudios.

## 📌 Como Rodar o Aplicativo
### 1️⃣ Acessar pelo Navegador
Acesse a versão online do aplicativo pelo seguinte link:
```bash
https://gravador-de-audio-3xrf.vercel.app/
```
### 2️⃣ Clonar o Repositório
Se desejar rodar localmente, clone o repositório do GitHub:

```bash
git clone https://github.com/hoffera/GravadorDeAudio
```
### 3️⃣ Instalar as Dependências
Entre no diretório do projeto e instale as dependências:

```bash
cd GravadorDeAudio
npm install
```
### 4️⃣ Rodar o Projeto
Inicie o aplicativo com:

```bash
npm run dev
```


Desenvolvido por Artur Boettger e Felipe Hoffmeister 🚀
