class Carrossel{

    /**
     * 
     * @param {HTMLDocument} element 
     * @param {Object} option 
     * @param {Object} option.slidesToScroll quantidade de itens por salto
     * @param {Object} option.slidesVisible quantidade de itens visivel
     */

    constructor(element, options = {}){
        this.element = element
        this.option = Object.assign({},{
            slidesToScroll: 1,
            slidesVisible: 1
        }, options)

        let root = document.createElement('div')
        root.setAttribute('class', 'carrossel')
        this.element.appendChild(root)
    }

    
}

document.addEventListener('DOMContentLoaded', function(){
    
    new Carrossel(document.querySelector('#productRecomendation'),{
        slidesToScroll: 3,
        slidesVisible: 3
    })

})
