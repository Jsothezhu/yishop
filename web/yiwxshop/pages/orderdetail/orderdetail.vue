<template>
	<view style="padding-bottom: 100rpx;">
		<view class="w-100 bg-warning font-big d-flex a-center j-center" style="height:340rpx;color: white;">
			<view v-if="order.ship_status === 'pay'">未付款</view>
			<view v-if="order.ship_status === 'receivce'">订单正在运输</view>
			<view v-if="order.ship_status === 'complete'">交易成功</view>
			<view v-if="order.ship_status === 'refund'">退款中</view>
			<view v-if="order.ship_status === 'cancal'">订单已取消</view>
		</view>
		<view class="bg-white mt-1 p-2 font" style="box-sizing: border-box;">
			<view>
				<view class="d-flex">
					<view class="flex-1" style="font-size: 0.9rem;">
						<view>
							收货人 : {{order.receiver}}
						</view>
						<view>
							收货地址: {{order.address}}
						</view>	
					</view>
					<view class="font-lg d-flex a-center">
						>
					</view>
				</view>
			</view>
		</view>
		<view class="w-100 bg-white my-2">
			<view class="w-100 d-flex p-2" style="box-sizing: border-box;" v-for="(item1,index) in order.OrderItems" :key="index">
				<image :src="item1.descrip_pic" style="width:200rpx;height:200rpx" ></image>
				<view class="ml-2 flex-1">
					<view>
						<text class="title">{{item1.title}}</text>
						<view class="d-flex j-sb font mt-1">
							<text>规格:{{item1.sku_type}}X{{item1.count}}</text>
							<text><Price>{{item1.price}}</Price></text>
						</view>
					</view>
				</view>
			</view>
			<view class="mx-2 d-flex j-sb a-center">
				实际付款:<Price>{{order.total_price}}</Price>
			</view>
		</view>
		<view class="position-fixed bottom-0 d-flex bg-white j-sb w-100 a-center px-2" style="height: 100rpx;box-sizing: border-box;">
			<text>更多</text>
			<view>
				<u-button v-if="order.ship_status !== 'complete'" text="确认收货" @tap="comfireGetGood()"
				:plain="true" :hairline="true" shape="circle"
				style="width: 170rpx; height: 80rpx;"></u-button>
				<u-button v-else text="删除订单"
				:plain="true" :hairline="true" shape="circle"
				style="width: 170rpx; height: 80rpx;"></u-button>
			</view>
			
		</view>
	</view>
</template>

<script>
	import {mapState} from "vuex"
	import Price from "@/components/common/price"
	export default {
		components:{
			Price,
		},
		data() {
			return {
				order:{}
			}
		},
		methods: {
			//确认收货
			comfireGetGood(){
				uni.$u.http.put("/v1/wxapp/getcomfireorder",{
					order_id:this.order.order_id,
					orderState:"complete"
				})
				.then((response)=>{
					console.log(response);
				})
				.catch((error)=>{
					console.log(error);
				})
				console.log("确认收货");
			}
		},
		onLoad() {
			let order_id = "";
			//#ifdef H5
			order_id = this.$route.query.order_id
			//#endif
			//#ifdef MP-WEIXIN
			order_id = this.$mp.query.order_id
			//#endif
			uni.$u.http.get("/v1/wxapp/getorder?order_id="+order_id).then((response)=>{
				this.order = response
				console.log(this.order);
			}).catch((error)=>{
				uni.showToast({
					title:"获取订单失败",
					icon:"none"
				})
			})
		}
	}
</script>

<style>

</style>
