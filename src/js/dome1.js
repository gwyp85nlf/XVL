
    //二级菜单
    $('.list-1>span>a').mouseenter(function(){
        $('.tow').css({display:"block",backgroundColor:setColor()})      
    })
    $('.list-1>span>a').mouseleave(function(){$('.tow').css({display:"none"})})
    //浏览器滚动事件 吸顶效果
    $(window).scroll(function(){
        if($(window).scrollTop()>$('.nav-9').height()){
            $('.nav-9').css({top:0})
        }else{
            $('.nav-9').css({top:200})
        }
    })
    //点击退出登录按钮删除本地cookie login信息 是的时间时效为负数
    $('[name="logout"]').click(()=>{
        mySetCookie('login','随便',-1,'/');
        window.alert('您已经退出登录')
    })
    //登录购物车哟啊先cookie中有login信息 如果没有就先跳转登录页面
    $('[name="cart"]').click(()=>{
        //获取cookie键值对象
        const cookieObj = myGetCookieObj();
        //如果没有登录 对象.login结果是undefined
        if(cookieObj.login === undefined){
            let bool = window.confirm('您还没有登录，点击确认跳转登录页面，点击取消您在逛逛')
            if(bool){
                window.location.href='./dome9.html'
            }
        }else{
            window.location.href='./cart.html';
        }
    })

    //搜索框
    const oIpt = document.querySelector('[name="sousou"]');
    const oUl = document.querySelector('#search')
    oIpt.addEventListener('input',()=>{
        clearInterval(t);
        var t = setTimeout(jsonpFun,1000)
    })
   //定义一个函数获取时间戳，定义生成写入script标签，完成jsonp跨域请求
   function jsonpFun(){
       let keyword = oIpt.value;
       const time = new Date();
       let t = parseInt(time.getTime()/1000)
       const s = document.createElement('script')
       //设定src属性值
       s.setAttribute('src',`https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=33423,33582,33344,31253,33393,33338,26350,33567&wd=${keyword}&req=2&csor=1&cb=setLi&_=${t}`);
       document.body.appendChild(s)
       document.body.removeChild(s);
   }
   //根据响应体数据动态渲染页面
   function setLi(result){
       if(result.g === undefined){
           oUl.style.display='none';
       }else{
           oUl.style.display='block';
           let str='';
           result.g.forEach((item)=>{
               str += `
               <li>${item.q}</li>
               `;
           })
           oUl.innerHTML=str;
   }}
