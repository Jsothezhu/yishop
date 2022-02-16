export default {
	state: () => ({
		addressList:[]
	}),
	mutations:{
		//删除state的地址
		delStateAddress(state,addressid){
			let remain = state.addressList.filter((item) => {
				if (item.address_id !== addressid) {
					return item
				}
			})
			state.addressList = remain
		}
		//设为默认
		
	},
	actions:{
		//初始化地址
		initAddress({state}){
			uni.$u.http.get('/v1/wxapp/getreceiveraddress?userid='+JSON.parse(uni.getStorageSync('userInfo')).id)
			.then((response)=>{
				state.addressList = response
			})
			.catch((e)=>{
				uni.showToast({
					icon:'none',
					title:e.data.msg
				})
			})
		},
		//删除地址
		delAddress({state,commit},addressid){
			uni.$u.http.delete('/v1/wxapp/delreceiveraddress',{
				addressid:addressid
			}).then((response)=>{
				commit('delStateAddress',addressid)
				uni.showToast({
					icon:"none",
					title:"删除成功"
				})
			}).catch((e)=>{
				uni.showToast({
					icon:"none",
					title:e.data.msg
				})
			}) 
		}
		//设为默认
		
		
	}
}