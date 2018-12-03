export default function $(str) {
    var str1 = str.charAt(0);
    if (str1 === "#") {
        return document.getElementById(str.slice(1));
    } else if (str1 === ".") {
        return document.getElementsByClassName(str.slice(1));
    } else {
        return document.getElementsByTagName(str);
    }
} 