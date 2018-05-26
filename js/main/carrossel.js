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
        this.children = [].slice.call(element.children)
        let root = this.createDivWithClass('carrossel')
        let container = this.createDivWithClass('carrossel-container')
        root.appendChild(container)
        this.element.appendChild(root)
        this.children.forEach(child => {
            container.appendChild(child)
        });
    }

    /**
     * 
     * @param {string} className nome da classe para a div
     * @returns {HTMLElement}
     */
    createDivWithClass(className){
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div
    }
}

document.addEventListener('DOMContentLoaded', function(){
    
    new Carrossel(document.querySelector('#productRecomendation'),{
        slidesToScroll: 3,
        slidesVisible: 3
    })

})
