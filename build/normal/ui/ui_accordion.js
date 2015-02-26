/* jshint strict:true,browser:true,newcap:false,undef:true,unused:true */
/* global UI:true */
;(function() {
	'use strict';

	/**
	 * Simple __accordion__ class with easy to change options for changing
	 *
	 *     var instance = UI.instance('accordion'),
	 *         element = document.querySelector('div.accordion'),
	 *         options = {
	 *           type: 'vertical'
	 *         },
	 *         accordion = new instance(element, options);
	 *
	 * @class Accordion
	 * @param {Node} element
	 * @param {Object} options
	 * @constructor
	 */
	function Accordion(element, options) {
		var defaults = {
				type: 'horizontal'
			};

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
			element.querySelectorAll('ul ul').style.height = '0';
			addEventListeners();
		}

		/**
		 * Add event listeners to the controls
		 *
		 * @method addEventListeners
		 * @private
		 */
		function addEventListeners() {
			element.querySelectorAll('li').addEventListener('click', function() {
				this.nextElementSibling.style.height = '';
			});
		}

		__construct();
	}

	UI.register('accordion', Accordion);
})();
