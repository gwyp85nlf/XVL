<?php
include_once './config.php';
$id = $_POST['goods_id'];
$link = mysqli_connect($host,$user,$pwd,$dbname);
$sql="SELECT * FROM `goods` WHERE `goods_id` = {$id}";
$result = mysqli_query($link,$sql);
$arr = mysqli_fetch_assoc($result);
echo json_encode($arr);