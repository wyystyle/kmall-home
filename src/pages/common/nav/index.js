require('./index.css');
require('common/footer');
var _user=require('service/user.js');
var _util=require('util');
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

	}

}
module.exports=nav.init()