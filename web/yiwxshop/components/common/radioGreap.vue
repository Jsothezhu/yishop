<template>
	<view class="">
		<!-- 渲染规格和修改规格 -->
		<view v-for="(skuitem,index) in label" :key="index" 
		class="skuitem" :class="index === selected? 'selected':''"
		@tap="selectedSku(index,skuitem)">
			{{skuitem}}
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			label:{
				type:Array,
				default:[],
			},
			skuName:{
				type:String,
				default:"",
			}
		},
		data(){
			return {
				selected:0,
				selectedSkuitem:{}
			}
		},
		methods:{
			/* 每个rediogroup组件就代表一个sku的对象,
			把它返回给详情页就可以在详情页进行结构 */
			selectedSku(index,skuitem){
				this.selected = index
				this.selectedSkuitem[this.skuName] = skuitem
				this.$emit("altSku",this.selectedSkuitem)
			}
		}
	}
</script>

<style lang="scss" scoped>
.skuitem{
	padding: 20rpx;
	margin-right: 20rpx;
	border: 1rpx solid $u-info;
	border-radius: 10rpx;
	display: inline-block;
	background-color: $u-info-light;
}
.selected{
	border:1rpx solid $u-warning;
	background-color:$u-warning-dark;
}
</style>
