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
    
    const userCardDOM = photographerModel.getUserCardDOM();
   
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
    let mediaModels = [];
    
    const mediasSection = document.querySelector(".media");    
    mediaPopularity.forEach((media) => {
        const mediasModel = mediaFactory(media,photographerModel.name);               
        const userMediaDOM = mediasModel.getUserMediaDOM();
        mediasSection.appendChild(userMediaDOM);
        mediaModels.push(mediasModel) //2
    });
   
    createLightbox(mediaModels);

    let mediaImg = document.getElementsByClassName('img');
    let mediaVideo = document.getElementsByClassName('video');
    
    
    

    for ( element of mediaImg) {
        
        element.addEventListener('click', toggleLightbox)
    }
    for (element of mediaVideo){
        element.addEventListener('click', toggleLightbox)
    }
    
    // Trie des medias
    const selectFilter = document.getElementById('media-filter');
    selectFilter.addEventListener('change', mediaFilter);

};

async function mediaFilter() {
    const selectFilter = document.getElementById('media-filter');
    
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

async function toggleLightbox(){
    console.log('test');
    let lightbox = document.getElementById('lightbox');   
    
    if(lightbox.style.display=="none"){
        lightbox.style.display="flex";
    } else {
        lightbox.style.display="none"
    }
}


async function createLightbox(medias){
    let lightbox = document.getElementById('lightbox');
    lightbox.innerHTML=`
    <div class="lightbox-container">
        <i id='l' class="fa-sharp fa-solid fa-arrow-left fa-2xl"></i>
        <div id="media-container">
          <div id="video-container"></div>
          <div id="img-container"></div>
        </div>        
        <i id='r' class="fa-sharp fa-solid fa-arrow-right fa-2xl"></i>         
    </div>
    <i class="xmark fa-sharp fa-solid fa-xmark fa-2xl"></i>
      `;        
    lightbox.style.display="none";
    let p=0;
    let nbr = medias.length;
    let containerMedia = document.getElementById('media-container');
    let containerImg = document.getElementById('img-container');
    let containerVideo = document.getElementById('video-container');
    let leftArrow = document.getElementById('l');
    let rightArrow = document.getElementById('r');

    let xmark= document.querySelector('.xmark');
    xmark.addEventListener('click',toggleLightbox)

    


    containerImg.className='img-container';
    containerVideo.className='video-container';
    containerMedia.style.width=(1050*nbr)+"px";
     
    function showHide() {
        if(p==-nbr+1){
            leftArrow.style.visibility="hidden";
        }else{
            leftArrow.style.visibility="visible";
        }

        if(p==0){
            rightArrow.style.visibility="hidden";
        }else{
            rightArrow.style.visibility="visible";
        }
    }
    leftArrow.onclick=function() {
        if(p>-nbr+1) {
            p--;
            console.log('test')
            containerMedia.style.transform="translate("+p*1200+"px)";
            containerMedia.style.transition="all 0.5s ease";
            showHide();

        }        
    }
    rightArrow.onclick=function() {
        if(p<0) {
            p++
            console.log('test2')
            containerMedia.style.transform="translate("+p*1200+"px)";
            containerMedia.style.transition="all 0.5s ease";
            showHide();
        }        
    }

    
   


    medias.forEach((media)=> {
        
        if(media.image != undefined) { 

        let element = document.createElement('div');
        let img = document.createElement('img');
        let titre = document.createElement('p');
        img.setAttribute('src', media.mediaDirectory + media.image);
        element.className="img";
        titre.textContent= media.title;
        titre.className="picture-name";

        containerImg.appendChild(element);
        element.appendChild(img);
        element.appendChild(titre);

        

        } else {
            let element = document.createElement('div');
            let video = document.createElement('video');
            let titre = document.createElement('p');

            element.className="video";
            video.setAttribute('src', media.mediaDirectory + media.video);
            video.setAttribute('height', '900px')
            titre.textContent= media.title;
            titre.className="picture-name";

            containerVideo.appendChild(element);
            element.appendChild(video);
            element.appendChild(titre);


        }
            
    }) 

    

}



async function init() {
    
    const url = new URL(document.location.href);
    const idPhotographer = url.searchParams.get('q');
    const {photographer, media} = await getPhotographer(idPhotographer);
    displayData(photographer, media);
    
    
};

init();





