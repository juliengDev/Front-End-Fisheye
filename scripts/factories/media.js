function mediaFactory(data) {

    const {date,id,image,likes,photographerId,price,title} = data;


    
   
    function getUserMediaDOM() {
        
            //Cree les elements
          const section = document.createElement( 'section' );
          const divContainer = document.createElement( 'div' );

          divContainer.textContent = "test";

          section.appendChild(divContainer)

          return section
    }

     

    return{date,id,image,likes,photographerId,price,title, getUserMediaDOM }
}





































// class Photographer {
//     constructor(data) {
//         this.city = data.city;
//         this.id = data.id;
//         this.country = data.country;
//         this.name = data.name;
//         this.picture = data.picture;
//         this.price = data.price;
//         this.tagline = data.tagline;
//         this.medias = new Array()
//     }

//     addMedia(media) {
//         this.medias.push(media)
//     }    
// }

// class Media {
//     constructor(data){
//         this.date = data.date;
//         this.id = data.id;
//         this.likes = data.likes;
//         this.price =data.price;
//         this.title = data.title;
        
//     }

// }
// class Picture extends Media {
//     constructor(data){
//         super(data)
//         this.image = image;
        
//     }
// }

// class Video extends Media {
//     constructor(data){
//         super(data)
//         this.video = video;
        
//     }
// }