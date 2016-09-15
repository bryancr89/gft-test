'use strict';
window.App = window.App || {};

(function (App) {
	App.Utils = {};

	App.Utils.createNamespace = function createNamespace(namespace, namespaceList) {
		var currentItem = namespace;
		namespaceList.forEach(function (item) {
			currentItem[item] = currentItem[item] || {};
			currentItem = currentItem[item];
		});

		return currentItem;
	};

	App.Utils.getJson = function (url, callback) {
		var xmlhttp = new XMLHttpRequest();

		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var data = JSON.parse(this.responseText);
				callback(data);
			}
		};
		xmlhttp.onloadend = function() {
			if(this.status == 404) {
				callback(null);
			}
		};
		xmlhttp.open('GET', url, true);
		xmlhttp.send();
	};

	App.Utils.getAll = function (urls, callback) {
		var urlKeys = Object.keys(urls),
			pendingRequest = urlKeys.length,
			response = {};

		urlKeys.forEach(function (key) {
			App.Utils.getJson(urls[key], function (data) {
				pendingRequest--;
				response[key] = data;

				if(pendingRequest === 0) {
					callback(response);
				}
			});
		});
	};

	App.Utils.setAttributes = function (element, attributes) {
		var keys = Object.keys(attributes);

		keys.forEach(function (key) {
			element.setAttribute(key, attributes[key]);
		});
	};

	App.Utils.appendChildren = function (element, children) {
		children.forEach(function (child) {
			element.appendChild(child);
		});
	};

	App.Utils.createHTMLElement = function (tag, data) {
		var element = document.createElement(tag);
		if(data.innerText) {
			element.innerText = data.innerText;
		}
		if(data.value) {
			element.value = data.value;
		}
		if(data.attributes) {
			App.Utils.setAttributes(element, data.attributes);
		}
		if(data.children) {
			App.Utils.appendChildren(element, data.children);
		}

		return element;
	};

	App.Utils.getNodeToInsertBefore = function (nodes, sort) {
		var node = null;
		for (var i = 0, l = nodes.length; i < l; i++) {
			node = nodes[i];
			if (node && node.getAttribute && sort < node.getAttribute('data-sort')) {
				return node;
			}
		}
		return null;
	};
}(window.App));