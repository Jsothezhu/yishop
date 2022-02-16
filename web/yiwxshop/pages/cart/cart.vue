<template>
	<view style="padding-bottom: 50px;">
		<!-- 购物车商品 -->
		<view class="bg-white mt-1 py-2 px-2 mx-2 d-flex rounded" 
		style="box-sizing: border-box;" v-for="(item,index) in goodlist" :key="index">
			<view class="d-flex a-center">
				<u-checkbox-group>
					<u-checkbox :checked="item.checked"
					 shape="circle" activeColor="#f29100" @change="changeCheck(item.cart_id)"
					></u-checkbox>
				</u-checkbox-group>
			</view>
			<image :src="item.good.good_pic"
			style="width: 220rpx;height: 220rpx;"></image>
			<view class="ml-1 d-flex flex-column flex-1">
				<view class="title">{{item.good.shop_name}}</view>
				<view class="mt-2 title bg-light text-center" style="color: #606266;"
				>{{item.sku_text}}</view>
				<view class="d-flex j-sb mt-1">
					<price class="font-lg">{{item.buy_price}}</price>
					<u-number-box inputWidth="25" button-size="25"
					 :max="item.good.max_count" v-model="item.buy_count"
					 @input="changeCount(item.cart_id,item.buy_count)"></u-number-box>
				<!-- 输入框发生改变时 -->
				</view>
			</view>
		</view>
		<!-- 底部结算 -->
		<view class="position-fixed bottom-0 d-flex w-100 bg-white bottom-button" >
			<view class="flex-1 j-sb d-flex a-center">
				<u-checkbox-group>
					<u-checkbox :checked="allCheck" 
					class="ml-2"
					@change="allChecked()"
					shape="circle" activeColor="#f29100" label="全选"
					></u-checkbox>					
				</u-checkbox-group>
				<price><text class="mr-2">{{getTotalMoney}}</text></price>
			</view>
			<view class="p-3 px-5 bg-secondary" style="color: white;"
			@tap="isEdit = !isEdit">
				编辑
			</view>
			<view class="p-3 px-5 bg-danger" style="color: white;" @click="isEdit? delCart():settleCart()">
				{{isEdit?'删除':'结算'}}
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState,mapActions,mapMutations,mapGetters } from "vuex"
	import price from "../../components/common/price"
	export default {
		components:{
			price
		},
		data() {
			return {
				isEdit:false,
				cl:2,
			}
		},
		computed:{
			...mapState({
				goodlist:state=>state.cart.goodlist,
				allCheck:state=>state.cart.allCheck
			}),
			...mapGetters([
				'getTotalMoney'
			]),
		},
		methods: {
			...mapActions([
				'getGoodList',
				'deleteCart'
			]),
			...mapMutations([
				'allChecked',
				'isAllCheck'
			]),
			getGood(){
				this.getGoodList()
			},
			settleCart(){
				let check=this.goodlist.some(item=>{
					if(item.checked == true){
						return true
					}
				})
				if(check){
					uni.navigateTo({
						url:"../neworder/neworder"
					})
				}else{
					uni.showToast({
						icon:"none",
						title:"请选择商品"
					})
				}
			},
			delCart(){
				this.deleteCart()
			},
			//改变商品数量
			changeCount(cart_id,buy_count){
				uni.$u.http.put("/v1/wxapp/altcartcount",{
					cart_id:cart_id,
					buy_count:buy_count
				})
			},
			//改变选中状态
			changeCheck(cart_id){
				this.goodlist.forEach((item)=>{
					if(item.cart_id === cart_id){
						item.checked = !item.checked
					}
				})
				this.isAllCheck()
			}
		},
		onShow() {
			this.getGood()
		}
	}
</script>

<style lang="scss" scoped>
	.title{
		font-size: 0.9rem;
		word-break: break-all; 
		overflow: hidden;
		-webkit-line-clamp:1;
		display: -webkit-box;
		-webkit-box-orient:vertical;
		text-overflow:ellipsis;
	}
	.bottom-button{
		height: 100rpx; 
		/* #ifndef MP-WEIXIN */
		margin-bottom: 50px;
		/* #endif */
	}

</style>