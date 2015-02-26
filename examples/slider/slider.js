/* jshint strict:true,browser:true,newcap:false,undef:true */
/* global UI:true */
;(function() {
	'use strict';

	var module = UI.require('slider'),
		basic  = new module(document.querySelector('div.basic')),
		double = new module(document.querySelector('div.double'), {controls: 2}),
		steps  = new module(document.querySelector('div.steps'), {step: 20});
})();
