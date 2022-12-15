async function getPhotographers() {

    
    const url = '/data/photographers.json';
    const requete = await fetch(url, {
        method: 'GET'
    });

    if (!requete.ok){
        alert('Un probleme est survenu. Veuillez recharger la page ulterieurement')
    }else{
        let data = await requete.json();
        // console.log(data)
        const medias = data.media;
        
    
    
    return {medias: [...medias]}
    }
};


async function displayMedia(medias) {
    const photographersHeader = document.querySelector(".photograph-header");
    
    medias.forEach((media) => {
        const photographerMedia = mediaFactory(media);
        const userCardDom = photographerMedia.getUserCardDom();
        photographersHeader.appendChild(userCardDom);
    })
};

async function init() {
    // Récupère les datas des photographes
    const { medias } = await getPhotographers();    
    displayMedia(medias);
};

init();