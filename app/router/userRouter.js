module.exports =(app)=>{
    app.router.get("/app/v1/getUser",app.controller.normalUser.getUsers)
    app.router.post("/app/v1/createUser",app.controller.normalUser.createUser)
    app.router.put("/app/v1/updateUser",app.controller.normalUser.updateUser)
    app.router.delete("/app/v1/deleteUser/:id",app.controller.normalUser.delUser)
}