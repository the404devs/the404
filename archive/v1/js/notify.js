// var FSR = {
//     version: "5.3.0",
//     date: "11/11/2009",
//     enabled: true,
//     files: "http://images.cbssports.com/script/foresee/",
//     id: "7alXWMyc064b1ROgR/DloA==",
//     sites: [{
//         path: /\w+-?\w+\.(com|org|edu|gov|net)/
//     }, {
//         path: ".",
//         domain: "default"
//     }]
// };

// function fsr$setAlive() {
//     var a = new Date().getTime();
//     document.cookie = "fsr.a=" + a + ";path=/" + ((FSR.site.domain) ? ";domain=" + FSR.site.domain + ";" : ";")
// }(function () {
//     if (window != window.top) {
//         return
//     }
//     function g(k) {
//         if (typeof k == "object") {
//             var l = k.constructor.toString().match(/array/i);
//             return (l != null)
//         }
//         return false
//     }
//     var e = FSR.sites;
//     for (var h = 0, a = e.length; h < a; h++) {
//         var c;
//         if (!g(e[h].path)) {
//             e[h].path = [e[h].path]
//         }
//         for (var j = 0, b = e[h].path.length; j < b; j++) {
//             if (c = document.location.href.match(e[h].path[j])) {
//                 FSR.siteid = h;
//                 FSR.site = FSR.sites[FSR.siteid];
//                 if (!FSR.site.domain) {
//                     FSR.site.domain = c[0]
//                 } else {
//                     if (FSR.site.domain == "default") {
//                         FSR.site.domain = false
//                     }
//                 }
//                 if (!FSR.site.name) {
//                     FSR.site.name = c[0]
//                 }
//                 var d = ["files", "js_files", "image_files", "html_files"];
//                 for (var h = 0, f = d.length; h < f; h++) {
//                     if (FSR.site[d[h]]) {
//                         FSR[d[h]] = FSR.site[d[h]]
//                     }
//                 }
//                 break
//             }
//         }
//         if (c) {
//             break
//         }
//     }
//     if (!window["fsr$timer"]) {
//         fsr$setAlive();
//         window["fsr$timer"] = setInterval(fsr$setAlive, 1000)
//     }
// })();

function Deny(){
    location.href = "http://the403.ml/";
}

function Allow(){
    location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
}