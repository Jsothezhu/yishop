<template>
	<view class="w-100 bg-white d-flex a-center j-center" 
	style="height: 100%;">
		<u--form
			labelPosition="left"
			:model="userinfo"
			:rules="rules"
			ref="form1"
			>
			<u-form-item
				label="账号:"
				prop="username"
				ref="item1"
			>
				<u--input
					placeholder="请输入用户名"
					border="bottom"
					v-model="userinfo.username"
				/>
			</u-form-item>
			<u-form-item
				label="密码:"
				prop="password"
				ref="item1"
			>
				<u--input
					placeholder="请输入密码"
					border="bottom"
					type="password"
					v-model="userinfo.password"
				/>
			</u-form-item>
			<!-- #ifdef H5 -->
			<u-form-item
				label="验证码:"
				prop="code"
				ref="item1"
				:labelWidth="60"
				class="d-flex flex-wrap flex-column"
			>
			<u--input
				border="bottom"
				type="text"
				placeholder="验证码"
				v-model="userinfo.code"
				style="flex: 2; "
			/>
			<image src="http://120.25.254.86:82/captcha" mode="widthFix"
			style="flex: 3;margin-left: 10upx;"
			></image>		
			</u-form-item>
			<!-- #endif -->	
			<!-- #ifdef MP-WEIXIN -->
			<u-form-item
				label="验证码:"
				prop="code"
				ref="item1"
				:labelWidth="60"
				class="d-flex"
			>
			<view class="right d-flex">
				<u--input
				border="bottom"
				type="text"
				v-model="userinfo.code"
				style="flex: 2; "
				/>
			<image src="http://127.0.0.1:7001/captcha" mode="widthFix"
			style="flex: 3;margin-left: 10upx;"
			></image>		
			</view>
			</u-form-item>
			<!-- #endif -->
			<u-row customStyle="margin-top:20rpx" justify="space-between">
				<u-col span="5">
					<button type="primary" @click="submit()">登录</button>
				</u-col>
				<u-col span="5">
					<button type="default" @click="register()">注册</button>
				</u-col>
			</u-row>
		</u--form>
	</view>
</template>

<script>
	import config from "@/common/config"
	export default {
		data() {
			return {
				picUrl:config.baseUrl+'/captcha',
				userinfo:{
					username:"",
					password:"",
					code:"",
				},
				rules:{
					username: {
						type: 'string',
						required: true,
						message: '请填写用户名',
					},
					password:{
						type:'string',
						required: true,
						message: '请填写密码',
					},
					code:{
						type:'string',
						required: true,
						message:"验证码不为空"
					}
				}
			}
		},
		methods: {
			submit(){
				this.$refs.form1.validate().then((resolve)=>{
					uni.$u.http.post("/wxapp/login",this.userinfo)
					.then((response)=>{
						uni.setStorage({
						    key: 'userInfo',
						    data: JSON.stringify(response)
						});
						uni.setStorage({
							key:"userState",
							data:response.token,
							success: () => {
								setTimeout(()=>{
									//tab无法使用uni.navigateTo
									uni.switchTab({
										url:"/pages/my/my"
									})
									//this.$router.go(0)
								},800);
								//登录成功设置token
								uni.$u.http.setConfig((config)=>{
									config.header.token = uni.getStorageSync('userState');
									return config;
								});
								uni.showToast({
									icon:'none',
									title:"登录成功",
									duration:2000
								}) 
							}
						})
					}).catch((e)=>{
						uni.showToast({
							icon:'none',
							title:e.data.msg,
							duration:2000
						})
					})
				}).catch((error)=>{
					uni.showToast({
						icon:'none',
						title:"登录错误，请重新检查数据",
						duration:2000
					})
					console.log(error);
				})
			},
			register(){
				uni.navigateTo({
					url:"/pages/register/register"
				})
			}
		},
	}
</script>

<style>

</style>
