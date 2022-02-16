<template>
	<view class="mt-1">
		<view class="bg-white" v-for="(item,index) in addressList" :key="index">
			<!-- 地址上面 -->
			<view class="d-flex">
				<view class="ml-2 my-1">
					<view>
						<text class="name mr-1">{{item.receiver}}</text>
						<text>{{item.receiver_phone}}</text>
						<text class="main-text-color ml-2" v-if="item.isdefault">默认</text>
					</view>
					<view>
						{{item.province}} {{item.city}} {{item.area}} {{item.detail}}
					</view>
				</view>
				<view class="d-flex a-center ml-auto flex-3" @tap="editAddress(item.address_id)">
					<image src="@/static/common/edit.png" style="width: 60rpx; height: 60rpx;"
					></image>
				</view>
			</view>
			<!-- 地址下面 -->
			<view v-if="showbottom" class="d-flex j-sb px-2">
				<text @tap="delAddress(item.address_id)">删除</text>
				<text>设为默认</text>
			</view>
		</view>
		
		<view class="position-fixed bottom-0 w-100 bg-white">
			<u-button type="warning" class="my-2" style="width: 50%;"
			text="添加新地址" @tap="addAddress()"></u-button>
		</view>
		
	</view>
</template>

<script>
	import {mapState,mapActions} from "vuex"
	export default {
		data() {
			return {
				showbottom:false
			}
		},
		computed:{
			...mapState({
				addressList:state=>state.address.addressList,
			})
		},
		methods: {
			...mapActions([
				'initAddress',
				'delAddress'
			]),
			editAddress(id){
				uni.navigateTo({
					url:"../addAddress/addAddress?addressid="+id
				})
			},
			addAddress(){
				uni.navigateTo({
					url:"../addAddress/addAddress"
				})
			}
		},
		onShow() {
			this.initAddress()
		},
		onNavigationBarButtonTap(e) {
		    this.showbottom = !this.showbottom
		},
		
	}
</script>

<style lang="scss" scoped>
.name{
	font-size: 1.1rem;
	font-weight: bolder;
}
</style>
