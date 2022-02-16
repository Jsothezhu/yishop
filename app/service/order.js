const Service = require('egg').Service
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class orderService extends Service{
    async getOrder(){
        const { ctx } = this;
        await ctx.model.OrderItem.removeAttribute("id")
        const result =await ctx.model.Order.findAll({
            include:[{ model: ctx.model.User },{ model:ctx.model.OrderItem }]
        })
        return result
    }
    /**
     * @description 修改订单的状态
     */
    async altOrderState(){
        const { ctx } = this;
        const state = ctx.request.body.orderState
        const id = ctx.request.body.order_id
        const result =await ctx.model.Order.update({
            ship_status:state,
        },{
            where:{
                order_id:id
            }
        })
        return result
    }
    /**
     * @description 增加订单
     * @param user_id 用户id
     * @param address 地址
     * @param total_price 总价
     * @param goods_id 购买商品的id
     * @param sku_type 购买的规格
     * @param count 购买的数量
     * @param price 购买的单价
     * @param status 订单状态
     * @param receiver 收件人
     * @param phone 收件人电话
     * @returns order_id 订单id
     */
    async addOrder({user_id,address,total_price,goods_id,sku_type,count,price,status,receiver,phone}){
        const { ctx } = this;
        let order_id = new Date().getTime()
        let transaction=await ctx.model.transaction()
        try{
            const order = await ctx.model.Order.create({
                order_id:order_id,
                user_id:user_id,
                no:""+order_id+user_id,//流水号：时间戳+用户的id（暂定）
                address:address,
                receiver:receiver,
                phone:phone,
                total_price:total_price,
                paid_method:'线下',
                ship_status:status,
                create_time:new Date()
            },{transaction:transaction})
        }catch(e){
            throw new Error(e)
        }
        try{
            for(let i in goods_id){
                await ctx.model.OrderItem.removeAttribute('id');
                await ctx.model.OrderItem.create({
                    order_id:order_id,
                    goods_id:goods_id[i],
                    sku_type:sku_type[i],
                    count:count[i],
                    price:price[i]
                },{
                    transaction:transaction
                })
                await ctx.model.Goods.increment({
                    stock:-count[i]
                },{
                    where:{
                        goods_id:goods_id[i]
                    },
                    transaction:transaction
                })
            }
            await transaction.commit()
            return order_id
        }catch(e){
            throw new Error(e)
        }
    }
    /**
     * @description 获取订单详情
     */
    async getDetail({ order_id }){
        const { ctx } = this;
        await ctx.model.OrderItem.removeAttribute("id")
        const detail = await ctx.model.Order.findOne({
            where: {
                order_id: order_id
            }
        })
        //查询订单商品项
        const orderitem = await ctx.model.OrderItem.findAll({
            where: {
                order_id: order_id
            }
        })
        //查询订单每一个商品的名称图片
        for(let item of orderitem){
            let good = await ctx.model.Goods.findOne({
                where: {
                    goods_id:item.dataValues.goods_id
                },
                attributes:['title','descrip_pic']
            })
            good.dataValues.descrip_pic = good.dataValues.descrip_pic.split(',')[0]
          item.dataValues = {...item.dataValues,...good.dataValues}
        }
        detail.dataValues.OrderItems = [...orderitem]
        return detail
    }
    /**
     * @description 获取某个用户的订单
     */
    async getUserOrder({user_id,status}){
        const { ctx } = this;
        await ctx.model.OrderItem.removeAttribute("id")
        if(status === 'all'){
            try{
                let order = await ctx.model.Order.findAll({
                    where: {
                        user_id:user_id
                    },
                    attributes:['order_id','total_price'],
                })
                //单独查询订单项
                for(let item of order){
                    let orderitem = await ctx.model.OrderItem.findAll({
                        where: {
                            order_id: item.order_id
                        },
                        attributes:['goods_id','count','price','sku_type']
                    })
                     item.dataValues.order_items = [...orderitem]
                }
                for(let item1 of order){
                    //遍历订单项
                     for(let item2 of item1.dataValues.order_items){
                         //查询商品信息
                         let goodInfo = await ctx.model.Goods.findOne({
                             where: {
                                 goods_id:item2.dataValues.goods_id
                             },
                             attributes:['title','descrip_pic']
                         })
                         goodInfo.dataValues.descrip_pic = goodInfo.dataValues.descrip_pic.split(',')[0]
                         item2.dataValues = {...item2.dataValues,...goodInfo.dataValues}//把图片、名称解构出来
                    }
                }
                return order
            }catch(e){
                throw new Error(e)
            }

        }else{
            try{
                let order = await ctx.model.Order.findAll({
                    where: {
                        [Op.and]: {
                            user_id: user_id,
                            ship_status:status
                        }
                    },
                    attributes:['order_id','total_price'],
                })
                //单独查询订单项
                for(let item of order){
                    let orderitem = await ctx.model.OrderItem.findAll({
                        where: {
                            order_id: item.order_id
                        },
                        attributes:['goods_id','count','price','sku_type']
                    })
                    item.dataValues.order_items = [...orderitem]
                }
                for(let item1 of order){
                    //遍历订单项
                    for(let item2 of item1.dataValues.order_items){
                        //查询商品信息
                        let goodInfo = await ctx.model.Goods.findOne({
                            where: {
                                goods_id:item2.dataValues.goods_id
                            },
                            attributes:['title','descrip_pic']
                        })
                        goodInfo.dataValues.descrip_pic = goodInfo.dataValues.descrip_pic.split(',')[0]
                        item2.dataValues = {...item2.dataValues,...goodInfo.dataValues}//把图片、名称解构出来
                    }
                }
                return order
            }catch(e){
                throw new Error(e)
            }
        }
    }
}
module.exports = orderService