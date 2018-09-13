<div class="panel">
	<h2 class="panel-header">商品清单</h2>
	<div class="pandel-body">	
		{{#notEmpty}}
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
		{{#cartList}}
		<ul class="product-item" data-product-id="{{product._id}}">

			<li class="product-info">
				<a href="./detail.html?productId={{product._id}}" class="link">
					<img src="{{product.image}}" alt="">
					<span>{{product.name}}</span>
				</a>
			</li>
			<li class="product-price">
				￥{{product.price}}
			</li>
			<li class="product-count" data-shopnum="{{product.shopnum}}">
				<input type="text" value="{{count}}" class="count-input" readonly />
			</li>
			<li class="product-totalPrice">
				￥{{totalPrice}}
			</li>	
		</ul>
		{{/cartList}}
		<ul class="product-footer">	
			<li class="product-submit">
				<span class="total-price-text">总价:</span>
			 	<span class="total-price">￥{{totalCartPrice}}</span>
			 	<a href="javascript:;" class="btn btn-submit">提交订单</a>
			</li>
		</ul>
		{{/notEmpty}}
		{{^notEmpty}}
			<p class="empty-message">商品订单未被选中!!!
			<a href="./cart.html" class="btn gohome-btn">去购物车选择</a></p>

		{{/notEmpty}}

	</div>
</div>