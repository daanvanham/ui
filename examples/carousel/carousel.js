/* jshint strict:true,browser:true,newcap:false,undef:true */
/* global UI:true */
;(function() {
	'use strict';

	var instance  = UI.instance('carousel'),
		basic     = new instance(document.querySelector('div.carousel.basic')),
		bullet    = new instance(document.querySelector('div.carousel.bullet'), {navigation: 2}),
		loop      = new instance(document.querySelector('div.carousel.loop'), {loop: 1}),
		automatic = new instance(document.querySelector('div.carousel.automatic'), {delay: 3000});
})();
