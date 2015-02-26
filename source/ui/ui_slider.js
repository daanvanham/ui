/* jshint strict:true,browser:true,newcap:false,undef:true,unused:true */
/* global UI:true */
;(function() {
	'use strict';

	/**
	 * Simple __slider__ class
	 *
	 *     var instance = UI.instance('slider'),
	 *         element = document.querySelector('div.slider'),
	 *         options = {
	 *           step: 10,
	 *           controls: 2
	 *         },
	 *         slider = new instance(element, options);
	 *
	 * @class Slider
	 * @param {Node} element
	 * @param {Object} options
	 * @constructor
	 */
	function Slider(element, options) {
		var elements = {controls: {}},
			defaults = {
				step: 1,
				controls: 1
			};

		/**
		 * Class default options merged with given options
		 *
		 * @property options
		 * @private
		 */
		options = UI.combine(defaults, options);

		/**
		 * Constructor function for the Slider initialisation
		 *
		 * @method __construct
		 * @private
		 */
		function __construct() {
			var i;

			for (i = 0; i < options.controls; ++i)
				element.appendChild(elements.controls[i] = UI.create('span'));

			addEventListeners();
		}

		/**
		 * Add event listeners to the controls
		 *
		 * @method addEventListeners
		 * @private
		 */
		function addEventListeners() {
			var mousedown = function mousedown(e) {
					draggable = {target: e.target, x: e.x, correction: e.target.offsetLeft};
				},
				draggable, i;

			for (i = 0; i < options.controls; ++i) {
				elements.controls[i].addEventListener('mousedown', mousedown);
			}

			document.addEventListener('mousemove', function(e) {
				var width, percentage, left, i, target;

				if (draggable) {
					target = draggable.target;
					width = element.clientWidth - target.clientWidth;
					percentage = width / 100;

					left = (e.x - draggable.x) + draggable.correction;
					left = left < 0 ? 0 : left;
					left = left > width ? width : left;

					if (options.controls > 1) {
						for (i = 0; i < target.parentNode.children.length; ++i) {
							if (target.parentNode.children[i] === target) {
								switch (i) {
									case 0:
										if (left + target.clientWidth >= target.parentNode.children[1].offsetLeft)
											left = target.parentNode.children[1].offsetLeft - target.clientWidth;
										break;

									case 1:
										if (left <= target.parentNode.children[0].offsetLeft + target.clientWidth)
											left = target.parentNode.children[0].offsetLeft + target.clientWidth;
										break;
								}
							}
						}
					}

					left = Math.round(left / (options.step * percentage)) * (options.step * percentage);

					draggable.target.style.left = left + 'px';
				}
			});

			document.addEventListener('mouseup', function() {
				draggable = undefined;
			});
		}

		__construct();
	}

	UI.register('slider', Slider);
})();
