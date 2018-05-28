window.onload = function () {

	const url = "http://localhost:3000/json/products.json";
	fetch(url)
		.then(response => response.json()) // retorna uma promise
		.then(result => {
			let JSONImage = '//www.itelios.com.br/arquivos/imagens'
			let nemUrlImg = './img'
			console.log(result[0].data);
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

