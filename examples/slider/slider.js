/* jshint strict:true,browser:true,newcap:false,undef:true */
/* global UI:true */
;(function() {
	'use strict';

	var instance = UI.instance('slider'),
		basic    = new instance(document.querySelector('div.basic')),
		double   = new instance(document.querySelector('div.double'), {controls: 2}),
		steps    = new instance(document.querySelector('div.steps'), {step: 20});
})();
