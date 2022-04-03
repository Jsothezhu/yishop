<template>
	<view style="padding-bottom: 100rpx;">
		<view class="w-100 bg-warning font-big d-flex a-center j-center" style="height:340rpx;color: white;">
			<view v-if="order.ship_status === 'pay'" class="d-flex flex-column a-center">
				<view>
					未付款
				</view>
				<view class="font-lg">
					{{time_str}}之后订单将取消
				</view>
			</view>
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
				<u-button v-if="order.ship_status === 'receivce'" text="确认收货" @tap="comfireGetGood()"
				:plain="true" :hairline="true" shape="circle"
				style="width: 170rpx; height: 80rpx;"></u-button>
				<u-button v-if="order.ship_status === 'pay'" text="立即支付" @tap="showComfire = true"
				:plain="true" :hairline="true" shape="circle"
				style="width: 170rpx; height: 80rpx;"></u-button>
				<u-button v-else text="删除订单"
				:plain="true" :hairline="true" shape="circle"
				style="width: 170rpx; height: 80rpx;"></u-button>
			</view>			
		</view>
		<u-modal :show="showComfire" content="要支付订单吗？" title="支付订单"
		 confirmText="确认支付" cancelText="取消支付" @confirm="comfirePayOrder()"
		 @cancel="showComfire = false" :showCancelButton="true" buttonReverse></u-modal>
	</view>
</template>

<script>
	import {mapState} from "vuex"
	import moment from "moment"
	import Price from "@/components/common/price"
	export default {
		components:{
			Price,
		},
		data() {
			return {
				order:{},
				remain_time:"",
				time_str:'',
				showComfire:false,
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
			},
			//确认付款
			comfirePayOrder(){
				uni.$u.http.put("/v1/wxapp/getcomfireorder",{
					order_id:this.order.order_id,
					orderState:"cancal"
				})
				.then((response)=>{
					this.order.ship_status = "receivce"
					uni.showToast({
						icon:"none",
						title:"下单成功",
					})
				})
				.catch((error)=>{
					uni.showToast({
						icon:"none",
						title:"下单失败",
					})
				})
			},
			//取消订单倒计时
			cancelTime(){
				if(this.remain_time > 0){
					this.remain_time--;
					return this.time_str = `${Math.floor(this.remain_time/60)}:${Math.floor(this.remain_time%60)}`;
				}
				return this.time_str = 0
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
				/**
				 *1获取订单时间算取消时间（时间戳）
				 *2获取当前时间（时间戳）
				 *3结束时间戳-当前时间戳
				 **/
				let order_time = moment(this.order.create_time);
				let now_time = moment().toDate().getTime();
				let end_time = order_time.add(30,'m').toDate().getTime();
				this.remain_time = (end_time - now_time)/1000//剩余时间
			}).then(()=>{
				//设置定时器，如果时间为0则关闭定时器,并修改订单状态
				let timer = setInterval(()=>{
					this.cancelTime()
				},1000)
				 if(this.remain_time <= 0){
					this.order.ship_status = 'cancal'
					clearInterval(timer)
				}
			}).catch((error)=>{
				uni.showToast({
					title:"获取订单失败",
					icon:"none"
				})
			})
		},
	}
</script>

<style>

</style>
