var _util=require('util')
var _order={
	getProductList:function(success,error){
		_util.request({
			url:'/order',
			success:success,
			error:error
		})
	}
}
module.exports=_order