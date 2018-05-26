class Carrossel{


    /**
     * @callback moveCallback
     * @param {number} index
     * 
     */

    /**
     * 
     * @param {HTMLDocument} element 
     * @param {Object} options
     * @param {Object} [options.slidesToScroll=1] quantidade de itens por salto
     * @param {Object} [options.slidesVisible=1] quantidade de itens visivel
     * @param {boolean} [options.loop=false] permitir o loop do carrossel
     */

    constructor(element, options = {}){
        this.element = element
        this.options = Object.assign({},{
            slidesToScroll: 1,
            slidesVisible: 1,
            loop: false
        }, options)
        let children = [].slice.call(element.children)
        this.isMobile = true
        this.currentItem = 0
        this.root = this.createDivWithClass('carrossel')
        this.container = this.createDivWithClass('carrossel-container')
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)
        this.moveCallback = []
        this.itens = children.map(child => {
            let item = this.createDivWithClass('carrossel-item')
            item.appendChild(child)
            this.container.appendChild(item)
            return item
        });
        this.setStyle()
        this.createNavigation()
        this.moveCallback.forEach(cb => cb(0))
        this.onWindowResize()
        window.addEventListener('resize', this.onWindowResize.bind(this))
    }

    /**
     * Aplica os tamanhos para os itens do carrossel
     */
    setStyle(){
        let ratio = this.itens.length / this.slidesVisible
        this.container.style.width = (ratio * 100) + "%"
        this.itens.forEach(item => item.style.width = ((100/this.slidesVisible) / ratio) + "%");
    }

    createNavigation(){
        let nextButton = this.createDivWithClass('carrossel-next')
        let prevButton = this.createDivWithClass('carrossel-prev')
        this.root.appendChild(nextButton)
        this.root.appendChild(prevButton)
        nextButton.addEventListener('click', this.next.bind(this))
        prevButton.addEventListener('click', this.prev.bind(this))
        if(this.options.loop === true){
            return
        }
        this.onMove(index =>{
            if(index === 0 ){
                prevButton.classList.add('carrossel-prev-hidden')
            } else {
                prevButton.classList.remove('carrossel-prev-hidden')
            }

            if(this.itens[this.currentItem + this.slidesVisible] === undefined ){
                nextButton.classList.add('carrossel-next-hidden')
            } else {
                nextButton.classList.remove('carrossel-next-hidden')
            }
        })
    }


    next(){
        this.goToItem(this.currentItem + this.slidesToScroll)
    }

    prev(){
        this.goToItem(this.currentItem - this.slidesToScroll)
    }

    /**
     * Define o proximo salto do carrossel
     * @param {number} index 
     */
    goToItem(index){
        if(index < 0){
            index = this.itens.length - this.options.slidesVisible
        }else if(index >= this.itens.length || (this.itens[this.currentItem + this.options.slidesVisible] === undefined && index > this.currentItem )){
            index = 0
        }
        let translateX = index * -100 / this.itens.length
        this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)'
        this.currentItem = index
        this.moveCallback.forEach(cb => cb(index))
    }

    /**
     * 
     * @param {moveCallback} cb 
     */
    onMove(cb){
        this.moveCallback.push(cb)
    }


    onWindowResize(){
        let mobile = window.innerWidth < 1199
        if(mobile !== this.isMobile){
            this.isMobile = mobile
            this.setStyle()
            this.moveCallback.forEach(cb => cb(this.currentItem))
        }
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


    /**
     * @returns {number} 
     */
    get slidesToScroll(){
        return this.isMobile ? 1 : this.options.slidesToScroll
    }


    /**
     * @returns {number} 
     */
    get slidesVisible(){
        return this.isMobile ? 1 : this.options.slidesVisible
    }
}

document.addEventListener('DOMContentLoaded', function(){
    
    new Carrossel(document.querySelector('#productRecomendation'),{
        slidesVisible: 3,
        slidesToScroll: 1
    })

})
