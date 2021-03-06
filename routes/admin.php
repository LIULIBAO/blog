<?php
/**
 * Created by PhpStorm.
 * User: hf-li
 * Date: 2018/12/6
 * Time: 22:00
 */

//登陆
Route::get('', 'LoginController@index');
Route::get('login', 'LoginController@index')->name('login');
Route::post('login', 'LoginController@login');
Route::get('logout', 'LoginController@logout');
Route::get('admin/error', 'CommentController@error')->name('admin.error');
Route::get('admin/layerError', 'CommentController@layerError')->name('admin.layerError');

Route::middleware('admin.auth')// 中间件
    ->group(function () {

    //首页
    Route::get('home', 'CommentController@index')->name('home');
    Route::get('admin/error', 'CommentController@error')->name('admin.error');
    Route::get('admin/layerError', 'CommentController@layerError')->name('admin.layerError');

    //icon
    Route::get('test/icons', 'CommentController@icon')->name('icon');

    //用户管理
    Route::namespace('User')->group(function () {
        Route::get('user/index', 'UserController@index')->name('admin.user');
        Route::get('user/delete', 'UserController@delete')->name('admin.delete');
        Route::get('user/setRole', 'UserController@setRole')->name('admin.setRole');
        Route::get('user/subscriber', 'UserController@subscriber')->name('admin.subscriber');
        Route::post('user/storeUserRole', 'UserController@storeUserRole')->name('admin.storeUserRole');
    });

    //系统管理
    Route::namespace('System')->prefix('system')->group(function () {
        //角色管理
        Route::get('role', 'RoleController@index')->name('admin.role');
        Route::get('role/edit', 'RoleController@edit')->name('admin.role.edit');
        Route::get('role/delete', 'RoleController@delete')->name('admin.role.delete');
        Route::post('role/store', 'RoleController@store')->name('admin.role.store');
        Route::get('role/editPermission', 'RoleController@editPermission')->name('admin.role.editPermission');
        Route::post('role/storePermission', 'RoleController@storePermission')->name('admin.role.storePermission');

        //菜单管理
        Route::get('menu', 'MenuController@index')->name('admin.menu');
        Route::get('menu/edit', 'MenuController@edit')->name('admin.menu.edit');
        Route::get('menu/delete', 'MenuController@delete')->name('admin.menu.delete');
        Route::post('menu/store', 'MenuController@store')->name('admin.menu.store');
    });

    //文章管理
    Route::namespace('Article')->prefix('article')->group(function () {
        Route::get('index', 'ArticleController@index')->name('admin.article');
        Route::get('edit', 'ArticleController@edit')->name('admin.article.edit');
        Route::get('delete', 'ArticleController@delete')->name('admin.article.delete');
        Route::post('store', 'ArticleController@store')->name('admin.article.store');

        Route::get('category', 'ArticleCategoryController@index')->name('admin.article.category');
        Route::get('category/edit', 'ArticleCategoryController@edit')->name('admin.article.category.edit');
        Route::get('category/delete', 'ArticleCategoryController@delete')->name('admin.article.category.delete');
        Route::post('category/store', 'ArticleCategoryController@store')->name('admin.article.category.store');
    });

    //日记管理
    Route::namespace('Diary')->group(function () {
        Route::get('diary/index', 'DiaryController@index')->name('admin.diary');
        Route::get('diary/edit', 'DiaryController@edit')->name('admin.diary.edit');
        Route::get('diary/delete', 'DiaryController@delete')->name('admin.diary.delete');
        Route::post('diary/store', 'DiaryController@store')->name('admin.diary.store');
    });

    //广告管理
    Route::namespace('Advert')->group(function (){
        Route::get('advert/index', 'AdvertController@index')->name('admin.advert');
        Route::get('advert/edit', 'AdvertController@edit')->name('admin.advert.edit');
        Route::get('advert/delete', 'AdvertController@delete')->name('admin.advert.delete');
        Route::get('advert/deleteFile', 'AdvertController@deleteFile')->name('admin.advert.deleteFile'); //删除文件
        Route::post('advert/store', 'AdvertController@store')->name('admin.advert.store');
        Route::post('advert/uploadFile', 'AdvertController@uploadFile')->name('admin.advert.uploadFile'); //上传文件
    });


});

