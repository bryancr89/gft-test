'use strict';
var namespace = window.App.Utils.createNamespace(window, ['App', 'Components', 'ListItems']);

(function (namespace) {
	var List = function (items) {
		this.items = items;
	};

	List.prototype.addItem = function (item) {
		var newItem = new namespace.Item(item);

		if (this.exists(item)) {
			return;
		}
		this.items.push(newItem);
	};

	List.prototype.removeItem = function (itemName) {
		//TODO:
		var index = null,
			i = 0,
			l = this.items.length;

		for (; i < l; i++ ) {
			if (this.items[i].equals(itemName) ) {
				index = i;
				break;
			}
		}
		if(index !== null) {
			this.items.splice(index, 1);
		}
	};

	List.prototype.exists = function (itemName) {
		var item = this.items.find(function (item) {
			return item.equals(itemName);
		});

		return item ? true : false;
	};

	List.prototype.getItems = function () {
		return this.items;
	};

	List.prototype.getSize = function () {
		return this.items.length;
	};

	namespace.List = List;
}(namespace));
