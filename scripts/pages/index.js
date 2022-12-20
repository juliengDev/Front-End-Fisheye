async function getPhotographers() {

    
    const url = '/data/photographers.json';
    const requete = await fetch(url, {
        method: 'GET'
    });

    if (!requete.ok){
        alert('Un probleme est survenu. Veuillez recharger la page ulterieurement')
    }else{
        let data = await requete.json();
        const photographers = data.photographers;
        // console.log(photographers)
        const medias = data.media;
        // console.log(medias)
        
    
    
    return {photographers: [...photographers], medias: [...medias]}
    }
};   


async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer,"index");
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM); //2
    });
};





async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();  
    displayData(photographers);   
    
};

init();
