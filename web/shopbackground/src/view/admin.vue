<template>
    <div class="top">
      <div class="userinfo">
        <div class="username">你好，{{loginInfo.data[0].username}}</div>
        <a-button>退出</a-button>
      </div>
    </div>
    <div class="main">
      <div class="left-nav">
        <a-menu
            v-model:selectedKeys="selectedKeys"
            mode="inline"
            theme="light"
            :inline-collapsed="collapsed"
        >
          <a-menu-item v-for="(item,index) in selects" :key="index" @click="tabs(index)">
            <template #icon>
              <PieChartOutlined />
            </template>
            <span>{{ item }}</span>
          </a-menu-item>
        </a-menu>
      </div>
      <router-view></router-view>
    </div>

</template>

<script>
import { reactive, toRefs, ref } from 'vue';
import { useRouter } from 'vue-router';
import cookie from "js-cookie";
export default {
  name: "admin",
  setup() {
    const router = useRouter()
    const tab = parseInt(cookie.get('tab'))//从cookie获取被选择tab
    const state = reactive({
      collapsed: false,
      selectedKeys: tab ? [tab] : [0]
    })
    const selects = ref([
        '首页',
        '用户管理',
        '商品管理',
        '分类管理',
        '订单管理'
    ])
    const loginInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    const toggleCollapsed = () => {
      state.collapsed = !state.collapsed;
      state.openKeys = state.collapsed ? [] : state.preOpenKeys;
    };
    //切换其他界面
    const tabs = (i)=>{
      switch (i) {
        case 0:
          router.push('/admin/main')
          break
        case 1:
          router.push('/admin/users')
          state.selectedKeys = 1
          break
        case 2:
          router.push('/admin/goods')
          state.selectedKeys = 2
          break
        case 3:
          router.push('/admin/category')
          state.selectedKeys = 3
          break
        case 4:
          router.push('/admin/order')
          state.selectedKeys = 4
          break
        default:
          router.push('/admin/main')
      }
      cookie.set('tab',i)
    }
    return {
      ...toRefs(state),
      toggleCollapsed,
      selects,
      loginInfo,
      tabs
    };
  },
}
</script>

<style scoped lang="less">
.top{
  width: 100%;
  height: 60px;
  background-color: black;
  .userinfo{
    width: 200px;
    float: right;
    line-height:60px;
    color:white;
    font-size: 20px;
    .username{
      display:inline-block;
      margin-right: 10px;
    }
  }
}
.main{
  display: flex;
  flex-direction: row;
  overflow: hidden;
  .left-nav{
    width: 250px;
    height: e("calc(100vh - 60px)");
    background-color: white;
  }
}

</style>