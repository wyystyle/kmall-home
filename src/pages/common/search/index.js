require('./index.css')
var _util = require('util');
var _user = require('service/user.js');

var search={
	init:function(){
		this.load();
		this.bindEvent();
		return this
	},
	load:function(){
		var keyword = _util.getParamFromUrl('keyword');
		if(keyword){
			$('#search-input').val(keyword);
		}
	},
	bindEvent:function(){
		var _this=this
		$('.search-btn').on('click',function(){
			_this.submit()
		})
		$('#search-input').on('keyup',function(e){
			if(e.keyCode==13){
				_this.submit()
			}
		})
	},
	submit:function(){
		var keyword = $.trim($('#search-input').val());
		if(keyword){
			window.location.href='./list.html?keyword='+keyword;
		}else{
			_util.goHome()
		}
	}
	
}
$(function(){
	search.init()
})