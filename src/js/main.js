'use strict';
window.app = window.app || {};

(function (app) {
	var ItemList = new app.ItemList([]);

	//Inject the dependency
	app.listItemsRender.initialize(ItemList);
}(window.app));
