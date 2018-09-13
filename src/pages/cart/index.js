require('./index.css')
var _nav = require('common/nav');
require ('common/search');
require ('common/footer');
var _util = require('util');
var _cart = require('service/cart');
var tpl = require('./index.tpl');

var page={

	init:function(){
		this.$box = $('.cart-box');
		this.onload();
		this.bindEvent();
	},
	onload:function(){
		this.loadCart();
	},	
	bindEvent:function(){
		var _this = this;
		this.$box.on('click','.select-one',function(){
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
		this.$box.on('click','.select-all',function(){
			var $this = $(this);
			if($this.is(':checked')){
				_cart.selectAll(function(cart){
					_this.renderCart(cart);
				},function(){
					_this.showPageError();
				})
			}else{
				_cart.unselectAll(function(cart){
					_this.renderCart(cart);
				},function(){
					_this.showPageError();					
				})
			}
			
		})
		this.$box.on('click','.delete-one',function(){
			var $this = $(this);
			var productId = $this.parents('.cart-item').data('product-id');
			console.log(productId)
			if(_util.confirm('您确定删除该条购物车信息吗？')){
				_cart.deleteOne({productId:productId},function(cart){
					_this.renderCart(cart);
				},function(){
					_this.showPageError();	
				})
			}
		})
		this.$box.on('click','.delete-selected',function(){
			var $this = $(this);
			if(_util.confirm('您确定删除选中的购物车信息吗？')){
				_cart.deleteSelected(function(cart){
					_this.renderCart(cart);
				},function(){
					_this.showPageError();	
				})
			}
		})
		this.$box.on('click','.count-btn',function(){
			var $this = $(this);
			var $input = $this.siblings('.count-input');
			var shopnum = $this.parents('.product-count').data('shopnum');
			var current = parseInt($input.val());
			var productId = $this.parents('.cart-item').data('product-id');	
			var min = 1;
			var max = shopnum;
			var newCount = 0;
			if($this.hasClass('plus')){
				if(current >= max){
					_util.showErrorMsg('商品达到上限')
					return
				}
				current = current + 1; 
			}else if($this.hasClass('minus')){
				if(current <= min){
					_util.showErrorMsg('商品至少为一件')
					return
				}
				current = current - 1; 
			}
			_cart.updateCount({productId:productId,count:current},function(cart){
				_this.renderCart(cart);
			},function(){
				_this.showPageError();
			})
		})
		this.$box.on('click','.btn-submit',function(){
			if(_this.cart && _this.cart.totalCartPrice > 0){
				window.location.href = './orderConfirm.html';
			}else{
				_util.showErrorMsg('请选择商品后再结算')
			}
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
		_nav.loadCartInfo();
		this.cart = cart;
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