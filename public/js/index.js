/**
 * Created by yishan on 17/4/8.
 */
//创建showdown对象 - - 废弃
//var cover = new showdown.Converter();
//输入文本域
var textarea = document.getElementById('mark');
//标题
var title = document.getElementById('title');
textarea.onkeydown = listenEnter;


//给按钮绑定发送存储post
var btn = document.getElementById('post');

btn.onclick = insert_data;


/**
 * 监听enter
 * @param e
 */
function listenEnter(e) {
    if(e.keyCode==13){
        var text = textarea.value;
        //var html = cover.makeHtml(text);//转成html
        var html = markdown.toHTML(text);
        //将html 显示到div.cover 中
        document.getElementById('cover').innerHTML = html;
    }
}

/**
 * 上传笔记内容
 */
function insert_data(){
    var xhr ;
    var baseurl = 'http://127.0.0.1:3000/insert'
    if (window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    };
    xhr.open('POST',baseurl,false);//同步
    //如果需要像 HTML 表单那样 POST 数据，请使用 setRequestHeader() 来添加 HTTP 头。然后在 send() 方法中规定您希望发送的数据：
    //这样要必须  是内容类型这样是formdata

    //xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    xhr.setRequestHeader("Content-type","application/json "); //这样穿的是json
    //获取内容
    var text = document.getElementById('cover').innerHTML;
    //xhr.send("fname=Bill&lname=Gates");
    var content = {
        title:title.innerText,
        con:text
    }
    xhr.send(JSON.stringify(content));
    xhr.onreadystatechange = function () {
        console.log(xhr.readyState);
    }

}
/**
 * 加载笔记目录
 */
