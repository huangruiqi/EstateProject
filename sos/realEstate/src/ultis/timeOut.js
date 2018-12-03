function resetTime() {

    clearTimeout(myTime);

    myTime = setTimeout('Timeout()', 60000);

}

function Timeout() {

    alert("您的操作已超时!");

    document.location.href = '/';

}


    let myTime = setTimeout("Timeout()", 1000);

    document.documentElement.onkeydown = resetTime;

    document.doocumentElement.onclick = resetTime;  

