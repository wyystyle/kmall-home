require('./index.css')
require ('common/nav');
require ('common/search');
var tpl = require('./index.tpl');
require('util/pagination');
var _util = require('util');
var _payment = require('service/payment');
var _side = require('common/side');

var page={
	params:{
		orderNo:_util.getParamFromUrl('orderNo')
	},
	init:function(){
		this.onload();
	},
	onload:function(){
		if(this.params.orderNo){
			this.loadPaymentDetail()
		}
	},
	loadPaymentDetail:function(){
		var _this = this;
		_payment.getPaymentInfo(this.params.orderNo,function(payment){
			var html = _util.render(tpl,payment);
			$('.payment-box').html(html);
			_this.listenPaymentStatus();
		},function(){
			$('.payment-box').html('<p class="empty-message">获取支付信息失败,刷新试试看!!!</p>')
		})
	},
	listenPaymentStatus:function(){
		var _this = this;
		window.setInterval(function(){
			_payment.getPaymentStatus({orderNo:_this.params.orderNo},function(result){
				if(result){
					window.location.href="./result.html?type=payment&orderNo="+_this.params.orderNo;
				}
			})
		},5000)
	}
}
$(function(){
	page.init()
})
