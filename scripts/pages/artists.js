async function displayMedia(medias) {
    const photographersHeader = document.querySelector(".photograph-header");
    
    medias.forEach((media) => {
        const photographerMedia = mediaFactory(media);
        const userCardDom = photographerMedia.getUserCardDom();
        photographersHeader.appendChild(userCardDom);
    })
};

