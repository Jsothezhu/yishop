<template>
	<view class="w-100 bg-white d-flex a-center j-center"
	style="height: 100%;">
		<u--form
			labelPosition="left"
			:model="register"
			:rules="rules"
			ref="form1">
			<u-form-item
				label="用户名:"
				prop="username"
				ref="item1"
				:labelWidth="60"
			>
				<u--input
					placeholder="请输入用户名"
					border="bottom"
					v-model="register.username"
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
					v-model="register.password"
				/>
			</u-form-item>
			<u-form-item
				label="确认密码:"
				prop="confirepassword"
				ref="item1"
				:labelWidth="70"
			>
				<u--input
					placeholder="请输入确认密码"
					border="bottom"
					v-model="register.confirepassword"
				/>
			</u-form-item>
			<u-form-item
				label="邮箱:"
				prop="email"
				ref="item1"
			>
				<u--input
					placeholder="请输入邮箱"
					border="bottom"
					v-model="register.email"
				/>
			</u-form-item>
			<u-form-item
				label="手机:"
				prop="phone"
				ref="item1"
			>
				<u--input
					placeholder="请输入手机"
					border="bottom"
					v-model="register.phone"
				/>
			</u-form-item>
			<button type="primary" @click="submit()">注册</button>
		</u--form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				register:{
					username:"",
					password:"",
					confirepassword:"",
					email:"",
					phone:"",
				},
				rules:{
					username: {
						type: 'string',
						required: true,
						message: '请填写用户名',
					},
					password:[
						{
							type:'string',
							required:true,
							message:"请输入密码"
						},
						{	
							type:'string',
							pattern:/^(?=.*?[a-z])/g,
							message:'密码至少1个小写英文字母'
						},
					],
					confirepassword:{
						validator:(rule, value, callback) => {
							return value === this.register.password
						},
						message: '两次输入密码不一致',
					},
					email:{
						validator:(rule, value, callback) => {
							if(value){
								return uni.$u.test.email(value)
							}
							return true
						},
						message:"邮箱不正确"
					},
					phone:{
						validator:(rule, value, callback) => {
							if(value){
								return uni.$u.test.mobile(value)
							}
							return true
						},
						message:"手机号码不正确"
					}
					
				}
			}
		},
		methods: {
			submit(){
				this.$refs.form1.validate().then(()=>{
					uni.$u.http.post('/wxapp/register',this.register).then((response)=>{
						uni.showToast({
							icon:'none',
							title:"注册成功,2秒后跳转",
							duration:2000
						}) 
						setTimeout(function(){
							uni.navigateTo({
							url:"../login/login"})
						},2000)
					}).catch((e)=>{
						uni.showToast({
							icon:'none',
							title:e.data.msg,
							duration:2000
						}) 
					})
				})
				.catch((e)=>{
					uni.showToast({
						icon:'none',
						title:"请输入正确的数据",
						duration:2000
					}) 
				})
			}
		}
	}
</script>

<style>

</style>