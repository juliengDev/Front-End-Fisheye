function photographerFactory(data,page) {
   
    const { city,country, id, name, price, tagline, portrait } = data;
    // console.log(data)
    const picture = `assets/photographers/${portrait}`; 
    
    const url = new URL('http://127.0.0.1:5501/photographer.html');
    url.searchParams.set('q', data.id);
    const href = url.href;
        
    
    if(page == "index") {   

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
            a.setAttribute("href", href);
            h2.className = "name";        
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
    } else if(page == 'photographer') {

        function getUserCardDOM() {
            

            const headerPhotographer = document.createElement( 'div' );
            const profil = document.createElement( 'div' );
            const contact = document.createElement( 'div' )
            const img = document.createElement( 'img' )

            
            headerPhotographer.className = "header";            
            profil.className = "profil";
            
            profil.innerHTML = `
            
            <h2 class="name">${name}</h2>
            <p class="city">${city}, ${country}</p>
            <p class="tagline">${tagline}</p>         
            
            `;

            contact.innerHTML = `<button class="contact_button" onclick="displayModal()">Contactez-moi</button>`;
            img.className = "img";
            img.setAttribute("src", picture);





            headerPhotographer.appendChild(profil);
            headerPhotographer.appendChild(contact);
            headerPhotographer.appendChild(img);

            return headerPhotographer
        }
    }   
    
    return { city,country,id, name, picture, price, tagline, getUserCardDOM} // Ne comprends pas la syntaxe : utilisation des {} ?
}









