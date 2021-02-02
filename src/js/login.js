
    //判断localstrong里面有没有res注册信息
    const resVal = localStorage.getItem('res')
    if(resVal !== null){
        const obj = JSON.parse(resVal)
        $('[name="name"]').val(obj.name)
        $('[name="pwd"]').val(obj.pwd);
    }
    //账户密码验证form标签需要添加submit事件同时阻止默认提交数据事件的执行
    $('form').submit(()=>{
        let name = $('[name="name"]').val();
        let pwd = $('[name="pwd"]').val();
        //发生ajax请求携带参数
        $.ajax({
            url:'../server/login.php',
            data:{userName:name,userPwd:pwd},
            dataType:'json',
            type:'post',
            success:(res)=>{
                if(res.result === 1){
                    mySetCookie('login',1,7*24*60*60,'/')
                    window.alert('登录成功点击确定跳转首页')
                    //有浏览器地址参数数据跳转到数据页面没有参数数据跳转到首页面
                    window.location.href=window.location.search ? window.location.search.substr(5):'./dome1.html';
                }else{
                    window.alert('登录失败账户或密码错误')
                }
            }
        })
        //阻止默认提交事件的执行
        return false;
    })
