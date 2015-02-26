/* jshint strict:true,browser:true,newcap:false,undef:true,unused:true */
/* global UI:true */
;(function() {
	'use strict';

	/**
	 * Simple __carousel__ class with easy to change options for enabling navigation
	 *
	 *     var module = UI.require('carousel'),
	 *         element  = document.querySelector('div.carousel'),
	 *         options  = {
	 *             delay: 3000
	 *         },
	 *         carousel = new module(element, options);
	 *
	 * @class Carousel
	 * @param {Node} element
	 * @param {Object} options
	 * @constructor
	 */
	function Carousel(element, options) {
		var carousel = this,
			elements = {},
			current  = 0,
			defaults = {
				navigation: 1,     // 0 = off, 1 = arrows only, 2 = arrows + bullets
				loop: 0,           // 0 = off, 1 = on
				delay: 0           // delay above 0 auto-enables loop: 1
			},
			timer;

		/**
		 * Class default options merged with given options
		 *
		 * @property options
		 * @private
		 */
		options = UI.combine(defaults, options);

		/**
		 * Constructor function for the Carousel initialisation
		 *
		 * @method __construct
		 * @private
		 */
		function __construct() {
			if (element.children.length > 1)
				return UI.error('Multiple children found, forgot to add a wrapper?');

			elements.wrapper = element.children[0];

			if (options.navigation)
				navigation();

			if (options.delay && !options.loop)
				options.loop = 1;

			resetTimer();
		}

		/**
		 * Resets the timer if we have a delay in our options
		 *
		 * @method resetTimer
		 * @private
		 */
		function resetTimer() {
			if (!options.delay)
				return false;

			clearTimeout(timer);

			timer = setTimeout(function() {
				carousel.next();
			}, options.delay);
		}

		/**
		 * Add navigation elements to the DOM
		 *
		 * @method navigation
		 * @private
		 */
		function navigation() {
			var i;

			switch (options.navigation) {
				case 2:
					elements.list = UI.create('ul');

					for (i = 0; i < elements.wrapper.children.length; ++i)
						elements.list.appendChild(UI.create('li'));

					element.appendChild(elements.list);
					/* falls through */
				case 1:
					element.appendChild(elements.previous = UI.create('span', 'previous'));
					element.appendChild(elements.next = UI.create('span', 'next'));
					break;
			}

			addEventListeners();
		}

		/**
		 * Add event listeners to the navigation elements
		 *
		 * @method addEventListeners
		 * @private
		 */
		function addEventListeners() {
			elements.previous.addEventListener('click', carousel.previous);
			elements.next.addEventListener('click', carousel.next);

			if (elements.list) {
				var list = elements.list.querySelectorAll('li'),
					jump = function jump(i) {
						return function() {
							carousel.jump(i);
						};
					},
					i;

				for (i = 0; i < list.length; ++i)
					list[i].addEventListener('click', jump(i));
			}
		}

		/**
		 * previous carousel slide
		 *
		 * @method previous
		 */
		carousel.previous = function previous() {
			carousel.slide(-1);
		};

		/**
		 * next carousel slide
		 *
		 * @method next
		 */
		 carousel.next = function next() {
			carousel.slide(1);
		};

		/**
		 * slide carousel N steps
		 *
		 * @method slide
		 * @param {Integer} n
		 */
		carousel.slide = function slide(n) {
			resetTimer();

			if (!options.loop && ((n === 1 && current >= elements.wrapper.children.length - 1) || (n === -1 && current === 0)))
				return false;

			current = (current + n) % elements.wrapper.children.length;

			if (options.loop && current < 0)
				current += elements.wrapper.children.length;

			element.className = element.className.replace(/slide[0-9]+/g, '').trim() + ' slide' + current;
		};

		/**
		 * jump to a certain slide
		 *
		 * @method jump
		 * @param {Integer} n
		 */
		carousel.jump = function jump(n) {
			carousel.slide(n - current);
		};

		__construct();
	}

	UI.register('carousel', Carousel);
})();
