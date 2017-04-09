/**
 * Created by yishan on 17/4/8.
 */
var mongoClient = require('mongodb').MongoClient;//mongodb驱动
var db_connect = 'mongodb://localhost:27017/markdown';//lcmark是数据库名称

var database_handle;//数据库句柄
var collection;//数据库表连接对象
/**
 * 注意  数据库操作全部是异步
 */


function MongoClient() {

    this.MongoClient = MongoClient;
    //初始化数据库连接 获得数据库句柄
var that = this;
    this.connect_database(function (db) {
        that.db = db;
    });

};
MongoClient.prototype = {
    database:null,

    /**
     * 连接到mongo数据库
     */
    connect_database: function (callback) {
        mongoClient.connect(db_connect, function (err, db) {
            if (err == null&&callback) {
                console.log('连接数据库成功');
                callback(db)
            }else {
                console.log(err)
            }
        });


    },
    /**
     * 插入数据
     * @param table 表名称
     * @param content
     * @param callback  回调  参数
     */
    insert_data: function (table,content, callback) {
        var conn = this.db.collection(table);//数据库表连接对象
        conn.insert(content, function (err, result) {
            if (err == null && callback) {
                callback( result);
                console.log('数据插入成功')
            } else {
                console.log(err);
            }

        })
    },
    /**
     * 查询数据
     * @param table 表名称
     * @param sql  查询条件  是字典形式
     * @param callback 回调
     */
    find_data: function (table, sql, callback) {
        console.log('查询数据')
        var conn = this.db.collection(table);//数据库表连接对象
        conn.find(sql).toArray(function (err, result) {
            if (callback && err == null) {
                callback(err, result);
                //console.log(result);
            } else {
                console.log(err);
            }
        })
    },
    /**
     * 更新数据
     * @param table 表名称
     * @param key  更新的条件
     * @param value  更新的值
     * @param callback 回调
     */
    update_data: function (table, key, value, callback) {
        var conn = this.db.collection(table);
        conn.update({title: "javascript教程"}, {$set: {content: '我至少做测试没有内容'}}, function (err, result) {
            console.log(result);
            if (err == null && callback) {
                callback(result);
            }
        })
    },
    remove_data: function (table,key,callback) {
        var conn = this.db.collection(table);
        conn.remove(key, function (err,result) {
            if(err==null&&callback){
                callback(result);
                console.log('删除成功');
            }else {
                console.log(err);
            }
        })
    }

}

//导出对象
module.exports = new MongoClient();

