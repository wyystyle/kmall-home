<ul>
	{{#list}}
		<li class="product-item">
			<a href="./detail.html?productId={{_id}}">
				<img class="product-img" src="{{images}}" alt="">
				<p class="product-price">￥{{price}}</p>
				<p class="product-name">{{name}}</p>	
			</a>
		</li>
	{{/list}}
</ul>
{{^list}}
<p class="empty-message">您要找的商品去火星了</p>
{{/list}}
