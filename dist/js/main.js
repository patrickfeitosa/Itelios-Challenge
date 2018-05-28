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
    const url = "http://localhost:3000/json/products.json";
	fetch(url)
		.then(response => response.json()) // retorna uma promise
		.then(result => {

			//Declaração das variáveis
			let JSONImage = '//www.itelios.com.br/arquivos/imagens'
			let newUrlImg = './img'
			let htmlProduct = ''
			let htmlRecommendation = ''
			let product = result[0].data.item
			let indexStartPrice = product.productInfo.paymentConditions.indexOf('é') + 1
			let indexFinishPrice = product.productInfo.paymentConditions.indexOf(',') + 2

			//Percorrendo os Arrays retornados do JSON
			htmlProduct = 
			'<img src="' + product.imageName.replace(JSONImage, newUrlImg) + '" alt="' + product.name + '" class="product-img">'+
			'<p class="info-product">' + product.name + '</p>' +
			'<p class="product-install">'+				
				'Por: <span class="product-price">'+ product.price +'</span>' +
				'<br>'+
				'ou <span class="product-price-install">'+ product.productInfo.paymentConditions.substring(indexStartPrice, indexFinishPrice) +'</span> sem juros' +
			'</p>'

			let productContainer = document.querySelector('#currentProduct')
			productContainer.innerHTML = htmlProduct

			let recommendation = result[0].data.recommendation
			recommendation.forEach(item => {
				let indexStartPrice = item.productInfo.paymentConditions.indexOf('é') + 1
				let indexFinishPrice = item.productInfo.paymentConditions.indexOf(',') + 2

				htmlRecommendation +=
				'<div class="product-content no-gutter">' +
					'<img src="' + item.imageName.replace(JSONImage, newUrlImg) + '" alt="' + item.name + '" class="product-img">'+
					'<p class="info-product">' + item.name + '</p>' +
					'<p class="product-install">'+				
						'Por: <span class="product-price">'+ item.price +'</span>' +
						'<br>'+
						'ou <span class="product-price-install">'+ item.productInfo.paymentConditions.substring(indexStartPrice, indexFinishPrice) +'</span> sem juros' +
					'</p>'+
					'<a href="#" class="grid-12 button-cart no-gutter">'+
						'adicionar ao carrinho <i class="material-icons md-icon-18">add_shopping_cart</i>'+
					'</a>'+
				'</div>'
			});

			let recommendationContainer = document.querySelector('#productRecomendation')
            recommendationContainer.innerHTML = htmlRecommendation
            
            
            new Carrossel(document.querySelector('#productRecomendation'),{
                slidesVisible: 3,
                slidesToScroll: 2
            })
		})
		.catch(err => {
			// trata se alguma das promises falhar
			console.error('Failed retrieving information', err);
		});
}

if(document.readyState !== 'loading'){
    onReady()
} 

document.addEventListener('DOMContentLoaded', onReady )

	
