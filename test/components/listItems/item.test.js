'use strict';

describe('Components/listItems/item.js', function() {
	var item;

	beforeEach(function () {
		item = new window.App.Components.ListItems.Item('foo', 'bar', 10);
	});

	it('should Initialize an item', function() {
		expect(item.getName()).toEqual('foo');
		expect(item.getDescription()).toEqual('bar');
		expect(item.getPrice()).toEqual(10);
		expect(item.getContent()).toEqual('foo - $10');
		expect(item.isRendered()).toBeFalsy();
	});

	it('should set the render state', function () {
		item.setRendered(true);

		expect(item.isRendered()).toBeTruthy();
	});

	it('should check if its equals', function () {
		expect(item.equals('foo')).toBeTruthy();
		expect(item.equals('foo2')).toBeFalsy();
	});
});