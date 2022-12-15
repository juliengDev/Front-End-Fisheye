function mediaFactory(data) {

    const {date, id, image, likes, portrait,  photographerId, price, title, video} = data;
    const picture = `assets/photographers/${portrait}`


    function getUserCardDom() {

        //Declarer les elements du DOM
        const article = document.createElement( 'article' );





        return (article)
    }
    return { date, id, image, likes, photographerId, price, title, video,getUserCardDom  }
}

