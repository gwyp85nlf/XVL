
//判断localStorage有没有购物车数据 没有 localStorage.getItem('cart')是null 有购物车但没有商品localStorage.getItem('cart')是空数组


//调用函数动态渲染生成页面
setCart();
const oBox = $('.container')[0];
oBox.addEventListener('click',e=>{
    //获取当前购物车数据
    const cartArr = JSON.parse(localStorage.getItem('cart'))
    //我们操作的目前是localstorage中cart键名中存储的数据 根据新数据再次渲染生成页面
    //点击全选按钮
    if(e.target.getAttribute('name')==='all'){
     cartArr.forEach((item)=>{
         item.buy=e.target.checked;
     })
    }
    //点击标签name是not 反选标签
    if(e.target.getAttribute('name')==='not'){
        cartArr.forEach(item=>{
            item.buy = !(item.buy)
        })
    }
    if(e.target.getAttribute('name')==='other'){
        //获取点击标签goods_id
        let id = e.target.getAttribute('goods_id')
        cartArr.forEach(item=>{
            if(item.goods_id === id){
                item.buy = e.target.checked;
            }
        })
    }
    if(e.target.getAttribute('name') === 'del'){
        let id = e.target.getAttribute('goods_id')
        cartArr.forEach((item,key)=>{
            if(item.goods_id === id){
                cartArr.splice(key,1);
            }
        })
    }
    if(e.target.getAttribute('name') === '+'){
        //获取点击标签goods_id
    let id = e.target.getAttribute('goods_id')
    cartArr.forEach((item,key)=>{
        if(item.goods_id === id){
            item.num++;
        }
    })
    }
    if(e.target.getAttribute('name') === '-'){
        let id = e.target.getAttribute('goods_id')
        cartArr.forEach((item,key)=>{
            if(item.goods_id === id){
                item.num--;
            }
        })
    }
    //修改了cartArr数据对象数组 需要重新设定给localstorage cart属性存储
    localStorage.setItem('cart',JSON.stringify(cartArr))
    setCart();
})




   //定义动态生成页面的函数
   function setCart(){
    //获取购物车键值对
    const cartObj = JSON.parse(localStorage.getItem('cart'))
    //定义变量存储：商品种类 商品个数 商品总价格
    let type = 0;
    let number = 0;
    let money = 0;
    if(cartObj === null || cartObj.length === 0){
        $('.container').html('<h1>您的购物车以清空</h1>')
    }else{
        let bool = true;
        cartObj.forEach((item)=>{
            if(item.buy === false){
                bool=false;
            }
        })
        //页面内容起始部分
        let str = `
<div class="panel panel-info ">
  <div class="panel-body bg-info">
    <div class="checkbox">
      <label>
        <input type="checkbox" name="all" ${bool ? 'checked' : ''}> 全选
      </label>
    
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

      <button name="not" class="del btn btn-danger">反选</button>
    </div>
  </div>
  <div class="panel-footer">
    <ul class="cart-list">
`;
cartObj.forEach((item)=>{
  if(item.buy){
      type++;
      //数量 累加商品的购买数量
      number += item.num;
      //总价格 累加 数量*单价
      money += item.num*item.goods_price;
  }
  str += `
  <li class="cart-item">
    <div class="left">
      <input name="other" type="checkbox" goods_id=${item.goods_id}  ${item.buy ? 'checked' : ''}>
    </div>
    <div class="right">
      <div class="media">
        <div class="media-left">
          <a href="#">
            <img class="media-object" src="${item.goods_small_logo}" alt="...">
          </a>
        </div>
        <div class="media-body">
          <h4 class="media-heading">${item.goods_name}</h4>
          <p>
            <i class="glyphicon glyphicon-yen"></i>
            <span>${item.goods_price}</span>
          </p>
          <div class="btn-group pull-right" role="group" aria-label="...">
            <button type="button" class="btn btn-default" name="-" goods_id=${item.goods_id} ${item.num == 1 ? 'disabled' : ''}>-</button>
            <button type="button" class="btn btn-default" disabled>${item.num}</button>
            <button type="button" class="btn btn-default" name="+" goods_id=${item.goods_id} ${item.num == item.goods_number ? 'disabled' : ''}>+</button>
          </div>
          <button goods_id=${item.goods_id} name="del" class="del btn btn-danger">我不要了</button>

        </div>
      </div>
    </div>
  </li>
`;
})
//商品总支付部分
str += `
</ul>
</div>
  </div>

  <div>
    <h1>您一共 购买了 ${type} 种 ${number} 件 商品 </h1>
    <h1>您一共 需要支付 ${money.toFixed(2)}元 </h1>
  </div>
`;
//将字符串写入到标签中
$('.container').html(str);
    }
}