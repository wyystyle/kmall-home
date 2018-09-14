var _util=require('util')
var _order={
	getProductList:function(success,error){
		console.log('aa')
		_util.request({
			url:'/order',
			success:success,
			error:error
		})
	},
	createOrder:function(data,success,error){
		_util.request({
			method:'post',
			url:'/order',
			data:data,
			success:success,
			error:error
		})
	}
}
module.exports=_order