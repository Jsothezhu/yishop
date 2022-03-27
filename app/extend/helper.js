const ImageCode = require('../util/imageCode');
const utils = require('utility');


module.exports = {
  createImageCode(ctx, app) {
    return ImageCode.createImageCode(ctx, app);
  },
  /**
   * @description 校验验证码
   */
  checkImageCode(app, ctx, clintCode) {
    return ImageCode.validImageCode(app, ctx, clintCode);
  },
  // 加密
  MD5() {
    const { ctx } = this;
    return utils.md5(ctx.request.body.password);
  },

};
