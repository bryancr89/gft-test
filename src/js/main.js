'use strict';
window.App = window.App || {};

(function (App) {
	var listComponent = App.Components.ListItems;
	var List = new listComponent.List([]);

	//Inject the dependency
	listComponent.ListRender.initialize(List);
}(window.App));
