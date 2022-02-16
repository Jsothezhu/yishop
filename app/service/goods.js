const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Service = require('egg').Service;

class GoodsService extends Service {
    /**
     * 管理后台
     */
    /**
     *@description 获取商品信息
     * @param id 如果有id则为查询商品详情否则为查询所有商品
     */
    async getGoods(id){
        const { ctx } = this;
        //如果有id则为修改没有则为查询
        if(id){
            const goodsData = await ctx.model.Goods.findAll({
                where:{goods_id : id},
                include:[{
                    model:ctx.model.Category,
                    attributes:['sub_category_name']
                },{
                    model:ctx.model.Specifications,
                    attributes:['goods_id','specifications','pprice','maxprice','minprice']
                }]
            })
            return goodsData
        }
        const goodsData = await ctx.model.Goods.findAll({
            include:[{
                model:ctx.model.Category,
                attributes:['sub_category_name']
            },{
                model:ctx.model.Specifications,
                attributes:['goods_id','specifications','pprice','maxprice','minprice']
            }]
        })
        return goodsData
    }
    async addGood(fromData) {
        const {ctx} = this;
        //先查询改子分类的id,如果有该子分类就执行插入
        const hasCategory = await ctx.model.Category.findAll({
            where: {
                sub_category_name: fromData.sub_category
            },
        })
        //查询商品id是否已经存在
        const hasGoodsId = await ctx.model.Goods.findAll({
            where:{
                goods_id:fromData.goods_id
            }
        })
        if(hasCategory.length!==0 && hasGoodsId.length ===0) {
            try {
                const create = await ctx.model.Goods.create({
                    goods_id: fromData.goods_id,
                    title: fromData.title,
                    category_id:hasCategory[0].dataValues.category_id,
                    stock:fromData.stock,
                    description:fromData.description,
                    descrip_src:'',
                    type:fromData.type,
                    sale_time:new Date(),
                    good_pic:fromData.good_pic
                })
                return create
            } catch (e) {
                throw new Error(e)
            }
        }else if(hasGoodsId.length !== 0){
            console.log(hasGoodsId);
            throw new Error("商品id已经存在")
        }else{
            throw new Error("没有该分类")
        }
    }
    async altGoods(fromData){
        const {ctx} = this;
        //先查询改子分类的id,如果有该子分类就执行修改操作
        const hasCategory = await ctx.model.Category.findAll({
            where: {
                sub_category_name: fromData.sub_category
            },
        })
        try{
            const update = await ctx.model.Goods.update({
                title: fromData.title,
                category_id:hasCategory[0].dataValues.category_id,
                stock:fromData.stock,
                description:fromData.description,
                descrip_src:'',
                type:fromData.type,
                good_pic:fromData.good_pic
            },{
                where:{
                    goods_id:fromData.goods_id
                }
            })
            return update
        }catch (e) {
            throw Error(e)
        }
    }
    /**
     * @description 删除商品
     * @param id 需要删除的商品的商品id
     */
    async delGoods(id){
        const { ctx } = this;
        const good = await ctx.model.Goods.findByPk(id);
        if(good){
            try{
              const result = await good.destroy()
              return result
            }catch(e){
                throw new Error(e)
            }
        }

    }
    /**
     * @description 修改或添加规格
     * @param fromData 规格表单数据
     */
    async altSku(fromData){
        const { ctx } = this

        const hasSku =await ctx.model.Specifications.findAll({
            where:{
                goods_id:fromData.goods_id
            }
        })
        if(hasSku.length === 0){
            try{
                const sku = await ctx.model.Specifications.create({
                    pprice:{},
                    goods_id:fromData.goods_id,
                    specifications:fromData.specifications,
                    maxprice:fromData.maxprice,
                    minprice:fromData.minprice,
                })
                return sku
            }catch (e) {
                throw Error(e)
            }
        }else if(hasSku.length !== 0){
            try{
                const sku = await ctx.model.Specifications.update({
                    pprice:'',
                    goods_id:fromData.goods_id,
                    specifications:fromData.specifications,
                    maxprice:fromData.maxprice,
                    minprice:fromData.minprice,
                },{
                    where:{
                        goods_id:fromData.goods_id
                    }
                })
                return sku
            }catch (e) {
                throw Error(e)
            }
        }
    }
    /**
     * @description 修改规格组合对应的价格
     * @param fromData 关于规格组合和价格
     */
    async altpprice(fromData){
        const { ctx } = this
        const hasSku =await ctx.model.Specifications.findAll({
            where:{
                goods_id:fromData.goods_id
            }
        })
        if(hasSku.length !== 0){
            try{
                console.log(fromData.pprice);
                /**
                 * 计算最大价格和最小价格
                 */
                let maxprice = 0, minprice = 0;
                for(let key in fromData.pprice){
                    if(parseFloat(fromData.pprice[key])>maxprice) {
                        maxprice = parseFloat(fromData.pprice[key])
                    }
                }
                minprice = maxprice
                for(let key in fromData.pprice){
                    if(parseFloat(fromData.pprice[key])<minprice){
                        minprice = parseFloat(fromData.pprice[key])
                    }
                }
                const skuprice = await ctx.model.Specifications.update({
                    pprice:fromData.pprice,
                    maxprice:maxprice,
                    minprice:minprice,
                },{
                    where:{
                        goods_id:fromData.goods_id
                    }
                })
                return skuprice
            }catch (e) {
                throw Error(e)
            }
        }else{
            throw new Error("该商品不存在")
        }
    }
    /**
     *@description wxapp首页商品查询
     */
    async wxappGetGoods(){
        const { ctx } = this
        //查询电子产品
        const result = await ctx.model.Goods.findAll({
            include:[{
                model:ctx.model.Specifications,
                attributes:['maxprice','minprice']
            }],
            //子查询
            where:{
                category_id: [Sequelize.literal(
                    `SELECT category_id FROM category WHERE parent_category_name = '电子产品'`
                )]
            },
            limit:6
        })
        for(let i = 0;i<result.length; i++){
            result[i].dataValues.type = "电子产品"
        }
        //查询家用电器
        const result1 = await ctx.model.Goods.findAll({
            include:[{
                model:ctx.model.Specifications,
                attributes:['maxprice','minprice']
            }],
            where:{
                category_id: [Sequelize.literal(
                    `SELECT category_id FROM category WHERE parent_category_name = '家用电器'`
                )]
            },
            limit:6
        })
        for(let i = 0;i<result1.length; i++){
            result1[i].dataValues.type = "家用电器"
        }
        return [...result, ...result1]
    }
    /**
     *@description wxapp搜索商品
     * @param keyword 关键字
     */
    async wxappSearch(keyword){
        const { ctx } = this
        const result =await ctx.model.Goods.findAll({
            where:{
                [Op.or]:[
                    {
                        title:{
                            [Op.like]:`%${keyword}%`
                        }
                    },
                    {
                        description:{
                            [Op.like]:`%${keyword}%`
                        }
                    }
                ]
            },
            include:{
                model:ctx.model.Specifications,
                attributes:['goods_id','specifications','maxprice','minprice']
            }
        })
        return result
    }
    /**
     * @description wxapp查看商品详情
     * @param goodId 商品id
     */
    async wxappDetail(goodId){
        const { ctx } = this
        const result =await ctx.model.Goods.findOne({
            where:{
                goods_id:goodId
            },
            include:[{
                model:ctx.model.Specifications
            },{
                model:ctx.model.Comment
            }]
        })
        return result
    }
}
module.exports = GoodsService