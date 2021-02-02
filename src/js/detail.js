
//获取地址栏参数数据
const urlValObj = getUrlVal();
//定义一个变量存储ajax请求结果的 响应体数据信息
let result;
$.ajax({
    url:'../server/detail.php',
    data:{'goods_id':urlValObj.goods_id},
    dataType:'json',
    type:'post',
    success:res=>{
        //给定义的全局变量赋值 可以在任何位置使用res的数据
        result = res;
        let str = `
        <div class="panel panel-default">
  <div class="panel-heading">
    <h3 class="panel-title">商品详细信息</h3>
  </div>
  <div class="panel-body">
    <div class="media">
      <div class="media-left">
        <a href="#">
          <img class="media-object" src="${res.goods_small_logo}" alt="...">
        </a>
      </div>
      <div class="media-body">
        <h4 class="media-heading">${res.goods_name}</h4>
        <p>
          <i class="glyphicon glyphicon-yen"></i>
          <span>${res.goods_price}</span>
        </p>
        <div class="btn-group" role="group" aria-label="...">
          <button type="button" class="btn btn-default">XL</button>
          <button type="button" class="btn btn-default">L</button>
          <button type="button" class="btn btn-default">M</button>
          <button type="button" class="btn btn-default">S</button>
          <button type="button" class="btn btn-default">XS</button>
        </div>
        <p>
          <a href="javascript:;" class="btn btn-warning btn-lg" role="button">立即购买</a>
          <a href="javascript:;" goods_id="${res.goods_id}" name="inCart" class="btn btn-danger btn-lg" role="button">加入购物车</a>
        </p>
      </div>
    </div>
    <ul class="nav nav-tabs">
      <li role="presentation" class="active"><a href="#">商品详细信息</a></li>
      <li role="presentation"><a href="#">商品参数信息</a></li>
      <li role="presentation"><a href="#">相关商品</a></li>
    </ul>
    <div>
        ${res.goods_introduce}
    </div>
  </div>
</div>
        `;
        //将str字符串写入标签
        $('.container').html(str);
    }
})

//给jQuery添加事件方法 参数2 是字符串 是事件委托的条件
$('.container').on('click','[name="inCart"]',()=>{
    //获取cookie键值对对象 
    const cookieObj = myGetCookieObj();
    //执行判断对象.login是undefined证明没有登陆
    if(cookieObj.login === undefined){
        let bool = window.confirm('您还未登陆点击确认跳转登陆页面')
        if(bool)window.location.href=`./dome9.html?url=${window.location.href}`;
    }else{
        //使用localStorage模拟数据库购物车数据 不存在localstorage.getItem('cart')结果是null
        if(localStorage.getItem('cart')===null){
            //购物车不存在需要创建购物车数据并且存储当前商品信息
            result.buy = true;
            result.num = 1;
            //创建数组将对象写入到数组中作为数据
            const arr = [result];
            localStorage.setItem('cart',JSON.stringify(arr));
        }else{
            //购物车数据存在 判断商品是不是存在 商品存在购买数量+1 商品不存在数组新增一个对象单元  
            //获取的cart数据数组 是json字符串格式 需要还原
            const arr = JSON.parse(localStorage.getItem('cart'));
            //定义变量存储商品是否存在的消息
            let bool = true;
            arr.forEach((item)=>{
                if(result.goods_id === item.goods_id){
                    item.num++;
                    //商品已经存储给赋值false
                    bool=false;
                }
            })
            //如果bool最终存储的结果是true 证明没有相同商品存在 需要新增商品数据到数据arr中
            if(bool){
                result.buy=true;
                result.num =1;
                arr.push(result);
            }
            //数组arr被修改需要重新设定给localStorage中cart键名
            localStorage.setItem('cart',JSON.stringify(arr))
            //跳转购物车页面
            window.location.href='./cart.html';
        }
    }
})

 