<template>
	<view class="d-flex flex-column bg-white">
		<view class="w-100 font-lg mt-2 d-flex j-sb px-3 border-bottom mb-2"
		 style="height: 100rpx;box-sizing: border-box;">
			<text style="line-height: 100rpx;">{{title}}</text>
			<!-- #ifdef H5 -->
			<u-icon label="更多" size="22" name="arrow-right"
			labelPos="left"></u-icon>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<text style="line-height: 100rpx;">更多></text>
			<!-- #endif -->
		</view>
		<view class="d-flex flex-row flex-wrap j-sb px-1">
		<view v-for="(item,index) in digitalProduct" :key="index" 
		style="width: 240rpx;" @tap="goodDetail(item.goods_id)">
			<image :src="item.good_pic" 
					style="width: 230rpx;height: 230rpx;">
			</image>
			<text class="title">{{item.title}}</text>
			<price :specification="item.specification">
				<text v-if="item.specification">{{item.specification.minprice}}</text>
				<text v-else>0</text>
			</price>
		</view>
	</view>
	</view>
	
	
</template>

<script>
	import price from "../common/price.vue"
export default{
	components:{
		price
	},
	props:{
		digitalProduct:{
			type:Array,
			default:[]
		},
		title:{
			type:String,
			default:"",
			require:true,
		}
	},
	methods:{
		goodDetail(goodsid){
			uni.navigateTo({
				url:"../detail/detail?goodsid="+goodsid
			})
		}
	}
}
</script>

<style lang="scss" scoped>
	.title{
		width: 240rpx;
		max-height: 100upx;
		word-break: break-all; 
		overflow: hidden;
		-webkit-line-clamp:2;
		display: -webkit-box;
		-webkit-box-orient:vertical;
		text-overflow:ellipsis;
	}
</style>
