'use strict';
var namespace = window.App.Utils.createNamespace(window, ['App', 'Components', 'ListItems']);

(function (namespace) {
	var container = document.querySelector('.list-items');
	var listItems = null;
	var listeners = {
		deleteItem: function () {
			var itemsContainer = document.querySelector('.list-items');
			itemsContainer.onclick = handleAction(handleRemoveItem);
		},
		submit: function (event) {
			var form = document.querySelector('.list-form');
			form.onsubmit = handleAction(handleFormSubmission);
		}
	};

	function handleAction(action) {
		return function (event) {
			action(event);
			render();
		};
	}

	function handleFormSubmission (event) {
		event.preventDefault();
		var inputElement = document.getElementById('newItem');
		var itemValue = inputElement.value.trim();
		listItems.addItem(itemValue);
		inputElement.value = '';
	}

	function handleRemoveItem(event) {
		var parentElement = event.target.parentElement;
		var itemName = parentElement.getAttribute('data-name');
		listItems.removeItem(itemName);

		container.removeChild(parentElement);
	}

	function updateListCount() {
		var itemsCount = listItems.getSize();
		var text = '';
		var commonText = 'in the list';

		if(itemsCount === 0) {
			text = 'The list is empty';
		} else {
			text = itemsCount + (itemsCount === 1 ? ' item ' : ' items ') + commonText;
		}
		document.querySelector('.list-count').innerHTML = text;
	}

	function getNodeToInsertBefore(nodes, itemContent) {
		var node = null;
		for (var i = 0, l = nodes.length; i < l; i++) {
			node = nodes[i];
			if (node && node.getAttribute && itemContent < node.getAttribute('data-name')) {
				return node;
			}
		}
		return node;
	}

	function createDeleteButton () {
		var button = document.createElement('button');
		button.innerText = 'Delete';
		return button;
	}

	function renderItem(container, itemContent) {
		var element = document.createElement('li'),
			deleteBtn = createDeleteButton(itemContent),
			newContent = document.createTextNode(itemContent),
			beforeNode = getNodeToInsertBefore(container.childNodes, itemContent);

		element.setAttribute('data-name', itemContent);
		element.appendChild(newContent);
		element.appendChild(deleteBtn);
		container.insertBefore(element, beforeNode);
	}

	function render() {
		var items = listItems.getItems();
		items.forEach(function (item) {
			if (item.isRendered()) {
				return;
			}
			var itemContent = item.getContent();
			renderItem(container, itemContent);
			item.setRendered(true);
		});

		updateListCount();
	}

	namespace.ListRender = {
		initialize: function (listItemsInstance) {
			listItems = listItemsInstance;
			Object.keys(listeners).forEach(function (listenerKey) {
				listeners[listenerKey]();
			});
			updateListCount();
		}
	};

}(namespace));