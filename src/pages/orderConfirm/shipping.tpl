<div class="panel">
	<h2 class="panel-header">送货地址</h2>
	<div class="pandel-body">
		{{#shippings}}
		{{#isActive}}
			<div class="shipping-item active" data-shipping-id="{{_id}}">
				<h3 class="shipping-title">{{provice}} {{city}} {{name}}</h3>
				<p class="shipping-detail">
					{{provice}} {{city}} {{address}} {{phone}}
				</p>
				<div class="shipping-footer">
					<span class="shipping-edit">编辑</span>
					<span class="shipping-delete">删除</span>
				</div>
			</div>
		{{/isActive}}
		{{^isActive}}
			<div class="shipping-item" data-shipping-id="{{_id}}">
				<h3 class="shipping-title">{{provice}} {{city}} {{name}}</h3>
				<p class="shipping-detail">
					{{provice}} {{city}} {{address}} {{phone}}
				</p>
				<div class="shipping-footer">
					<span class="shipping-edit">编辑</span>
					<span class="shipping-delete">删除</span>
				</div>
			</div>
		{{/isActive}}
		
		{{/shippings}}
		<div class="shipping-add">
			<i class="fa fa-plus"></i>
			<p class="shipping-add-text">添加地址</p>
		</div>
	</div>
</div>