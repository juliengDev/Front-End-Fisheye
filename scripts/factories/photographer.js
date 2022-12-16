class Photographer {
    constructor(city,id, country, name, picture, price, tagline) {
        this.city = city;
        this.id = id;
        this.country = country;
        this.name = name;
        this.picture = picture;
        this.price = price;
        this.tagline = tagline;
        this.medias = new Array()
    }

    addMedia(media) {
        this.medias.push(media)
    }    
}

class Media {
    constructor(date,id,likes,price,title){
        this.date = date;
        this.id = id;
        this.likes = likes;
        this.price = price;
        this.title = title;
        
    }

}
class Picture extends Media {
    constructor(date,id,likes,price,title, image){
        super(date,id,likes,price,title)
        this.image = image;
        
    }
}

class Video extends Media {
    constructor(date,id,likes,price,title,video){
        super(date,id,likes,price,title)
        this.video = video;
        
    }
}




function photographerFactory(data) {

    
    
    const { city, id, name, price, tagline, portrait } = data;
    // console.log(data)
    const picture = `assets/photographers/${portrait}`; 
    
    


    const url = new URL('http://127.0.0.1:5501/photographer.html');
    url.searchParams.set('q', data.id);
    const href = url.href;
        
    
    

    function getUserCardDOM() {
        
        // Declarer les elements du DOM
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        const a = document.createElement('a');
        const h2 = document.createElement( 'h2' ); 
        const cityElement = document.createElement( 'div' );
        const taglineElement = document.createElement( 'div' );
        const priceElement = document.createElement( 'div' );

        
        // Modifier les elements du DOM
        img.className = "img"
        img.setAttribute("src", picture);
        a.setAttribute("href", href)
        h2.className = "name"        
        h2.textContent = name;              
        cityElement.className = "city";
        cityElement.textContent = city;
        taglineElement.className = "tagline";
        taglineElement.textContent = tagline;
        priceElement.className = "price";
        priceElement.textContent = `${price}€/jour`;
        

        // Ajouter les elements au DOM
        article.appendChild(img);
        article.appendChild(a);
        a.appendChild(h2);        
        article.appendChild(cityElement);
        article.appendChild(taglineElement);
        article.appendChild(priceElement);
        
        return article; 

    }

    function getHeader() {
        const headerPhotographer = document.createElement( 'div' );

        headerPhotographer.innerHTML = `
        
          <h2 class="name"></h2>
          <p class="city"></p>
          <p class="tagline"></p>
        
        `;


        return(headerPhotographer)
    }

    
    
    return { city,id, name, picture, price, tagline, getUserCardDOM, getHeader } // Ne comprends pas la syntaxe : utilisation des {} ?
}


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
        // console.log(photographers)
        const medias = data.media;
        // console.log(medias)
        
    
    
    return {photographers: [...photographers], medias: [...medias]}
    }
};   

async function init() {

    const {photographers, medias} = await getPhotographers();
    const url = new URL(document.location.href);
    const idPhotographer = url.searchParams.get('q');
    
  
    // const mimi = new Photographer("London",243, "UK","Mimi Keel","MimiKeel.jpg", 400, "Voir le beau dans le quotidien")
    // console.log(mimi)
    // const picture1 = new Picture("2011-12-08",342550,62,55,"Fashion_Yellow_Beach","Fashion_Yellow_Beach.jpg")
    // mimi.addMedia(picture1);
    // console.log(picture1)

}
init();









