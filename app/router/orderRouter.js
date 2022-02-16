module.exports = (app) =>{
    app.router.get("/app/v1/getorder",app.controller.order.getOrder)
    app.router.put("/app/v1/altorderstate",app.controller.order.altOrderState)//后台修改
}