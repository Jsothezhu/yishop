const Controller = require('egg').Controller;
const UserRule = require('../validate/userRule');
const AddUserRule = require('../validate/addUserRule');
const jwt = require('jsonwebtoken')

class adminUserController extends Controller{
    async login(){
        const { ctx,app } = this;
        let userData = ctx.request.body
        let username = userData.username
        let password = userData.password
        let code = userData.code
      //  console.log(ctx.session);
        await this.validateUserInfo(userData)
        await this.validateCode(ctx,code)
        let user = await ctx.service.adminUser.getUser(userData,username,password,code)
        //cookie设置token
        let token = jwt.sign({ username: username }, this.config.keys,{expiresIn: '7days'});
        ctx.cookies.set("token",token,{
            maxAge:24*60*60*1000,
            httpOnly: false,
            overwrite: true,
        })
        user[0].dataValues.token = token
        //console.log(user);
        ctx.session.user=user;
        //删除原来的密码
        delete userData.password
        ctx.success(user)
    }
    //注册用户
    async createUser(){
        const { ctx } = this;
        let userData = ctx.request.body
        await this.validateAddUserInfo(userData)
        let user = await ctx.service.adminUser.addAdminUser(userData)
        if(user) {
           ctx.success(user,200,"注册成功")
        }
    }
    //校验登录信息
    async validateUserInfo(user){
        const { ctx } = this;
        ctx.validate(UserRule,user)
    }
    async validateAddUserInfo(user){
        const { ctx } = this;
        ctx.validate(AddUserRule,user)
    }
    async validateCode(ctx,code){
        ctx.helper.checkImageCode(ctx,code)
    }

}
module.exports = adminUserController