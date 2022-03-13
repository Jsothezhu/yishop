<template>
 <div class="login">
   <a-form ref="formRef"
           :model="formState"
           :label-col="labelCol"
           :wrapper-col="wrapperCol"
           :rules="rules">
     <a-form-item label="用户名" name="username">
       <a-input v-model:value="formState.username"
                placeholder="请输入用户名">
         <a-icon slot="prefix" type="user"/>
       </a-input>
     </a-form-item>
     <a-form-item label="密码" name="password">
       <a-input v-model:value="formState.password"
          placeholder="请输入密码"/>
     </a-form-item>
     <a-form-item label="验证码" name="code">
       <a-input v-model:value="formState.code" style="width: 90px"/>
       <div class="code" style="display: inline-block;margin-left:10px ">
          <img src="http://127.0.0.1:7001/captcha" >
       </div>
     </a-form-item>
     <a-form-item :wrapper-col="{ span: 10, offset: 6 }">
       <a-button type="primary"
                 @click="onSubmit" style="width: 200px"
                 html-type="submit">登录</a-button>
       <a-button style="margin-top: 10px;width: 200px"
                 @click="onRegister">注册</a-button>
     </a-form-item>
   </a-form>
 </div>


</template>

<script>
import { message } from 'ant-design-vue';
import {defineComponent, reactive, ref} from 'vue';
import {login} from "../api/index";
import { useRouter } from 'vue-router';
import cookie from "js-cookie";

export default defineComponent({
  name: "login",
  methods:{
    onRegister(){
      this.$router.push("/register")
    }
  },
  setup() {
    const formRef = ref();
    const router = useRouter()
    const formState = reactive({
      username:"",
      password:"",
      code:'',
    });
    //校验规则
    let username = async (_rule, value) => {
      if (!value) {
        return Promise.reject('请输入用户名');
      }
      if (value.length<3 || value.length>18) {
        return Promise.reject('用户名必须大于3个字符且小于10个字符');
      }else {
        return Promise.resolve();
      }
    };
    let password = async (_rule,value)=>{
      let patrn=/^(?=.*?[a-z])/g
      if (!value) {
        return Promise.reject('请输入密码');
      }else if(!patrn.exec(value)){
        return Promise.reject('密码至少1个小写英文字母');
      }else {
        return Promise.resolve();
      }
    };
    let code = async (_rule, value) => {
      if (!value) {
        return Promise.reject('请输入验证码');
      }
    };
    const rules = {
      username:[
        {
          validator: username,
          trigger: 'change',
        },
      ],
      password:[
        {
          validator: password,
          trigger: 'change',
        },
      ],
      code:[
        {
          validator: code,
          trigger: 'change',
        },
      ]
    };
    //验证并提交
    const onSubmit = () => {
      formRef.value.validate().then(() => {
        login(formState)
         .then((response)=>{
           if(response.data.length === 0){
             message.error("用户名或密码错误")
           }else{
             console.log(response);
             /*保存登录信息*/
             sessionStorage.setItem("userInfo",JSON.stringify(response.data))
             cookie.set("token",response.data.data[0].token)
             router.push('/admin/main')
           }
         })
         .catch((error)=>{
           message.error(error.data.message)
         })
      }).catch(error => {
        message.error("请输入正确格式的信息")
      });
    };
    return {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 12,
      },
      formState,
      rules,
      formRef,
      onSubmit,
      message
    }
  },
})
</script>

<style lang="less" scoped>
.login{
  width: 35%;
  min-width: 400px;
  height: 300px;
  background-color: #fff;
  border-radius: 10px;
  padding-top: 30px;
  padding-left:50px;
  position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
}
.error{
  width:20%;
  position:absolute;
  top: 100px;
  left:50%;
  transform:translateX(-50%);

}
</style>