'use strict';
var namespace = window.App.Utils.createNamespace(window, ['App', 'Components', 'ListItems']);

(function (namespace) {
	var List = function (data) {
		this.items = data.items;
		this.categories = data.categories;
		this.products = data.products;
		this.selectedCategory = data.categories[0].id;

		this.productsOrderByCategory = orderProductsByCategory(this.categories, this.products);
	};

	List.prototype.addItem = function (item) {
		var newItem = new namespace.Item(item);

		if (this.exists(item)) {
			return;
		}
		this.productsOrderByCategory[this.selectedCategory].push(newItem);
		this.items = sortItems(this.productsOrderByCategory[this.selectedCategory]);
	};

	List.prototype.removeItem = function (itemName) {
		var index = null,
			i = 0,
			l = this.items.length;

		for (; i < l; i++) {
			if (this.items[i].equals(itemName)) {
				index = i;
				break;
			}
		}
		if (index !== null) {
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

	List.prototype.getCategories = function () {
		return this.categories;
	};

	List.prototype.resetRenderState = function () {
		this.items.forEach(function (item) {
			item.setRendered(false);
		});
	};

	List.prototype.selectCategory = function (categoryId) {
		this.selectedCategory = categoryId;
		this.resetRenderState();
		this.items = this.productsOrderByCategory[categoryId];
	};

	List.prototype.reset = function () {
		var category = findElement(this.categories, this.selectedCategory);
		var productsBySelectedCategory = orderProductsByCategory([category], this.products);

		this.resetRenderState();
		this.productsOrderByCategory[this.selectedCategory] = productsBySelectedCategory[this.selectedCategory];
		this.items = this.productsOrderByCategory[this.selectedCategory];
	};

	function orderProductsByCategory(categories, products) {
		var result = {};
		categories.forEach(function (category) {
			var productIds = category.products || [];
			var items = [];
			productIds.forEach(function (productId) {
				var product = findElement(products, productId);
				if (product) {
					items.push(new namespace.Item(product.name, product.description, product.price));
				}
			}.bind(this));
			result[category.id] = sortItems(items);
		});

		return result;
	}

	function sortItems(items) {
		return items.sort(function (itemA, itemB) {
			var a = itemA.price;
			var b = itemB.price;
			if (a < b) {
				return -1;
			} else if (a > b) {
				return 1;
			}
			return 0;
		});
	}

	function findElement(items, id) {
		return items.find(function (item) {
			return item.id == id;
		});
	}

	namespace.List = List;
}(namespace));
