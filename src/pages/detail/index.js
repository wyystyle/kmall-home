require('./index.css')
require ('common/nav');
require ('common/search');
require ('common/footer');
var _util = require('util');
var _product = require('service/product');
var _cart = require('service/cart');
var tpl = require('./index.tpl');

var page={
	params:{
		productId:_util.getParamFromUrl('productId') || '',
	},
	init:function(){
		this.onload();
		this.bindEvent();
	},
	onload:function(){
		if(this.params.productId){
			this.loadProductDetail()
		}
	},	
	bindEvent:function(){
		var _this =this;
		$('.detail-box').on('mouseenter','.product-small-img-item',function(){
			var $this = $(this);
			$this.addClass('active')
			.siblings('.product-small-img-item').removeClass('active')
			var imgSrc=$this.find('img').attr('src');
			$('.product-main-img img').attr('src',imgSrc);
		})
		$('.detail-box').on('click','.count-btn',function(){
			var $this = $(this);
			var $input = $('.count-input');
			var shopnum = _this.shopnum;
			var min = 1;
			var current = parseInt($input.val());
			if($this.hasClass('plus')){
				$input.val(current >= shopnum ? shopnum : current + 1)
			}else if($this.hasClass('minus')){
				$input.val(current>min ? current - 1 : min)
			}

		})
		$('.detail-box').on('click','.add-cart-btn',function(){
			_cart.addCart({
				productId:_this.params.productId,
				count:$('.count-input').val()
			},function(){
				window.location.href='./result.html?type=addCart'
			},function(){
				_util.showErrorMsg(msg)
			})
		})
	},
	loadProductDetail:function(){
		var _this =this;
		_product.getProductDetail({productId:this.params.productId},function(product){
			console.log(product)
			if(product.images){
				product.images=product.images.split(',')
			}else{
				/*product.images = []*/
			}
			product.mainImg = product.images[0];
			_this.shopnum = product.shopnum; 
			var html = _util.render(tpl,product);
			$('.detail-box').html(html)
		},function(){
			_util.showErrorMsg()
		})
	}
}
$(function(){
	page.init()
})