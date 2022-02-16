<template>
	<view class="bg-white" style="min-height: 92vh;" >
		<view v-for="(item,index) in goodlist" :key="index" @click="goodDetail(item.goods_id)" 
		class="w-100 d-flex p-1 bg-white" style="box-sizing: border-box;">
			<image :src="item.good_pic" style="width:280rpx;height: 280rpx;"></image>
			<view class="ml-1 flex-1">
				<text class="title">{{item.title}}</text>
				<price :specification="item.specification">
					<text v-if="item.specification" class="font-lg">{{item.specification.minprice}}</text>
					<text v-else class="font-lg">0</text>
				</price>
			</view>
		</view>
	</view>
</template>

<script>
	import price from "../../components/common/price"
	export default {
		components:{
			price
		},
		data() {
			return {
				goodlist:[]
			}
		},
		methods: {
			goodDetail(goodsid){
				uni.navigateTo({
					url:"../detail/detail?goodsid="+goodsid
				})
			}
		},
		onShow() {
			//#ifdef H5
			let keyword = this.$route.query.keyword
			//#endif
			//#ifdef MP-WEIXIN
			let keyword = this.$mp.query.keyword
			//#endif
			uni.$u.http.get("/wxapp/search?keyword="+keyword)
			.then((response)=>{
				this.goodlist = response
				console.log(this.goodlist);
			}).catch((e)=>{
				console.log(e);
			})
			 
		}
	}
</script>

<style lang="scss" scoped>
	.title{
		font-size: 1rem;
		word-break: break-all; 
		overflow: hidden;
		-webkit-line-clamp:2;
		display: -webkit-box;
		-webkit-box-orient:vertical;
		text-overflow:ellipsis;
	}

</style>
