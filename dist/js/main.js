'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Carrossel = function () {

    /**
     * 
     * @param {HTMLDocument} element 
     * @param {Object} option 
     * @param {Object} option.slidesToScroll quantidade de itens por salto
     * @param {Object} option.slidesVisible quantidade de itens visivel
     */

    function Carrossel(element) {
        var _this = this;

        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, Carrossel);

        this.element = element;
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1
        }, options);
        var children = [].slice.call(element.children);
        var root = this.createDivWithClass('carrossel');
        this.container = this.createDivWithClass('carrossel-container');
        root.appendChild(this.container);
        this.element.appendChild(root);
        this.itens = children.map(function (child) {
            var item = _this.createDivWithClass('carrossel-item');
            item.appendChild(child);
            _this.container.appendChild(item);
            return item;
        });
        this.setStyle();
    }

    _createClass(Carrossel, [{
        key: 'setStyle',
        value: function setStyle() {
            var _this2 = this;

            var ratio = this.itens.length / this.options.slidesVisible;
            this.container.style.width = ratio * 100 + "%";
            this.itens.forEach(function (item) {
                return item.style.width = 100 / _this2.options.slidesVisible / ratio + "%";
            });
        }

        /**
         * 
         * @param {string} className nome da classe para a div
         * @returns {HTMLElement}
         */

    }, {
        key: 'createDivWithClass',
        value: function createDivWithClass(className) {
            var div = document.createElement('div');
            div.setAttribute('class', className);
            return div;
        }
    }]);

    return Carrossel;
}();

document.addEventListener('DOMContentLoaded', function () {

    new Carrossel(document.querySelector('#productRecomendation'), {
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