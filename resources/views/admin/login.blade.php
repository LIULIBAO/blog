<?php
use \Illuminate\Support\Facades\Cookie;
?>
<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
    <meta charset="utf-8">
    <title>lovya 登陆</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <!-- CSS -->
    <link rel="stylesheet" href="{{asset('admin/css/supersized.css')}}">
    <link rel="stylesheet" href="{{asset('admin/css/login_style.css')}}">
</head>
<body>
<div class="page-container">
    <div class="container-content">
        <h1>Lovya 管理后台</h1>
        <form action="{{url('login')}}" autocomplete="off" method="post" id="postForm">
            <input type="hidden" name="_token" value="{{ csrf_token()}}">


            <input type="text" name="username" class="username" value="{{!empty(Cookie::get('username')) ? Cookie::get('username') : ''}}"
                   placeholder="请输入用户名">
            <span class="show_error">用户名不能为空</span>

            <input type="password" value="" name="password" class="password" autocomplete="off" placeholder="请输入用户密码">
            <span class="show_error" >密码不能为空</span>



            <label class="add_cart_radio">
                <input type="checkbox" {{!empty(Cookie::get('remember_me')) ? 'checked' : ''}} name="is_remember"  value="1">
                Remember me
            </label>

            <button type="button" class="submitBtu"> 登 陆 </button>
        </form>
    </div>
</div>
<!-- Javascript -->
<script src="{{asset('js/jquery.2.1.4.min.js')}}"></script>
<!--转圈圈-->
<script src="{{asset('admin/js/supersized.3.2.7.min.js')}}"></script>
<script src="{{asset('admin/js/supersized-init.js')}}"></script>
<script src="{{asset('admin/js/login.js')}}"></script>
</body>
</html>

