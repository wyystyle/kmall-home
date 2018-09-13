require('./index.css')
var _nav = require('common/nav');
require ('common/search');
require ('common/footer');

var _util = require('util');
var _order = require('service/order');
var _shipping = require('service/shipping');

var shippingTpl = require('./shipping.tpl');
var productTpl = require('./product.tpl');

var page={

	init:function(){
		this.loadShippingList();
		this.loadProductList();
	},	
	bindEvent:function(){
		

	},
	loadShippingList:function(){

		var html = _util.render(shippingTpl)
		$('.shipping-box').html(html);	
	},
	loadProductList:function(){
		var $this = $(this);

		_order.getProductList(function(cart){
			cart.cartList.forEach(item=>{
				if(item.product.images){
					item.product.image = item.product.images.split(',')[0]; 
				}else{
					item.product.image = require('images/floor/floor-01.jpg');
				}
			})
		cart.notEmpty = !!cart.cartList.length;
		var html = _util.render(productTpl,cart);
		$('.product-box').html(html);

		},function(){
			_this.showPageError();
		})
	
	},
	renderShipping:function(shippings){
		
	},
	showPageError:function(){
		$('.cart-box').html('<p class="empty-message">好像哪里出错了,刷新试试看!!!</p>')
	}
}
$(function(){
	page.init()
})