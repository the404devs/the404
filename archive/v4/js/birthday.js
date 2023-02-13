function checkBdayCookie(name) {
    let cook = name + "="
    if (document.cookie.length > 0) {
        os = document.cookie.indexOf(cook)
        if (os == -1) {
            // cookie set
            document.location = "/birthday.html"
        }
    }
    // No cookies have been set - set it now.
    document.cookie = name + "=beenHere"
}
let d = new Date();
if (d.getMonth() == 0 && d.getDate() > 16 && d.getDate() < 20) {
    checkBdayCookie("redirect");
}