async function getPhotographer() {

    
    const url = '/data/photographers.json';
    const requete = await fetch(url, {
        method: 'GET'
    });

    if (!requete.ok){
        alert('Un probleme est survenu. Veuillez recharger la page ulterieurement')
    }else{
        let data = await requete.json();
        console.log(data);
        const photographers = data.photographers;
        console.log(photographers)
        const medias = data.media;
        console.log(medias)
        
    
    
    return {photographers: [...photographers], medias: [...medias]}
    }
}; 