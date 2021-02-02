// 设定 cookie 的函数
// 参数1 cookie 的 键名
// 参数2 cookie 的 价值
// 参数3 cookie 的 时效  默认值 是 空字符串
// 参数4 cookie 的 同源路径  默认值 是 空字符串
function mySetCookie(  key , value , time='' , path='' ){
    let t = 0;
    if( time !== '' ){
        // 1, 创建一个时间对象 
        t = new Date();

        // 2, 设定时间对象的时间戳 
        t.setTime( t.getTime() - 8*60*60*1000 + time*1000 ); 

        // 如果 time 也就是 时效参数 是 '' 字符串 意味着 没有输入实参
        //      希望 时效 是 session 时效  t 时间对象 就需要 存储 空字符串
        // 如果 time 也就是 时效参数 有 数字 意味着 输入了 时间 需要设定 具体的 时效
        //      希望 时效 是 具体的 时间 t 时间对象 就需要 存储 设定了 时间戳的 时间对象
    }

    // 设定 cookie 键值对
    // expires=${time === '' ? time : t} 
    //    如果 time 时间参数是空字符串 也就是 不需要具体的时效 需要 session 时效
    //    给 expires 赋值 time本身 也就是 赋值 空字符串 本身 时效就是 session 时效
    //    如果 time 时间参数不是空字符串 也就是 需要具体的时间时效
    //    给 expires 赋值 一个设定好了时间戳的时间对象
    document.cookie = `${key}=${value};expires=${time === '' ? time : t};path=${path}`;
}


// 获取 cookie 键值对  对象 函数
function myGetCookieObj(){
    // 获取cookie键值对字符串
    var str = document.cookie;
    // 创建一个对象,存储参数据键值对
    var obj = {};
    // 将字符粗,以 分号 空格 为间隔,转化为数组
    // 数组1 中 存储的数据 就是 键值对字符串 键名=数值
    var arr1 = str.split('; ');
    // 循环遍历数组1
    arr1.forEach(function(val){
        // val中存储的就是键值对 键名=数值
        // 以等号为间隔,将键值对字符串,转化为数组
        var arr2 = val.split('=');
        // arr2[0] 就是键名
        // arr2[1] 就是键值
        // 作为对象的键名 和 对象的键值 写入对象
        obj[ arr2[0] ] = arr2[1];
    })
    // 返回结果
    return obj;
}