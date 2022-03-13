const Controller = require('egg').Controller;
const fs = require('fs')
const path = require('path')

class util extends Controller{
     async imageCode(){
        const { ctx } = this;
        ctx.response.type='image/svg+xml';
        ctx.body = ctx.helper.createImageCode(ctx);
         console.log(ctx.session);
     }
     //上传文件
     async upLoad(){
         const { ctx } = this;
         const file = ctx.request.files[0];
         //新文件名
         const time = new Date().getTime()
         const filename = path.join(this.config.baseDir+'/app/public/upload/',time+file.filename)
         const fileInfo = fs.readFileSync(file.filepath)
         try{
             await fs.writeFileSync(filename,fileInfo)
         }catch (e) {
             throw new Error(e)
         }finally {
             await fs.unlink(file.filepath, err => {
                 if (err) {
                     throw err;
                 }
                 console.log('删除缓存文件:' + file.filepath + '成功！');
             });
         }
         //返回图片地址
         let baseDir = 'http://127.0.0.1:7001/public/upload/'
         ctx.success(baseDir+time+file.filename,200,"文件上传成功")
     }
}

module.exports = util