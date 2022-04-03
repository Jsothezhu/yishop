<template>
	<view>
		<u-list class="mt-2" style="height:50vh;">
		<view @click="toset(item.url)"
			v-for="(item, index) in list"
			:key="index">
			<u-list-item >
			<u-cell
				:title="item.name"
				class="u-cell"
			></u-cell>
			</u-list-item>
		</view>
		</u-list>
	</view>
</template>

<script>
	export default {
		props:{
			list:{
				type:Array,
				default:[],
				require:true,
			}
		},
		methods:{
			toset(url){
				if(url){
					uni.navigateTo({
						url:url
					})
				}else{
					uni.clearStorageSync()
					this.$router.go(0)
				}
				
			}
		}
	}
</script>
