/* jshint strict:true,browser:true,newcap:false,undef:true,unused:true */
/* global UI:true */
;(function() {
	'use strict';

	/**
	 * Simple __slider__ class with easy to change options for enabling navigation
	 *
	 *     var instance = UI.instance('slider'),
	 *         element = document.querySelector('div.slider'),
	 *         options = {
	 *           min: 0,
	 *           max: 100,
	 *           step: 10
	 *         },
	 *         slider = new instance(element, options);
	 *
	 * @class Slider
	 * @param {Node} element
	 * @param {Object} options
	 * @constructor
	 */
	function Slider(element, options) {
		var defaults = {
			min: 0,
			max: 100,
			step: 1
		};

		options = UI.combine(defaults, options);
	}

	UI.register('slider', Slider);
})();
