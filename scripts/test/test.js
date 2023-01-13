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
    <li class="popularity">Popularité</li>
    <span class="line"></span>
    <li class="date">Date</li>
    <span class="line"></span>
    <li class="title">Titre</li>
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


 // Partie Tri
 const mediaDropdown = document.querySelector(".media-dropdown");
 const userDropdown = photographerModel.getDropdown();
 mediaDropdown.appendChild(userDropdown);