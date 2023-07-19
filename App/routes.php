<?php

//|  API Routes

// posts(?:/(?P<slug>.*))?


use App\Bootstrap\Route;

Route::get('menu/(?P<menu>.*)', 'MenuController@index');
Route::get('category/(?P<slug>.*)/(?P<paged>\d{1,})', 'CategoryController@index');
Route::get('archive/(?P<year>\d{4})/(?P<month>\d{1,2})/(?P<date>\d{1,2})/(?P<paged>\d{1,})', 'ArchiveController@index');
Route::get('posts/(?P<slug>.*)', 'PostController@getSinglePost');
Route::get('comments/(?P<id>\d{1,})', 'CommentController@index');
Route::get('home-contents', 'HomeController@index');
Route::get('footer', 'HomeController@getFooter');

Route::post('post-view/(?P<id>\d{1,})', 'PostController@updatePostView');
Route::post('comment', 'CommentController@store');
Route::post('search', 'SearchController@index');