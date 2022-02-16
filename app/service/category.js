
const Service = require('egg').Service;

class categoryService extends Service {
    async getSubCategory(){
        const { ctx } = this
        const data = await ctx.model.Category.findAll({
            attributes: ['sub_category_name']
        })
        return data
    }
    /**
     * @description 获取分类
     * */
    async getCategory(){
        const { ctx } = this
        const data = await ctx.model.Category.findAll()
        return data
    }
    /**
     * @description 增加或修改分类
     * */
    async addCategory(data){
        const { ctx } = this
        //没有id(或id为0)则增加，有则修改
        if(!Number(data.category_id)){
            try{
                const result = await ctx.model.Category.create({
                    parent_category_name:data.parent_category_name,
                    sub_category_name:data.sub_category_name,
                    sub_category_url:data.sub_category_url
                })
                return result
            }catch (e) {
                throw new Error(e)
            }
        }else{
            try{
                const result = await ctx.model.Category.update({
                    parent_category_name:data.parent_category_name,
                    sub_category_name:data.sub_category_name,
                    sub_category_url:data.sub_category_url
                },{
                  where:{
                      category_id:Number(data.category_id)
                  }
                })
                return result
            }catch (e) {
                throw new Error(e)
            }
        }

    }
    /**
     * @description 删除分类
     * */
    async delCategory(data){
        const { ctx } = this
        const id = data.category_id
        try{
            const result = await ctx.model.Category.destroy({
                where:{
                    category_id: id
                }
            })
            return result
        }catch (e) {
            throw new Error(e)
        }
    }
    /**
     *@description wxapp获取分类信息
     */
    async wxappGetCategory(){
        const { ctx } = this
        const result = await ctx.model.Category.findAll()
        let category = new Map()
        //遍历每一个分类
        for(let item of result) {
            category[item.parent_category_name] = []
        }
        result.forEach((item,index)=>{
            //根据键名push相对应的商品
            category[item.parent_category_name].push(
                {
                    sub_category_name:item.sub_category_name,
                    sub_category_url:item.sub_category_url
                }
            )
        })
        return category
    }

}

module.exports = categoryService