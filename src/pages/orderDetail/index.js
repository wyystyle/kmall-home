require('./index.css')
require ('common/nav');
require ('common/search');
var tpl = require('./index.tpl');
require('util/pagination');
var _util = require('util');
var _order = require('service/order');
var _side = require('common/side');

var page={
	params:{
		orderNo:_util.getParamFromUrl('orderNo')
	},
	init:function(){
		this.onload();
		this.loadOrderDetail();
		this.bindEvent();
	},
	bindEvent:function(){
		var _this = this;
		$('.side-center').on('click','.btn-cancel',function(){
			if(_util.confirm('您确定取消订单吗？')){
				_order.cancelOrder({orderNo:_this.params.orderNo},function(order){
						_this.rederOrderDetail(order)
				},function(msg){
					_util.showErrorMsg(msg);
				})
			}
		})
	},
	onload:function(){
		_side.render('order_list')
	},
	loadOrderDetail:function(){
		var _this = this;
		_order.getOrderDetail(this.params,function(order){
			_this.rederOrderDetail(order)
		},function(){
			_util.showErrorMsg("获取订单失败")
		})
	},
	rederOrderDetail:function(order){
		if(order){
			order.productList.forEach(product=>{
				if(product.images){
					product.image = product.images.split(',')[0]; 
				}else{
					product.image = require('images/floor/floor-01.jpg');
				}
			})
			order.creatTime = new Date(order.createdAt).toLocaleString()
		}
		var html = _util.render(tpl,{
			list:order,
			order:!!order,
			needPay:order.status == 10,
			canCancel:order.status == 10
		});
		$('.side-center').html(html)
	}

}
$(function(){
	page.init()
})
