'use strict';
window.app = window.app || {};

(function (app) {
	var ItemList = function (items) {
		this.items = items;
	};

	ItemList.prototype.addItem = function (item) {
		var newItem = new app.Item(item);

		this.items.push(newItem);
	};

	ItemList.prototype.removeItem = function (item) {
		//TODO:
	};

	ItemList.prototype.getItems = function () {
		return this.items;
	};

	app.ItemList = ItemList;
}(window.app));
