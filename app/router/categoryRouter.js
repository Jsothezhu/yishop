module.exports = (app)=>{
    app.router.get('/app/v1/getSubCategory',app.controller.category.getSubCategory)
    app.router.get('/app/v1/getCategory',app.controller.category.getCategory)
    app.router.post('/app/v1/addCategory',app.controller.category.addCategory)
    app.router.put('/app/v1/alterCategory',app.controller.category.addCategory)
    app.router.del('/app/v1/delCategory',app.controller.category.delCategory)
}