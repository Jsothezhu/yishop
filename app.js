'use strict';

module.exports = app => {
  app.beforeStart(async () => {
    const ctx = app.createAnonymousContext();// 创建匿名上下文
    await app.initDelayTask();
    await app.registerTaskHandler('cancelOrder', async order_id => {
      await ctx.service.order.cancelOrder(order_id);
      console.log(`过期订单${order_id}已取消`);
    });
  });

};
