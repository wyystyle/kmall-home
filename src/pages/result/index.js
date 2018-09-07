require ('./index.css');
require('common/logo');
require('common/footer');
var _util = require('util');

$(function(){	
	var type = _util.getParamFromUrl('type') || 'default';
	$("."+type).show();
})

