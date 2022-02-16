'use strict';


module.exports = app => {
  const { router, controller } = app;
  router.get('/captcha',controller.util.imageCode);
  router.post('file','/app/v1/upload',controller.util.upLoad);
  //微信小程序接口
  require("./router/wxapp")(app)
  //后台接口
  require("./router/account")(app)
  require("./router/userRouter")(app)
  require("./router/goodsRouter")(app)
  require("./router/categoryRouter")(app)
  require("./router/orderRouter")(app)
};
