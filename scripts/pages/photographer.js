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

function createContactForm(name){

    let contactButton = document.querySelector('.contact_button');
    let contactModal = document.getElementById('contact_modal');            
    let modal = document.querySelector('.modal');
    
    
    modal.innerHTML=`
    <header>
        <h2>Contactez-moi</h2>                    
        <img id="idCloseContact" src="assets/icons/close.svg" />
    </header>
    <p class="name">${name}</p>
    <form>
        <div>
            <label>Prénom</label>
            <input/>
        </div>
        <div>
            <label>Nom</label>
            <input/>
        </div>
        <div>
            <label>Email</label>
            <input/>
        </div>
        <div>
            <label>Votre message</label>
            <input/>
        </div>
        <button class="contact_button">Envoyer</button>
    </form>
`;
    let closeContactModal = document.getElementById('idCloseContact');
    contactButton.addEventListener('click', toggleContactForm);
    closeContactModal.addEventListener('click',toggleContactForm);
};

function toggleContactForm() {
    let contactModal = document.getElementById('contact_modal');    

    if(contactModal.style.display == "block"){
        contactModal.style.display = "none";
    } else {
        contactModal.style.display = "block";
    }
};


// Variables de portees global utilisees pour la fonction displayData et mediaFilter
// Declarer au chargement de la page via displayData 
// Re utiliser lors de l'utilisation du filtre des medias via mediaFilter

let mediaPopularity =[];
let mediaDate =[];
let mediaTitle =[];
let photographerModel;


async function displayData(photographer,medias) {    

    // Partie Header
    const photographersSection = document.querySelector(".photograph-header");
    photographerModel = photographerFactory(photographer,"photographer");
    // console.log(photographerModel)
    const userCardDOM = photographerModel.getUserCardDOM();
    // console.log(userCardDOM)
    photographersSection.appendChild(userCardDOM);   

    // Modal Contactez-moi
    createContactForm(photographerModel.name)

    // Partie Tri
    const mediaDropdown = document.querySelector(".media-dropdown");
    const userDropdown = photographerModel.getDropdown();
    mediaDropdown.appendChild(userDropdown);

    //Creation des listes de medias triees

     mediaPopularity = [...medias.sort(function(a,b){
        if (a.likes < b.likes){
            return 1;
        }
        if (a.likes > b.likes){
            return -1;
        }
        return 0;

    })];

     mediaDate = [...medias.sort(function(a,b){
        if (a.date < b.date){
            return 1;
        }
        if (a.date > b.date){
            return -1;
        }
        return 0;

    })];

     mediaTitle = [...medias.sort(function(a,b){
        if (a.title.toLowerCase() > b.title.toLowerCase()){
            return 1;
        }
        if (a.title.toLowerCase() < b.title.toLowerCase()){
            return -1;
        }
        return 0;

    })];
     

    // Partie Medias 
    const mediasSection = document.querySelector(".media");    
    mediaPopularity.forEach((media) => {
        const mediasModel = mediaFactory(media,photographerModel.name);        
        const userMediaDOM = mediasModel.getUserMediaDOM();
        mediasSection.appendChild(userMediaDOM); //2
    });
    
    const selectFilter = document.getElementById('media-filter');
    selectFilter.addEventListener('change', mediaFilter);
   
};

async function mediaFilter() {
    const selectFilter = document.getElementById('media-filter');
    console.log(selectFilter.value);
    console.log(mediaDate)
    const mediasSection = document.querySelector(".media");
    mediasSection.innerHTML='';
    let mediaToDisplay=[];

    if (selectFilter.value == 'Date'){
        mediaToDisplay = mediaDate;
       
    } else if (selectFilter.value == 'Popularite'){
        mediaToDisplay = mediaPopularity;
       
    } else if (selectFilter.value == 'Titre'){
        mediaToDisplay = mediaTitle;
        
    }

    mediaToDisplay.forEach((media) => {
        const mediasModel = mediaFactory(media,photographerModel.name);        
        const userMediaDOM = mediasModel.getUserMediaDOM();
        mediasSection.appendChild(userMediaDOM);
    });

};

async function init() {

    const url = new URL(document.location.href);
    const idPhotographer = url.searchParams.get('q');
    const {photographer, media} = await getPhotographer(idPhotographer);
    displayData(photographer, media); 
    
};


init();





