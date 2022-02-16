<template>
	<view>
		<u--form
			labelPosition="left"
			:model="addressInfo"
			ref="form1"
			class="bg-white"
		>
		<u-form-item
			:label="addressInfo.name.label"
			borderBottom
		>
			<u--input
				v-model="addressInfo.name.value"
				border="none"
			></u--input>
		</u-form-item>
		<u-form-item
			:label="addressInfo.phone.label"
			borderBottom
		>
			<u--input
				v-model="addressInfo.phone.value"
				border="none"
			></u--input>
		</u-form-item>
		<!-- 所在地区 -->
		<u-form-item
			:label="addressInfo.where.label"
			borderBottom
		>
			<u--input 
				:value="addressInfo.where.province+' '+addressInfo.where.city+' '+addressInfo.where.area"
				border="none"
			></u--input>
			<view @click="showPicker($event)">
				选择
			</view>
		</u-form-item>
		<!-- 详细地址 -->
		<u-form-item
			:label="addressInfo.detail.label"
			borderBottom
		>
			<u--input
				v-model="addressInfo.detail.value"
				border="none"
			></u--input>
		</u-form-item>
	</u--form>
	<!-- #ifdef H5 -->
		<u-button type="warning" class="mt-3" style="width: 50%;"
		text="提交" @tap="$route.query.addressid?submitAltAddress():submitAddAddress()"></u-button>
	<!--#endif  -->
	<!-- #ifdef MP-WEIXIN -->
	<u-button type="warning" class="mt-3" style="width: 50%;"
	text="提交" @tap="$mp.query.addressid?submitAltAddress():submitAddAddress()"></u-button>
	<!-- #endif -->
		<auiPicker
		    ref="picker" 
		    :title="auiPicker.title"
		    :layer="auiPicker.layer"
		    :data="auiPicker.data"
		    @callback="pickerCallback"
		></auiPicker>
	</view>
</template>

<script>
	import {aui} from '@/common/aui-picker/common/aui/js/aui.js';
	import auiPicker from '@/components/common/aui-picker.vue';
	import {cityData} from "@/common/aui-picker/common/city.data.js";
	import {mapState} from "vuex"
	export default {
		components:{
			auiPicker
		},
		data() {
			return {
				addressInfo: {
					name:{
						label:'姓名',
						value:'',
					},
					phone:{
						label:"电话",
						value:""
					},
					where:{
						label:"所在地区",
						province:'',
						city:'',
						area:'',
					},
					detail:{
						label:"详细地址",
						value:""
					}
				},
				auiPicker: {
					title: '所在地区',
					layer: 3,
					data: []
				},
			}
		},
		computed:{
			...mapState({
				addressList:state=>state.address.addressList
			})
		},
		methods: {
			//显示picker多级联动弹窗
			showPicker(e){
				const _this = this;
				_this.auiPicker.data=cityData;
				_this.$refs.picker.open()
			},
			//picker多级联动回调
			pickerCallback(e){
				const _this = this;
				let result = '';
				for(let key in e.data){
					if(key === "0"){
						_this.addressInfo.where.province = e.data[key].name
					}else if(key === "1"){
						_this.addressInfo.where.city = e.data[key].name
					}else{
						_this.addressInfo.where.area = e.data[key].name
					}
				}
			},
			//获取收货地址id对应的地址信息
			getSingleAddress(addressId){
				this.addressList.forEach((item,index)=>{
					if(item.address_id == addressId){
						this.addressInfo.name.value = item.receiver
						this.addressInfo.phone.value = item.receiver_phone
						this.addressInfo.where.province = item.province
						this.addressInfo.where.city = item.city
						this.addressInfo.where.area = item.area
						this.addressInfo.detail.value = item.detail
					}
				})
			},
			submitAltAddress(){
				let addressid = "";
				// #ifdef H5
				addressid = parseInt(this.$route.query.addressid)
				// #endif
				// #ifdef MP-WEIXIN
				addressid = parseInt(this.$mp.query.addressid)
				// #endif
				uni.$u.http.put('/v1/wxapp/altreceiveraddress',{
					addressid:addressid,
					name:this.addressInfo.name.value,
					phone:this.addressInfo.phone.value,
					province:this.addressInfo.where.province,
					city:this.addressInfo.where.city,
					area:this.addressInfo.where.area,
					detail:this.addressInfo.detail.value,
				}).then((response)=>{
					uni.showToast({
						icon:'none',
						title:"地址更新成功",
					})
					setTimeout(()=>{
						uni.navigateTo({
							url:"../address/address"
						})
					},500)				
				}).catch((e)=>{
					uni.showToast({
						icon:'none',
						title:"地址更新失败，请重新尝试",
					})
				})
			},
			submitAddAddress(){
				uni.$u.http.post('/v1/wxapp/addreceiveraddress',{
					user_id:JSON.parse(uni.getStorageSync('userInfo')).id, 
					name:this.addressInfo.name.value,
					phone:this.addressInfo.phone.value,
					province:this.addressInfo.where.province,
					city:this.addressInfo.where.city,
					area:this.addressInfo.where.area,
					detail:this.addressInfo.detail.value,
				}).then(()=>{
					uni.showToast({
						icon:'none',
						title:"地址增加成功",
					})
					setTimeout(()=>{
						uni.navigateTo({
							url:"../address/address"
						})
					},500)		
				}).catch(()=>{
					uni.showToast({
						icon:'none',
						title:"地址增加失败，请重新尝试",
					})
				})
			}
		},
		onLoad(){
			//#ifdef H5
			let id = this.$route.query.addressid
			//#endif 
			//#ifdef MP-WEIXIN
			let id = this.$mp.query.addressid
			//#endif
			if(id){
				this.getSingleAddress(id)
			}
		}
	}
</script>

<style>

</style>
