<template>
	<view class="d-flex w-100 bg-white flex-column">
		<view class="d-flex a-center border-bottom" style="height: 80rpx;">
			<text class="ml-2">我的订单</text>
		</view>
		<view class="d-flex j-sb mx-2">
			<view v-for="(item,index) in shop_status" :key="index" 
			style="width: 100rpx;display: flex;flex-direction: column;"
			@tap.stop="intoMyOrder(item.status,index+1)">
				<image :src="item.src" style="width: 100rpx;height: 100rpx;"></image>
				<text class="text-center">{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				shop_status:[
					{ 
						name:"待付款",
						src:"../../static/common/image/order/daifukuan.png",
						status:'pay'
					},
					{
						name:"待收货",
						src:"../../static/common/image/order/daifahuo.png",
						status:'receivce'
					},
					{
						name:"退款中",
						src:"../../static/common/image/order/wodedaishouhuo.png",
						status:'refund'
					},
					{
						name:"已完成",
						src:"../../static/common/image/order/31daipingjia.png",
						status:'complete'
					}
				]
			}
		},
		methods:{
			intoMyOrder(status,index){
				uni.navigateTo({
					url:"/pages/myorder/myorder?status="+status+"&selectItem="+index,
				})
			}
		}
	}
</script>

<style>
</style>
