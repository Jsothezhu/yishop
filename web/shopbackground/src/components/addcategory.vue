<template>
  <div class="form">
    <a-form :model="formState"
            ref="formRef"
            :label-col="labelCol"
            :wrapper-col="wrapperCol">
      <a-form-item label="分类id" name="category_id" v-if="params">
        <a-input-number v-model:value="formState.category_id" :disabled="Boolean(formState.category_id)"/>
      </a-form-item>
      <a-form-item label="一级分类" name="parent_category_name">
        <a-input v-model:value="formState.parent_category_name"/>
      </a-form-item>
      <a-form-item label="二级分类" name="sub_category_name">
        <a-input v-model:value="formState.sub_category_name" />
      </a-form-item>
      <a-form-item label="二级分类图片" name="sub_category_url">
        <a-upload
            v-model="formState.sub_category_url"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            action="http:/120.25.254.86:82/app/v1/upload"
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
      <a-form-item style="margin-left: 130px">
        <a-button type="primary" block @click="onSubmit()">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import {useRoute,useRouter} from "vue-router";
import {reactive, ref} from "vue";
import {message} from "ant-design-vue";
import { addCategory,alterCategory} from "../api/index";

export default {
name: "addcategory",
  setup()
  {
    const route = useRoute()
    const router = useRouter()
    const formRef = ref()
    const loading = ref(false);
    const params = route.params.id
    //表单数据
    const formState = reactive({
      category_id: params || 0,
      parent_category_name:"",
      sub_category_name:"",
      sub_category_url:""
    });
    //上传后处理
    const handleChange = info => {
      if (info.file.status === 'done') {
        //上传成功
        formState.sub_category_url = info.file.response.data
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
    /**
     * 提交
     * */
    const onSubmit = ()=>{
      if(formState.category_id){
        addCategory(formState).then((response)=>{
          message.success(response.data.msg)
          router.push('/admin/category')
        }).catch((e)=>{
          message.error(e.data.msg)
        })
      }else{
        alterCategory(formState).then((response)=>{
          message.success(response.data.msg)
          router.push('/admin/category')
        }).catch((e)=>{
          message.error(e.data.msg)
        })
      }


    }

    return {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 4,
      },
      formState,
      handleChange,
      beforeUpload,
      loading,
      params,
      onSubmit
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