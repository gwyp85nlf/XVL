<?php
include_once './config.php';
//根据前端的参数来执行数据库查询操作 将查询结果的数组以json串的形式返回给前端
$cat_one_id = $_GET['cat_one_id'];
$page = $_GET['page'];
$line = $_GET['line'];
//通过当前需要显示的页数和每页的数据数量，可计算起始数据的索引下标
$startLine = ($page-1)*$line;
$link = mysqli_connect($host,$user,$pwd,$dbname);
$sql = "SELECT * FROM `goods` WHERE `cat_one_id` = '{$cat_one_id}' LIMIT {$startLine} , {$line}";
$result = mysqli_query($link,$sql);
$arr = mysqli_fetch_all($result,MYSQLI_ASSOC);

//需要PHP程序反馈查询信息给前端内容 查询所有的匹配的数据数量
$sqlAll = "SELECT COUNT(*) as `num` FROM `goods` WHERE `cat_one_id` ='{$cat_one_id}' ";
$stmtAll = mysqli_query($link,$sqlAll);
$numArr = mysqli_fetch_assoc($stmtAll);
$row = $numArr['num'];
//根据数据总数量和每页的数据数量可以计算总页数
//总页数/每页的数据数据 向上取整 
$sumPage=ceil($row/$line);

$resArr = [
    'data'=>$arr,
    'row'=>$row,
    'sumPage'=>$sumPage,
    'page'=>$page,
];
echo json_encode($resArr);