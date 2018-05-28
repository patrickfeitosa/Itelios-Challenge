window.onload = function () {

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
			
			console.log(indexStartPrice)

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
				console.log(item)
			});
		})
		.catch(err => {
			// trata se alguma das promises falhar
			console.error('Failed retrieving information', err);
		});
}

