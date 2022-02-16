const Service = require('egg').Service;

class adminUserService extends Service {
    /**
     *@description 管理员登录
     * @param username 用户名 password 密码
     */
    //登录密码加密
    async getUser({username,password}){
        const { ctx } = this;
        password = ctx.helper.MD5(password)
        const user=await ctx.model.AdminUser.findAll({
            where: {
                username:username,
                password:password
            }
        })
        return user
    }
    //注册用户
    async addAdminUser(user){
        const { ctx } = this;
        const date = new Date();
        user.password = ctx.helper.MD5(user.password)
        let check =await ctx.model.AdminUser.findAll({
            where: {
                username:user.username,
            }
        })
        if(check.length>0){
            return ctx.error(400,"用户已存在")
        }
        let result=await ctx.model.AdminUser.create({
            username:user.username,
            password:user.password,
            create_time:date,
            update_time:date,
        })
        const createData = result['dataValues']
        delete createData.password
        return createData
    }

}


module.exports = adminUserService;