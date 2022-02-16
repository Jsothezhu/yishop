module.exports = (app)=>{
    app.router.get('/app/v1/getGoods',app.controller.goods.getGoods)
    app.router.post('/app/v1/addGoods',app.controller.goods.addGood)
    app.router.put('/app/v1/altGood',app.controller.goods.altGoods)
    app.router.del('/app/v1/delGood',app.controller.goods.delGoods)
    app.router.put('/app/v1/altSku',app.controller.goods.altSku)
    app.router.put('/app/v1/altpprice',app.controller.goods.altpprice)
}
