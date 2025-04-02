if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: "Unforgettable",
      artist: "Nat King Cole",
      album: "The Ultimate Collection (Remastered)",
      artwork: [
        {
          src: "https://dummyimage.com/96x96",
          sizes: "96x96",
          type: "image/png",
        },
        {
          src: "https://dummyimage.com/128x128",
          sizes: "128x128",
          type: "image/png",
        },
        {
          src: "https://dummyimage.com/192x192",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "https://dummyimage.com/256x256",
          sizes: "256x256",
          type: "image/png",
        },
        {
          src: "https://dummyimage.com/384x384",
          sizes: "384x384",
          type: "image/png",
        },
        {
          src: "https://dummyimage.com/512x512",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    });
  
    navigator.mediaSession.setActionHandler("play", () => {
      /* Code excerpted. */
    });
    navigator.mediaSession.setActionHandler("pause", () => {
      /* Code excerpted. */
    });
    navigator.mediaSession.setActionHandler("stop", () => {
      /* Code excerpted. */
    });
    navigator.mediaSession.setActionHandler("seekbackward", () => {
      /* Code excerpted. */
    });
    navigator.mediaSession.setActionHandler("seekforward", () => {
      /* Code excerpted. */
    });
    navigator.mediaSession.setActionHandler("seekto", () => {
      /* Code excerpted. */
    });
    navigator.mediaSession.setActionHandler("previoustrack", () => {
      /* Code excerpted. */
    });
    navigator.mediaSession.setActionHandler("nexttrack", () => {
      /* Code excerpted. */
    });
    navigator.mediaSession.setActionHandler("skipad", () => {
      /* Code excerpted. */
    });
    navigator.mediaSession.setActionHandler("togglecamera", () => {
      /* Code excerpted. */
    });
    navigator.mediaSession.setActionHandler("togglemicrophone", () => {
      /* Code excerpted. */
    });
    navigator.mediaSession.setActionHandler("hangup", () => {
      /* Code excerpted. */
    });
  }
  