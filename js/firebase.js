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
firebase.firestore().settings({
    cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
});
firebase.firestore().enablePersistence();
var db = firebase.firestore();

var loadFromFire = async function() {
    const posts = [];
    const software = [];

    let blogSnapshot = await db.collection("blog").get({ source: 'cache' });
    if (blogSnapshot) {
        console.log("%cUsing cached blog db", "color:green;font-weight:bold;font-style:italic;");
        console.log(blogSnapshot);
    } else {
        blogSnapshot = await db.collection("blog").get({ source: 'server' });
        console.log("%cNo blog cache, falling back to server", "color:red;font-weight:bold;font-style:italic;");
    }

    let softSnapshot = await db.collection("software").get({ source: 'cache' });
    if (softSnapshot) {
        console.log("%cUsing cached software db", "color:green;font-weight:bold;font-style:italic;");
        console.log(softSnapshot)

    } else {
        softSnapshot = await db.collection("software").get({ source: 'server' });
        console.log("%cNo software cache, falling back to server", "color:red;font-weight:bold;font-style:italic;");
    }

    console.log("%cQuerying cookie for cache status...", "color:lightblue;font-weight:bold;font-style:italic;")
    if (document.cookie.includes("cache-time")) {
        console.log("%cFound cache cookie. Cache is fresh, no need to update.", "color:green;font-weight:bold;font-style:italic;");

    } else {
        console.log("%cNo cache cookie, cache must be expired.", "color:orange;font-weight:bold;font-style:italic;");
        // let blogSnapshot = await db.collection("blog").get({ source: 'server' });
        // let softSnapshot = await db.collection("software").get({ source: 'server' });
        console.log("%cGrabbed updated database", "color:yellow;font-weight:bold;font-style:italic;");
        console.log("%cSet new cookie. Cache good for 1 hour.", "color:lightblue;font-weight:bold;font-style:italic;");
        var d = new Date();
        var e = new Date(d.getTime() + 3600000); //expiry in 1 hour
        document.cookie = "cache-time = " + d.getTime() + "; expires = " + e.toUTCString();
        console.log("%cReloading!", "color:lightblue;font-weight:bold;font-style:italic;");
        loadFromFire();
        return;
    }

    blogSnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() })
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
    softSnapshot.forEach((doc) => {
        software.push({ id: doc.id, ...doc.data() })
    })
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
        alert("Please fill in all fields before submitting!");
        return;
    } else {
        db.collection("feedback").add({
            Email: email,
            Feedback: feedback
        });
        $("#feed-email").val("");
        $("#feed-body").val("");
        alert("Success!\nI'll get back to you soon.");
    }
}