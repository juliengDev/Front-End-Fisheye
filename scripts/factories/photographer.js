function photographerFactory(data) {

    const { city, name, price, tagline, portrait } = data; 
    const picture = `assets/photographers/${portrait}`; 
   
      

    function getUserCardDOM() {
        
        // Declarer les elements du DOM
        const article = document.createElement( 'article' ); 
        const img = document.createElement( 'img' );
        const h2 = document.createElement( 'h2' ); 
        const cityElement = document.createElement( 'div' );
        const taglineElement = document.createElement( 'div' );
        const priceElement = document.createElement( 'div' );

        
        // Modifier les elements du DOM
        img.setAttribute("src", picture);
        img.style.borderRadius = "50%";
        h2.textContent = name;       
        cityElement.className = "city";
        cityElement.textContent = city;
        taglineElement.className = "tagline";
        taglineElement.textContent = tagline;
        priceElement.className = "price";
        priceElement.textContent = `${price}€/jour` ;
        

        // Ajouter les elements au DOM
        article.appendChild(img);
        article.appendChild(h2); 
        article.appendChild(cityElement);
        article.appendChild(taglineElement);
        article.appendChild(priceElement);
        
        return (article); // Retourne le contenu de la variable article a l'appel de la fonction - Pourquoi entre parenthese ?? syntaxe ??

    }
    return { city, name, picture, price, tagline, getUserCardDOM } // Ne comprends pas la syntaxe : utilisation des {} ?
}


// La balise article est une zone focusable contentant le h2 et l'image
// L'image est dans le le lien avec le text alternatif vide 




// Cree l element du DOM (balise div ou autre) 
// Exemple let div = document.createElement('div')

// Modifier l element avec une methode innerHTML.
// Exemple : div.innerHTML = `
//     <p>text</p>
//     <div>
//         <ul>
//             <li>banane</li>
//             <li>chocolat</li>
//             <li></li>
//         </ul>
//     </div>
// `
// Ajouter l'element dans HTML
// Exemple : article.appendChild(div)