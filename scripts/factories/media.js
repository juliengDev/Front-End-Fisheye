function mediaFactory(data) {

    const {date, id, image, likes, portrait,  photographerId, price, title, video} = data;
    const picture = `assets/photographers/${portrait}`
    console.log(data)
    class Image {
        constructor() {

        }
    
    }  
    
   
    

    
    return { date, id, image, likes, photographerId, price, title, video,getUserCardDom  }
}

