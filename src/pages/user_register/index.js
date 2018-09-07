require ('./index.css');
require('common/logo');
require('common/footer');
var _util = require('util');
var _user = require('service/user.js');
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
		return this
	},
	bindEvent:function(){
		var _this=this;
		$('[name = "username"]').on('blur',function(){
			var username = $(this).val();
			if(!_util.validate(username,'require')){
				return
			}
			if(!_util.validate(username,'username')){
				return
			}
			_user.checkUsername(username,function(result){
				formError.hide();
			},function(msg){	
				formError.show(msg)
			})
		})
		$('#btn-submit').on('click',function(){
			_this.submit()
		})
	},
	submit:function(){
		var formDate={
				username:$('[name = "username"]').val(),
				password:$('[name="password"]').val(),	
				phone:$('[name="phone"]').val(),	
				email:$('[name="email"]').val()
			}
		var validataResult = this.validate(formDate);
		if(validataResult.status){
			formError.hide();
			_user.register(formDate,function(result){
				window.location.href='/result.html?type=register'
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
		if(!_util.validate(formDate.username,'require')){
			result.msg='用户名不能为空';
			return result
		}
		if(!_util.validate(formDate.username,'username')){
			result.msg='用户名格式错误';
			return result
		}
		if(!_util.validate(formDate.password,'require')){
			result.msg='密码不能为空';
			return result
		}
		if(!_util.validate(formDate.password,'password')){
			result.msg='密码格式错误';
			return result
		}
		if(!_util.validate(formDate.phone,'phone')){
			result.msg='手机号格式错误';
			return result
		}
		if(!_util.validate(formDate.email,'email')){
			result.msg='邮箱格式错误';
			return result
		}

		result.status = true;
		return result	
	}
}
$(function(){
	page.init()
})