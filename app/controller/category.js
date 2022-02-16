const Controller = require('egg').Controller;

class categoryController extends Controller{
    async getSubCategory(){
        const { ctx } = this
        const result = await ctx.service.category.getSubCategory()
        ctx.success(result,200,"查询成功")
    }
    async getCategory(){
        const { ctx } = this
        const result = await ctx.service.category.getCategory()
        ctx.success(result,200,"分类查询成功")
    }
    async addCategory(){
        const { ctx } = this
        const data = ctx.request.body
        const result = await ctx.service.category.addCategory(data)
        if(!Number(data.category_id)){
            ctx.success(result,200,"增加分类成功")
        }else{
            ctx.success(result,200,"修改分类成功")
        }
    }
    async delCategory(){
        const { ctx } = this
        const data = ctx.request.body
        console.log(data);
        const result = await ctx.service.category.delCategory(data)
        ctx.success(result,200,"删除分类成功")
    }
}

module.exports = categoryController