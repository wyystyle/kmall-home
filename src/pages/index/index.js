
require('./index.css')
require ('common/nav');
require ('common/search');
require ('common/footer');
var _keyword = require('./keyword.tpl');
var _carousel = require('./carousel.tpl');
var _floor = require('./floor.tpl');
require('util/carousel');

var _util = require('util');
var _user = require('service/user.js');
var page={
	keywords:[
		{item:[{name:'手机 /'},{name:'Iphone'}]},
		{item:[{name:'家电 /'},{name:'五金电子'}]},
		{item:[{name:'百货 /'},{name:'家饰'}]},
		{item:[{name:'餐厨 /'},{name:'美食'}]},
		{item:[{name:'家庭保健 /'},{name:'生鲜'}]},
		{item:[{name:'办公 /'},{name:'DIY'}]},
		{item:[{name:'家具 /'},{name:'家饰'}]},
		{item:[{name:'鲜花 /'},{name:'农资'}]},
		{item:[{name:'宠物 /'},{name:'零食'}]}
	],
	carousel:[
		{catergoryId:'111',image:require('images/carousel/carousel01.jpg')},
		{catergoryId:'22',image:require('images/carousel/carousel02.jpg')},
		{catergoryId:'1131',image:require('images/carousel/carousel03.jpg')}
	],
	floor:[
		{
			title:'F1 床套',
			item:[
				{catergoryId:'111',text:'北极绒家纺旗舰店',image:require('images/floor/floor-01.jpg')},
				{catergoryId:'222',text:'北极绒家纺旗舰店',image:require('images/floor/floor-02.jpg')},
				{catergoryId:'113331',text:'北极绒家纺旗舰店',image:require('images/floor/floor-03.jpg')},
				{catergoryId:'1141',text:'北极绒家纺旗舰店',image:require('images/floor/floor-04.jpg')},
				{catergoryId:'1121',text:'北极绒家纺旗舰店',image:require('images/floor/floor-05.jpg')}
			]
		},
		{
			title:'F2 服装',
			item:[
				{catergoryId:'111',text:'北极绒家纺旗舰店',image:require('images/floor/floor-06.jpg')},
				{catergoryId:'222',text:'北极绒家纺旗舰店',image:require('images/floor/floor-07.jpg')},
				{catergoryId:'113331',text:'北极绒家纺旗舰店',image:require('images/floor/floor-08.jpg')},
				{catergoryId:'1141',text:'北极绒家纺旗舰店',image:require('images/floor/floor-09.jpg')},
				{catergoryId:'1121',text:'北极绒家纺旗舰店',image:require('images/floor/floor-10.jpg')}
			]
		},
		{
			title:'F3 家电',
			item:[
				{catergoryId:'111',text:'华为',image:require('images/floor/floor-11.jpg')},
				{catergoryId:'222',text:'荣耀',image:require('images/floor/floor-12.jpg')},
				{catergoryId:'113331',text:'空调',image:require('images/floor/floor-13.jpg')},
				{catergoryId:'1141',text:'洗衣机',image:require('images/floor/floor-14.jpg')},
				{catergoryId:'1121',text:'电视',image:require('images/floor/floor-15.jpg')}
			]
		}
	],
	init:function(){
		this.loadKeyword();
		this.loadCarousel();
		this.loadFloor();
	},
	loadKeyword:function(){
		var html = _util.render(_keyword,{
			keywords:this.keywords
		});
		$('.keywords').html(html)
	},
	loadCarousel:function(){
		var html = _util.render(_carousel,{
			carousel:this.carousel
		});
		$('.carousel').html(html);
		var $carousel =$('.carousel').unslider({
			dots:true,
			keys:true
		});
		$('.arrow').on('click',function(){
			let direction = $(this).hasClass('next') ? next : prev
			$carousel.data('unslider')[direction]();
		})
	},
	loadFloor:function(){
		var html = _util.render(_floor,{
			floor:this.floor
		});
		$('.floor-wrap').html(html)
	}
}
$(function(){
	page.init()
})


	
