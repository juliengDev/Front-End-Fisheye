async function getPhotographer(id) {

    
    const url = '/data/photographers.json';
    const requete = await fetch(url, {
        method: 'GET'
    });

    if (!requete.ok){
        alert('Un probleme est survenu. Veuillez recharger la page ulterieurement')
    }else{
        let data = await requete.json();
        // console.log(data);
        const photographers = data.photographers;
        // console.log(photographers);
        const medias = data.media;
        // console.log(medias);


        let user;
        let userMedia = [];

        photographers.forEach((photographer) => {
            
            if(id == photographer.id) {                
                 user = photographer;    
            }
        })

        medias.forEach((media) => {
            if(id == media.photographerId) {
                userMedia.push(media);
            }
        })

        return {
            photographer: user,
            media : userMedia
        }
    }
};

async function displayData(photographer,medias) {    

    // Partie Header
    const photographersSection = document.querySelector(".photograph-header");
    const photographerModel = photographerFactory(photographer,"photographer");
    // console.log(photographerModel)
    const userCardDOM = photographerModel.getUserCardDOM();
    // console.log(userCardDOM)
    photographersSection.appendChild(userCardDOM);   

    // Modal
    photographerModel.displayModal();
    photographerModel.closeModal();

    // Partie Tri
    const mediaDropdown = document.querySelector(".media-dropdown");
    const userDropdown = photographerModel.getDropdown();
    mediaDropdown.appendChild(userDropdown);

        

    // Partie Medias 
    const mediasSection = document.querySelector(".media");    
    medias.forEach((media) => {
        const mediasModel = mediaFactory(media,photographerModel.name);        
        const userMediaDOM = mediasModel.getUserMediaDOM();
        mediasSection.appendChild(userMediaDOM); //2
    });
    
    
};




async function init() {

    const url = new URL(document.location.href);
    const idPhotographer = url.searchParams.get('q');
    const {photographer, media} = await getPhotographer(idPhotographer);
    displayData(photographer, media); 
    
}





init();





