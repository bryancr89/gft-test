'use strict';

describe('Components/listItems/listRender.js', function () {
	var listRender;
	var list;

	beforeEach(function () {
		listRender = window.App.Components.ListItems.ListRender;
		list = {
			getCategories: jasmine.createSpy().and.returnValue([]),
			getItems: jasmine.createSpy().and.returnValue([]),
			getSize:  jasmine.createSpy().and.returnValue(0)
		};
		fixture.base = 'test';
		fixture.load('index.test.html');
	});

	it('should initialize the render', function () {
		listRender.initialize(list);
	})
});