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
        this.currentItem = 0
        this.root = this.createDivWithClass('carrossel')
        this.container = this.createDivWithClass('carrossel-container')
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)
        this.itens = children.map(child => {
            let item = this.createDivWithClass('carrossel-item')
            item.appendChild(child)
            this.container.appendChild(item)
            return item
        });
        this.setStyle()
        this.createNavigation()
    }

    /**
     * Aplica os tamanhos para os itens do carrossel
     */
    setStyle(){
        let ratio = this.itens.length / this.options.slidesVisible
        this.container.style.width = (ratio * 100) + "%"
        this.itens.forEach(item => item.style.width = ((100/this.options.slidesVisible) / ratio) + "%");
    }

    createNavigation(){
        let nextButton = this.createDivWithClass('carrossel-next')
        let prevButton = this.createDivWithClass('carrossel-prev')
        this.root.appendChild(nextButton)
        this.root.appendChild(prevButton)
        nextButton.addEventListener('click', this.next.bind(this))
        prevButton.addEventListener('click', this.prev.bind(this))
    }


    next(){
        this.goToItem(this.currentItem + this.options.slidesToScroll)
    }

    prev(){
        this.goToItem(this.currentItem - this.options.slidesToScroll)
    }

    /**
     * Define o proximo salto do carrossel
     * @param {number} index 
     */
    goToItem(index){
        if(index < 0){
            index = this.itens.length - this.options.slidesVisible
        }else if(index >= this.itens.length || this.itens[this.currentItem + this.options.slidesVisible] === undefined){
            index = 0
        }
        let translateX = index * -100 / this.itens.length
        this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)'
        this.currentItem = index
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
