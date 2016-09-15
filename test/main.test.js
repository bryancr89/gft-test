'use strict';

describe('Main.js', function() {
	beforeEach(function() {
		spyOn(window.App.Components.ListItems.ListRender, 'initialize');
	});

	it('should bootstrap the app', function() {
		spyOn(window.App.Utils, 'getAll');
		window.App.initialize();

		expect(window.App.Utils.getAll).toHaveBeenCalledWith({
			categories: '/services/categories/categories.json',
			products: '/services/products/products.json'
		}, jasmine.any(Function));
	});

	it('should render the list', function () {
		spyOn(window.App.Components.ListItems, 'List');
		spyOn(window.App.Utils, 'getAll').and.callFake(function (data, cb) {
			cb({});
		});
		window.App.initialize();

		expect(window.App.Components.ListItems.ListRender.initialize).toHaveBeenCalled();
	});
});