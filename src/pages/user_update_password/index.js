require('pages/common/nav');
require('pages/common/search');
require('pages/common/footer');
require('./index.css');

var _util = require('util');
var _user = require('service/user');
var _side = require('pages/common/side');
var formError={
	show:function(msg){
		$('.error-item')
		.show()
		.find('.error-msg')
		.text(msg)
	},
	hide:function(){
		$('.error-item')
		.hide()
		.find('.error-msg')
		.text('')
	}
}
var page={
	init:function(){
		this.bindEvent();
		this.onload();
		return this
	},
	bindEvent:function(){
		var _this=this
		$('#btn-submit').on('click',function(){
			_this.submit()
		})
	},
	onload:function(){
		_side.render('user_update_password')
	},
	submit:function(){
		var formDate={
				password:$('[name="password"]').val()	
			}
		var validataResult = this.validate(formDate);
		if(validataResult.status){
			formError.hide();
			_user.updatePassword(formDate,function(result){
				window.location.href='./user_center.html'
			},function(msg){
				formError.show(msg)
			})
		}else{
			formError.show(validataResult.msg)
		}
	},
	validate:function(formDate){
		var result= {
			status:false,
			msg:''
		}
		if(!_util.validate(formDate.password,'require')){
			result.msg='密码不能为空';
			return result
		}
		if(!_util.validate(formDate.password,'password')){
			result.msg='密码格式错误';
			return result
		}

		result.status = true;
		return result	
	}
	
}
$(function(){
	page.init()
})