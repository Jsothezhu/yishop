<template>
	<view style="padding-bottom: 90rpx;">
		<u-swiper
			:list="swiperlist"
			imgMode="scaleToFill"
			height="500rpx"
		></u-swiper>
		<view class="bg-white">
			<view class="pt-3 px-2 border-bottom">
				<text class="title">
				{{goodDetail.title}}
				</text>
				<price>
					<text class="font-big">{{goodDetail.minprice}}-{{goodDetail.maxprice}}</text>
				</price>
			</view>
			<view class="py-2 px-2 d-flex">
				<view class="d-flex ml-1" v-for="(text,index) in text" :key="index">
					<u-icon name="checkmark-circle" color="green" size="25"></u-icon>
					<text class="ml-1 mt-1">{{text}}</text>
				</view>
			</view>
		</view>
		<!-- 以下为商品规格 -->
		<view>
			<view class="w-100 p-2 bg-white mt-1" @click="showSpecification = true">
				商品规格
			</view>
			<view class="w-100 p-2 bg-white border-top" >
				配送地址
			</view>
			<view class="bg-white mt-2">
				<view class="text-center">
					<text>---商品详情---</text>	
				</view>
				<view class="text-center">
					"{{goodDetail.description}}"
				</view>
				<image :src="src" :key="index"  v-for="(src,index) in goodDetail.description_pic" mode=""></image>
			</view>
		</view>
		<view class="position-fixed  d-flex bottom-0 w-100 bg-white border-top" 
			style="height: 100rpx;">
			<view class="flex-1 text-center" style="line-height: 100rpx;" @tap="returnIndex()">
				首页
			</view>
			<view class="col-5 bg-warning text-center" style="line-height: 100rpx;color: white;"
			@tap="addCart()">
				加入购物车
			</view>
			<view class="col-5 bg-danger text-center" style="line-height: 100rpx; color: white;"
			@tap="buy()">
				立即购买
			</view>
		</view>
		
		<!-- 弹窗 -->
		<u-popup :show="showSpecification" mode="bottom" @close="showSpecification = false" :closeable="true">
			<view class="d-flex flex-column">
				<!-- 上面 -->
				<view class="d-flex border-bottom">
					<image :src="swiperlist[0]" class="my-2 mx-2"
					style="width: 200rpx;height: 200rpx;"></image>
					<view class="my-2 d-flex flex-column j-end">
						<price>
							<text v-if="skuPrice" class="font-lg">{{skuPrice}}</text>
							<text v-else class="font-lg">{{goodDetail.minprice}}-{{goodDetail.maxprice}}</text>
						</price>
						<text class="ml-2" >规格:{{skuText}}</text>
						<text class="ml-2">库存：{{goodDetail.stock}}</text>
					</view>
				</view>
				<!-- 中间 -->
				<view class="p-2 border-bottom">
					<view v-for="(value,key,index) in goodDetail.specifications" :key ="index">
						<view class="font-lg mx-1 my-1">{{key}}</view>
						<radioGroup :label="value" :skuName="key" @altSku="altselectSku"></radioGroup>
					</view>
				</view>
				<!-- 下面 -->
				<view class="p-2 px-3 d-flex j-sb">
					<text class="a-self-end">购买数量:</text>
					<u-number-box v-model="saleCount" :min="1" :max="goodDetail.stock" 
					integer 
					></u-number-box>
				</view>
				<u-button type="warning" @tap="isAddCart? addGoodCart():generateOrder()" text="立即购买"></u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import price from "../../components/common/price"
	import radioGroup from "../../components/common/radioGreap"
	export default {
		components:{
			price,
			radioGroup
		},
		data() {
			return {
				swiperlist:[],
				goodDetail:{},
				text:['正品发货','极速发货','7天退换货'],
				showSpecification:false,
				isAddCart:false,//是否加入购物车
				selectGoodsSku:{},//页面加载后规格为每个key的第一个
				selectSkuText:'',
				saleCount:1,
			}
		},
		methods: {
			altselectSku(singleSku){
				//把每个子组件的sku解构出来
				// #ifndef MP-WEIXIN
				this.selectGoodsSku= {
					...this.selectGoodsSku,
					...singleSku
				} 
				//#endif
				// #ifdef MP-WEIXIN
				this.selectGoodsSku = {
					...this.selectGoodsSku,
					...singleSku.detail.__args__[0]
				}
				//#endif
			},
			//详情页加入购物车按钮/立即购买按钮
			addCart(){
				this.showSpecification = true;
				this.isAddCart = true;
			},
			buy(){
				this.showSpecification = true
				this.isAddCart = false
			},
			//弹窗的立即购买
			addGoodCart(){
				//检查登录状态
				if(uni.getStorageSync('userState')){
					let userid = JSON.parse(uni.getStorageSync('userInfo')).id
					let goodsId = "";
					// #ifdef H5 || APP-PLUS
					 goodsId = this.$route.query.goodsid
					// #endif
					// #ifdef MP-WEIXIN 
					 goodsId = this.$mp.query.goodsid
					// #endif 
					let skuPrice = this.skuPrice
					//有没有选中规格
					if(skuPrice){
						uni.$u.http.post('/v1/wxapp/addcart',{
							userid:userid,
							goodsId:goodsId,
							skuText:this.skuText,
							buy_count:this.saleCount,
							skuPrice:skuPrice
						}).then((response)=>{
							uni.showToast({
								icon:"none",
								title:"商品已经加入购物车"
							})
						}).catch((e)=>{
							console.log(e);
						})
					}else{
						uni.showToast({
							icon:"none",
							title:"请先选择商品规格"
						})
					}
				}else{
					uni.showToast({
						icon:"none",
						title:"无效token,请先登录"
					})
				}
				
			},
			generateOrder(){
				uni.navigateTo({
					icon:"none",
					url:"../neworder/neworder"
				})
			},
			//返回首页
			returnIndex(){
				uni.switchTab({
					url:"../index/index"
				})
			}
		},
		computed:{
			//把每个规格拼接成文字
			skuText:function (){
				this.selectSkuText = ""
				console.log(this.selectGoodsSku);
				for(let key in this.selectGoodsSku){
					this.selectSkuText += this.selectGoodsSku[key]
				}
				return this.selectSkuText.toString()
			},
			//计算规格对应价格
			skuPrice:function(){
				for(let sku in this.goodDetail.pprice){
					if(this.selectSkuText === sku){
						return this.goodDetail.pprice[this.selectSkuText]
					}
				}
			}
		},
		onLoad(){
			let goodsid = "";
			// #ifdef H5 || APP-PLUS
			 goodsid = this.$route.query.goodsid
			// #endif
			// #ifdef MP-WEIXIN 
			 goodsid = this.$mp.query.goodsid
			// #endif 
			uni.$u.http.get("/wxapp/detail?goodsid="+goodsid)
			.then((response)=>{
				//console.log(response);
				this.swiperlist = [response.good_pic]
				this.goodDetail = {
					title:response.title,
					description:response.description,
					description_pic:response.descrip_pic.split(','),
					pprice:response.specification.pprice,
					stock:response.stock,
					specifications:response.specification ? response.specification.specifications : response.title,
					maxprice:response.specification ? response.specification.maxprice : 0,
					minprice:response.specification ? response.specification.minprice : 0,
					common:response.common
				}
			})
			.then(()=>{
				 for(let key in this.goodDetail.specifications){
					this.selectGoodsSku[key] = this.goodDetail.specifications[key][0]
				}
			})
			.catch((e)=>{
				uni.showToast({
					icon:"none",
					title:e,
				})
			})
			
		}
	}
</script>

<style lang="scss" scoped>
.title{
	font-size: 1.2rem;
	word-break: break-all; 
	overflow: hidden;
	-webkit-line-clamp:3;
	display: -webkit-box;
	-webkit-box-orient:vertical;
	text-overflow:ellipsis;
}

</style>
