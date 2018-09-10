require('./index.css');
var _util=require('util');
var tpl=require('./index.tpl');
(function($){
	function Pagination($elem){
		this.$elem = $elem;
		this.bindEvent();
	}
	Pagination.prototype = {
		constructor:Pagination,
		render:function(options){
			//计算总页数
			var pages = Math.ceil(options.total / options.pageSize);
			if(pages<=1){
				return;
			}
			var start=options.current - options.range>1 ?options.current - options.range : 1;
			var end=options.current + options.range < pages ? options.current + options.range : pages; 
			var prev = options.current - 1;
			var next = options.current + 1;
			var hasPrev = prev > 0 ? true : false;
			var hasNext = prev <= pages ? true : false;
 
			var pageArray=[];
			pageArray.push({
				name:'上一页',
				value:prev,
				disabled:!hasPrev
			})
			for(var i=start;i<=end;i++){
				pageArray.push({
					name:i,
					value:i,
					active:(i==options.current)

				})
			}
			pageArray.push({
				name:'下一页',
				value:next,
				disabled:!hasNext
			})


			var html = _util.render(tpl)
			this.$elem.html(html)
		},
		bindEvent:function(){
			this.$elem.on('click','.page-item',function(){
				var _this=$(this);
				this.$elem.on('click','.page-item',function(){
					var $this=$(this);
					_this.trigger('page-change',[$this.data('value')])
				})
			})
		}
	}
/*	var defaultPageArray={
		current:options.current,
		total:options.total,
		pageSize:options.pageSize,
		range:3
	}*/

	$.fn.extend({
		pagination:function(fn,options){
			return this.each(function(){
				var $this=$(this);
				var pagination = $this.data('pagination')
				if(!pagination){
					pagination = new Pagination($this);
					$this.data('pagination',pagination)
				}
				if(typeof pagination[fn] == 'function'){
					pagination[fn](options)
				}
			})
		}
	})
})(window.jQuery)