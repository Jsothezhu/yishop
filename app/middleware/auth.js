const jwt = require('jsonwebtoken');
module.exports = app => {
  return async function(ctx, next) {
    // console.log(ctx.path.indexOf('/v1/wxapp'));
    // await next()
    if (ctx.path.indexOf('/v1/wxapp/') !== -1) {
      const token = ctx.request.header.token;
      if (token) {
        if (jwt.verify(token, ctx.app.config.keys)) {
          await next();
        } else {
          ctx.error(400, '校验失败');
        }
      } else {
        ctx.error(400, '请先登录');
      }
    } else {
      await next();
    }
  };
};
