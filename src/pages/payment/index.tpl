<p class="title">您的订单提交成功,订单号是：{{orderNo}}</p>
<p class="tips">请尽快扫描下面的二维码支付</p>
{{#payment}}
<img src="{{qrUrl}}" alt="支付宝支付二维码">
{{/payment}}