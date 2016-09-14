'use strict';
var namespace = window.App.Utils.createNamespace(window, ['App', 'Components', 'ListItems']);

(function (namespace) {

	var Item = function (name, description, price) {
		this.name = name;
		this.description = description || '';
		this.price = price || 0;
		this.rendered = false;
	};

	Item.prototype.isRendered = function () {
		return this.rendered;
	};

	Item.prototype.setRendered = function (rendered) {
		return this.rendered = rendered;
	};

	Item.prototype.equals = function (itemName) {
		return this.name === itemName;
	};

	Item.prototype.getName = function () {
		return this.name;
	};

	Item.prototype.getPrice = function () {
		return this.price;
	};

	Item.prototype.getContent = function () {
		return this.name + ' - $' + this.price;
	};

	Item.prototype.getDescription = function () {
		return this.description;
	};

	namespace.Item = Item;
}(namespace));
