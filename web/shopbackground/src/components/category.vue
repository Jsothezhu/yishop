<template>
  <div class="table">
    <a-button primary @click="addCategory()"
              style="float: right;margin-bottom: 20px;z-index: 100">增加分类</a-button>
    <a-table :data-source="dataSource"
             :columns="columns"
             :rowKey="dataSource.category_id"
             rowClassName="table-row"
             :pagination="pagination">
    <template  #sub_category_url="{ record }">
      <a-image
          :width="70"
          :src="record.sub_category_url"
      />
    </template>
    <template  #categoryOption="{ record }">
       <span>
          <a-button primary @click="addCategory(record.category_id)">修改分类</a-button>
          <a-divider type="vertical" />
          <a-button danger @click="delCategory(record.category_id)">删除分类</a-button>
       </span>
    </template>
    </a-table>
  </div>
</template>

<script>
import { reactive } from "vue"
import { useRouter } from 'vue-router';
import { getCategory,deleteCategory } from "../api/index"
import { message } from "ant-design-vue";

export default {
name: "category",
  setup(){
    const columns =[
      {
        title: '二级分类id',
        dataIndex: 'category_id',
        key: 'category_id',
      },
      {
        title: '一级分类',
        dataIndex: 'parent_category_name',
        key: 'parent_category_name',
      },
      {
        title: '二级分类',
        dataIndex: 'sub_category_name',
        key: 'sub_category_name',
      },
      {
        title: '二级分类图片',
        dataIndex: 'sub_category_url',
        key: 'sub_category_url',
        slots: {
          customRender: 'sub_category_url',
        },
      },
      {
        title: '分类操作',
        dataIndex: 'categoryOption',
        key: 'categoryOption',
        slots: {
          customRender: 'categoryOption',
        },
      },
    ]
    const dataSource = reactive([])
    const router = useRouter()
    const addCategory = (id)=>{
      if(id){
        router.push('/admin/addcategory/'+id)
      }else{
        router.push('/admin/addcategory')
      }
    }
    /**
     * @description 删除分类
     */
    const delCategory = (id)=>{
      deleteCategory({category_id:id}).then((response)=>{
        message.success(response.data.msg)
        dataSource.length = 0
        getCategory().then((response)=> {
          let data = response.data.data
          for (let i = 0; i < data.length; i++) {
            dataSource.push({
              category_id: data[i].category_id,
              parent_category_name: data[i].parent_category_name,
              sub_category_name: data[i].sub_category_name,
              sub_category_url: data[i].sub_category_url
            })
          }
        })
      }).catch((e)=>{
        message.error(e.data.msg)
      })
    }
    getCategory().then((response)=>{
      let data = response.data.data
      for(let i=0;i<data.length;i++){
        dataSource.push({
          category_id:data[i].category_id,
          parent_category_name:data[i].parent_category_name,
          sub_category_name:data[i].sub_category_name,
          sub_category_url:data[i].sub_category_url
        })
      }
    }).catch((e)=>{
      console.log(e);
    })
    //分页配置
    const pagination = {
      pageSize:5,
      hideOnSinglePage:true,
    }
    return {
      columns,
      dataSource,
      addCategory,
      delCategory,
      pagination
    }
  }
}
</script>

<style lang="less">
.table{
  margin:30px 30px;
  .table-row>td{
    padding: 5px 10px !important;
    text-align: center;
  }
}
</style>