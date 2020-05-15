function addCookie(key,value,count){
    let d =new Date();
    d.setDate(d.getDate()+count);
    document.cookie=`${key}=${escape(value)};expires=${d.toGMTString()}`;
}

function getCookie(key){
    let str=unescape(document.cookie);
    let arr=str.split("; ");
    for(let i in arr){if (arr[i].indexOf(key+"=")==0){
        return arr[i].split("=")[1];
    }}
    return null;
}

function removeCookie(key){
    addCookie(key,"byebye",-1);
}

function updateCookie(key,value,count){addCookie(key,value,count);}