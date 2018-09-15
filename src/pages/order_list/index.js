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
		page:_util.getParamFromUrl('page') || 1
	},
	init:function(){
		this.initPagination();	
		this.onload();
		this.loadOrderList();
	},
	initPagination:function(){
		var _this = this;
		var $pagination=$('.pagination-box');
		$pagination.on('page-change',function(e,value){
			_this.params.page=value;
			_this.loadOrderList();
		})
		$pagination.pagination();
	},	
	onload:function(){
		_side.render('order_list')
	},
	loadOrderList:function(){
		_order.getOrderList(this.params,function(orders){
			console.log(orders)

			let list = orders.list.map(order=>{
				order.productList.forEach(product=>{
					if(product.images){
						product.image = product.images.split(',')[0]; 
					}else{
						product.image = require('images/floor/floor-01.jpg');
					}
				})
				order.creatTime = new Date(order.createdAt).toLocaleString()
				console.log(order.createdAt)
				return order
			})
			var html = _util.render(tpl,{
				list:orders.list,
				notEmpty:!!orders.list.length,
			});


			$('.side-center').html(html)

			$('.pagination-box').pagination('render',{
				current:orders.current,
				total:orders.total,
				pageSize:orders.pageSize
			})
		},function(){
			_util.showErrorMsg("获取订单失败")
		})
	}
}
$(function(){
	page.init()
})
