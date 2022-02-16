const Service = require('egg').Service;

class receiverService extends Service {
   /**
    * @description 获取收货地址
    * @userid 用户的id
    */
    async getReceiverAddress(userid){
        const { ctx } = this
        try{
            const result = await ctx.model.Receiver.findAll({
                where:{
                    user_id:userid
                }
            })
            return result
        }catch(e){
          throw Error(e)
        }
    }
    /**
     * @description 修改收货地址
     * @param addressid 收货地址id
     * @param name 收件人
     * @param phone 收件人电话
     * @param province 省
     * @param city 市
     * @param area 区
     * @param detail 详细地址
     */
    async altReceiverAddress(addressid,name,phone,province,city,area,detail){
        const { ctx } = this
        const hasAddress = await ctx.model.Receiver.findOne({
            where:{
                address_id:addressid
            }
        })
        if(hasAddress){
            try{
                const result = await ctx.model.Receiver.update({
                    receiver:name,
                    receiver_phone:phone,
                    province:province,
                    city:city,
                    area:area,
                    detail:detail,
                },{
                    where:{
                        address_id:addressid
                    }
                })
                return result
            }catch(e){
                throw new Error(e)
            }
        }
    }
    /**
     * @description 添加收货地址
     * @param user_id 用户的id
     * @param name 收件人
     * @param phone 收件人电话
     * @param province 省
     * @param city 市
     * @param area 区
     * @param detail 详细地址
     */
    async addReceiverAddress(user_id,name,phone,province,city,area,detail){
        const { ctx } = this
        try{
            const result = await ctx.model.Receiver.create({
                user_id:user_id,
                receiver:name,
                receiver_phone:phone,
                province:province,
                city:city,
                area:area,
                detail:detail,
            })
            return result
        }catch(e){
            throw new Error(e)
        }
    }
    /**
     * @description 删除收货地址
     * @param addressId 删除的地址id
     */
    async delReceiverAddress(addressId){
        const { ctx } = this
        try{
            const result = await ctx.model.Receiver.destroy({
                where:{
                    address_id:addressId
                }
            })
            return result
        }catch (e) {
            throw new Error(e)
        }
    }
}
module.exports = receiverService