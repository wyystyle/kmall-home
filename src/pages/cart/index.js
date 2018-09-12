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
		var _this = this;
		$('.cart-box').on('click','.select-one',function(){
			var $this = $(this);
			var productId = $this.parents('.cart-item').data('product-id');
			if($this.is(':checked')){
				_cart.selectOne({
					productId:productId
				},function(cart){
					_this.renderCart(cart);
				},function(){
					_this.showPageError();
				})
			}else{
				_cart.unselectOne({
					productId:productId
				},function(cart){
					_this.renderCart(cart);
				},function(){
					_this.showPageError();					
				})
			}
		})
		$('.cart-box').on('click','.delete-one',function(){
			var $this = $(this);
			var productId = $this.parents('.cart-item').data('product-id');
			_cart.deleteOne({productId:productId},function(cart){
				_this.renderCart(cart);
			},function(){
				_this.showPageError();	
			})
		})

	},
	loadCart:function(){
		var _this = this;
		_cart.getCart(function(cart){
			console.log('aaa',cart)
			_this.renderCart(cart)
		},function(){
			_this.showPageError();
		})
	},
	renderCart:function(cart){
		cart.cartList.forEach(item=>{
			if(item.product.images){
				item.product.image = item.product.images.split(',')[0]; 
			}else{
				item.product.image = require('images/floor/floor-01.jpg');
			}
		})
		cart.notEmpty = !!cart.cartList.length;
		var html = _util.render(tpl,cart)
		$('.cart-box').html(html);

	},
	showPageError:function(){
		$('.cart-box').html('<p class="empty-message">好像哪里出错了,刷新试试看!!!</p>')
	}
}
$(function(){
	page.init()
})