<template>
  <div class="table">
    <a-button type="primary"
              style="float: right;margin-bottom: 10px;z-index: 1000"
              @click="addGoods()">添加商品</a-button>
    <a-table :data-source="dataSource" :columns="columns" :rowKey="dataSource.goods_id"
             :pagination="pagination" rowClassName="table-row">

      <template  #good_pic="{ record }">
        <a-image
            :width="75"
            :src="record.good_pic"
        />
      </template>
      <template  #type="{ record }">
      <span>
        {{ shopType(record.type) }}
      </span>
      </template>
      <template  #option="{ record }">
        <span style="display:flex;flex-direction: column;margin:5px;">
          <a-button primary @click="addGoods(record.goods_id)">修改商品</a-button>
          <a-button danger @click="delGoods(record.goods_id)" >删除商品</a-button>
        </span>
      </template>
      <template #expandedRowRender="{ record }">
<!--如果有规格这渲染规格，否则为单规格       -->
        <div class="specifications">
          <div v-if="record.specification">
            商品规格:
            <span v-for="(sku,sku_name) in record.specification.specifications">
              {{sku_name}}:
              <span v-for="(value,index) in sku" :key="index">
                  <a-tag color="pink">{{ value }}</a-tag>
              </span>
            </span>
          </div>
          <div v-else>
            商品规格: <a-tag color="pink">{{ record.title }}</a-tag>
          </div>
          <div class="sku_price">
            规格对应价格：
            <EditOutlined @click="showModel" />
          </div>
          <div>
            <a-button primary @click="addSku(record.goods_id)">修改规格</a-button>
          </div>
          <a-modal v-model:visible="visible" title="库存" @ok="submit(record)">
            <div class="pprice" v-for="(value,index) in pprice">
              规格组合{{index+1}}：<input type="text" class="key"/>
              价格：<input type="number" class="value"/>
            </div>
            <a-button style="margin-top: 10px" @click="addPprice">增加规格</a-button>
          </a-modal>
        </div>
      </template>
    </a-table>

  </div>

</template>

<script>
import {reactive,ref,onMounted } from "vue"
import { useRouter } from 'vue-router';
import { getGoods,delGood,altPprice } from "../api/index"
import { message } from "ant-design-vue";
import {
  EditOutlined,
} from '@ant-design/icons-vue';
export default {
  name: "goods",
  components:{
    EditOutlined
  },
  computed:{
    //每列的商品类型
    shopType:function(){
      return function(type){
        if(type === '0'){
          return "新品"
        }else if(type === '1'){
          return "热门"
        }else{
          return "普通"
        }
      }
    }
  },
  setup(){
    const columns =  [
      {
        title: '商品id',
        dataIndex: 'goods_id',
        key: 'goods_id',
      },
      {
        title: '商品名称',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '分类',
        dataIndex: 'sub_category',
        key: 'sub_category',
      },
      {
        title: '库存',
        dataIndex: 'stock',
        key: 'stock',
        slots: {
          customRender: 'stock',
        },
      },
      {
        title:"描述",
        dataIndex: 'description',
        key: 'description',
      },
      {
        title:"商品图片",
        dataIndex: 'good_pic',
        key: 'good_pic',
        slots: {
          customRender: 'good_pic',
        },
      },
      {
        title:"类型",
        key: 'type',
        slots: {
          customRender: 'type',
        },
      },
      {
        title:"操作",
        key: 'option',
        slots: {
          customRender: 'option',
        },
      }
    ]
    const router = useRouter()
    const visible = ref(false);
    const pprice = ref(1);
    let sku = ref(null);
    onMounted(()=>{
      console.log(sku.value);
    })
    let dataSource = reactive([])
    //获取商品
    getGoods().then((response)=>{
      let data = response.data.data
      for(let i=0;i<data.length;i++){
        dataSource.push({
          goods_id:data[i].goods_id,
          title:data[i].title,
          sub_category:data[i].category.sub_category_name,
          stock:data[i].stock,
          description:data[i].description,
          good_pic:data[i].good_pic,
          type:data[i].type,
          specification:data[i].specification
        })
      }
    }).catch((e)=>{
      console.log(e);
    })
    //添加和修改商品
    const addGoods = (title)=>{
        if(title){
          router.push('/admin/addgood/'+title)
        }else{
          router.push('/admin/addgood')
          console.log(1);
        }
    }
    //删除商品
    const delGoods = (id)=>{
      delGood({goods_id:id}).then((response)=>{
          message.success(response.data.msg)
        getGoods().then((response)=>{
          dataSource.length = 0
          let data = response.data.data
          for(let i=0;i<data.length;i++){
            dataSource.push({
              goods_id:data[i].goods_id,
              title:data[i].title,
              sub_category:data[i].category.sub_category_name,
              stock:data[i].stock,
              description:data[i].description,
              good_pic:data[i].good_pic,
              type:data[i].type
            })
          }
        }).catch((e)=>{
          console.log(e);
        })
      }).catch((e)=>{
          message.error(e)
      })
    }
    //分页配置
    const pagination = {
      pageSize:6,
      hideOnSinglePage:true,
    }
    //商品规格添加及修改
    const addSku = (id)=>{
      router.push('/admin/addsku/'+id)
    }
    const showModel = ()=>{
       visible.value = true
    }
    const addPprice = ()=>{
      pprice.value++
    }
    const submit = (record)=>{
      let obj = {}
      let key = document.querySelectorAll(".key")
      let value = document.querySelectorAll(".value")
      for(let i=0;i<key.length;i++){
        obj[key[i].value] = value[i].value
      }
      let data = {};
      data.goods_id = record.goods_id
      data.pprice = obj
      altPprice(data).then((response)=>{
        message.success(response.data.msg)
        visible.value = false
      }).catch((e)=>{
        message.error(e)
      })
    }
    return {
      columns,
      dataSource,
      addGoods,
      pagination,
      delGoods,
      addSku,
      visible,
      showModel,
      sku,
      pprice,
      addPprice,
      submit
    }
  }
}
</script>

<style scoped lang="less">
.table{
  margin-left: 30px;
  margin-top: 30px;
  .specifications{
    display: flex;
    justify-content: space-between;
  }
  .table-row>td{
    padding: 5px 10px !important;
    text-align: center;
  }
}
</style>