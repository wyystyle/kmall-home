require('./index.css');
var Hogan = require('hogan.js');
var _util = require('util');
var _user = require('service/user.js');
var tpl = require('./index.tpl');
var side={
	list:[
	{name:'order_list',desc:'我的订单',href:'./order_list.html'},
	{name:'user_center',desc:'个人中心',href:'./user_center.html'},
	{name:'user_update_password',desc:'修改密码',href:'./user_update_password.html'},
	],
	render:function(name){
		for(var i=0;i<this.list.length;i++){
			if(this.list[i].name==name){
				this.list[i].isStatus=true;
			}
		}
		var html = _util.render(tpl,{
			list:this.list
		});
		$('.side').html(html)
	}
	
}
module.exports=side;