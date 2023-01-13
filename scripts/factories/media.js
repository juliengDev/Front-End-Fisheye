function mediaFactory(data,photographerName) {

    const {date,id,image,likes,photographerId,price,title,video} = data;
    const mediaDirectory = `assets/SamplePhotos/${photographerName}/`
    
    

    function getUserMediaDOM() {
        
      let element;


      if(image != undefined) {
        
        // Declarer les elements du DOM
        element = document.createElement( 'div' )
        element.className= "img";
        element.addEventListener('click', function(){     
          let lightbox = document.getElementById('lightbox');
          console.log(lightbox)
        })

        let imgModel = document.createElement( 'img' );
        let legende = document.createElement( 'div' );

        // Modifier les elements du DOM
        imgModel.setAttribute("src", `${mediaDirectory}${image}`);
        imgModel.className = "box";
        imgModel.style.cursor="pointer";
        legende.className = "legend";
        legende.innerHTML = `
        <p>${title}</p>
        <div>${likes}</div>
        <i class="fa-solid fa-heart"></i>        
        `;

        // Ajouter les elements au DOM
        element.appendChild(imgModel);
        element.appendChild(legende);


      } else {
        
        // Declarer les elements du DOM
        element = document.createElement( 'div' );
        element.addEventListener('click', function(){     
          let lightbox = document.getElementById('lightbox');
          console.log(lightbox)
        })

        let videoModel = document.createElement( 'video' );
        let legende = document.createElement( 'div' );

        // Modifier les elements du DOM
        videoModel.setAttribute("src", `${mediaDirectory}${video}`)
        videoModel.className = "box";
        videoModel.style.cursor="pointer"
        legende.className = "legend"
        legende.innerHTML = `
        <p>${title}</p>
        <div>${likes}</div>
        <i class="fa-solid fa-heart"></i>        
        `;

        // Ajouter les elements au DOM
        element.appendChild(videoModel);
        element.appendChild(legende);


      }     
          
      return element;       
    }

        
    
    return{id,date,image,likes,photographerId,price,title,video, getUserMediaDOM}
}

