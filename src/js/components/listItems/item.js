'use strict';
var namespace = window.App.Utils.createNamespace(window, ['App', 'Components', 'ListItems']);

(function (namespace) {

	var Item = function (name) {
		this.name = name;
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

	Item.prototype.getContent = function () {
		return this.name;
	};

	namespace.Item = Item;
}(namespace));
