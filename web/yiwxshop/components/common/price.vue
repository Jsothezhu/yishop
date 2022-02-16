<template>
		<view class="price">
			<text class="font-lg">￥</text><slot></slot>
		</view>
</template>

<script>
	export default{}
</script>

<style lang="scss" scoped="scoped">
	.price{
		color: $u-warning;
	}
</style>
