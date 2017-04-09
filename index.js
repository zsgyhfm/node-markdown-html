/**
 * Created by yishan on 17/4/8.
 */
var express = require('express');
//中间件 可以解析 post的内容
var bodyPares = require('body-parser');
//数据库操作
var mongo = require('./router/mongo.js')
var app = express();

//依赖bodyPares解析 post 传递的值
app.use(bodyPares.json({type:'application/json'}));//解析 前端传来的json
//app.use(bodyPares.urlencoded({extended: true}));//form-urlencode

//静态文件托管
app.use(express.static('public'));
app.listen(3000, function () {
    console.log('端口监听3000');
});



app.post('/insert', function (req,res,next) {
    console.log('接收到数据');
    //插入到数据库
    mongo.insert_data('content',req.body, function (re) {
        //console.log('插入数据成功:'+re);
        if(re){
            res.sendStatus(200);
        }

    });
    //next();//这个方法 使请求继续向下传递
})