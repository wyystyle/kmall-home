<div class="product-intro">
	<div class="product-img">
		<div class="product-main-img">
			<img src="{{mainImg}}" alt="" class="product-main-img-item">
		</div>
		<ul class="product-small-img">
			{{#images}}
			<li class="product-small-img-item">
				<img src="{{.}}" alt="">
			</li>
			{{/images}}
		</ul>
	</div>
	<div class="product-info clearfix">
			<h2 class="product-name">{{name}}</h2>
			<p class="product-description">{{Sketch}}</p>

		<div class="product-info-item">
			<span class="lable">价格:</span>
			<span class="info">￥{{price}}元</span>
		</div>
		<div class="product-info-item">
			<span class="lable">库存:</span>
			<span class="info">{{shopnum}}件</span>
		</div>
		<div class="product-info-item">
			<span class="lable">数量:</span>
			<input type="text" class="count-input" value="1" readonly>
			<span class="count-btn plus">+</span>
			<span class="count-btn minus">-</span>
		</div>
		<div class="cart-item">
			<a href="javascript:;" class="btn add-cart-btn">添加到购物车</a>
		</div>
	</div>
	<div class="product-detail">
		<div class="tab">
			<ul class="tab-list">
				<li class="tab-item">商品详情</li>
				<p class="product-detailes">{{{details}}}</p>
			</ul>
		</div>
	</div>

</div>