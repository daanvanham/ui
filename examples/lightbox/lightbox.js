/* jshint strict:true,browser:true,newcap:false,undef:true */
/* global UI:true */
;(function() {
	'use strict';

	var module = UI.require('lightbox'),
        anchors = document.querySelectorAll('[data-lightbox]'),
        i;

    for (i = 0; i < anchors.length; ++i)
        new module(anchors[i], {close:true});
})();
