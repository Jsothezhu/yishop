const Controller = require('egg').Controller;

class userController extends Controller{
    async getUsers(){
        const { ctx } = this;
        ctx.body = await ctx.model.User.findAll()
    }
    async createUser(){
        const { ctx } = this;
        let date = ctx.request.body
        ctx.body = await ctx.service.normalUser.createUser(date)
    }
    async updateUser(){
        const { ctx } = this;
        let date = ctx.request.body
        const result = await ctx.service.normalUser.updateUser(date)
        ctx.success(result,200,"更新成功")
    }
    async delUser(){
        const { ctx } = this;
        let date = ctx.params
        console.log(date);
        ctx.body = await ctx.service.normalUser.deleteUser(date)
    }
}

module.exports = userController