<template>
  <div class="table">
    <a-table  :columns="columns" :data-source="dataSource" rowClassName="table-row"
              :pagination="pagination">
      <template  #ship_status="{ record }">
        <span v-if="record.ship_status==='cancal'">已取消</span>
        <span v-if="record.ship_status==='pay'">待付款</span>
        <span v-if="record.ship_status==='receivce'">待收货</span>
        <span v-if="record.ship_status==='complete'">已完成</span>
        <span v-if="record.ship_status==='refund'">退款中</span>
      </template>
      <template  #option="{ record }">
        <span>
          <a-dropdown>
          <a-button>修改订单状态</a-button>
           <template #overlay>
          <a-menu>
            <a-menu-item v-for="(value,key) in orderState" @click="orderStateChange(record.order_id,key)">
                {{ value }}
            </a-menu-item>
          </a-menu>
        </template>

        </a-dropdown>
        </span>
        <a-divider type="vertical" />
        <span>
          <a-button type="primary">查看订单详细</a-button>
        </span>
      </template>
    </a-table>
  </div>
</template>

<script>
import {getOrder,altOrderState} from "../api/index"
import {reactive} from "vue";
import { message } from "ant-design-vue";

export default {
  name: "order",
  setup(){
    const columns =  [
      {
        title: '订单id',
        dataIndex: 'order_id',
        key: 'order_id',
      },
      {
        title: '购买用户',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '流水号',
        dataIndex: 'no',
        key: 'no',
      },
      {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title:"总价",
        dataIndex: 'total_price',
        key: 'total_price',
      },
      {
        title:"退款单号",
        dataIndex: 'refund_no',
        key: 'refund_no',
      },
      {
        title:"订单状态",
        dataIndex: 'ship_status',
        key: 'ship_status',
        slots: {
          customRender: 'ship_status',
        },
      },
      {
        title:"订单创建时间",
        dataIndex:'create_time',
        key: 'create_time',
      },
      {
        title:"操作",
        key: 'option',
        slots: {
          customRender: 'option',
        },
      }
    ]
    const dataSource = reactive([]);
    //订单状态
    const orderState = reactive({
      "receivce":'发货',
      "complete":"签收"
    });
    /**
     *修改订单状态
     */
    const orderStateChange = (id,state)=>{
      altOrderState({order_id:id,orderState:state}).then((response)=>{
        message.success(response.data.msg)
        getOrder().then((response)=>{
          let data = response.data.data
          dataSource.length = 0
          for(let i=0;i<data.length;i++){
            dataSource.push({
              order_id:data[i].order_id,
              username:data[i].user.username,
              no:data[i].no,
              address:data[i].address,
              total_price:data[i].total_price,
              refund_status:data[i].refund_status,
              ship_status:data[i].ship_status,
              create_time:data[i].create_time,
            })
          }
        }).catch((e)=>{
          message.error(e)
        })
      })
      .catch((e)=>{
        message.error(e.data.msg)
      })
      console.log(id,state);
    }
    const pagination = {
      pageSize:6,
      hideOnSinglePage:true,
    }
    getOrder().then((response)=>{
      let data = response.data.data
      for(let i=0;i<data.length;i++){
        dataSource.push({
          order_id:data[i].order_id,
          username:data[i].user.username,
          no:data[i].no,
          address:data[i].address,
          total_price:data[i].total_price,
          refund_no:data[i].refund_no,
          ship_status:data[i].ship_status,
          create_time:data[i].create_time,
        })
      }
    }).catch((e)=>{
      console.log(e);
    })
    return {
      columns,
      dataSource,
      orderState,
      orderStateChange,
      pagination
    }
  }



}

</script>

<style scoped lang="less">
.table {
  margin-left: 30px;
  margin-top: 30px;
  .table-row>td{
    padding: 5px 10px !important;
    text-align: center;
  }
}
</style>