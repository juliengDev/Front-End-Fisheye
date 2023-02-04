// Variables de portees global utilisees pour la fonction displayData et mediaFilter
// Declarer au chargement de la page via displayData 
// Re utiliser lors de l'utilisation du filtre des medias via mediaFilter

let mediaPopularity =[];
let mediaDate =[];
let mediaTitle =[];
let photographerModel;
let mediaModels = [];



//Recuperation des donnees
async function getPhotographer(id) {

    
    const url = '/data/photographers.json';
    const requete = await fetch(url, {
        method: 'GET'
    });

    if (!requete.ok){
        alert('Un probleme est survenu. Veuillez recharger la page ulterieurement')
    }else{
        let data = await requete.json();
        
        const photographers = data.photographers;
       
        const medias = data.media;
        


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

// ------------------------------------------ Formulaire ------------------------------------------

// Formulaire de contact de la page photographe
function createContactForm(name) {

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

// Gere l'affichage de la modal de contact
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

async function displayData(photographer,medias) {    

    // Partie Header
    const photographersSection = document.querySelector(".photograph-header");
    photographerModel = photographerFactory(photographer,"photographer");    
    const userCardDOM = photographerModel.getUserCardDOM();   
    photographersSection.appendChild(userCardDOM);   
    

    // Modal Contactez-moi
    createContactForm(photographerModel.name);

    //Dropdown Menu
    const popularity = document.getElementById("popularity");
    const date = document.getElementById("date");
    const title = document.getElementById("title");
    const buttonElement = document.querySelector(".dropdown-menu__sort-button");
    const dropDownMenu = document.getElementById("dropdown-menu");

    buttonElement.addEventListener("click",toggleDropDownListItem);

    popularity.addEventListener("click",function() {
        // console.log("Popularité")
        buttonElement.textContent="Popularité"
        dropDownMenu.style.display="none";
        mediaFilter()
    })
    date.addEventListener("click",function() {
        // console.log("Date")
        buttonElement.textContent="Date"
        dropDownMenu.style.display="none";
        mediaFilter()
    })
    title.addEventListener("click",function() {
        // console.log("Titre")
        buttonElement.textContent="Titre"
        dropDownMenu.style.display="none";
        mediaFilter()
    })
    
    

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
     

    // ------------------------------------------ Medias ------------------------------------------
        
    let sum = 0;
    let order = 0;
    let totalLikes = document.getElementById('totalLikes');
    let number = document.getElementById('number');
    let heart = document.getElementById('heart');
    let price = document.getElementById('price');

    

    const mediasSection = document.querySelector(".media");    
    mediaPopularity.forEach((media) => {
        const mediasModel = mediaFactory(media,photographerModel.name,order);                     
        const userMediaDOM = mediasModel.getUserMediaDOM();
        mediasSection.appendChild(userMediaDOM);
        mediaModels.push(mediasModel);
        sum+= media.likes;
        order++;        
    });    

    
    
    //Compteur global de likes
    number.textContent=sum;
    price.textContent=photographerModel.price+" €/jour";

    
    mediaModels.forEach((media) => {
        const medias = document.getElementById("media" + media.order)      

        medias.addEventListener('click', function(){
            updateLightbox(media.order)
        })
    })   
   
    
    // // Tri des medias
    // const selectFilter = document.getElementById('media-filter');
    // selectFilter.addEventListener('change', mediaFilter);
};

async function updateLightbox(order) {
    console.log(order)
    if(order >= 0 && order < mediaModels.length) {

        let lightbox = document.getElementById('lightbox2');
        lightbox.style.display="none";
    
        let containerMedia = document.getElementById('media-container2');
        let containerImg = document.getElementById('img-container2');
        let containerVideo = document.getElementById('video-container2');
        let leftArrow = document.getElementById('l2');
        let rightArrow = document.getElementById('r2');
        let xmark= document.getElementById('xmark2');
        let imgLightbox = document.getElementById('imgLightbox');
        let titreImgLightbox = document.getElementById('titreImgLightbox')
        let videoLightbox = document.getElementById('videoLightbox');
        let titreVideoLightbox = document.getElementById('titreVideoLightbox')
    
        
        const media = mediaModels[order]
        
        
    
        if (media.image != undefined) {
            // img
            containerVideo.style.display="none";
            containerImg.style.display="flex";
            
            imgLightbox.setAttribute("src", media.mediaDirectory + media.image)        
            titreImgLightbox.textContent= media.title;
                    
            
        } else {
            //video
            containerVideo.style.display="flex";
            containerImg.style.display="none"            
            
            videoLightbox.setAttribute('src', media.mediaDirectory + media.video);
            videoLightbox.setAttribute('height', '900px')
            titreVideoLightbox.textContent= media.title;            
            
        } 
          
        
        if(lightbox.style.display=="none"){
            lightbox.style.display="flex";
        } else {
            lightbox.style.display="none"
        }  
    
        leftArrow.onclick =function() {     
            
            updateLightbox(order-1)

        };

        rightArrow.onclick = function() {

            updateLightbox(order+1)
            
        };

         xmark.onclick = function() {
            if(lightbox.style.display=="none"){
                lightbox.style.display="flex";
            } else {
                lightbox.style.display="none"
            }  
         }

    }
   
   
    // la fonction updateLightbox doit recuperer l'objet media qui correspond au parametre order  
    // mediaModels[order];
    // La fonction updateLightbox, a appeler sur le bouton previous/next avec un onclick
    // onclick = appeler la function updateLightbox avec en parametre order
    // icone previous  = order--
    // icone next = order++    
        
};

async function toggleDropDownListItem() {
    
    const dropDownMenu = document.getElementById("dropdown-menu");    

    if(dropDownMenu.style.display="none") {
        dropDownMenu.style.display="block"        
    } 
    else 
    {
        dropDownMenu.style.display="none"
    }

};

async function mediaFilter() {
           
    const mediasSection = document.querySelector(".media");
    const selectFilter = document.getElementById('buttonDropDown');

    console.log(selectFilter.textContent)

    mediasSection.innerHTML='';
    let mediaToDisplay=[];

    if (selectFilter.textContent == 'Date'){
        mediaToDisplay = mediaDate;
       
    } else if (selectFilter.textContent == 'Popularité'){
        mediaToDisplay = mediaPopularity;
       
    } else if (selectFilter.textContent == 'Titre'){
        mediaToDisplay = mediaTitle;
        
    }

    mediaModels = [];
    let order= 0;

    mediaToDisplay.forEach((media) => {
        
        const mediasModel = mediaFactory(media,photographerModel.name,order);        
        const userMediaDOM = mediasModel.getUserMediaDOM();
        mediasSection.appendChild(userMediaDOM);
        mediaModels.push(mediasModel);
        order++;

    });

    mediaModels.forEach((media) => {
        const medias = document.getElementById("media" + media.order)      

        medias.addEventListener('click', function(){
            updateLightbox(media.order)
        })
    })
};

// async function mediaFilter() {
//     const selectFilter = document.getElementById('media-filter');       
//     const mediasSection = document.querySelector(".media");

//     mediasSection.innerHTML='';
//     let mediaToDisplay=[];

//     if (selectFilter.value == 'Date'){
//         mediaToDisplay = mediaDate;
       
//     } else if (selectFilter.value == 'Popularite'){
//         mediaToDisplay = mediaPopularity;
       
//     } else if (selectFilter.value == 'Titre'){
//         mediaToDisplay = mediaTitle;
        
//     }

//     mediaModels = [];
//     let order= 0;

//     mediaToDisplay.forEach((media) => {
        
//         const mediasModel = mediaFactory(media,photographerModel.name,order);        
//         const userMediaDOM = mediasModel.getUserMediaDOM();
//         mediasSection.appendChild(userMediaDOM);
//         mediaModels.push(mediasModel);
//         order++;

//     });

//     mediaModels.forEach((media) => {
//         const medias = document.getElementById("media" + media.order)      

//         medias.addEventListener('click', function(){
//             updateLightbox(media.order)
//         })
//     })

   

// };

async function init() {
    
    const url = new URL(document.location.href);
    const idPhotographer = url.searchParams.get('q');
    const {photographer, media} = await getPhotographer(idPhotographer);
    displayData(photographer, media);
        
    // console.log(photographer);
    // console.log(media);
    
};

init();





