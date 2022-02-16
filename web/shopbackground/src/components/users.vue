<template>
  <div class="table">
    <a-button type="primary"
              style="margin-bottom: 10px"
              @click="showModal()">增加用户</a-button>
    <a-modal v-model:visible="visible"
             @ok="alter()"
             ok-text="确认"
             cancel-text="取消">
      <div class="inputs">
        <a-form ref="formRef" :model="alterUser" :rules="rules">
          <a-form-item  label="用户名：" name="username">
            <a-input v-model:value="alterUser.username" placeholder="用户名" />
          </a-form-item>
          <a-form-item  label="邮箱:" name="email">
            <a-input v-model:value="alterUser.email" placeholder="邮箱" />
          </a-form-item>
          <a-form-item  label="手机：" name="phone">
            <a-input v-model:value="alterUser.phone" placeholder="手机" />
          </a-form-item>
          <a-form-item  label="昵称：" name="nickname">
            <a-input v-model:value="alterUser.nickname" placeholder="昵称" />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
    <a-table :data-source="dataSource" :columns="columns" size="middle" :rowKey="dataSource.id">
      <template  #action="{ record }"  >
      <span>
        <a @click="showModal(record)">修改</a>
         <a-divider type="vertical" />
        <a @click="delUser(record)">删除</a>
      </span>
      </template>
    </a-table>
  </div>
</template>

<script>
import { message } from 'ant-design-vue';
import {reactive, ref} from 'vue';
import  { getUsers,updataUser,deleteUser,createUser } from "../api/index"
export default {
  name: "users",
  setup() {
    let dataSource = reactive([])
    const formRef = ref();
    const visible = ref(false);//添加用户弹窗
    const columns =  [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '手机',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '昵称',
        dataIndex: 'nickname',
        key: 'nickname',
      },
      {
        title: '操作',
        key: 'action',
        slots: {
          customRender: 'action',
        },
      },
    ]
    const alterUser = reactive({
      id:"",
      username:"",
      email:"",
      phone:"",
      nickname:""
    })
    //模态弹窗展示
    const showModal = (record = {} ) => {
      if(record){
        alterUser.id = record.id
        alterUser.username=record.username
        alterUser.email=record.email
        alterUser.phone=record.phone
        alterUser.nickname=record.nickname
      }
      visible.value = true;
    };
    //获取表格数据
    const tableData = (data)=>{
        dataSource.length = 0
      for(let i=0;i<data.length;i++){
        dataSource.push({
          key: data[i].id,
          id : data[i].id,
          username : data[i].username,
          email : data[i].email,
          phone : data[i].phone,
          nickname : data[i].nickname
        })
      }
    }
    //修改或添加用户
    const alter=()=>{
      formRef.value
          .validate()
          .then(()=>{
            //有id更新用户，没有id创建用户
            if(alterUser.id){
              updataUser(alterUser)
                  .then((response)=>{
                    if(response.status !== 400){
                      message.success("修改成功")
                      visible.value = false
                    }else{
                      message.error("修改失败")
                    }
                    getUser()
                  })
                  .catch((e)=>{
                    console.log(e);
                  })
            }
            else{
              createUser(alterUser)
                    .then((response)=>{
                      if(response.status !== 400){
                        message.success("创建成功")
                        visible.value = false
                      }else{
                        message.error("创建失败")
                      }
                      getUser()
                    })
                    .catch((e)=>{
                      console.log(e);
                    })}
            })
          .catch(error => {
            console.log('error', error);
          });
    }
    //获取用户
    function getUser(){
      getUsers()
          .then((response)=>{
            let data=response.data
            //表格数据
            tableData(data)
          })
          .catch((error)=>{
            console.log(error);
          })
    }
    getUser()
    //删除用户
    const delUser=(info)=>{
      deleteUser(info.id)
        .then((response)=>{
          if(response.status !== 400 && response.status !== 500){
            message.success("删除成功")
          }else{
            message.error("删除失败")
          }
          console.log(response);
          getUser()
        })
        .catch((error)=>{
          console.log(error);
        })

    }
    //校验规则
    const rules = {
      username:[
        {
          required: true,
          message: '请输入用户名',
          trigger: 'blur',
        },
        {
          pattern:/^[a-zA-Z0-9_-]{4,16}$/,
          message: '用户名4到16位（字母，数字，下划线，减号）',
          trigger: 'blur',
        }
      ],
      phone:[
        {
          pattern:/^[0-9]{11}$/,
          message: '电话为11位数字',
          trigger:'blur'
        },
      ]
    }


    return {
      dataSource,
      columns:columns,
      alter,
      visible,
      formRef,
      alterUser,
      showModal,
      rules,
      delUser
    };
  },
}
</script>

<style scoped lang="less" >
.inputs{
  margin-top: 30px;
}
.table{
  width: 60%;
  height: 60%;
  margin-left: 100px;
  margin-top: 50px;
}
</style>