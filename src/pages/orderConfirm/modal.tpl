<div class="modal">
	<div class="modal-container">
		<div class="modal-header">
			<h2 class="modal-title">新增地址</h2>
			<i class="fa fa-close close-icon"></i>
		</div>
		<div class="modal-body">
			<div class="form">
				<div class="form-box">
					<h2 class="title">添加地址</h2>
					<div class="error-item hide">
						<i class="fa fa-minus-circle"></i>
						<p class="error-msg">error</p>
					</div>
					<div class="form-item">
						<label class="form-lable">
							<i class="fa fa-user stylefont"></i>
						</label>	
							<input type="text" name="name" value="{{data.name}}" class="form-content" placeholder="请输入收货人姓名">
					</div>
					<div class="form-item city-item">
						<label class="form-lable">
							<i class="fa fa-lock stylefont"></i>
						</label>	
							<select name="province" class="province-select">省份</select>
							<select name="city" class="city-select">城市</select>
					</div>
					<div class="form-item">
						<label class="form-lable">
							<i class="fa fa-building stylefont"></i>
						</label>	
							<input type="text" name="address" value="{{data.address}}" class="form-content" placeholder="请输入详细地址">
					</div>
					<div class="form-item">
						<label class="form-lable">
							<i class="fa fa-phone stylefont"></i>
						</label>	
							<input type="text" name="phone" value="{{data.phone}}" class="form-content" placeholder="请输入手机号">
					</div>
					<div class="form-item">
						<label class="form-lable">
							<i class="fa fa-envelope stylefont"></i>
						</label>	
							<input type="email" name="zip" value="{{data.zip}}" class="form-content" placeholder="请输入邮编，如100001">
					</div>
					<div class="btn-item">
						<a href="javascript:;" class="btn" id="btn-submit">添加</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>