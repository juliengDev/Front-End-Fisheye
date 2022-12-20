function mediaFactory(data,photographerName) {

    const {date,id,image,likes,photographerId,price,title,video} = data;
    const mediaDirectory = `assets/SamplePhotos/${photographerName}/`
    
    

    function getUserMediaDOM() {
        
      let element;


      if(image != undefined) {
        
        element = document.createElement( 'img' );
        element.setAttribute("src", `${mediaDirectory}${image}`)

      } else {
        
        element = document.createElement( 'video' );
        element.setAttribute("src", `${mediaDirectory}${video}`)
      }     
          
      return element;       
    }

        
    
    return{id,date,image,likes,photographerId,price,title,video, getUserMediaDOM}
}

