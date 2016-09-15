'use strict';

describe('Utils.js', function() {

	it('should create a namespace', function() {
		var namespace = {};
		window.App.Utils.createNamespace(namespace, ['App', 'Test']);

		expect(namespace).toEqual({
			App: {
				Test: {}
			}
		})
	});

	it('should getAll the resources', function () {
		spyOn(window.App.Utils, 'getJson');

		window.App.Utils.getAll([
			'foo',
			'bar'
		]);

		expect(window.App.Utils.getJson).toHaveBeenCalledTimes(2);
	});

	it('should create an html element', function () {
		var parentElement = document.createElement('div');
		var childElement = document.createElement('span');
		var element = window.App.Utils.createHTMLElement('option', {
			innerText: 'foo',
			value: 'bar',
			attributes: {
				'data-name': 'z'
			},
			children: [
				childElement
			]
		});

		parentElement.appendChild(element);
		expect(parentElement.innerHTML).toEqual('<option value="bar" data-name="z">foo<span></span></option>');
	});
});