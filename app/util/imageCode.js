const svgCaptcha = require('svg-captcha');

module.exports = {
  async createImageCode(ctx, app) {
    const captcha = svgCaptcha.create({
      size: 4,
      noise: 4,
      color: true,
      background: '#cc9966',
      width: 100,
      height: 35,
      fontSize: 35,
    });
    if (ctx.request.header['x-forwarded-for']) {
      await app.redis.get('code').hset('captcha', ctx.request.header['x-forwarded-for'], captcha.text);
    } else {
      await app.redis.get('code').hset('captcha', ctx.request.header.referer, captcha.text);
    }
    return captcha.data;
  },
  async validImageCode(app, ctx, clientCode) {
    let code = '';
    if (ctx.request.header['x-forwarded-for']) {
      code = await app.redis.get('code').hget('captcha', ctx.request.header['x-forwarded-for']);
    } else {
      code = await app.redis.get('code').hget('captcha', ctx.request.header.referer);
    }
    if (code.toLowerCase() !== clientCode.toLowerCase()) {
      throw Error('验证码错误');
    }
  },

};

