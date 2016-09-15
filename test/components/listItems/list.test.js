'use strict';

describe('Components/listItems/list.js', function() {
	var list;

	describe('without categories', function () {
		beforeEach(function () {
			list = new window.App.Components.ListItems.List({
				categories: null,
				products: [],
				items: []
			});
		});

		it('should add an item', function() {
			list.addItem('foo');
			expect(list.getSize()).toEqual(1);
		});

		it('should not add an item if is there', function () {
			list.addItem('foo');
			list.addItem('foo');
			expect(list.getSize()).toEqual(1);
		});

		it('should remove the item', function () {
			list.addItem('foo');
			list.removeItem('foo');
			expect(list.getSize()).toEqual(0);
		});
	});

	describe('with categories', function () {
		beforeEach(function () {
			list = new window.App.Components.ListItems.List({
				categories: [{
					name: 'Custom',
					id: 0,
					products: [1, 2]
				}, {
					name: 'test',
					id: 1,
					products: [1]
				}],
				products: [{
					id: 1,
					name: 'foo',
					price: 20,
					description: 'Hey there foo'
				}, {
					id: 2,
					name: 'bar',
					price: 15,
					description: 'Hey there bar'
				}],
				items: []
			});
		});

		it('should select a category', function () {
			list.selectCategory(1);

			expect(list.getSize()).toEqual(1);
		});

		it('should reset a category', function () {
			list.selectCategory(1);
			list.addItem('test');
			var sizeAfterAddItem = list.getSize();
			list.reset();
			var sizeAfterReset = list.getSize();

			expect(sizeAfterAddItem).toEqual(2);
			expect(sizeAfterReset).toEqual(1);
		});
	});
});