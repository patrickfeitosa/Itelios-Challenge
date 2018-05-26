'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Carrossel =

/**
 * 
 * @param {HTMLDocument} element 
 * @param {Object} option 
 * @param {Object} option.slidesToScroll quantidade de itens por salto
 * @param {Object} option.slidesVisible quantidade de itens visivel
 */

function Carrossel(element) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Carrossel);

    this.element = element;
    this.option = Object.assign({}, {
        slidesToScroll: 1,
        slidesVisible: 1
    }, options);

    var root = document.createElement('div');
    root.setAttribute('class', 'carrossel');
    this.element.appendChild(root);
};

document.addEventListener('DOMContentLoaded', function () {

    new Carrossel(document.querySelector('#productRecomendation'), {
        slidesToScroll: 3,
        slidesVisible: 3
    });
});

window.onload = function () {
    var request = new XMLHttpRequest();
    var url = "http://localhost:3000/json/products.json";

    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            console.log(response[0].data);
        }
    };
    request.open("GET", url, true);
    request.send();
};