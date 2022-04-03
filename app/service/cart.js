const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Service = require('egg').Service;

class cartService extends Service {
  /**
     *@description 获取购物车
     * @param userid 用户的id
     */
  async getCart(userid) {
    const { ctx } = this;
    const data = await ctx.model.Cart.findAll({
      where: {
        user_id: userid,
      },
      attributes: [ 'cart_id', 'checked', 'sku_text', 'buy_count', 'buy_price' ],
      include: {
        model: ctx.model.Goods,
        attributes: [[ 'title', 'shop_name' ], [ 'stock', 'max_count' ], 'good_pic', 'goods_id' ],
      },
    });
    return data;
  }
  /**
     * @description 添加购物车
     * @param userid 购物车的用户id
     * @param goodsId 购买的商品id
     * @param skuText 购买的规格
     * @param buy_count 购买的数量
     * @param skuPrice 规格的价格
     */
  async addCart(userid, goodsId, skuText, buy_count, skuPrice) {
    const { ctx } = this;
    try {
      const insert = await ctx.model.Cart.create({
        user_id: userid,
        good_id: goodsId,
        sku_text: skuText,
        buy_count,
        buy_price: skuPrice,
      });
      return insert;
    } catch (e) {
      throw new Error(e);
    }
  }
  /**
     * @description 修改购物车的商品的数量
     * @param cart_id 购物车的id
     * @param buy_count 购买数量
     */
  async altCartCount(cart_id, buy_count) {
    const { ctx } = this;
    const hasCart = await ctx.model.Cart.findOne({
      where: {
        cart_id,
      },
    });
    if (hasCart) {
      try {
        return await ctx.model.Cart.update({
          buy_count,
        }, {
          where: {
            cart_id,
          },
        });
      } catch (e) {
        throw new Error(e);
      }
    } else {
      return ctx.error('该用户不存在', 500);
    }
  }
  /**
     *@description 删除购物车
     * @param cart_id Array 删除的购物车id
     */
  async delCart(cart_id) {
    const { ctx } = this;
    const cartid = cart_id;
    try {
      const del = await ctx.model.Cart.destroy({
        where: {
          cart_id: {
            [Op.in]: cartid,
          },
        },
      });
      return del;
    } catch (e) {
      throw Error(e);
    }
  }
}
module.exports = cartService;
