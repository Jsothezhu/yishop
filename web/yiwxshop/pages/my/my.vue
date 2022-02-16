<template>
	<view>
		<view class="w-100 top-img d-flex a-center">
			<view class="rounded-circle ml-5" 
			style="width: 150rpx;height: 150rpx;background-color: white;">
				
			</view>
			<!-- 把对象的key取出来，看看长度是不是为0 -->
			<view v-if="Object.keys(this.userInfo).length !== 0" class="d-flex flex-column mt-4">
				<text class="text-right font-lg ml-2">{{userInfo.nickname}}</text>
				<text class="ml-2">账号：{{userInfo.username}}</text>
			</view>
			<block v-else>
				<text class="text-right font-lg ml-2" @tap="login()">登录/注册</text>
			</block>
			<view class="right">
			</view>
		</view>
		<view @click="intoMyOrder()">
			<myOrder></myOrder>
		</view>
		<setList :list="list"></setList>
	</view>
</template>

<script>
	import myOrder from "@/components/my/myOrder"
	import setList from "@/components/my/setList"
	export default {
		components:{
			myOrder,
			setList
		},
		data() {
			return {
				userInfo:{},
				list:[
					{
						name:'通用设置',
						url:"",
					},
					{
						name:"收货地址",
						url:"../address/address",
					},
					{
						name:"退出",
					}
				]
				
			}
		},
		methods: {
			login(){
				uni.navigateTo({
					url:"/pages/login/login"
				})
				/* uni.login({
				provider:'weixin',
				success: (response) => {
					console.log(response);
				}}) */
			},
			//加入我的订单
			intoMyOrder(){
				uni.navigateTo({
					url:"/pages/myorder/myorder?status=all"
				})
			}
		},
		onShow() {
			if(uni.getStorageSync("userInfo")){
				console.log(1);
				this.userInfo = JSON.parse(uni.getStorageSync("userInfo"))
			}
			console.log(this.userInfo);
		}
	}
</script>

<style lang="scss" scoped>
.top-img{
	height: 350rpx;
	background: url("@/static/common/image/background.jpg") no-repeat;
	background-size: 100%;
	.right{
		width: 180rpx;
		height: 70rpx;
		border-top-left-radius: 50rpx;
		border-bottom-left-radius:50rpx;
		background-color: red;
		margin-left: auto;
	}
}
</style>
