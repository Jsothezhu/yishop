<template>
	<view>
	  <scroll-view class="bg-warning" style="height: 100rpx;" 
	  show-scrollbar scroll-x="true" scroll-left="120">
	  <view class="d-flex w-100">
	  	  <block v-for="(item,index) in status_list"  :key="index">
			<view class="bg-white text-center h-100" style="width: 20%;
			line-height: 100rpx;" :style="index==selectitem?'color:orange':''"
			@tap="switchtab(index,item.status)">{{item.title}}</view>
		  </block>
	  </view>
	  </scroll-view>
	  <!-- 名称 规格 数量 单价 图片 总价-->
	  <view class="my-2 bg-white" v-for="(item1,index1) in order" :key="index1"
	  @tap="inOrderDetail(item1.order_id)">
		  <view class="mt-2 mx-2">
		  	订单号：{{item1.order_id}}
		  </view>
		  <view class="w-100 d-flex p-2" style="box-sizing: border-box;" v-for="(item2,index2) in item1.order_items" :key="index2">
	  		<image :src="item2.descrip_pic" style="width:200rpx;height:200rpx" ></image>
	  		<view class="ml-2 flex-1">
	  			<view>
	  				<text class="title">{{item2.title}}11111</text>
	  				<view class="d-flex j-sb font mt-1">
	  					<text>规格:{{item2.sku_type}}X{{item2.count}}</text>
	  					<Price>{{item2.price}}</Price>
	  				</view>
	  			</view>
	  		</view>
	  	</view>
			<view class="d-flex j-sb mx-2">
				总价：<Price>{{item1.total_price}}</Price>
				
			</view>
	  </view>
	  	
	</view>
</template>

<script>
	import Price from "@/components/common/price"
	export default {
		components:{
			Price
		},
		data() {
			return {
				status_list:[{
					title:"全部",
					status:"all"
				},{
					title:"待付款",
					status:"pay"
				},{
					title:"待收货",
					status:"receivce"
				},{
					title:"退款中",
					status:"refund"
				},{
					title:"已完成",
					status:"complete"
				}],
				selectitem:0,
				order:[]
			}
		},
		methods: {
			getOrder(){
				let status = "";
				// #ifdef H5 || APP-PLUS
				 status = this.$route.query.status
				// #endif
				// #ifdef MP-WEIXIN 
					console.log(this.$mp);
					status = this.$mp.query.status
				// #endif
				let userInfo = JSON.parse(uni.getStorageSync("userInfo")) 
				if(userInfo && status){
					uni.$u.http.get("/v1/wxapp/getuserorder?user_id="+userInfo.id+"&status="+status)
					.then((response)=>{
						this.order = response
					})
					.catch((error)=>{
						uni.showToast({
							title:error,
							icon:"none"
						})
					})
				}
			},
			switchtab(index,status){
				this.selectitem = index
				//#ifdef H5
				this.$route.query.status = status
				//#endif
				//#ifdef MP-WEIXIN
				this.$mp.query.status = status
				//#endif
				this.getOrder()
			},
			inOrderDetail(order_id){
				uni.navigateTo({
					url:"/pages/orderdetail/orderdetail?order_id="+order_id
				})
			}
		},
		onLoad() {
			// #ifdef H5
			this.selectitem = this.$route.query.selectItem
			// #endif
			//#ifdef MP-WEIXIN
			this.selectitem = this.$mp.query.status
			// #endif
			this.getOrder()
		}
	}
</script>

<style>

</style>
