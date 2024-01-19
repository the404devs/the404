function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return true;
        }
    }
    return false;
}

function setCookie(cname){
    const d = new Date();
    d.setTime(d.getTime() + 31104000000);
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=true;" + expires + ";path=/";
}

let d = new Date();
if (d.getMonth() == 0 && d.getDate() > 16 && d.getDate() < 20 && !getCookie("seenBirthday")) {
    setCookie("seenBirthday");
    location.href = "./birthday.html";
}