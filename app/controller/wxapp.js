const Controller = require('egg').Controller;
const addUserRule = require('../validate/wxappAddUserRule');
const userRule = require('../validate/wxappUserRule');
const jwt = require('jsonwebtoken');

class wxapp extends Controller {
  /**
     * @description 轮播图
     */
  async swiper() {
    const { ctx } = this;
    const swiper = await ctx.model.Other.findOne({
      attributes: [ 'swiper' ],
    });
    ctx.success(swiper, 200, '轮播图返回成功');
  }
  /**
     * @description 获取首页下方商品信息
     */
  async getGoods() {
    const { ctx } = this;
    const result = await ctx.service.goods.wxappGetGoods();
    // console.log(result);
    ctx.success(result, 200, '获取首页商品成功');
  }
  /**
     * @description wxapp分类信息
     */
  async getCategory() {
    const { ctx } = this;
    const result = await ctx.service.category.wxappGetCategory();
    ctx.success(result, 200, '获取分类成功');

  }
  /**
     *@description wxapp登录
     */
  async login() {
    const { ctx, app } = this;
    const param = ctx.request.body;
    console.log(ctx.request);
    try {
      await ctx.validate(userRule, param);
    } catch (e) {
      ctx.error(400, e.message);
    }
    // 验证码
    try {
      await ctx.helper.checkImageCode(app, ctx, param.code);
      // 验证码通过，登录
      const password = ctx.helper.MD5(param.password);
      const user = await ctx.service.normalUser.wxappLogin(param.username, password);
      if (user !== null) {
        const token = jwt.sign({ username: param.username }, this.config.keys, { expiresIn: '7days' });
        user.dataValues.token = token;
        delete param.password;
        ctx.success(user);
      } else {
        ctx.error(401, '账号或密码错误');
      }
    } catch (e) {
      // console.log(e);
      ctx.error(400, e.toString());
    }
  }
  /**
     *@description 注册
     */
  async register() {
    const { ctx } = this;
    const param = ctx.request.body;
    try {
      await ctx.validate(addUserRule, param);
    } catch (e) {
      ctx.error(400, e.message);
    }
    try {
      // 先进行加密
      const password = ctx.helper.MD5(param.password);
      const user = await ctx.service.normalUser.wxappRegister(param.username, password, param.email, param.phone);
      delete user.dataValues.password;
      ctx.success(user, 200, '注册成功');
    } catch (e) {
      ctx.error(400, e.message);
    }
  }
  /**
     * @description 搜索商品
     */
  async search() {
    const { ctx } = this;
    const keyword = ctx.request.query.keyword;
    const search = await ctx.service.goods.wxappSearch(keyword);
    ctx.success(search, 200, '搜索成功');
  }
  /**
     *@description 商品详情
     */
  async detail() {
    const { ctx } = this;
    const goodsid = ctx.request.query.goodsid;
    const detail = await ctx.service.goods.wxappDetail(goodsid);
    ctx.success(detail, 200, '商品查询成功');
  }
  /**
     *@description 获取购物车
     */
  async getCart() {
    const { ctx } = this;
    const userId = ctx.request.query.user_id;
    const cart = await ctx.service.cart.getCart(userId);
    ctx.success(cart, 200, '购物车查询成功');
  }
  /**
     *@description 修改购物车商品的数量
     */
  async altCartCount() {
    const { ctx } = this;
    const { cart_id, buy_count } = ctx.request.body;
    const result = await ctx.service.cart.altCartCount(cart_id, buy_count);
    if (result) {
      ctx.success(result, 200, '修改成功');
    } else {
      ctx.error('更新失败', 400);
    }
  }
  /**
     *@description 增加购物车
     */
  async addCart() {
    const { ctx } = this;
    const { userid, goodsId, skuText, buy_count, skuPrice } = ctx.request.body;
    const result = await ctx.service.cart.addCart(userid, goodsId, skuText, buy_count, skuPrice);
    if (result) {
      ctx.success(result, 200, '购物车已创建成功');
    }
  }
  /**
     *@description 删除购物车
     */
  async delCart() {
    const { ctx } = this;
    const cart_id = ctx.request.body.cartid;
    const result = await ctx.service.cart.delCart(cart_id);
    if (result) {
      ctx.success(result, 200, '购物车删除成功');
    } else {
      ctx.error(400, '购物车删除失败');
    }
  }
  /**
     * @description 获取收货地址
     */
  async getAddress() {
    const { ctx } = this;
    const userid = ctx.request.query.userid;
    const address = await ctx.service.receiver.getReceiverAddress(userid);
    if (address) {
      ctx.success(address, 200, '获取地址成功');
    } else {
      ctx.error(400, '获取地址失败');
    }
  }
  /**
     * @description 增加收货地址
     */
  async addAddress() {
    const { ctx } = this;
    const { user_id, name, phone, province, city, area, detail } = ctx.request.body;
    const result = await ctx.service.receiver.addReceiverAddress(user_id, name, phone, province, city, area, detail);
    if (result) {
      ctx.success(result, 200, '收货地址增加成功');
    } else {
      ctx.error(400, '收货地址增加失败');
    }
  }
  /**
     *@description 修改收货地址
     */
  async altAddress() {
    const { ctx } = this;
    const { addressid, name, phone, province, city, area, detail } = ctx.request.body;
    const result = await ctx.service.receiver.altReceiverAddress(addressid, name, phone, province, city, area, detail);
    if (result) {
      ctx.success(result, 200, '更新成功');
    } else {
      ctx.error(400, '更新失败');
    }
  }
  /**
     * @description 删除收货地址
     */
  async delAddress() {
    const { ctx } = this;
    const { addressid } = ctx.request.body;
    const result = await ctx.service.receiver.delReceiverAddress(addressid);
    if (result) {
      ctx.success(result, 200, '删除地址成功');
    } else {
      ctx.error(400, '删除地址失败');
    }
  }
  /**
   *@description 生成未付款订单
   * */
  async addPayOrder() {
    const { ctx } = this;
    const query = ctx.request.body;
    const result = await ctx.service.order.addOrder(query);
    if (result) {
      ctx.success(result, 200, '订单添加成功');
    } else {
      ctx.error(400, '查询订单出错');
    }
  }
  /**
     * @description 生成付款的订单
     */
  async addOrder() {
    const { ctx } = this;
    const query = ctx.request.body;
    const result = await ctx.service.order.addOrder(query);
    if (result) {
      ctx.success(result, 200, '订单添加成功');
    } else {
      ctx.error(400, '查询订单出错');
    }

  }
  /**
     * @description 获取某个订单详情
     */
  async getOrderDetail() {
    const { ctx } = this;
    const order_id = ctx.request.query;
    const result = await ctx.service.order.getDetail(order_id);
    if (result) {
      ctx.success(result, 200, '订单详情查询成功');
    } else {
      ctx.error(400, '订单详情查询失败');
    }
  }
  /**
     * @description 获取用户的订单
     */
  async getUserOrder() {
    const { ctx } = this;
    const data = ctx.request.query;// 用户id和订单状态
    const result = await ctx.service.order.getUserOrder(data);
    if (result) {
      ctx.success(result, 200, `${data.user_id}的订单查询成功`);
    } else {
      ctx.error(400, '查询失败');
    }
  }
  /**
     * @description 确认收货/确认付款
     */
  async getComfireOrder() {
    const { ctx } = this;
    const result = await ctx.service.order.altOrderState();
    if (result) {
      ctx.success(result, 200, '确认收货成功');
    } else {
      ctx.error(400, '确认收货失败');
    }
  }
}

module.exports = wxapp;
