class Carrossel{

    /**
     * 
     * @param {HTMLDocument} element 
     * @param {Object} option 
     * @param {Object} option.slidesToScroll quantidade de itens por salto
     * @param {Object} option.slidesVisible quantidade de itens visivel
     */
    constructor(element, option = {}){

    }
}

document.addEventListener('DOMContentLoaded', function(){
    
    new Carrossel(document.querySelector('#productRecomendation'),{
        slidesToScroll: 3,
        slidesVisible: 3
    })

})
