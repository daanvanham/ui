/* jshint strict:true,browser:true,newcap:false,undef:true */
/* global UI:true */
;(function() {
	'use strict';

	var module  = UI.require('carousel'),
		basic     = new module(document.querySelector('div.carousel.basic')),
		bullet    = new module(document.querySelector('div.carousel.bullet'), {navigation: 2}),
		loop      = new module(document.querySelector('div.carousel.loop'), {loop: 1}),
		automatic = new module(document.querySelector('div.carousel.automatic'), {delay: 3000});
})();
