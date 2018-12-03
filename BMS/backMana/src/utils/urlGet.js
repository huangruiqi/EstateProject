export function getUrl(file) {
    var url = null;
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}

//检测到file有变化
export function checkChange(idInput, imgShow) {
    idInput.onchange = () => {
        let objUrl = getUrl(idInput.files[0]);
        imgShow.src = objUrl;
    }
} 

//修改文字
export function modify(idOne, idTwo) {//idOne是span内容,idTwo是转为input
    idOne.display = "none";
    idTwo.display = "block";
    return idTwo.value;
}
//返回文字
export function modifyCome(idOne, idTwo) {//idOne是span内容,idTwo是转为input
    idOne.display = "block";
    idTwo.display = "none";
}