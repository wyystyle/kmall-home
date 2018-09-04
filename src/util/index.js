var _util={
	request(params){
		$.ajax({
			url:params.url || '',
			dataType:params.dataType || 'json',
			type:params.type || 'get',
			data:params.data || '',
			success:function(result){
				if(result.code==0){

				}else if(result.code==1){

				}else if(result.code==10){

				}
			}
			error:function(){
				
			}

		})
	}	

}