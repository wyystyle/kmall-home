	{{#order}}

		{{#list}}
		<h2 class="panel-header">订单详情</h2>
			<ul class="order-title">
				<li class="order-no">
					<span class="lable">订单号:</span>
					<span class="text">{{orderNo}}</span>
				</li>
				<li class="order-creat-time">
					<span class="lable">创建时间:</span>
					<span class="text">{{creatTime}}</span>
				</li>
				<li class="order-status">
					<span class="lable">订单状态:</span>
					<span class="text">{{statusDesc}}</span>
				</li>
				<li class="order-man">
					<span class="lable">收件人:</span>
					<span class="text">{{shipping.name}}</span>
				</li>
				<li class="order-address">
					<span class="lable">收件人地址:</span>
					<span class="text">{{shipping.province}} {{shipping.city}}</span>
				</li>
				<li class="order-phone">
					<span class="lable">收件人手机:</span>
					<span class="text">{{shipping.phone}}</span>
				</li>
				<li class="order-zip">
					<span class="lable">收件人邮编:</span>
					<span class="text">{{shipping.zip}}</span>
				</li>
				<li class="order-payment">
					<span class="lable">总计:</span>
					<span class="text">{{payment}}</span>
				</li>
				<li class="order-opreation">
					{{#needPay}}
					<a href="./payment.html?orderNo={{orderNo}}">去支付</a>
					{{/needPay}}
					{{#canCancel}}
					<a href="javascript:;" class="btn-cancel">取消支付</a>
					{{/canCancel}}
				</li>
			</ul>


		<ul class="product-title clearfix">

			<li class="product-info">
				商品
			</li>
			<li class="product-price">
				单价
			</li>
			<li class="product-count">
				数量
			</li>
			<li class="product-totalPrice">
				小计
			</li>
		</ul>			

		{{#productList}}
		<ul class="product-item">

			<li class="product-info">
				
					<img src="{{image}}" alt="">
					<span>{{name}}</span>
			</li>
			<li class="product-price">
				￥{{price}}
			</li>
			<li class="product-count" data-shopnum="{{shopnum}}">
				<input type="text" value="{{count}}" class="count-input" readonly />
			</li>
			<li class="product-totalPrice">
				￥{{totalPrice}}
			</li>	
		</ul>
		{{/productList}}
		{{/list}}
{{/order}}
{{^order}}
	<p class="empty-message">您还没有订单!!!</p>

{{/order}}