<template>
	<view>
	<!-- #ifdef MP-WEIXIN -->
		<view class="w-100 d-flex bg-white" style="height: 44px;">
			<u-search placeholder="搜索内容" :disabled="true" @click="toSearch()"></u-search>
		</view>
	<!-- #endif -->
		<view style="padding-bottom: 120rpx;">
		<!-- 轮播图 -->
		<u-swiper :list = "swiperList"            
			indicator
            indicatorMode="line"
			:loading="this.swiperList.length == 0"
		></u-swiper>
		<!-- 菜单 -->
		<menus></menus>
		<!-- 商品卡片 -->
		<shopCard :digitalProduct="digitalProduct" title="电子产品"></shopCard>
		<shopCard :digitalProduct="houseHoldAppliances" title="家用电器"
		class="mt-2"></shopCard>
		</view>
	</view>
	
		
</template>

<script>
	import menus from "@/components/index/menus"
	import shopCard from "@/components/index/shopCard"
	export default {
		components:{
			menus,
			shopCard
		},
		data() {
			return {
				swiperList:[],
				digitalProduct:[],
				houseHoldAppliances:[],
			}
		},
		methods: {
			toSearch(){
				uni.navigateTo({
					url:"../search/search"
				})
			}
		},
		onLoad() {
			//加载轮播图
			uni.$u.http.get("/swiperdata").then((response)=>{
				let list = JSON.parse(response.swiper)
				list.forEach((list)=>{
					this.swiperList.push(list.src)
				})
			})
			.catch((e)=>{
				console.log(e);
			})
			uni.$u.http.get("/wxapp/getgoods").then((response)=>{
				response.forEach((data)=>{
					if(data.type === "电子产品"){
						this.digitalProduct.push(data)
					}
					if(data.type === "家用电器"){
						this.houseHoldAppliances.push(data)
					}
				})	
				
			}).catch((e)=>{
				console.log(e);
			})
		},
		onNavigationBarSearchInputClicked(){
			this.toSearch()
		}
	}
</script>

<style>

</style>
