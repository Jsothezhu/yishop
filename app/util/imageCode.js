const svgCaptcha = require('svg-captcha');

module.exports = {
    createImageCode(ctx){
        let captcha = svgCaptcha.create({
            size:4,
            noise:4,
            color:true,
            background:'#cc9966',
            width:100,
            height:35,
            fontSize:35,
        });
          ctx.session = {
              code:captcha.text,
          }
        return captcha.data
    },
    validImageCode(ctx,clientCode){
       // console.log(ctx.session);
        if(ctx.session.code.toLowerCase() !== clientCode.toLowerCase()){
             throw Error("验证码错误")
         }
    }

}

