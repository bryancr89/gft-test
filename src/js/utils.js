'use strict';
window.App = window.App || {};

(function (App) {
	App.Utils = {};

	App.Utils.createNamespace = function createNamespace(namespace, namespaceList) {
		if(namespaceList.length === 0) {
			return namespace;
		}
		var element = namespaceList.shift();
		namespace[element] = namespace[element] || {};

		return createNamespace(namespace[element], namespaceList);
	};
}(window.App));