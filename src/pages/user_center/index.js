require('./index.css')
require ('common/nav');
require ('common/search');
var tpl = require('./index.tpl');

var _util = require('util');
var _user = require('service/user.js');
var _side = require('common/side');

var page={
	init:function(){
		this.onload();
		this.loadUserConent();
	},
	onload:function(){
		_side.render('user_center')
	},
	loadUserConent:function(){
		_user.getUserConent(function(userInfo){
			var html = _util.render(tpl,userInfo);
			$('.side-center').html(html)
		},function(){
			_util.doLogin()
		})
	}
}
$(function(){
	page.init()
})
