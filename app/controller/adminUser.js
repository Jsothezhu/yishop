const Controller = require('egg').Controller;
const UserRule = require('../validate/userRule');
const AddUserRule = require('../validate/addUserRule');
const jwt = require('jsonwebtoken');

class adminUserController extends Controller {
  async login() {
    const { ctx,app } = this;
    const userData = ctx.request.body;
    const username = userData.username;
    const password = userData.password;
    const code = userData.code;
    // console.log(ctx);
    try {
      await this.validateUserInfo(userData);
    } catch (e) {
      return ctx.error(400, e.message);
    }
    // 校验验证码
    try {
      const check = await ctx.helper.checkImageCode(ctx, code);
      console.log(check);
      if (check) throw Error('验证码错误');
    } catch (e) {
      return ctx.error(400, e);
    }
    const user = await ctx.service.adminUser.getUser(userData, username, password, code);
    // cookie设置token
    const token = jwt.sign({ username }, this.config.keys, { expiresIn: '7days' });
    ctx.cookies.set('token', token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: false,
      overwrite: true,
    });
    user[0].dataValues.token = token;
    // console.log(user);
    ctx.session.user = user;
    // 删除原来的密码
    delete userData.password;
    ctx.success(user);
  }
  // 注册用户
  async createUser() {
    const { ctx } = this;
    const userData = ctx.request.body;
    await this.validateAddUserInfo(userData);
    const user = await ctx.service.adminUser.addAdminUser(userData);
    if (user) {
      ctx.success(user, 200, '注册成功');
    }
  }
  // 校验登录信息
  async validateUserInfo(user) {
    const { ctx } = this;
    ctx.validate(UserRule, user);
  }
  async validateAddUserInfo(user) {
    const { ctx } = this;
    ctx.validate(AddUserRule, user);
  }
}
module.exports = adminUserController;
