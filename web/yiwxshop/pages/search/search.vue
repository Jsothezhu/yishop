<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
			<view class="w-100 d-flex bg-white" style="height: 44px;">
				<u-search placeholder="搜索内容" v-model="keyword" @search="clickSearch()"></u-search>
			</view>
		<!-- #endif -->
		<view class="w-100 bg-white pt-3" style="height: 92vh;box-sizing: border-box;">
			<view class="d-flex flex-column" v-if="history.length !== 0">
				<view class="w-100 d-flex j-sb px-3 py-1" style="height: 75rpx;box-sizing: border-box;">
					<text>搜索历史</text>
					<text>删除</text>
				</view>
				<view class="px-3 mt-1">
					<view class="bg-light-secondary d-inline-block p-2 mt-2 mr-2 rounded" 
					style="height: 50upx;" v-for="(item,index) in history"
					@click="historyClick(item)">
						{{item}}
					</view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				history:[],
				keyword:"",
			}
		},
		methods: {
			search(keyword){
				if(this.history.includes(keyword)){
					//先找到元素的索引，然后删除该元素，最后再最前面插入
					let index = this.history.indexOf(keyword)
					this.history.splice(index,1)
					this.history.unshift(keyword)
				}else{
					this.history.unshift(keyword)
				}
				uni.setStorageSync("history",this.history)
				uni.navigateTo({
					url:"../searchlist/searchlist?keyword="+keyword
				})
			},
			//点击历史
			historyClick(keyword){
				let index = this.history.indexOf(keyword)
				this.history.splice(index,1)
				this.history.unshift(keyword)
				uni.setStorageSync("history",this.history)
				uni.navigateTo({
					url:"../searchlist/searchlist?keyword="+keyword
				})
			},
			//微信点击搜索兼容
			clickSearch(){
				if(this.keyword === ""){
					return uni.showToast({
						icon:'none',
						title:"搜索不能为空",
						duration:2000
					})
				}
				this.search(this.keyword)
			}
		},
		onShow() {
			if(uni.getStorageSync("history")){
				this.history = uni.getStorageSync("history");
			}
		},
		onNavigationBarSearchInputChanged(e) {
			this.keyword = e.text
		},
		onNavigationBarButtonTap(e) {
			if(this.keyword === ""){
				return uni.showToast({
					icon:'none',
					title:"搜索不能为空",
					duration:2000
				})
			}
			this.search(this.keyword)
		} 
	}
</script>

<style>

</style>
