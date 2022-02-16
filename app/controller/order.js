const Controller = require("egg").Controller

class order extends Controller{
    async getOrder() {
        const { ctx } = this
        const order = await ctx.service.order.getOrder()
        if(order){
            ctx.success(order,200,"订单查询成功")
        }
    }
    async altOrderState(){
        const { ctx } = this;
        const orderState = await ctx.service.order.altOrderState()
        if(orderState){
            ctx.success(orderState,200,"修改订单状态成功")
        }else{
            ctx.error(400,"修改订单状态失败")
        }
    }
}

module.exports = order