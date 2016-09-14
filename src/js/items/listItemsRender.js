'use strict';
window.app = window.app || {};

(function (app) {
	var container = document.querySelector('.list-items');
	var listItems = null;
	var listeners = {
		addItem: function () {
			var addItem = document.getElementById('addItem');
			addItem.onclick = handleAction(handlerAddNewItem);
		},
		deleteItem: function () {
			var itemsContainer = document.querySelector('.list-items');
			itemsContainer.onclick = handleAction(handleRemoveItem);
		}
	};

	function handleAction(action) {
		return function () {
			action();
			render();
		};
	}

	function handlerAddNewItem() {
		var itemValue = document.getElementById('newItem').value;
		listItems.addItem(itemValue);
	}

	function handleRemoveItem(event) {
		//TODO:
		var itemValue = '';
		listItems.removeItem(itemValue);
	}

	function isItemDisplayed(nodes, itemContent) {
		for (var i = 0, l = nodes.length; i < l; i++) {
			if (itemContent == nodes[i].innerText) {
				return true;
			}
		}
		return false;
	}

	function getNodeToInsertBefore(nodes, itemContent) {
		var node = null;
		for (var i = 0, l = nodes.length; i < l; i++) {
			node = nodes[i];
			if (itemContent < node.innerText) {
				return node;
			}
		}
		return node;
	}

	function renderItem(container, itemContent) {
		var element = document.createElement('div'),
			newContent = document.createTextNode(itemContent),
			beforeNode = getNodeToInsertBefore(container.childNodes, itemContent);

		element.appendChild(newContent);
		container.insertBefore(element, beforeNode);
	}

	function render() {
		var items = listItems.getItems();
		items.forEach(function (item) {
			var itemContent = item.getContent();
			if (isItemDisplayed(container.childNodes, itemContent)) {
				return;
			}
			renderItem(container, itemContent);
		});

		updateListCoun
	}

	app.listItemsRender = {
		initialize: function (listItemsInstance) {
			listItems = listItemsInstance;
			Object.keys(listeners).forEach(function (listenerKey) {
				listeners[listenerKey]();
			});
		}
	};

}(window.app));