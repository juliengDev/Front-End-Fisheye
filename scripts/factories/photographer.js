/**
 * Plusieurs roles :
 * 1 - Stocker un objet contenant les proprietes des photographes dans une variable data
 * 2 - Recuperer la photo de profil du photographe dans les assets
 * 3 - Ajouter l'id du photographe dans l'url de la page photographer pour assurer la redirection du profil
 * 4 - Retourner la balise article a la condition d'etre sur la page d'acceuil
 * 5 - Retourner la balise div a la condition d'etre sur la page photographe
 *  
 * @param {*} data - Contient les donnees du photographe
 * @param {*} page - Contient la string "index" ou "photographer"
 * 
 * @return { Object } data
 * @return { <String> } data.name
 * @return { <Number> } data.id
 * @return { <String> } data.city
 * @return { <String> } data.country
 * @return { <String> } data.tagline
 * @return { <Number> } data.price
 * @return { <String> } data.portrait
 * @return { Function } getUserCardDOM
 */


function photographerFactory(data,page) {
   
    const { city,country, id, name, price, tagline, portrait } = data;
    // console.log(data)
    const picture = `assets/photographers/${portrait}`; 
    
    const url = new URL('http://127.0.0.1:5501/photographer.html');
    url.searchParams.set('q', data.id);
    const href = url.href; // contient l'url complete avec l'id photographer
        
    
    if(page == "index") {   

        /**
         * Retourne une balise article contenant les elements HTML a afficher sur la page accueil
         * @return { article }
         */

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
            
            return article
             

        }
    } else if(page == "photographer") {

         /**
         * Retourne une balise div contenant les elements HTML a afficher sur la page photographe
         * @return { headerPhotographer }
         */

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

        
        
        
        function getDropdown() {
            
            let sortMedia = document.createElement('div');
            let labelButton = document.createElement('p');
            let buttonSort = document.createElement('button');
            let buttonText = document.createElement('p');
            let mediaMenu = document.createElement('div');
            let mediaNav = document.createElement('ul');
            let iChevronUp = document.createElement('i');
            let iChevronDown = document.createElement('i');

            sortMedia.className="sort-media"
            labelButton.textContent ='Trier par';
            buttonSort.className = 'header-media-dropdown';
            buttonText.textContent = 'Popularité';
            iChevronUp.className = 'fa-solid fa-chevron-up';
            iChevronUp.style.display = 'none';
            iChevronUp.style.paddingLeft= '20px'
            iChevronDown.className = 'fa-solid fa-chevron-down'
            iChevronDown.style.display= 'block';
            iChevronDown.style.paddingLeft= '20px'
            mediaMenu.className = 'dropdown';
            mediaMenu.style.display= 'none';
            mediaNav.innerHTML = `
            <li>Popularité</li>
            <span class="line"></span>
            <li>Date</li>
            <span class="line"></span>
            <li>Titre</li>
            `;

            
            sortMedia.appendChild(labelButton);
            sortMedia.appendChild(buttonSort);
            buttonSort.appendChild(buttonText)
            buttonSort.appendChild(mediaMenu)
            mediaMenu.appendChild(mediaNav);
            buttonSort.appendChild(iChevronDown);
            buttonSort.appendChild(iChevronUp);



            
            let dropdownMediaMenu;

            function toggleNavbarDown(){

                dropdownMediaMenu = document.querySelector('.header-media-dropdown .dropdown')

                if (dropdownMediaMenu.getAttribute('style') === 'display: none;') 
                    
                    {
                    buttonText.textContent='';
                    iChevronDown.style.display= 'none';
                    iChevronUp.style.display='block';        
                    iChevronUp.className='fa-solid fa-chevron-up chevron-up';                            
                    dropdownMediaMenu.style.display='block';
                    dropdownMediaMenu.setAttribute('aria-expanded', 'true');
                    
                    // buttonSort.style.height='150px';
                    // buttonSort.style.top ='50px'
                    // mediaMenu.style.bottom='80px'

                } else {        

                    
                    dropdownMediaMenu.style.display='none';
                    dropdownMediaMenu.setAttribute('aria-expanded', 'false');
                }
            }

            function toggleNavbarUp(){

                if (dropdownMediaMenu.getAttribute('style') === 'display: block;') 
                    
                    {       
                    buttonText.textContent='Popularité';
                    iChevronDown.style.display= 'block';                    
                    iChevronUp.className='fa-solid fa-chevron-up chevron-up';     
                    iChevronUp.style.display='none';    
                    dropdownMediaMenu.style.display='none';
                    dropdownMediaMenu.setAttribute('aria-expanded', 'false');

                } else {        
                    
                    dropdownMediaMenu.style.display='block';
                    dropdownMediaMenu.setAttribute('aria-expanded', 'true');
                }
            }

            iChevronDown.addEventListener('click', function(e) {
                e.preventDefault();
                toggleNavbarDown();
            })

            iChevronUp.addEventListener('click', function(e) {
                e.preventDefault();
                toggleNavbarUp();
                
            })
            
            return sortMedia
        }
    }   
    
    return { city,country,id, name, picture, price, tagline, getUserCardDOM, getDropdown } // Ne comprends pas la syntaxe : utilisation des {} ?
}




