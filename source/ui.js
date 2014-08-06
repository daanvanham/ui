/* jshint strict:true,browser:true,newcap:false,undef:true,unused:true */
/* global console:true */
;(function() {
	'use strict';

	var combine = function combine(){
			var combined = {},
				i, p;

			for (i = 0; i < arguments.length; ++i)
				for (p in arguments[i])
					combined[p] = p in combined && typeof combined[p] === 'object' ? combine(arguments[i][p], combined[p]) : arguments[i][p];

			return combined;
		},

		create = function create(type, className) {
			var element = document.createElement(type);

			if (typeof className !== 'undefined')
				element.className = className;

			return element;
		},

		error = function error(message) {
			console.error(message);
		};

	/**
	 * Basic UI module, providing a base for all the submodules to come. Submodules should be registered to UI before use.
	 *
	 * @module UI
	 */
	function UI() {
		var ui = this,
			_instances = {};

		/**
		 * Combine several objects into one
		 *
		 * @method combine
		 * @param  {Object} 1
		 * @param  {Object} N
		 * @return {Object} object
		 */
		ui.combine = combine;

		/**
		 * Create a Node with given className
		 *
		 * @method create
		 * @param {String} type
		 * @param {String} className
		 * @return {Node} element
		 */
		ui.create = create;

		/**
		 * Log an error to the console
		 *
		 * @method error
		 * @param {String} message
		 */
		ui.error = error;

		/**
		 * Request a UI instance for usage
		 *
		 * @method instance
		 * @param {String} name
		 * @return {Function} instance
		 */
		ui.instance = function instance(name) {
			return (name in _instances) ? _instances[name] : false;
		};

		/**
		 * Register a UI instance
		 *
		 * @method register
		 * @param {String} name
		 * @param {Function} plugin
		 * @chainable
		 */
		ui.register = function register(name, plugin) {
			if (!(name in _instances))
				_instances[name] = plugin;

			return ui;
		};
	}

	window.UI = new UI();
})();
