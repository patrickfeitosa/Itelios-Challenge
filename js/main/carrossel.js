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
        this.options = Object.assign({},{
            slidesToScroll: 1,
            slidesVisible: 1
        }, options)
        let children = [].slice.call(element.children)
        let root = this.createDivWithClass('carrossel')
        this.container = this.createDivWithClass('carrossel-container')
        root.appendChild(this.container)
        this.element.appendChild(root)
        this.itens = children.map(child => {
            let item = this.createDivWithClass('carrossel-item')
            item.appendChild(child)
            this.container.appendChild(item)
            return item
        });
        this.setStyle()
    }

    setStyle(){
        let ratio = this.itens.length / this.options.slidesVisible
        this.container.style.width = (ratio * 100) + "%"
        this.itens.forEach(item => item.style.width = ((100/this.options.slidesVisible) / ratio) + "%");
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
        slidesVisible: 3
    })

})
