module.exports={
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
    },
    code: {
        type: 'string',
        trim: true,
        // 必须是数字字母符号组合
        format: /^[A-Za-z0-9]{4}$/,
        message: '验证码不符合要求',
    },
}