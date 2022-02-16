<template>
<div class="form">
  <a-form :model="formState"
           ref="formRef"
          :label-col="labelCol"
          :wrapper-col="wrapperCol">
    <a-form-item label="商品id" name="goods_id">
      <a-input-number v-model:value="formState.goods_id" :disabled="Boolean(id)"
      :max="99999999" :min="0" style="width:140px"/>
    </a-form-item>
    <a-form-item label="商品名称" name="title">
      <a-input v-model:value="formState.title" />
    </a-form-item>
    <a-form-item label="分类" name="sub_category">
      <a-select
          ref="select"
          v-model:value="formState.sub_category"
          style="width: 120px"
      >
        <a-select-option
            v-for="(option,index) in subCategoryOption"
            :value="option.sub_category_name" :key="index"
        >{{option.sub_category_name}}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="库存" name="stock">
      <a-input-number v-model:value="formState.stock"
                      :max="99999999" :min="0" style="width:140px"/>
    </a-form-item>
    <a-form-item label="描述" name="description">
      <a-textarea v-model:value="formState.description"  showCount :maxlength="50" />
    </a-form-item>
    <a-form-item label="商品图片" name="good_pic">
      <a-upload
          v-model="formState.good_pic"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          action="http://127.0.0.1:7001/app/v1/upload"
          :before-upload="beforeUpload"
          @change="handleChange"
      >
     <a-image
          :width="75"
          v-if="formState.good_pic"
          :src="formState.good_pic"
      />
      <div v-else>
        <loading-outlined v-if="loading"></loading-outlined>
        <plus-outlined v-else></plus-outlined>
        <div class="ant-upload-text">Upload</div>
      </div>
      </a-upload>
    </a-form-item>
    <a-form-item label="类型" name="type">
      <a-select
          ref="select"
          v-model:value="formState.type"
          style="width: 120px"
      >
        <a-select-option
            v-for="(option,index) in typeOption"
            :value="option.value" :key="index"
        >{{option.label}}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item style="margin-left: 230px">
      <a-button type="primary" block @click="onSubmit()">提交</a-button>
    </a-form-item>

  </a-form>
</div>
</template>

<script>
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import {useRoute,useRouter} from "vue-router";
import {reactive,ref} from "vue";
import {message} from "ant-design-vue";
import {getGoods,getSubCategory,addGood,altGood} from "../api/index";

export default {
  name: "addgood",
  components: {
    LoadingOutlined,
    PlusOutlined,
  },
  setup(){
    const route = useRoute()
    const router = useRouter()
    const formRef = ref()
    //路由有没有参数
    const id = route.params.id;
    const loading = ref(false);
    //表单数据
    const formState = reactive({
      goods_id:route.params.id,
      title:"",
      sub_category:"请选择",
      stock:0,
      description:"",
      good_pic:"",
      type:0,
    });
    //子分类选项
    const subCategoryOption = reactive([])
    getSubCategory()
    .then((response)=>{
       let data = response.data.data
       for(let i = 0; i<data.length;i++){
         subCategoryOption.push(data[i])
       }
    })
    .catch((e)=>{
      console.log(e);
    })

    //类型选项
    const typeOption = [
      {
        value:0,
        label:"新品"
      },
      {
        value:1,
        label:"热销"
      },
      {
        value:2,
        label:"普通"
      }
    ]
    //上传后处理
    const handleChange = info => {
      if (info.file.status === 'done') {
        //上传成功
        formState.good_pic = info.file.response.data
        console.log(formState);
        message.success(`${info.file.name} 上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    };
    //上传文件失败
    const beforeUpload = file => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('只能上传png和jpg图片');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('只能上传小于2MB图片!');
      }
      return isJpgOrPng && isLt2M;
    };
    //如果有参数就是修改商品，先获取商品信息
    if(id){
      getGoods({id:route.params.id}).then((response)=>{
        let data = response.data.data
        formState.title = data[0].title
        formState.sub_category = data[0].category.sub_category_name
        formState.stock = data[0].stock
        formState.description = data[0].description
        formState.good_pic = data[0].good_pic
        formState.type = Number(data[0].type)
      }).catch((e)=>{
        console.log(e);
      })
    }
    const onSubmit = ()=>{
      formRef.value
          .validate()
          .then(() => {
            /**
             * 如果有参数为修改商品，如果没有参数则增加商品
             */
            console.log(route.params);
            if(Object.keys(route.params).length === 0){
              addGood(formState).then((response)=>{
                if(response.status === 200){
                  router.push("/admin/goods")
                  message.success(response.data.msg)
                }else{
                  message.error(response.data.msg)
                }
              }).catch((e)=>{
                message.error(e.data.message)
              })
            }else{
              altGood(formState).then((response)=>{
                if(response.status === 200){
                  router.push("/admin/goods")
                  message.success(response.data.msg)
                }else{
                  message.error(response.data.msg)
                }
              }).catch((e)=>{
                message.error(e.data.message)
              })
              console.log(formState);
            }

          })
          .catch(error => {
            console.log('error', error);
          });

    }

    return {
      formState,
      id,
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 4,
      },
      typeOption,
      focus,
      handleChange,
      beforeUpload,
      loading,
      subCategoryOption,
      onSubmit,
      formRef
    }
  }
}

</script>

<style scoped>
.form{
  width:80%;
  height:600px;
  margin-top: 20px;
  margin-left: 20px;
  padding-top: 30px;
  background-color: #fff;
}
.avatar-uploader > .ant-upload {
  width: 75px;
  height: 75px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>