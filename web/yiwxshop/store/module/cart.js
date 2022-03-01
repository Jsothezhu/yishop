export default {
	state: () => ({
		goodlist: [],
		allCheck: false,
		totalMoney:0,
	}),
	getters:{
		//计算总价
		getTotalMoney:state=>{
			let money = 0
			for(let item of state.goodlist){
				if(item.checked == true){
					money += parseFloat(item.buy_price)*item.buy_count
				}
			}
			state.totalMoney = money	
			return parseFloat(state.totalMoney).toFixed(2).toLocaleString()
		}
	},
	mutations:{
		//初始化购物车界面
		initGoodList(state, list) {
			state.goodlist = list
		},
		//全选与全不选
		allChecked(state){
			state.allCheck = !state.allCheck
			state.goodlist.forEach((item)=>{
				item.checked = state.allCheck
			})
		},
		//判断是否为全选
		isAllCheck(state){
			state.allCheck = state.goodlist.every((item)=>{
				return item.checked === true
			})
		}
		
	},
	actions: {
		getGoodList(context) {
			if (uni.getStorage('userInfo')) {
				let info = JSON.parse(uni.getStorageSync('userInfo'))
				uni.$u.http.get('/v1/wxapp/cart?user_id=' + info.id).then((response) => {
					//提交购物车数据
					context.commit('initGoodList', response)
				}).catch((e) => {
					uni.showToast({
						icon: "none",
						title: e.data.msg
					})
				})
			}
		},
		//删除购物车
		deleteCart({state}) {
			let remain = state.goodlist.filter((item) => {
				if (item.checked == false) {
					return item
				}
			})
			//cartid是个数组,保存每一项checked为true的cart_id
			let cartids = []
			state.goodlist.forEach((item) => {
				if (item.checked) {
					cartids.push(item.cart_id)
				}
			})
			uni.$u.http.delete('/v1/wxapp/delcart', {
				cartid: cartids
			}).then((response) => {
				//过滤checked为ture的
				state.goodlist = remain
				console.log(this.route);
				if(this.route !== "/page/neworder/neworder"){
					uni.showToast({
					icon: "none",
					title: "删除成功"
					})
				}
			}).catch((e) => {
				uni.showToast({
					icon: "none",
					title: e.data.msg
				})
			})
			//更新vuex的购物车
		},	
	}
}
