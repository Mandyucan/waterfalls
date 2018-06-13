function ajax(method, url, data, callback, flag) {
    //创建一个ajax对象  但是要兼容IE
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Micro soft.XMLHttp');
    }

    //请求方式不同时的兼容性写法
    method = method.toUpperCase(); //兼容大小写，避免传入小写不显示
    if (method == 'GET') {
        xhr.open(method, url + '?' + data, flag);
        xhr.send();
    } else if (method == 'POST') {
        xhr.open(method, url, flag);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
        xhr.send(data);
    }
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                callback(xhr.responseText);
            } else {
                console.log('error');
            }
        }
    }
}