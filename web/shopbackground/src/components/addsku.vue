<template>
  <div class="form">
      <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="商品id">
          <a-input v-model:value="formState.goods_id" :disabled="true" class="sku"/>
        </a-form-item>
        <!--如果有规格，则写规格，没有则只有一个input      -->
        <a-form-item label="商品规格名">
          <a-space :size="size" v-if="formState.specificationName">
            <a-input class="sku" v-for="(key,index) in formState.specificationName"
                v-model:value="formState.specificationName[index]"
                :disabled="formState.specificationConfirm"/>
            <div class="buttons">
              <a @click="addNameInputs()">增加</a>
              <a @click="reduceinputs()">减少</a>
              <a @click="confirms()">确定</a>
            </div>
          </a-space>
          <a-space :size="size" v-else>
            <a-input class="sku" v-model:value="formState.specificationName"/>
            <a-button @click="addNameInputs()">添加</a-button>
          </a-space>
        </a-form-item>
<!--规格有多种，分为多行      -->
        <div class="speifications" v-if="formState.specificationConfirm">
          <a-form-item v-for="(skus,index) in formState.specifications" :label="index">
            <a-space :size="size">
                <a-input class="sku" v-for="(sku1,index1) in skus"
                         v-model:value="skus[index1]"/>
                <a @click="addSkuInputs(index)">添加</a>
            </a-space>
          </a-form-item>
          <a style="position:absolute;left: 50%;" @click="onsubmit()">提交</a>
        </div>
      </a-form>
    </div>


</template>

<script>
import { useRoute,useRouter } from 'vue-router';
import { getGoods,altSku } from "../api/index"
import { ref } from "@vue/reactivity";
import {reactive} from "vue";
import {message} from "ant-design-vue";
export default {
name: "addsku",
setup(){
  const route = useRoute()
  const router = useRouter()
  //增加或减少规格名
  const addNameInputs = ()=>{
    if(formState.specificationName.length<6){
      return  formState.specificationName.length++
    }
  }
  const reduceinputs = ()=>{
    if(formState.specificationName.length>0){
      console.log(formState.specificationName);
      return formState.specificationName.length--
    }
  }
  //确定规格名并遍历规格名作为对象的key
  const confirms = ()=>{
    for(let i=0;i<formState.specificationName.length;i++){
      formState.specifications[formState.specificationName[i]]=[]
    }
    formState.specificationConfirm = true
  }
  //规格内容相关操作
  const addSkuInputs = (key)=>{
    if(formState.specifications[key].length<6) {
      formState.specifications[key].length++
    }
    console.log(formState)
  }
  //提交
  const onsubmit = ()=>{
    altSku(formState).then((response)=>{
      if(response.data.code === 200){
        message.success(response.data.msg)
        router.push('/admin/goods')
      }else{
        message.error(response.data.msg)
      }
    }).catch((e)=>{
      message.error(e)
    })
  }
  //输入框间隔宽度
  const size = ref(25)
  //数据
  const formState = reactive({
    goods_id:0,
    pprice:{},
    specificationConfirm:false,
    specificationName:[],
    specifications:{},
    maxprice: 0,
    minprice: 0,
  })
  getGoods({id:route.params.id}).then((response)=>{
    console.log(response);
    let data = response.data.data[0].specification
    formState.goods_id = response.data.data[0].goods_id
    //如果有规格则遍历规格
    if(data){
      for(let sp in data.specifications){
        formState.specificationName.push(sp)
      }
      formState.specifications = data.specifications
    }else {
      formState.specificationName.push("单规格")
      console.log(formState);
    }
  }).catch((e)=>{
    console.log(e);
  })

  //console.log(route.query);
  return {
    addNameInputs,
    size,
    formState,
    labelCol: {
      span: 3,
    },
    wrapperCol: {
      span: 14,
    },
    reduceinputs,
    confirms,
    addSkuInputs,
    onsubmit,
  }
}

}
</script>

<style scoped lang="less">
.sku{
  width: 120px !important;
  height: 30px !important;
}
.form{
  background-color: white;
  margin-left: 50px;
  margin-top: 50px;
  width: 75%;
  padding-top: 30px;
  position:relative;
}
.buttons{
  width: 100px;
  height: 30px;
  display: flex;
  flex-direction: row;
}

</style>