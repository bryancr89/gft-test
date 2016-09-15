'use strict';
window.App = window.App || {};

(function (App) {
	function initializeApp(data) {
		var listComponent = App.Components.ListItems;

		var List = new listComponent.List({
			items: [],
			categories: data.categories,
			products: data.products || []
		});

		//Inject the dependency
		listComponent.ListRender.initialize(List);
	}

	App.initialize = function () {
		App.Utils.getAll({
			categories: '/services/categories/categories.json',
			products: '/services/products/products.json'
		}, initializeApp);
	};
}(window.App));
