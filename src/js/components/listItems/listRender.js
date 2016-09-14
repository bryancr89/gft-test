'use strict';
var namespace = window.App.Utils.createNamespace(window, ['App', 'Components', 'ListItems', 'ListRender']);

(function (namespace, Utils) {
	var container = document.querySelector('.list-items');
	var listItems = null;
	var listeners = {
		deleteItem: function () {
			var itemsContainer = document.querySelector('.list-items');
			itemsContainer.onclick = handleAction(handleRemoveItem);
		},
		submit: function () {
			var form = document.querySelector('.list-form');
			form.onsubmit = handleAction(handleFormSubmission);
		},
		categoryChange: function () {
			var categoriesContainer = document.getElementById('categories');
			categoriesContainer.onchange = handleAction(handleCategoryChange);

			renderCategories(categoriesContainer, listItems.getCategories());
		},
		reset: function () {
			var resetBtn = document.getElementById('reset');
			resetBtn.onclick = handleAction(handleResetAction);
		}
	};

	function handleAction(action) {
		return function (event) {
			action(event);
			render();
		};
	}

	function handleFormSubmission(event) {
		event.preventDefault();
		var inputElement = document.getElementById('newItem');
		var itemValue = inputElement.value.trim();
		listItems.addItem(itemValue);
		inputElement.value = '';
	}

	function handleRemoveItem(event) {
		var parentElement = event.target.parentElement;
		var itemName = parentElement.getAttribute('data-name');
		if (itemName) {
			listItems.removeItem(itemName);
			container.removeChild(parentElement);
		}
	}

	function handleCategoryChange(event) {
		var categoryId = event.target.value;
		clearList(container);

		listItems.selectCategory(categoryId);
	}

	function handleResetAction(event) {
		clearList(container);
		listItems.reset();
	}

	function updateListCount() {
		var itemsCount = listItems.getSize();
		var text = '';
		var commonText = 'in the list';

		if (itemsCount === 0) {
			text = 'The list is empty';
		} else {
			text = itemsCount + (itemsCount === 1 ? ' item ' : ' items ') + commonText;
		}
		document.querySelector('.list-count').innerHTML = text;
	}

	function renderItem(container, item) {
		var itemContent = item.getContent();
		var itemName = item.getName();
		var itemPrice = item.getPrice();
		var itemDescription = item.getDescription();
		var deleteBtn = Utils.createHTMLElement('button', {
				innerText: 'Delete'
			}),
			newContent = document.createTextNode(itemContent),
			beforeNode = Utils.getNodeToInsertBefore(container.childNodes, itemPrice),
			element = Utils.createHTMLElement('li', {
				attributes: {
					'data-name': itemName,
					'data-sort': itemPrice,
					title: itemDescription
				},
				children: [
					newContent,
					deleteBtn
				]
			});
		container.insertBefore(element, beforeNode);
	}

	function clearList(container) {
		while (container.hasChildNodes()) {
			container.removeChild(container.lastChild);
		}
	}

	function render() {
		var items = listItems.getItems();
		if (items.length === 0) {
			clearList(container);
		} else {
			items.forEach(function (item) {
				if (item.isRendered()) {
					return;
				}
				renderItem(container, item);
				item.setRendered(true);
			});
		}

		updateListCount();
	}

	function renderCategories(categoriesContainer, categories) {
		var fragment = document.createDocumentFragment();

		categories.forEach(function (category) {
			var option = Utils.createHTMLElement('option', {
				innerText: category.name,
				value: category.id
			});

			fragment.appendChild(option);
		});

		//For efficiency we append with a fragment.
		categoriesContainer.appendChild(fragment);
	}

	namespace.initialize = function (listItemsInstance) {
		listItems = listItemsInstance;
		Object.keys(listeners).forEach(function (listenerKey) {
			listeners[listenerKey]();
		});
		updateListCount();
	};

}(namespace, App.Utils));