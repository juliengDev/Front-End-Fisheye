// Fonction qui recupere le fichier JSON 
// et le retourne sous la forme d'un tableau

async function getPhotographers() {

    
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
    
    
    return {photographers: [...photographers]} // REST parameter
    }
}   


// Fonction qui selectionne la div class.photographer_section
// Puis via une boucle :
// - va stocker chaque objet associer a un photographe (1)
// - va ajouter pour chacun de ces objets les elements choisies au DOM (2)

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
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
