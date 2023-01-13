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

    let modal = document.querySelector('.modal');
    let contactButton = document.querySelector('.contact_button');
    
    modal.innerHTML=`
    <header>
        <h2>Contactez-moi</h2>                    
        <img id="idCloseContact" src="assets/icons/close.svg" />
    </header>
    <p class="name">${name}</p>
    <form
    id="reserve"
    name="reserve"
    action="index.html"
    method="get"
    onsubmit="validate()">
        <div>
            <label for="first">Prénom</label>
            <input
            class="text-control"
            type="text"
            id="first"
            name="first"
            maxlength="60"
            />
        </div>
        <div>
            <label for="last">Nom</label>
            <input
            class="text-control"
            type="text"
            id="last"
            name="last"
            maxlength="60"
            />
        </div>
        <div>
            <label for="email">Email</label>
            <input
            class="text-control"
            type="email"
            id="email"
            name="email" 
            />
        </div>
        <div>
            <label for"message">Votre message</label>
            <textarea 
            name="message" 
            id="message" 
            class="text-control" 
            cols="30" rows="10"
            wrap="hard"
            spellcheck="false"></textarea>
            
        </div>
        <button class="send_button" type="submit">Envoyer</button>
    </form>
`;
   
    let sendButton = document.querySelector('.send_button')
    let closeContactModal = document.getElementById('idCloseContact');
    contactButton.addEventListener('click', toggleContactForm);
    closeContactModal.addEventListener('click',toggleContactForm);
    // sendButton.addEventListener('click',validate)
};

function toggleContactForm() {
    let contactModal = document.getElementById('contact_modal');    

    if(contactModal.style.display == "block"){
        contactModal.style.display = "none";
    } else {
        contactModal.style.display = "block";
    }
};

// Message d'erreur personnalise avec l'input concerne et un message a afficher.
function errorMessage(element, message) {

    const newP = document.createElement("p");
  
    newP.classList.add("error");
    newP.textContent = message;
    newP.style.color = '#fff';
    newP.style.fontSize='1.5em'  
  
    // Injecte l'élément <p> précédemment créé à l'élément qui doit afficher l'erreur.
    element.parentNode.insertBefore(newP, element);
  
};

// Vérifie si le formulaire est valide à la soumission du formulaire.
function validate(event) {

    console.log('test')
    const firstName = document.getElementById("first");
    const lastName = document.getElementById("last");
    const email = document.getElementById("email");
   

    
    const name_regex = /^[A-zÀ-ú]+$/;    
    const mail_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    const errors = document.querySelectorAll(".error");
  
    errors.forEach(function(value) {
      value.remove();
    });
  
    
    if (!name_regex.test(firstName.value)) {
        errorMessage(firstName, "Veuillez saisir un prenom valide");
        return false;
    
    } else if (firstName.value.length < 2) {
        errorMessage(firstName, "Ce champ doit contenir au minimum 2 caractères !");
        return false;
    }

    if (!name_regex.test(lastName.value)) {
        errorMessage(lastName, "Veuillez saisir un nom valide");
        return false;
    } else if (lastName.value.length < 2) {
        errorMessage(lastName, "Ce champ doit contenir au minimum 2 caractères !");
        return false;
    }
   
    if (!mail_regex.test(email.value)) {
  
      errorMessage(email, "Ce champ doit contenir une adresse email valide !");
      return false;
    } 
  
  
    

    
    //* Si tout est OK */
     
     event.preventDefault();
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



// async function displayLightbox(img,name) {
    
//     const imagePhotographers = document.querySelectorAll(".media .img")
//     imagePhotographers.forEach((imagePhotographer) => {
//         imagePhotographer.addEventListener('click', function(){     
//             let lightbox = document.getElementById('lightbox');
//             console.log(lightbox)
//         })
//     })   

// }

async function init() {
    
    const url = new URL(document.location.href);
    const idPhotographer = url.searchParams.get('q');
    const {photographer, media} = await getPhotographer(idPhotographer);
    displayData(photographer, media);
    // displayLightbox();
    
};




init();





