'use strict';
window.app = window.app || {};

(function (app) {

	var Item = function (name) {
		this.name = name;
	};

	Item.prototype.getContent = function () {
		return this.name;
	};

	app.Item = Item;
}(window.app));
