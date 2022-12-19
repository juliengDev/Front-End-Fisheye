class Photographer {
    constructor(data) {
        this.city = data.city;
        this.id = data.id;
        this.country = data.country;
        this.name = data.name;
        this.picture = data.picture;
        this.price = data.price;
        this.tagline = data.tagline;
        this.medias = new Array()
    }

    addMedia(media) {
        this.medias.push(media)
    }    
}

class Media {
    constructor(data){
        this.date = data.date;
        this.id = data.id;
        this.likes = data.likes;
        this.price =data.price;
        this.title = data.title;
        
    }

}
class Picture extends Media {
    constructor(data){
        super(data)
        this.image = image;
        
    }
}

class Video extends Media {
    constructor(data){
        super(data)
        this.video = video;
        
    }
}

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
        // console.log(photographers)
        const medias = data.media;
        // console.log(medias)
        
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

    
        return {photographer: user, media : userMedia}
    }
};  


// async function displayData(photographers) {
//     const photographersSection = document.querySelector(".photograph-header");
    

//     photographers.forEach((photographer) => {
//         const photographerModel = photographerFactory(photographer);
        
//         console.log(photographerModel) 
//     })
// }

async function init() {

    const url = new URL(document.location.href);
    const idPhotographer = url.searchParams.get('q');
    const {photographer, media} = await getPhotographer(idPhotographer);
    console.log(media)
    console.log(photographer)
    
    
    
    
    
    
  
    // const mimi = new Photographer("London",243, "UK","Mimi Keel","MimiKeel.jpg", 400, "Voir le beau dans le quotidien")
    // console.log(mimi)
    // const picture1 = new Picture("2011-12-08",342550,62,55,"Fashion_Yellow_Beach","Fashion_Yellow_Beach.jpg")
    // mimi.addMedia(picture1);
    // console.log(picture1)

}
init();