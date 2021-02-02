
//使用函数获取地址栏参数键值对对象
const urlValObj = getUrlVal();
//定义相关的参数 请求也是 第一次请求是第一页
let page = 1;
//d定义每页显示的数据数量 根据实际项目需要设定 目前设定8条数据
let line = 8;
//发生请求获取数据结果 动态渲染生成页面
setPage(urlValObj, page, line);
//参数1 url地址写的参数数据信息 对象形式 参数2：请求的页数  参数3：请求显示的数据数量
function setPage(valueObj, getPage, getLine) {
    //从参数对象中获取一级分类名称
    let cat_one_id = valueObj.cat_one_id;
    $.ajax({
        url: '../server/list.php',
        data: { cat_one_id, page: getPage, line: getLine },
        dataType: 'json',
        type: 'get',
        success: res => {
            //根据res中data属性存储的数据数组动态生成页面
            let str = '';
            //循环遍历数据数组
            res.data.forEach((item, key) => {
                str += `
              <li class="list-item">
        <div class="panel panel-primary">
          <div class="panel-body">
            <ol class="breadcrumb">
              <li><a href="#">${item.cat_one_id}</a></li>
              <li><a href="#">${item.cat_two_id}</a></li>
              <li class="active">${item.cat_three_id}</li>
            </ol>
          </div>
          <div class="panel-footer">
            <div class="row">
              <div class="">
                <div class="thumbnail">
                  <img src="${item.goods_big_logo}" alt="...">
                  <div class="caption">
                    <h3>${item.goods_name}</h3>
                    <p>
                      <i class="glyphicon glyphicon-yen"></i>
                      <span>${item.goods_price}</span>
                    </p>
                    <p>
                      <a href="javascript:;" class="btn btn-primary" role="button">查找相似商品</a> 
                      
                      <a href="./detail.html?goods_id=${item.goods_id}" class="btn btn-danger" role="button">查看商品详情</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
              `;
            })
            $('.container ul').html(str);

            //分页显示
            $('.pagination').pagination({
                pageCount: res.sumPage,          // 总页数 一个分页 对应一个按钮
                totalData: res.row,              // 数据总数量
                current: res.page,                // 当前第几页
                showData: line,                   // 每页的数据数量
                prevContent: '上一页',             // 上一页按钮的文本内容 
                nextContent: '下一页',             // 下一页按钮的文本内容 
                count: 4,                         // 当前选中页 前后的页数 
                coping: true,                      // 开启首页和末页
                homePage: '首页',                  // 首页按钮的文本内容
                endPage: '末页',                   // 首页按钮的文本内容
                jump: true,                        // 开启跳转页效果
                jumpIptCls: '页数',                  // 跳转input文本框文本内容
                jumpBtn: '跳转',                     // 跳转按钮内容
                callback: function (pageRes) {                 // 定义 生成 分页器之后 点击标签 执行的 函数程序
                    setPage(urlValObj, pageRes.getCurrent(), line);

                }
            })


        }
    })
}

//轮播图
var imgArr=[
  {width:1920,height:500,size:127,src:'./image/1修图师.jpg',name:'轮播图1'},
  {width:1920,height:500,size:127,src:'./image/爱马仕1.jpg',name:'轮播图1'},
  {width:1920,height:500,size:127,src:'./image/爱马仕2.jpg',name:'轮播图1'},
];
//获取轮播图标签对象
const oBanner = document.querySelector('.banner');
class SetBanner{
  constructor(element,array){
    this.ele=element;
    this.imgArr = array;
    this.oUl = element.querySelector('ul')
    this.oOl = element.querySelector('ol')
    this.arrLength=array.length;
    this.divWidth=parseInt(myGetStyle(element,'width'))
    this.index=1;
    this.time=0;
    this.bool=true;
  }
  setLi(){
    let ulStr = '';
    let olStr = '';
    this.imgArr.forEach((val,key)=>{
      ulStr += `
      <li><img src="${val.src}"></li>
      `;
      olStr += key === 0?`<li name="focus" num="${key}" class="active"></li>`:`<li num="${key}" name="focus"></li>`
    })
    this.oUl.innerHTML=ulStr;
    this.oOl.innerHTML=olStr;
    const oOlLis=this.oUl.querySelectorAll('li')
    const oFirst = oOlLis[0]
    const oLast=oOlLis[this.arrLength-1]
    const oFirstClone=oFirst.cloneNode(true)
    const oLastClone=oLast.cloneNode(true)
    this.oUl.appendChild(oFirstClone)
    this.oUl.insertBefore(oLastClone,oFirst)
    this.oUl.style.width=this.divWidth*(this.arrLength+2)+'px'
    this.oUl.style.left=-this.index*this.divWidth+'px';
  }
  //入口函数
  init(){
    this.setLi()
    this.autoLoop()
    this.mouseEvent()
    this.setClick()
    this.hid()
  }
  autoLoop(){
    this.time=setInterval(()=>{
      this.index++;
      move(this.oUl,{left:-this.index*this.divWidth},this.loopEnd.bind(this))
    },3000)
  }
  loopEnd(){
    if(this.index === this.arrLength+2-1){
      this.index=1;
    }
    if(this.index === 0){
      this.index = this.arrLength+2-1-1;
    }
    this.oUl.style.left = -this.index*this.divWidth+'px'
    this.setFocusStyle();
    this.bool=true;
  }
  setFocusStyle(){
    const oOiLis = this.oOl.querySelectorAll('li')
    oOiLis.forEach((val)=>{
      myDelClass(val,'active')
    })
    oOiLis[this.index-1].className += 'active';
  }
  mouseEvent(){
    this.ele.addEventListener('mouseenter',()=>{
      clearInterval(this.time)
    })
    this.ele.addEventListener('mouseleave',()=>{
      this.autoLoop();
    })
  }
  setClick(){
    this.ele.addEventListener('click',e=>{
      if(e.target.getAttribute('name')==='left'){
        if(!this.bool){return}
        this.bool=false;
        this.index++;
        move(this.oUl,{left:-this.index*this.divWidth},this.loopEnd.bind(this))
      }
      if(e.target.getAttribute('name')==='right'){
        if(!this.bool){return}
        this.bool=false;
        this.index--;
        move(this.oUl,{left:-this.index*this.divWidth},this.loopEnd.bind(this))
      }
      if(e.target.getAttribute('name')==='focus'){
        if(!this.bool){return}
        this.bool=false;
        this.index=e.target.getAttribute('num')-0+1;
        move(this.oUl,{left:-this.index*this.divWidth},this.loopEnd.bind(this))
      }
    })
  }
  hid(){
    document.addEventListener('visibilitychange',()=>{
      if(document.visibilityState === 'visible'){
        this.autoLoop();
      }
      if(document.visibilityState === 'hidden'){
        clearInterval(this.time)
      }
    })
  }
}
//使用构造函数创建实例化对象
const bannerObj = new SetBanner(oBanner,imgArr)
bannerObj.init()

