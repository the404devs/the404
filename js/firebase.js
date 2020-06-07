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
    const posts = [];
    await db.collection("blog").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            posts.push({ id: doc.id, ...doc.data() })
        })
    });

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

    const software = [];
    await db.collection("software").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            software.push({ id: doc.id, ...doc.data() })
        })
    });

    software.forEach(soft => {
        //check for additional buttons
        var btn2, btn3 = "";
        if (soft.Button2) {
            var btn2 = $("<a>").addClass("downloadLink").attr("href", soft.Button2[1]).append($("<button>").addClass("button").append($("<span>").html(soft.Button2[0])));
        }
        if (soft.Button3) {
            var btn3 = $("<a>").addClass("downloadLink").attr("href", soft.Button3[1]).append($("<button>").addClass("button").append($("<span>").html(soft.Button3[0])));
        }
        //check for image
        var img = "";
        if (soft.Image) {
            img = $("<img>").attr("width", "100px").attr("src", soft.Image)
        }
        $("#software").append(
            $("<div>").addClass("blob").append(
                $("<h2>").html(soft.Name)
            ).append(img).append(
                $("<ul>").append(
                    $("<li>").html("<b>Version:</b> " + soft.Version)
                ).append(
                    $("<li>").html("<b>Release Date:</b> " + soft.Release)
                ).append(
                    $("<li>").html("<b>Last Update:</b> " + soft.Current)
                ).append(
                    $("<li>").html("<b>Language:</b> " + soft.Language.join().replace(/,/g, ", "))
                )
                .append(
                    $("<li>").html("<b>Tags:</b> " + soft.Tags.join().replace(/,/g, ", "))
                )
            ).append(
                $("<p>").html(soft.Description)
            ).append(
                $("<a>").addClass("downloadLink").attr("href", soft.Button1[1]).append(
                    $("<button>").addClass("button").append(
                        $("<span>").html(soft.Button1[0])
                    )
                )
            ).append(btn2).append(btn3).attr("tag", soft.Tags.join().replace(/,/g, ", "))
        );
    });
    showPanes(1);
}

var sendFeedback = function() {
    var email = $("#feed-email").val();
    var feedback = $("#feed-body").val();
    if (email == "" || feedback == "") {
        alert("Please fill in all fields before submitting!")
        return;
    } else {
        db.collection("feedback").add({
            Email: email,
            Feedback: feedback
        });
        $("#feed-email").val("");
        $("#feed-body").val("");
        alert("Success!");
    }
}