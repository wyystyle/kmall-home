require('./index.css')
var _nav = require('common/nav');
require ('common/search');
require ('common/footer');

var _util = require('util');
var _modal= require('./modal.js');
var _order = require('service/order');
var _shipping = require('service/shipping');

var shippingTpl = require('./shipping.tpl');
var productTpl = require('./product.tpl');

var page={
	data:{
		shippingId:null
	},
	init:function(){
		this.$shippingBox = $('.shipping-box');
		this.bindEvent();
		this.loadShippingList();
		this.loadProductList();
	},	
	bindEvent:function(){
		var _this = this;
		this.$shippingBox.on('click','.shipping-add',function(){
			_modal.show({
				success:function(shippings){
					_this.renderShipping(shippings)
				}
			});
		})
		this.$shippingBox.find('.modal-container').on('click',function(e){
			e.stopPropagation();
		})
		this.$shippingBox.on('click','.shipping-delete',function(e){
			e.stopPropagation();
			var $this = $(this);
			var shippingId = $this.parents('.shipping-item').data('shipping-id');	
			if(_util.confirm("确定要删除这个地址吗")){
				_shipping.deleteShipping({shippingId:shippingId},function(shippings){
				_this.renderShipping(shippings);
			},function(msg){
				_util.showErrorMsg(msg)
			})
			}
		})
		this.$shippingBox.on('click','.shipping-edit',function(){
			var $this = $(this);
			var shippingId = $this.parents('.shipping-item').data('shipping-id');
				_shipping.editShippingList({shippingId:shippingId},function(shippings){
				_modal.show({
					data:shippings,
					success:function(shippings){
						_this.renderShipping(s)
					}
				})
			},function(msg){
				_util.showErrorMsg(msg)
			})
		})
		this.$shippingBox.on('click','.shipping-item',function(){
			var $this = $(this);
			$this.addClass('active')
			.siblings('.shipping-item').removeClass('active')

			_this.data.shippingId = $this.data('shipping-id');
		})
		$('.product-box').on('click','.btn-submit',function(){
			if(_this.data.shippingId){
				_order.createOrder({shippingId:_this.data.shippingId},function(order){
					
					console.log(order);
					window.location.href='./payment.html?orderNo='+order.orderNo;	
				},function(){
					_util.showErrorMsg(msg)
				})
			}else{
				_util.showErrorMsg('请选择地址后再提交')
			}
		})


	},
	loadShippingList:function(){
		var _this = this;
		_shipping.getShippingList(function(shippings){
			_this.renderShipping(shippings)
		},function(){
			this.$shippingBox.html('<p class="empty-message">获取地址失败了,刷新试试看!!!</p>')
		})	
	},
	loadProductList:function(){
		var _this = this;
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
		var _this = this;
		shippings.forEach(function(shipping){
			if(shipping._id == _this.data.shippingId){
				shipping.isActive = true;
			}
		})
		var html = _util.render(shippingTpl,{
			shippings:shippings
		});
		this.$shippingBox.html(html); 
	},
	showPageError:function(){
		$('.product-box').html('<p class="empty-message">好像哪里出错了,刷新试试看!!!</p>')
	},
}
$(function(){
	page.init()
})