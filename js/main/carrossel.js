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
     * @param {boolean} [options.pagination=false] controle de paginação do carrossel
     * @param {boolean} [options.navigation=true] controle de navegação do carrossel
     */

    constructor(element, options = {}){
        this.element = element
        this.options = Object.assign({},{
            slidesToScroll: 1,
            slidesVisible: 1,
            loop: false,
            pagination: false,
            navigation: true
        }, options)
        let children = [].slice.call(element.children)
        this.isMobile = false
        this.currentItem = 0
        this.moveCallback = []

        //Modificação da DOM
        this.root = this.createDivWithClass('carrossel')
        this.container = this.createDivWithClass('carrossel-container')
        this.root.setAttribute('tabindex', '0')
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)
        this.itens = children.map(child => {
            let item = this.createDivWithClass('carrossel-item')
            item.appendChild(child)
            this.container.appendChild(item)
            return item
        });
        this.setStyle()
        if(this.options.navigation){
            this.createNavigation()
        }

        if(this.options.pagination){
            this.createPagination()
        }

        this.createPagination()
        //Eventos
        this.moveCallback.forEach(cb => cb(0))
        this.onWindowResize()
        window.addEventListener('resize', this.onWindowResize.bind(this))
        this.root.addEventListener('keyup', e =>{
            if(e.key === 'ArrowRight' || e.key === 'Right'){
                this.next()
            } else if (e.key === 'ArrowLeft' || e.key === 'Left'){
                this.prev()
            }
        })
    }

    /**
     * Aplica os tamanhos para os itens do carrossel
     */
    setStyle(){
        let ratio = this.itens.length / this.slidesVisible
        this.container.style.width = (ratio * 100) + "%"
        this.itens.forEach(item => item.style.width = ((100/this.slidesVisible) / ratio) + "%")
    }


    //Criação da navegação na DOM
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

    //Criação da paginação na DOM
    createPagination(){
        let pagination = this.createDivWithClass('grid-9')
        pagination.classList.add('offset-3')
        pagination.classList.add('carrossel-pagination')
        let buttons = []
        this.element.appendChild(pagination)

        for(let i = 0; i < this.itens.length; i = i + this.slidesToScroll){
            let button = this.createDivWithClass('carrossel-pagination-button')
            button.addEventListener('click', () => this.goToItem(i))
            pagination.appendChild(button)
            buttons.push(button)
        }

        this.onMove(index =>{
            let activeButton =  buttons[Math.floor(index / this.slidesToScroll)]
            if(activeButton){
                buttons.forEach(button => button.classList.remove('carrossel-pagination-button-active'))
                activeButton.classList.add('carrossel-pagination-button-active')
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
            if(this.options.loop){
                index = this.itens.length - this.slidesVisible
            } else {
                return
            }
        }else if(index >= this.itens.length || (this.itens[this.currentItem + this.slidesVisible] === undefined && index > this.currentItem )){
            if(this.options.loop){
                index = 0
            } else {
                return
            }
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

let onReady = function(){    
    new Carrossel(document.querySelector('#productRecomendation'),{
        slidesVisible: 3,
        slidesToScroll: 2
    })
}

if(document.readyState !== 'loading'){
    onReady()
}

document.addEventListener('DOMContentLoaded', onReady )
