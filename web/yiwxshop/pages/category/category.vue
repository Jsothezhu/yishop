<template>
	<view class="d-flex bg-white">
		<scroll-view class="border-right" 
		style="flex: 1;height: 100vh;">
			<view class="text-center border-bottom py-2"
			:class="selectItem == index ? 'main-text-color':''"
			v-for="(item,index) in parentCategoryList" :key='index'
			@tap="selectParentCategory(item,index)">
			<text>{{item}}</text>
			</view>
		</scroll-view>
		<view style="flex: 3.5;" class="p-3" >
			<view class="d-inline-block ml-2 mt-1 text-center" 
			v-for="(item,index) in subCategoryList" :key="index" 
			 style="width: 150rpx;height: 220rpx;">
				<image :src="item.sub_category_url" style="width: 149rpx;height: 150rpx;"></image>
				<text>{{item.sub_category_name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				parentCategoryList:[],
				subCategoryList:[],
				selectItem:0
			}
		},
		methods: {
			//更改父分类
			selectParentCategory(category,i){
				this.subCategoryList.length = 0
				uni.$u.http.get('/wxapp/getcategory').then((response)=>{
					this.subCategoryList = response[category]
				}).catch((e)=>{
					console.log(e);
				})
				//修改被选项
				this.selectItem = i
			}
		},
		onLoad(){
			uni.$u.http.get('/wxapp/getcategory').then((response)=>{
				for(let category in response){
					this.parentCategoryList.push(category)
				}
				this.subCategoryList = response['电子产品']
			}).catch((e)=>{
				console.log(e);
			})
		}
	}
</script>

<style>

</style>
