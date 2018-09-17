		{{#notEmpty}}
		<h2 class="panel-header">订单列表</h2>
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
		{{#list}}
			<ul class="order-title">
				<li class="order-no">
					<span class="lable">订单号:</span>
					<span class="text">{{orderNo}}</span>
				</li>
				<li class="order-creat-time">
					<span class="lable">创建时间:</span>
					<span class="text">{{creatTime}}</span>
				</li>
				<li class="order-no">
					<span class="lable">订单状态:</span>
					<span class="text">{{statusDesc}}</span>
				</li>
				<li class="order-no">
					<span class="lable">收件人:</span>
					<span class="text">{{shipping.name}}</span>
				</li>
				<li class="order-no">
					<a href="./orderDetail.html?orderNo={{orderNo}}">查看详情</a>
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
		<ul class="product-footer">	
			<li class="product-submit">
				<span class="total-price-text">总价:</span>
			 	<span class="total-price">￥{{payment}}</span>
			 	<a href="./payment.html?orderNo={{orderNo}}" class="btn btn-submit">去支付</a>
			</li>
		</ul>
		{{/list}}
		{{/notEmpty}}
		{{^notEmpty}}
			<p class="empty-message">您还没有订单!!!</p>

		{{/notEmpty}}