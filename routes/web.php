<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods:  POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Origin, Authorization');

//Route::get('/', function () {
//    return view('welcome');
//})->name('index');
//
//Auth::routes();
//
//Route::get('/home', 'HomeController@index')->name('home');

//logout
//Route::get('/logout','Auth\LoginController@logout');
//Route::get('/logout', function() {
//    return redirect('/');
//});

Auth::routes();
Route::get('/','MyController@getPage');
Route::get('/logout','Auth\LoginController@logout');

// get tree
Route::get('/tree','TreeController@getData');
// get all products
Route::get('/products','MainTableController@getData');
// get part of the products
Route::post('/products/part','MainTableController@getProducts');
// set rating of the products
Route::post('/star','StarController@setRating');
// check clicked star
Route::post('/check-star','StarController@checkClick');


// add product to cart
Route::post('/cart','CartController@addProduct');
// get product count of current user
Route::get('/cart/count','CartController@getCount');
// get user products in cart
Route::get('user/cart/products','CartController@getUserProducts');
// delete item from cart
Route::post('cart/delete','CartController@removeProduct');


// get user name
Route::get('username','UserController@getUserName');

// pay types
Route::get('delivery-type','PayTypesController@getDelivery');
Route::get('payment-type','PayTypesController@getPayment');
Route::get('status-type','PayTypesController@getStatus');

// make order
Route::post('order/add','OrderController@makeOrder');
// get user order
Route::get('user/order','OrderController@getUserOrder');


// admin
Route::get('/role','AdminController@checkAdmin');
Route::get('/user','AdminController@getUsers');
Route::post('/user/update','AdminController@userUpdate');
// all orders
Route::get('order/all','AdminController@allOrders');
Route::post('order-status/update','AdminController@updateOrderStatus');
// add product picture
Route::post('/images','AdminController@addPicture');
// get groups
Route::get('/group','AdminController@getGroups');
// get manufacturers
Route::get('/manufacturer','AdminController@getManufacturers');
// add product
Route::post('/product/add','AdminController@addProduct');





