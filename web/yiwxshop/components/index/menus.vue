<template>
	<view class="d-flex bg-light j-sb px-2 py-1 my-2"
		style="height: 200rpx;box-sizing: border-box;">
		<view  v-for="(item,index) in menulist" :key="index"
		class="line-h-md">
			<image :key="index"
				:src="item.src"
				mode="widthFix"
				width="120rpx"
				height="100rpx"
			></image>
			{{item.name}}	
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				menulist:[
					{
						src:"../../static/common/image/category.png",
						name:"更多分类"
					},
					{
						src:"../../static/common/image/drive.png",
						name:"更多分类"
					},
					{
						src:"../../static/common/image/hot.png",
						name:"更多分类"
					},
					{
						src:"../../static/common/image/reserve.png",
						name:"更多分类"
					},
					{
						src:"../../static/common/image/thumbsup.png",
						name:"更多分类"
					}
				]
			}
		},
	}
</script>

<style>
</style>
