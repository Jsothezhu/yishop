
const Service = require('egg').Service;

class UserService extends Service{
    async createUser(userinfo){
        const { ctx } = this;
        // console.log(userinfo);
        const Time = new Date()
        const {username,email,phone,nickname} = userinfo
        const user = await ctx.model.User.findByPk(username);
        if(!user){
            try{
                await ctx.model.User.create({
                    username,email,phone,
                    password:123456,nickname,
                    create_time:Time,
                    update_time:Time,
                });
                ctx.success({},200,"注册成功")
            }catch (e) {
                throw Error(e)
            }
        }
    }
    //更新用户
    async updateUser(userinfo){
        const { ctx } = this;
        const updateTime = new Date()
        const {id,username,email,phone,nickname} = userinfo
        const user = await ctx.model.User.findByPk(id);
        if(user){
            const isUpdate = await user.update({
                username:username,
                email:email,
                phone:phone,
                nickname:nickname,
                update_time:updateTime
            })
            if(Boolean(isUpdate)){
                return isUpdate
            }
        }else{
            ctx.error(400,"没有该用户")
        }
    }
    //删除用户
    async deleteUser(userinfo){
        const { ctx } = this;
        const {id} = userinfo
        console.log(userinfo);
        const user = await ctx.model.User.findByPk(id);
        if(user){
            await user.destroy();
            ctx.success({},200,"删除成功")
        }else{
            ctx.error(400,"没有该用户")
        }
    }
    /**
     * @description h5登录
     * @param username 用户名
     * @param password 密码
     */
    async wxappLogin(username,password){
        const { ctx } = this;
        const user=await ctx.model.User.findOne({
            where: {
                username:username,
                password:password,
            }
        })
        return user
    }
    /**
     * @description wxapp注册
     * @param username 用户名
     * @param password 密码
     * @param email 邮箱
     * @param phone 手机号
     */
    async wxappRegister(username,password,email,phone){
        const { ctx } = this;
        let date = new Date();
        //先查询用户是否存在
        const isExist = await ctx.model.User.findOne({
            where:{
                username:username
            }
        })
        if(!isExist){
            try{
                const newUser = await ctx.model.User.create({
                    username:username,
                    password:password,
                    email:email? email:null,//如果有邮箱就写邮箱否则为空
                    phone:phone? phone:null,
                    nickname:"用户"+username,
                    create_time:date,
                    update_time:date,
                })
                return newUser
            }catch(e){
                throw new Error(e)
            }
        }else{
            throw new Error("该用户名已存在")
        }
    }

}
module.exports = UserService