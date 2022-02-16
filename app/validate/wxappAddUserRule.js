module.exports = {
    username:{
        require:true,
        type:'string',
        message:"用户名不为空"
    },
    password:{
        require:true,
        type:"string",
        format:/^(?=.*?[a-z])/g,
        message:"密码至少1个小写英文字母"
    }

}