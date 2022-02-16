module.exports={
    success:function (data,status=200,msg = "成功"){
        this.status = status
        this.body = {
            code : status,
            msg : msg,
            data : data
        }
    },
    error:function (status=400,msg = "失败"){
        this.status = status
        this.body = {
            code : status,
            msg : msg,
        }
    }
}