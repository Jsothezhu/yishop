const Controller = require('egg').Controller;


class goodsController extends Controller{
    async getGoods(){
        const { ctx } = this;
        const id = ctx.request.query.id;
        //如果有id则为修改用户
        const data= await ctx.service.goods.getGoods(id);
        console.log(ctx.cookies.get("token"));
        ctx.success(data,200,"查询成功");
    }
    async addGood(){
        const { ctx } = this;
        const data = ctx.request.body;
        const result =await ctx.service.goods.addGood(data);
        if(result){
            ctx.success(result,200,"添加商品成功");
        }else {
            ctx.error(400, "添加商品失败");
        }
    }
    async altGoods(){
        const { ctx } = this;
        const data = ctx.request.body;
        const result =await ctx.service.goods.altGoods(data);
        if(result){
            ctx.success(result,200,"修改商品成功");
        }else {
            ctx.error(400, "修改商品失败");
        }
    }
    //删除商品
    async delGoods(){
        const { ctx } = this;
        const data = ctx.request.body.goods_id;
        const result =await ctx.service.goods.delGoods(data);
        if(result){
            ctx.success(result,200,"删除商品成功");
        }else {
            ctx.error(400, "删除商品失败");
        }
    }
    /**
     * @description 修改规格
     */
    async altSku(){
        const { ctx } = this;
        const data = ctx.request.body;
        const result =await ctx.service.goods.altSku(data);
        if(result){
            ctx.success(result,200,"修改规格成功");
        }else{
            ctx.error(400,"修改规格失败");
        }
    }
    /**
     * @description 修改对应规格商品的价格
     */
    async altpprice(){
        const { ctx } = this
        const data = ctx.request.body
        const result =await ctx.service.goods.altpprice(data)
        if(result){
            ctx.success(result,200,"价格修改成功")
        }else{
            ctx.error(400, "价格修改失败")
        }
    }
}

module.exports = goodsController