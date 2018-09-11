require('./index.css')
require ('common/nav');
require ('common/search');
require ('common/footer');
var _util = require('util');
var _cart = require('service/cart');
var tpl = require('./index.tpl');

var page={

	init:function(){
		this.onload();
		this.bindEvent();
	},
	onload:function(){
		this.loadCart();
	},	
	bindEvent:function(){
		
	},
	loadCart:function(){
		var html = _util.render(tpl);
		$('.cart-box').html(html)
	},
	renderCart:function(){

	}
}
$(function(){
	page.init()
})