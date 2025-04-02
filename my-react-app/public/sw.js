// Nome do cache que será utilizado para armazenar os recursos do aplicativo.
const CACHE_NAME = "meu_cache";

// Ouvinte para o evento de instalação do Service Worker.
self.addEventListener("install", (event) => {
    console.log("Instalando o service worker");

     // Garante que a instalação do Service Worker só será concluída após o cache ser populado.
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            // Adiciona os arquivos essenciais ao cache.
            return cache.addAll(["/index.html"]).then(() => self.skipWaiting());
        })
    );
});

// Estratégia stale-while-revalidate (usar o cache, mas atualizar com a rede depois).
self.addEventListener("fetch", (event) => {
    console.log(`Baixando ${event.request.url}`);
    event.respondWith(caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((respostaCache) => {
            const respostaObtida = fetch(event.request).then((respostaDaRede) => {
                cache.put(event.request, respostaDaRede.clone());

                return respostaDaRede;
            });
             // Retorna o cache se disponível; caso contrário, busca na rede.
            return respostaCache || respostaObtida;
        })
    }));
});

// Estratégia cache-first: Tenta obter o recurso do cache primeiro, se não existir, busca na rede.
const cachePrimeiro = async (request) => {
    const respostaDoCache = await caches.match(request);

    if (respostaDoCache) {
        return respostaDoCache; // Retorna do cache se disponível.
    }

    const respostaRede = await fetch(request);
    atualizaCache(request, respostaRede.clone()); // Atualiza o cache com a resposta da rede.

    return respostaRede;
};

// Estratégia network-first: Tenta buscar o recurso na rede primeiro; se falhar, usa o cache.
const redePrimeiro = async (request) => {
    const respostaDaRede = await fetch(request);


    // Se a resposta for válida, atualiza o cache e a retorna.
    if (respostaDaRede) {
        atualizaCache(request, respostaDaRede.clone());
        return respostaDaRede;
    }

    const respostaCache = await caches.match(request);

    return respostaCache;
};

// Função auxiliar para armazenar respostas no cache.
const atualizaCache = async (request, response) => {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(request, response);
};

