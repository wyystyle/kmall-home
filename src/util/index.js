var Hogan = require('hogan.js');
var _util={
	request:function(params){
		var _this=this;
		$.ajax({
			url:params.url || '',
			method:params.method || 'get',
			dataType:params.dataType || 'json',
			data:params.data || '',
			success:function(result){
				if(result.code==0){
					params.success &&params.success(result.data)
				}
				else if(result.code==10){
					_this.doLogin()
				}
				else if(result.code==1){
					params.error && params.error(result.message)
				}
			},
			error:function(err){
				params.error && params.error(err.statusText)
			}
		})
	},
	showErrorMsg:function(msg){
		alert(msg)
	},
	confirm:function(msg){
		return window.confirm(msg)
	},
	doLogin:function(){
		window.location.href = './userlogin.html?redirect='+encodeURIComponent(window.location.href)
	},
	validate:function(value,type){
		var value = $.trim(value);
		if(type === 'require'){
			return !!value
		}
		if(type ==='username'){
			return /^[a-zA-Z0-9_]{3,10}$/.test(value)
		}
		if(type ==='password'){
			return /^[a-zA-Z0-9_]{3,10}$/.test(value)
		}
		if(type ==='phone'){
			return /^[1][3,4,5,7,8][0-9]{9}$/.test(value)
		}
		if(type ==='email'){
			return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)
		}
	},
	getParamFromUrl:function(key){
		var query = window.location.search.substr(1);
		var reg= new RegExp('(^|&)'+key+'=([^&]*)(&|$)');
		var result = query.match(reg);
		return result ? decodeURIComponent(result[2]) :null;
	},
	goHome:function(){
		window.location.href='/';
	},
	render:function(tpl,data){
		var template = Hogan.compile(tpl);
		var html = template.render(data);
		return html;
	}
}
module.exports=_util