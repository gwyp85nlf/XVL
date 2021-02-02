<?php
include_once './config.php';
$userName = $_POST['userName'];
$link = mysqli_connect($host,$user,$pwd,$dbname);
$sql = "SELECT `id` FROM `rest` WHERE `name` = '{$userName}'";
$result = mysqli_query($link,$sql);
$arr = mysqli_fetch_all($result,MYSQLI_ASSOC);
if(count($arr)==1){
    echo json_encode(['result'=>0,'msg'=>'用户名重复']);
}else{
    echo json_encode(['result'=>1,'msg'=>'用户名可用']);
}