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
        this.currentItem = 0;
        this.root = this.createDivWithClass('carrossel');
        this.container = this.createDivWithClass('carrossel-container');
        this.root.appendChild(this.container);
        this.element.appendChild(this.root);
        this.itens = children.map(function (child) {
            var item = _this.createDivWithClass('carrossel-item');
            item.appendChild(child);
            _this.container.appendChild(item);
            return item;
        });
        this.setStyle();
        this.createNavigation();
    }

    /**
     * Aplica os tamanhos para os itens do carrossel
     */


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
    }, {
        key: 'createNavigation',
        value: function createNavigation() {
            var nextButton = this.createDivWithClass('carrossel-next');
            var prevButton = this.createDivWithClass('carrossel-prev');
            this.root.appendChild(nextButton);
            this.root.appendChild(prevButton);
            nextButton.addEventListener('click', this.next.bind(this));
            prevButton.addEventListener('click', this.prev.bind(this));
        }
    }, {
        key: 'next',
        value: function next() {
            this.goToItem(this.currentItem + this.options.slidesToScroll);
        }
    }, {
        key: 'prev',
        value: function prev() {
            this.goToItem(this.currentItem - this.options.slidesToScroll);
        }

        /**
         * Define o proximo salto do carrossel
         * @param {number} index 
         */

    }, {
        key: 'goToItem',
        value: function goToItem(index) {
            if (index < 0) {
                index = this.itens.length - this.options.slidesVisible;
            } else if (index >= this.itens.length || this.itens[this.currentItem + this.options.slidesVisible] === undefined) {
                index = 0;
            }
            var translateX = index * -100 / this.itens.length;
            this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)';
            this.currentItem = index;
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