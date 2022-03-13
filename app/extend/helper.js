const ImageCode = require("../util/imageCode")
const utils = require('utility');


module.exports={
    createImageCode(ctx){
        return ImageCode.createImageCode(ctx)
    },
    checkImageCode(ctx, clintCode){
        console.log(ctx.session);
        return ImageCode.validImageCode(ctx,clintCode);
    },
    //加密
    MD5(){
        const { ctx } = this;
        return utils.md5(ctx.request.body.password)
    }

}