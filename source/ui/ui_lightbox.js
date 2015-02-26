/* jshint strict:true,browser:true,newcap:false,undef:true,unused:true */
/* global UI:true */
;(function() {
	'use strict';

	/**
	 * Simple __lightbox__ class
	 *
	 *     var module = UI.require('lightbox'),
	 *         element = document.querySelector('[data-lightbox]'),
	 *         options = { close: true },
	 *         lightbox = new module(element, options);
	 *
	 * @class Lightbox
	 * @param {Node} element
	 * @param {Object} options
	 * @constructor
	 */
	function Lightbox(element, options) {
		var lightbox = this,
			defaults = {
				close: false
			},
			archive = {};

		/**
		 * Class default options merged with given options
		 *
		 * @property options
		 * @private
		 */
		options = UI.combine(defaults, options);

		/**
		 * Constructor function for the Lightbox initialisation
		 *
		 * @method __construct
		 * @return void
		 * @private
		 */
		function __construct(element) {
			lightbox.overlay = create('overlay');
			lightbox.overlay.addEventListener('click', lightbox.hide);

			lightbox.view = create('view');
			lightbox.hide();

			if (options.close) {
				lightbox.close = document.createElement('a');
				lightbox.close.addEventListener('click', lightbox.hide);
			}

			element.addEventListener('click', function() {
				var url = this.attributes.getNamedItem('data-lightbox').value;

				if (url in archive)
					return lightbox.show();

				get(url, function(reply) {
					append(lightbox.view, reply.response);
					lightbox.show();
				});
			});
		}

		/**
		 * append content to an element
		 *
		 * @method append
		 * @param {Node} element
		 * @param {String} content
		 * @return void
		 * @private
		 */
		function append(element, content) {
			var container = create('content', {append: false});

			element.innerHTML = '';

			if (lightbox.close)
				element.appendChild(lightbox.close);

			container.innerHTML = content;
			element.appendChild(container);
		}

		/**
		 * create an element with a classname and append it to the body if requested
		 *
		 * @method create
		 * @param {String} className
		 * @param {Object} config
		 * @return {Node} element
		 * @private
		 */
		function create(className, config) {
			var element;

			config = UI.combine({tag: 'div', append: true}, config);

			element = document.createElement(config.tag);
			element.classList.add(className);

			if (config.append !== false)
				document.querySelector('body').appendChild(element);

			return element;
		}

		/**
		 * perform get request
		 *
		 * @method get
		 * @param {String} url
		 * @param {Function} callback
		 * @return {Boolean}
		 * @private
		 */
		function get(url, callback) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);
			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4 && xhr.status === 200)
					callback(archive[url] = xhr);
			};
			xhr.send();
			return false;
		}

		/**
		 * hide the lightbox
		 *
		 * @method hide
		 * @return {Boolean}
		 * @public
		 */
		lightbox.hide = function hide() {
			lightbox.overlay.style.display = 'none';
			lightbox.view.style.display = 'none';
			return false;
		};

		/**
		 * show the lightbox
		 *
		 * @method show
		 * @return {Boolean}
		 * @public
		 */
		lightbox.show = function show() {
			lightbox.overlay.style.display = 'block';
			lightbox.view.style.display = 'block';
			return false;
		};

		__construct(element);
	}

	UI.register('lightbox', Lightbox);
})();
