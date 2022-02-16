module.exports = (app)=>{
    app.router.post('/login',app.controller.adminUser.login);
    app.router.post('/register',app.controller.adminUser.createUser)
}