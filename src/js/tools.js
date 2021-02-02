// 创建一个外部js文件 将函数方法定义在这个文件中
// 使用时调用这个文件就可以了

// 数组去重方法1 indexOf()
// 参数: 需要去重的数组
function getNewArr1(array) {
    var newArr = [];
    array.forEach(function (val) {
        if (newArr.indexOf(val) === -1) {
            newArr.push(val);
        }
    })

    return newArr;
}

// 数组去重方法2 sort() 排序
// 参数: 需要去重的数组
function getNewArr2(array) {
    array.sort(function (a, b) { return a - b });
    for (var i = 0; i <= array.length - 1 - 1; i++) {
        if (array[i] === array[i + 1]) {
            array.splice(i + 1, 1);
            i--;
        }
    }
}


// 数组去重方法3 双重for循环
// 参数: 需要去重的数组
function getNewArr3(array) {
    for (var i = 0; i <= array.length - 1 - 1; i++) {
        for (var j = i + 1; j <= array.length - 1; j++) {
            if (array[i] === array[j]) {
                array.splice(j, 1);
                j--;
            }
        }
    }
}


// 数组去重方法4 利用对象
// 参数: 需要去重的数组
function getNewArr4(array) {
    var obj = {};
    var newArr = [];
    array.forEach(function (val) {
        obj[val] = '随便';
    })
    for (var key in obj) {
        newArr.push(key);
    }
    return newArr;
}


// 随机颜色

function setColor() {
    // 方法1 , rgb(数值1,数值2,数值3) 3个0-255的随机数
    return `rgb(${parseInt(Math.random() * 256)},${parseInt(Math.random() * 256)},${parseInt(Math.random() * 256)})`;

    // 方法2 , #六位十六进制数值
    // var str = '0123456789abcdef';
    // var colorStr = '#';
    // for(var i = 1 ; i <= 6 ; i++){
    //     colorStr += str[ parseInt(Math.random()*str.length) ];
    // }
    // return colorStr;

    // 方法3 , 定义所有css3颜色单词数组
    // 随机从数组中获取一个颜色的英文单词
    // var colorArr = ['black','silver','gray','white','maroon','red','purple','fuchsia','green','lime','olive','yellow','navy','blue','teal','aqua','orange','aliceblue','antiquewhite','aquamarine','azure','beige','bisque','blanchedalmond','blueviolet','brown','burlywood','cadetblue','chartreuse','chocolate','coral','cornflowerblue','cornsilk','crimson','darkblue','darkcyan','darkgoldenrod','darkgray','darkgreen','darkgrey','darkkhaki','darkmagenta','darkolivegreen','darkorange','darkorchid','darkred','darksalmon','darkseagreen','darkslateblue','darkslategray','darkslategrey','darkturquoise','darkviolet','deeppink','deepskyblue','dimgray','dimgrey','dodgerblue','firebrick','floralwhite','forestgreen','gainsboro','ghostwhite','gold','goldenrod','greenyellow','grey','honeydew','hotpink','indianred','indigo','ivory','khaki','lavender','lavenderblush','lawngreen','lemonchiffon','lightblue','lightcoral','lightcyan','lightgoldenrodyellow','lightgray','lightgreen','lightgrey','lightpink','lightsalmon','lightseagreen','lightskyblue','lightslategray','lightslategrey','lightsteelblue','lightyellow','limegreen','linen','mediumaquamarine','mediumblue','mediumorchid','mediumpurple','mediumseagreen','mediumslateblue','mediumspringgreen','mediumturquoise','mediumvioletred','midnightblue','mintcream','mistyrose','moccasin','navajowhite','oldlace','olivedrab','orangered','orchid','palegoldenrod','palegreen','paleturquoise','palevioletred','papayawhip','peachpuff','peru','pink','plum','powderblue','rosybrown','royalblue','saddlebrown','salmon','sandybrown','seagreen','seashell','sienna','skyblue','slateblue','slategray','slategrey','snow','springgreen','steelblue','tan','thistle','tomato','turquoise','violet','wheat','whitesmoke','yellowgreen','rebeccapurple'];
    // return colorArr[ parseInt(Math.random()*colorArr.length) ];

}


// 删除 class 中 指定的属性值
// 参数1: 要删除 class属性的标签对象
// 参数2: 要删除 的 class的属性值

function myDelClass(ele , name){
    // var str = ele.className;
    // str = str.replace( name , '' );
    // ele.className = str;

    ele.className = ele.className.replace( name , '' ); 
}


// 验证码
// 参数1: 验证码的位数
// 参数2: 验证码的内容,默认是 0-9的数字 26个小写英文字母 26个大写英文字母

function getVC(num, word = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    var vc = '';

    for (var i = 1; i <= num; i++) {
        var key = word[parseInt(Math.random() * word.length)];

        if (vc.indexOf(key) === -1) {
            vc += key;
        } else {
            i--;
        }
    }
    return vc;
}


// 倒计时函数

function getCountDown(string) {
    // 终止时间,是输入的时间参数
    var endTime = new Date(string);
    // 起始时间,是当前时间
    var startTime = new Date();
    // 计算时间差  终止时间的时间戳 - 起始时间的时间戳 结果是 毫秒 再换算成秒
    var time = parseInt((endTime.getTime() - startTime.getTime()) / 1000);

    // 将时间差换算成,天,小时,分钟,秒

    // 天
    var d = parseInt(time / (24 * 60 * 60));
    // 前导补零
    d = d < 10 ? '0' + d : d;

    // 小时
    var h = parseInt((time % (24 * 60 * 60)) / (60 * 60));
    // 前导补零
    h = h < 10 ? '0' + h : h;

    // 分钟
    var m = parseInt((time % (60 * 60)) / 60);
    // 前导补零
    m = m < 10 ? '0' + m : m;

    // 秒
    var s = time % 60;
    // 前导补零
    s = s < 10 ? '0' + s : s;

    // 将时间,设定为对象形式,作为返回值返回
    return { day: d, hour: h, minute: m, second: s };

}


// 删除标签class属性值函数
// 参数1: 需要删除class属性值的标签对象
// 参数2: 需要删除class属性值
function myDelClass(element, name) {
    // 获取 原始class属性值 字符串
    // var str = element.className;
    // // 将 指定的 class属性值 替换为 空字符串
    // str = str.replace(name , '');
    // // 将替换后,新的字符串,设定给标签对象
    // element.className = str;

    element.className = element.className.replace(name, '');
}


// 获取标签样式函数
// 参数1: 要获取css样式属性值的标签
// 参数2: 要获取css样式属性值的具体属性
//        点语法,不解析变量,必须使用[]语法,设定属性值变量

function myGetStyle(element, attr) {
    if (window.getComputedStyle) {
        // 如果 window.getComputedStyle 转化为 true 
        // 证明 window.getComputedStyle 结果不是undefined 
        // 证明 当前浏览器 支持 window.getComputedStyle 方法
        return window.getComputedStyle(element)[attr];
    } else {
        // 就是 window.getComputedStyle 结果是undefined 
        // 证明 当前浏览器 不支持 window.getComputedStyle 
        // 肯定是 低版本IE浏览器 使用 currentStyle方法
        return element.currentStyle[attr];
    }
}

// 获取浏览器地址栏参数数据

function getUrlVal(){
    // 获取浏览器地址栏中 参数数据 字符串
    // 同时将中文正常显示
    var str = window.decodeURI( window.location.search).substr(1);
    // 创建一个对象,存储参数据键值对
    var obj = {};
    // 将字符粗,以 & 符号为间隔,转化为数组
    // 数组1 中 存储的数据 就是 键值对字符串 键名=数值
    var arr1 = str.split('&');
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


// 运动函数
// 参数1: 要运动的标签对象
// 参数2: 要运动的css属性和属性值 以对象形式储存
// 参数3: 运动停止 调用的函数程序 默认值 为 空函数
function move( element , moveObj , fun = function(){} ){
    // 定义一个变量 准备 储存定时器计数
    let num = 0;

    // 1, 对参数2,使用for...in 循环 定义变量必须使用let
    for(let type in moveObj){
        // (1) 每次循环都会生成一个定时器,存储定时器的变量++
        num++;

        // (2) 判断 如果 type 是 透明度 
        // 将 储存的数值 * 100
        if( type === 'opacity' ){
            moveObj[type] *= 100;
        }

        // (3) 设定执行的定时器
        let time = setInterval(function(){
            // (3-1) , 获取 初始值 
            // type 是   透明度  获取的数值 * 100
            // type 不是 透明度  获取的数值 取整
            let oldVal =  type === 'opacity' ? myGetStyle( element , type )*100 : parseInt( myGetStyle( element , type ) );

            // (3-2) , 计算步长
            // (目标数值 - 初始值) / 自己定义的次数
            let speed = (moveObj[type] - oldVal) / 10

            // (3-3) , 步长值 取整
            // 步长值 大于 0  向上取整 步长值小于 0 向下取整
            speed = speed > 0 ? Math.ceil( speed ) : Math.floor( speed );

            // (3-4) , 初始值累加步长值
            oldVal += speed;

            // (3-5) , 将改变的初始值 赋值给 标签的css属性
            // type 是   透明度  初始值/100 赋值
            // type 不是 透明度  初始值 拼接 px 赋值
            element.style[type] =  type === 'opacity' ? oldVal/100 : oldVal + 'px';

            // (3-6) , 判断 初始值 是否已经是 目标数值
            if( oldVal === moveObj[type] ){
                // 清除定时器
                clearInterval(time);
                // 变量中存储的定时器个数--
                num--;
                if(num === 0){
                    // 存储的定时器个数为 0 
                    // 证明所有的定时器都被清除 所有的运动都停止了
                    // 调用 参数3 的函数
                    fun();
                }
            }
        } , 20);
    }

}
