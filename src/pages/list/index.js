require('./index.css');
require ('common/nav');
require ('common/search');
require ('common/footer');

require('util/pagination')

var _util = require('util');
var _user = require('service/user.js');
var _product = require('service/product');
var tpl = require('./index.tpl');

var page={
	listParams:{
		keyword:_util.getParamFromUrl('keyword') || '',
		catergoryId:_util.getParamFromUrl('catergoryId') || '',
		page:_util.getParamFromUrl('page') || 1,
		orderBy:_util.getParamFromUrl('orderBy') || 'default'
	},
	init:function(){
		this.initPagination();
		this.bindEvent();
		this.loadProductList();
	},
	initPagination:function(){
		var _this = this;
		var $pagination=$('pagination-box');
		$pagination.on('page-change',function(e,value){
			_this.listParams.page=value;
		})
		$pagination.pagination();
	},	
	bindEvent:function(){
		var _this =this;
		$('.sort-item').on('click',function(){
			var $this = $(this);
			if($this.hasClass('default')){
				if($this.hasClass('active')){
					return
				}else{
					$this
					.addClass('active')
					.siblings('.sort-item')
					.removeClass('active');
					_this.listParams.orderBy = 'default'
				}
			}
			else if($this.hasClass('price')){
				$this.addClass('active')
				.siblings('.sort-item')
				.removeClass('active');
				if(!$this.hasClass('asc')){
					$this.addClass('asc')
					.removeClass('desc');
					_this.listParams.orderBy = 'price_asc';
				}else{
					$this.addClass('desc')
					.removeClass('asc');
					_this.listParams.orderBy = 'price_desc';
				}
			}
			_this.loadProductList();
		});
	},
	loadProductList:function(){
		this.listParams.catergoryId
		? (delete this.listParams.keyword)
		: (delete this.listParams.catergoryId);

		_product.getProductList(this.listParams,function(result){
			console.log(result)
			var html=_util.render(tpl,{
				list:result.list.map(function(product){
					if(product.images){
						product.images=product.images.split(',')[0];
					}else{
						/*product.image=require('')*/
					}
					return product
				})
			});
			$('.product-list-box').html(html);
			$('.pagination-box').pagination('render',{
				current:result.current,
				total:result.total,
				pageSize:result.pageSize
			})
		},function(){

		})
	}
}
$(function(){
	page.init()
})


	
