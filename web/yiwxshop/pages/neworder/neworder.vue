<template>
	<view>
		<view class="bg-white mt-1 p-2 font" style="box-sizing: border-box;">
			<view v-for="(item,index) in addressList" :key="index">
				<view v-if="item.isdefault" class="d-flex">
					<view class="flex-1">
						<view>
							收货人 : {{item.receiver}} {{item.receiver_phone}}
						</view>
						<view>
							收货地址: {{item.province}}{{item.city}}{{item.area}}{{item.detail}}
						</view>	
					</view>
					<view class="font-lg d-flex a-center">
						>
					</view>
				</view>
			</view>
		</view>
		<!-- 两种情况：一购物车结算 二直接购买 订单商品-->
		<view class="w-100 bg-white my-2">
			<view class="w-100 d-flex p-2" style="box-sizing: border-box;" v-for="(item1,index) in checklist" :key="index">
				<image :src="item1.good.good_pic" style="width:200rpx;height:200rpx" ></image>
				<view class="ml-2 flex-1">
					<view>
						<text class="title">{{item1.good.shop_name}}11111</text>
						<view class="d-flex j-sb font mt-1">
							<text>规格:{{item1.sku_text}}X{{item1.buy_count}}</text>
							<text><Price>{{item1.buy_price}}</Price></text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="position-fixed w-100 d-flex font px-2 j-sb a-center bg-white bottom-0" 
		style="height: 100rpx;box-sizing: border-box;">
			<text>总价：{{totalprice}}</text>
			<view>
				<u-button style="width: 200rpx;height: 60%;" type="warning"
				@click="pay()">立即支付</u-button>
			</view>
		</view>
		<u-modal :show="show" content="要支付订单吗？" title="支付订单"
		 confirmText="确认支付" cancelText="取消支付" @confirm="confirmPay()"
		 @cancel="cancelPay()" :showCancelButton="true" buttonReverse></u-modal>
	</view>
</template>

<script>
	import { mapActions,mapState } from "vuex"
	import Price from "@/components/common/price"
	export default {
		components:{
			Price
		},
		data() {
			return {
				checklist:[],
				totalprice:0,//总价
				show:false
			}
		},
		computed:{
			...mapState({
				addressList:state=>state.address.addressList,
				goodlist:state=>state.cart.goodlist,
				//购物车
			})
		},
		methods: {
			...mapActions([
				'initAddress',
				'deleteCart'
			]),
			pay(){
				this.show = true
			},
			//确认支付
			confirmPay(){
				this.show = false
				//数据：用户id、收货人、地址、总价、商品id 规格 数量 价格
				let address = '';
				let receiver = '';
				let phone = "";
				for(let item of this.addressList){
					 if(item.isdefault){
						receiver = item.receiver
						phone = item.receiver_phone
						address = item.province+item.city+item.area+item.detail+""
					 }
				}
				uni.$u.http.post("/v1/wxapp/addorder",{
					user_id:JSON.parse(uni.getStorageSync("userInfo")).id || "",
					address:address,
					total_price:this.totalprice,
					goods_id:this.checklist.map(item=>{
							return item.good.goods_id
					}),//获取商品id
					sku_type:this.checklist.map(item=>{
						return item.sku_text
					}),
					count:this.checklist.map(item=>{
						return item.buy_count
					}),
					price:this.checklist.map(item=>{
						return item.buy_price
					}),
					status:"receivce",
					receiver:receiver,
					phone:phone
				})
				.then((response)=>{
					uni.showToast({
						icon:"none",
						title:"下单成功"
					})
					this.deleteCart()
					setTimeout(function (){
						uni.navigateTo({
							url:`../orderdetail/orderdetail?order_id=${response}`
						})
					},1000)
				}).catch((error)=>{
					uni.showToast({
						icon:"none",
						title:"没有库存了"
					})
				})
			},
			//取消支付
			cancelPay(){
				this.show = false
			}
		},
		onLoad(){
			//创建订单前先初始化地址
			this.initAddress()
			this.checklist.length = 0
			this.checklist = this.goodlist.filter((item)=>{
				if(item.checked == true){
					return item
				}
			})
			this.checklist.forEach((item)=>{
				this.totalprice += parseFloat(item.buy_price)*item.buy_count
			})
		}
	}
</script>

<style lang="scss" scoped>
	.font{
		font-size: 0.9rem;
	}
	.title{
		font-size: 0.9rem;
		word-break: break-all; 
		overflow: hidden;
		-webkit-line-clamp:2;
		display: -webkit-box;
		-webkit-box-orient:vertical;
		text-overflow:ellipsis;
	}
</style>
