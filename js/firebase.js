// const firebase = require("firebase");
// // Required for side-effects
// require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
var firebaseConfig = {
    apiKey: "AIzaSyAgr0eoCO6hOcxM-5OWXM8sE8BogIsMMiA",
    authDomain: "the404-518d9.firebaseapp.com",
    databaseURL: "https://the404-518d9.firebaseio.com",
    projectId: "the404-518d9",
    storageBucket: "the404-518d9.appspot.com",
    messagingSenderId: "202666549488",
    appId: "1:202666549488:web:110a18ee702111494d6235",
    measurementId: "G-7DVKSB83PJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.firestore();

// db.collection("blog").doc("testing").set({
//     Title: "test",
//     Year: 404,
//     Month: 404,
//     Day: 404,
//     Content: "404 v4"
// });

var loadFromFire = async function() {
    const posts = []
    await db.collection("blog").get().then((querySnapshot) => {

        querySnapshot.forEach((doc) => {
            posts.push({ id: doc.id, ...doc.data() })
        })
    })

    posts.reverse().forEach(post => {

        var date = ('0' + post.Month).slice(-2) + "/" + ('0' + post.Day).slice(-2) + "/" + post.Year;
        $("#home").append(
            $("<div>").addClass("post").append(
                $("<h3>").addClass("post-head").html(post.Title)
            ).append(
                $("<h4>").addClass("post-date").html(date)
            ).append(
                $("<p>").addClass("post-body").html(post.Content)
            ).attr(
                "id", post.id
            )
        );
        if (post.Title) {
            $("#blog-nav").append(
                $("<a>").addClass("link").attr("title", post.id).attr("onclick", "scrollToElem('" + post.id + "')").html(post.Title)
            ).append($("<br>")).append($("<br>"));
        } else {
            $("#blog-nav").append(
                $("<a>").addClass("link").attr("title", post.id).attr("onclick", "scrollToElem('" + post.id + "')").html(date)
            ).append($("<br>")).append($("<br>"));
        }

    });
    showPanes(1);
}