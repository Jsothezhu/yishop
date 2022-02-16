<template>
 <div class="register">
   <a-form ref="FormRef"
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
     <a-form-item label="确认密码" name="password1">
       <a-input v-model:value="formState.password1"
                placeholder="请输入确认密码"/>
     </a-form-item>
     <a-form-item :wrapper-col="{ span: 10, offset: 6 }" name="agreement" style="margin-bottom: 10px">
       <a-checkbox v-model:value="formState.agreement"  v-model:checked="formState.agreement"><a href="">《后台用户协议》</a></a-checkbox>
     </a-form-item>
     <a-form-item :wrapper-col="{ span: 10, offset: 6 }" >
       <a-button type="primary"
                 @click="onSubmit" style="width: 200px"
                 html-type="submit">注册新用户</a-button>
       <a-button style="margin-top: 10px;width: 200px">返回登录</a-button>
     </a-form-item>
   </a-form>
 </div>

</template>

<script>
import { message } from 'ant-design-vue';
import {defineComponent, reactive, ref, toRaw} from 'vue';
import {register} from "../api/index";

export default defineComponent({
  name: "register",
  setup() {
    const FormRef = ref();
    const formState = reactive({
      username:"",
      password:"",
      password1:"",
      agreement:true
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
    let password1 = async (_rule,value)=>{
      if(value !== formState.password){
        return Promise.reject('确认密码和密码不一致');
      }else{
        return Promise.resolve();
      }
    };
    let agreement = async (_rule,value)=>{
      if(value === false){
        return Promise.reject('请先同意协议');
      }else{
        return Promise.resolve();
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
      password1:[
        {
          validator: password1,
          trigger: 'change',
        },
      ],
      agreement:[
        {
        validator: agreement,
        trigger: 'change',
        }
    ]
    };
    //验证并提交
    const onSubmit = () => {
      FormRef.value.validate().then(() => {
         register(formState).then((response)=>{
          console.log(response);
          if(response.data.code===200){
            message.success(response.data.msg)
          }else{
            message.error(response.data.msg)
          }
        }).catch((error)=>{
          message.error(error.code)
        })
      }).catch(error => {
        alert("登录失败，请正确填写",error)
      });
    };
    return {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 13,
      },
      formState,
      rules,
      FormRef,
      onSubmit,
    }
  },
})
</script>

<style lang="less" scoped>
.register{
  width: 35%;
  min-width: 400px;
  //height: 300px;
  background-color: #fff;
  border-radius: 10px;
  padding-top: 30px;
  padding-left:50px;
  position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
}
</style>