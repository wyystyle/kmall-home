

var _util = require('util');
var _cities = require('util/cities');

var _order = require('service/order');
var _shipping = require('service/shipping');

var modalTpl = require('./modal.tpl');
var formError={
	show:function(msg){
		$('.error-item')
		.show()
		.find('.error-msg')
		.text(msg)
	},
	hide:function(){
		$('.error-item')
		.hide()
		.find('.error-msg')
		.text('')
	}
}
var _modal={

	show:function(options){
		this.$box=$('.modal-box');
		this.options = options;
		this.loadModal();
		this.bindEvent();
	},
	bindEvent:function(){
		var _this = this
		this.$box.find('.close-icon').on('click',function(){
			_this.hide();
		})
		var $provincesSelect = this.$box.find('.province-select');
		$provincesSelect.on('change',function(){
			_this.loadCities($provincesSelect.val())
		});
		this.$box.find('#btn-submit').on('click',function(){
			_this.submit();
		})

	},
	loadModal:function(){
		var html = _util.render(modalTpl,{
			data:this.options.data || {}
		});

		this.$box.html(html);
		this.loadProvinces();
	},
	loadProvinces:function(){
		var provinces = _cities.getProvinces();
			var provincesSelectOptions = this.getSelectOptions(provinces);
			this.$box.find('.province-select').html(provincesSelectOptions);
		if(this.options.data && this.options.data.province){	
			this.$box.find('.province-select').val(this.options.data.province);
			this.loadCities(this.options.data.province);
		}
		
	},
	loadCities:function(provinceName){
			var cities = _cities.getCities(provinceName)
			var citiesSelectOptions = this.getSelectOptions(cities);
			this.$box.find('.city-select').html(citiesSelectOptions);
			if(this.options.data && this.options.data.city){
				this.$box.find('.city-select').val(this.options.data.city);
			}
	},
	getSelectOptions:function(arr){
		let html = '<option value="">请选择</option>';
		for(var i = 0;i<arr.length;i++){
			html += '<option value="'+arr[i]+'">'+arr[i]+'</option>';
		}
		return html;
	},
	hide:function(){
		this.$box.empty()
	},
	submit:function(){
		var _this = this;
		var formDate={
				name:$('[name = "name"]').val(),	
				province:$('[name="province"]').val(),
				city:$('[name="city"]').val(),
				address:$('[name="address"]').val(),
				zip:$('[name="zip"]').val(),
				phone:$('[name="phone"]').val()
			}
		var validataResult = this.validate(formDate);
		if(validataResult.status){
			formError.hide();
			if(this.options.data){
				formDate.shippingId = this.options.data._id;
				_shipping.editShipping(formDate,function(shippings){
					_util.showSuccessMsg('修改地址成功');
					_this.hide();
					_this.options.success(shippings);
				},function(){
					formError.show()
				})
			}else{
				_shipping.addAddress(formDate,function(shippings){
					_util.showSuccessMsg('添加地址成功');
					_this.hide();
					_this.options.success(shippings);	
				},function(msg){
					formError.show(msg)
				})
			}

		}else{
			formError.show(validataResult.msg)
		}
	},
	validate:function(formDate){
		var result= {
			status:false,
			msg:''
		}
		if(!_util.validate(formDate.name,'require')){
			result.msg='姓名不能为空';
			return result
		}
		if(!_util.validate(formDate.name,'name')){
			result.msg='姓名格式错误';
			return result
		}
		if(!_util.validate(formDate.phone,'require')){
			result.msg='手机号不能为空';
			return result
		}
		if(!_util.validate(formDate.phone,'phone')){
			result.msg='手机号格式错误';
			return result
		}
		if(!_util.validate(formDate.address,'require')){
			result.msg='地址不能为空';
			return result
		}
		result.status = true;
		return result	
	}

}
module.exports = _modal;