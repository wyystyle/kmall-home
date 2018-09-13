require('./index.css');
require('common/footer');
var _user=require('service/user.js');
var _util=require('util');
var _cart = require('service/cart')
var nav ={
	init:function(){
		this.bindEvent();
		this.loadUserInfo();
		this.loadCartInfo();
		return this;
	},
	bindEvent:function(){
		$('#logout').on('click',function(){
			_user.logout(function(result){
				window.location.reload();
			},function(){
				_util.showErrorMsg()
			});
		})
	},
	loadUserInfo:function(){
		_user.getUserInfo(function(userInfo){
			$('.no-login').hide();
			$('.login')
			.show()
			.find('.username')
			.text(userInfo.username)
		})
	},
	loadCartInfo:function(){
		_cart.getCount(function(cart){
			$('.shop-num').text(cart || 0)
		},function(){
			$('.shop-num').text(0)
		});
	}

}
module.exports=nav.init()