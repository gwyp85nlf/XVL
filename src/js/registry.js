
    //完成验证码使用tools.js里的生成验证码
    $('#vc').html(getVC(4)).click(()=>{$('#vc').html(getVC(4))})
    //账户输入框输入数据失去焦点事件
    $('[name="name"]').change(()=>{
        //向后端发生数据查询严重账户是不是存在
        $.ajax({
            url:'../server/goods_select.php',
            data:{userName:$('[name="name"]').val()},
            dataType:'json',
            type:'post',
            success:(res)=>{
                //res 响应体结果是{result:0,msg:"用户名重复"}对象类型
                if(res.result === 1){
                    $('[name="nameSpan"]').html('用户名可用')
                }else{
                    $('[name="nameSpan"]').html('用户名不可用')
                }
            }
        })
    })
    //给注册button按钮添加点击事件
    $('button').click(()=>{
        //验证两次密码是否一致
        if($('[name=pwd1]').val()!==$('[name=pwd2]').val()){
            $('[name="pwd1Span"]').html('两次密码不一致')
            return false
        }else{
            $('[name="pwd1Span"]').html('');
        }
        //验证码是否一致
        if($('[name="vc"]').val().toUpperCase()!== $('#vc').text().toUpperCase()){
            $('[name="vcSpan"]').html('验证码不一致')
            return false
        }else{
            $('[name="vcSpan"]').html('');
        }
        //获取账户密码数据
        let name = $('[name="name"]').val();
        let pwd = $('[name="pwd1"]').val();
        //向PHP发生ajax请求 请求地址请求方式请求参数 等都需要由后端程序决定
        $.ajax({
            url:'../server/registry.php',
            data:{userName:name,userPwd:pwd},
            type:'post',
            dataType:'json',
            success:(res)=>{
                if(res.result === 0){
                    window.alert('您的账户重复，请修改')
                }else{
                    //目前使用localstrong本地存储
                    localStorage.setItem('res',JSON.stringify({name,pwd}))
                    window.alert('注册成功点击确定跳转登陆页')
                    window.location.href='dome9.html';
                }
            }
        })
    })

