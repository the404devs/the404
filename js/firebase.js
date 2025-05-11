// Initialize Cloud Firestore through Firebase
const firebaseConfig = {
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
// firebase.analytics();
firebase.firestore().settings({
    cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
    merge: true
});
// funky stuff happens in firefox private browsing, seems related to db persistence
// i can't figure it out, its your problem now.
// https://github.com/firebase/firebase-js-sdk/issues/5377
// ^ seems like firebase just can't operate without indexedDB in a private session
firebase.firestore().enablePersistence({
    synchronizeTabs: true
});
const db = firebase.firestore();

async function fetchBlog() {
    let posts = [];
    let blogSnapshot = await db.collection("blog").get({ source: 'cache' });
    if (blogSnapshot) {
        console.log("%cUsing cached blog db", "color:green;font-weight:bold;font-style:italic;");
    } else {
        blogSnapshot = await db.collection("blog").get({ source: 'server' });
        console.log("%cNo blog cache, falling back to server", "color:red;font-weight:bold;font-style:italic;");
    }

    console.log("%cQuerying blog cookie for cache status...", "color:lightblue;font-weight:bold;font-style:italic;");
    if (cookieExists('blog-cache-time')) {
        console.log("%cFound cache cookie. Cache is probably fresh, no need to update.", "color:green;font-weight:bold;font-style:italic;");
    } else {
        console.log("%cNo cache cookie, cache must be expired.", "color:orange;font-weight:bold;font-style:italic;");
        blogSnapshot = await db.collection("blog").get({ source: 'server' });
        console.log("%cGrabbed updated database", "color:yellow;font-weight:bold;font-style:italic;");
        console.log("%cSet new cookie. Cache good for 1 hour.", "color:lightblue;font-weight:bold;font-style:italic;");
        const d = new Date();
        const e = new Date(d.getTime() + 3600000); //expiry in 1 hour
        document.cookie = `blog-cache-time=${d.getTime()}; expires=${e.toUTCString()};`;
        console.log("%cReloading!", "color:lightblue;font-weight:bold;font-style:italic;");
        fetchBlog();
        return;
    }

    blogSnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() })
    });
    posts.reverse().forEach(post => {
        const date = ('0' + post.Month).slice(-2) + "/" + ('0' + post.Day).slice(-2) + "/" + post.Year;
        $("#blog").append(
            $("<div>").addClass("post blog").append(
                $("<h3>").addClass("post-head").html(post.Title)
            ).append(
                $("<h4>").addClass("post-date").html(date)
            ).append(
                $("<p>").addClass("post-body").html(post.Content)
            ).attr(
                "id", post.id
            ).append(
                $("<p>").addClass("id-label").html(post.id)
            )
        ).append($("<hr>").addClass("inner-line"));
        if (post.Title) {
            $("#blog-id-zone").append(
                $("<a>").addClass("link").attr("title", post.id).attr("onclick", "scrollToElem('" + post.id + "')").html(post.Title)
            );
        } else {
            $("#blog-id-zone").append(
                $("<a>").addClass("link").attr("title", post.id).attr("onclick", "scrollToElem('" + post.id + "')").html(date)
            );
        }
    });
}

async function fetchSoftware() {
    let software = [];
    let tags = [];

    let softSnapshot = await db.collection("software").get({ source: 'cache' });
    if (softSnapshot) {
        console.log("%cUsing cached software db", "color:green;font-weight:bold;font-style:italic;");
    } else {
        softSnapshot = await db.collection("software").get({ source: 'server' });
        console.log("%cNo software cache, falling back to server", "color:red;font-weight:bold;font-style:italic;");
    }

    console.log("%cQuerying software cookie for cache status...", "color:lightblue;font-weight:bold;font-style:italic;");
    if (cookieExists('software-cache-time')) {
        console.log("%cFound cache cookie. Cache is probably fresh, no need to update.", "color:green;font-weight:bold;font-style:italic;");
    } else {
        console.log("%cNo cache cookie, cache must be expired.", "color:orange;font-weight:bold;font-style:italic;");
        softSnapshot = await db.collection("software").get({ source: 'server' });
        console.log("%cGrabbed updated database", "color:yellow;font-weight:bold;font-style:italic;");
        console.log("%cSet new cookie. Cache good for 1 hour.", "color:lightblue;font-weight:bold;font-style:italic;");
        const d = new Date();
        const e = new Date(d.getTime() + 3600000); //expiry in 1 hour
        document.cookie = `software-cache-time=${d.getTime()};expires=${e.toUTCString()}`;
        console.log("%cReloading!", "color:lightblue;font-weight:bold;font-style:italic;");
        fetchSoftware();
        return;
    }

    softSnapshot.forEach((doc) => {
        software.push({ id: doc.id, ...doc.data() })
    })

    software.reverse().forEach(soft => {
        //check for additional buttons
        let btn2, btn3 = "";
        if (soft.Button2 && soft.Button2 != [] && soft.Button2[1] != "" && soft.Button2[0] != "") {
            btn2 = $("<a>").addClass("downloadLink").attr("href", soft.Button2[1]).append($("<button>").addClass("button").append($("<span>").html(soft.Button2[0])));
        }
        if (soft.Button3 && soft.Button3 != [] && soft.Button3[1] != "" && soft.Button3[0] != "") {
            btn3 = $("<a>").addClass("downloadLink").attr("href", soft.Button3[1]).append($("<button>").addClass("button").append($("<span>").html(soft.Button3[0])));
        }
        //check for image
        let img = "";
        if (soft.Image) {
            img = $("<img>").addClass("post-soft-icon").attr("src", soft.Image)
        }
        $("#software").append(
            $("<div>").addClass("post soft").append(
                $("<h3>").addClass("post-head").html(soft.Name)
            ).append(
                $("<div>").addClass("post-props").append(img).append(
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
                )
            ).append(
                $("<p>").html(soft.Description)
            ).append(
                $("<div>").addClass('button-container').append(
                    $("<a>").addClass("downloadLink").attr("href", soft.Button1[1]).append(
                        $("<button>").addClass("button").append(
                            $("<span>").html(soft.Button1[0])
                        )
                    )
                ).append(
                    btn2
                ).append(
                    btn3
                )
            ).append(
                $("<p>").addClass("id-label").html(soft.id)
            ).attr(
                "id", soft.id
            ).attr(
                "tag", soft.Tags.join().replace(/,/g, ", ")
            ).attr(
                "lang", soft.Language.join().replace(/,/g, ", ")
            )
        );

        $("#soft-id-zone").append(
            $("<a>").addClass("link").attr(
                "title", soft.id
            ).attr(
                "onclick", "scrollToElem('" + soft.id + "')"
            ).attr(
                "tag", soft.Tags.join().replace(/,/g, ", ")
            ).attr(
                "lang", soft.Language.join().replace(/,/g, ", ")
            ).html(soft.Name)
        );

        soft.Tags.forEach(tag => {
            if (!tags.includes(tag)) {
                tags.push(tag);
                $("#soft-tag-zone").append(
                    $("<input>").attr(
                        "type", "checkbox"
                    ).attr(
                        "onclick", "sortTags()"
                    ).attr(
                        "name", tag
                    ).attr(
                        "id", tag
                    )
                ).append(
                    $("<label>").attr(
                        "for", tag
                    ).attr(
                        "onclick", "sortTags()"
                    ).html(
                        tag
                    ).addClass(
                        "link"
                    ).append(
                        $("<span>").addClass("checkmark")
                    )
                );
            }
        });

        soft.Language.forEach(tag => {
            if (!tags.includes(tag)) {
                tags.push(tag);
                $("#soft-lang-zone").append(
                    $("<input>").attr(
                        "type", "checkbox"
                    ).attr(
                        "onclick", "sortTags()"
                    ).attr(
                        "name", tag
                    ).attr(
                        "style", "width:auto"
                    ).attr(
                        "id", tag
                    )
                ).append(
                    $("<label>").attr(
                        "for", tag
                    ).attr(
                        "onclick", "sortTags()"
                    ).html(
                        tag
                    ).addClass(
                        "link"
                    ).append($("<span>").addClass("checkmark"))
                );
            }
        });
    });
}

async function adminLoadFromFire() {
    const posts = [];
    const software = [];
    const museum = [];

    const blogSnapshot = await db.collection("blog").get({ source: 'server' });
    const softSnapshot = await db.collection("software").get({ source: 'server' });
    const museumSnapshot = await db.collection("museum").get({ source: 'server' });
    console.log("%cGrabbed entries from server", "color:green;font-weight:bold;font-style:italic;");

    if (document.cookie.includes("state=logged")) {
        console.log("%cUser is logged in.", "color:green;font-weight:bold;font-style:italic;");
    } else {
        console.log("%cUser isn't logged in. Sending in FBI hit squad...", "color:red;font-weight:bold;font-style:italic;");
        return;
    }

    blogSnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() })
    });
    posts.reverse().forEach(post => {
        const date = ('0' + post.Month).slice(-2) + "/" + ('0' + post.Day).slice(-2) + "/" + post.Year;
        $("#home").append(
            $("<div>").addClass("post").append(
                $("<p>").addClass("id-label").html(post.id).css(
                    "font-size", "18px"
                ).css(
                    "margin-top", "0"
                ).css(
                    "margin-bottom", "5px"
                )
            ).append(
                $("<label for='title'>Title: </label>")
            ).append(
                $("<input>").attr("name", "title").addClass('title').val(post.Title)
            ).append(
                $("<label for='year'>Year: </label>")
            ).append(
                $("<input>").attr("name", "year").addClass('year').val(post.Year)
            ).append(
                $("<label for='month'>Month: </label>")
            ).append(
                $("<input>").attr("name", "month").attr("type", "number").addClass('month').val(post.Month)
            ).append(
                $("<label for='day'>Day: </label>")
            ).append(
                $("<input>").attr("name", "day").attr("type", "number").addClass('day').val(post.Day)
            ).append(
                $("<textarea>").attr("name", "content").addClass('post-content').val(post.Content)
            ).append(
                $("<button>").addClass("button").append(
                    $("<span>").html("Update")
                ).attr("onclick", "updateBlog('" + post.id + "')")
            ).attr(
                "id", post.id
            ).attr(
                "style", "width: 70%;padding-top:10px;padding-bottom:10px"
            )
        );
        if (post.Title) {
            $("#blog-id-zone").append(
                $("<a>").addClass("link").attr("title", post.id).attr("onclick", "scrollToElem('" + post.id + "')").html(post.Title)
            );
        } else {
            $("#blog-id-zone").append(
                $("<a>").addClass("link").attr("title", post.id).attr("onclick", "scrollToElem('" + post.id + "')").html(date)
            );
        }
    });
    softSnapshot.forEach((doc) => {
        software.push({ id: doc.id, ...doc.data() })
    });
    software.reverse().forEach(soft => {
        //check for additional buttons
        let btn2t, btn2l, btn3t, btn3l = "";
        if (soft.Button2 && soft.Button2 != [] && soft.Button2[1] != "" && soft.Button2[0] != "") {
            btn2t = soft.Button2[0];
            btn2l = soft.Button2[1];
        }
        if (soft.Button3 && soft.Button3 != [] && soft.Button3[1] != "" && soft.Button3[0] != "") {
            btn3t = soft.Button3[0];
            btn3l = soft.Button3[1];
        }
        //check for image
        if (soft.Image) {
            $("<img>").attr("width", "100px").attr("src", soft.Image)
        }
        $("#soft").append(
            $("<div>").addClass("post").append(
                $("<p>").addClass("id-label").html(soft.id).css(
                    "font-size", "18px"
                ).css(
                    "margin-top", "0"
                ).css(
                    "margin-bottom", "5px"
                )
            ).append(
                $("<label for='name'>Name: </label>")
            ).append(
                $("<input>").attr("name", "name").addClass('name').val(soft.Name)
            ).append(
                $("<label for='version'>Version: </label>")
            ).append(
                $("<input>").attr("name", "version").addClass('version').val(soft.Version)
            ).append(
                $("<label for='release'>Release: </label>")
            ).append(
                $("<input>").attr("name", "release").addClass('release').val(soft.Release)
            ).append(
                $("<label for='current'>Current: </label>")
            ).append(
                $("<input>").attr("name", "current").addClass('current').val(soft.Current)
            ).append(
                $("<label for='language'>Lang: </label>")
            ).append(
                $("<input>").attr("name", "language").addClass('language').val(soft.Language.join().replace(/,/g, ", "))
            ).append(
                $("<label for='tags'>Tags: </label>")
            ).append(
                $("<input>").attr("name", "tags").addClass('tags').val(soft.Tags.join().replace(/,/g, ", "))
            ).append(
                $("<label for='image'>Image: </label>")
            ).append(
                $("<input>").attr("name", "image").addClass('image').val(soft.Image)
            ).append(
                $("<label for='btn1t'>Btn1 Text: </label>")
            ).append(
                $("<input>").attr("name", "btn1t").addClass('btn1t').val(soft.Button1[0])
            ).append(
                $("<label for='btn1l'>Btn1 Link: </label>")
            ).append(
                $("<input>").attr("name", "btn1l").addClass('btn1l').val(soft.Button1[1])
            ).append(
                $("<label for='btn2t'>Btn2 Text: </label>")
            ).append(
                $("<input>").attr("name", "btn2t").addClass('btn2t').val(btn2t)
            ).append(
                $("<label for='btn2l'>Btn2 Link: </label>")
            ).append(
                $("<input>").attr("name", "btn2l").addClass('btn2l').val(btn2l)
            ).append(
                $("<label for='btn3t'>Btn3 Text: </label>")
            ).append(
                $("<input>").attr("name", "btn3t").addClass('btn3t').val(btn3t)
            ).append(
                $("<label for='btn3l'>Btn3 Link: </label>")
            ).append(
                $("<input>").attr("name", "btn3l").addClass('btn3l').val(btn3l)
            ).append(
                $("<textarea>").attr("name", "description").addClass('description').val(soft.Description)
            ).append(
                $("<button>").addClass("button").append(
                    $("<span>").html("Update")
                ).attr("onclick", "updateSoft('" + soft.id + "')")
            ).attr(
                "id", soft.id
            ).attr(
                "style", "width: 70%;padding-top:10px;padding-bottom:10px"
            )
        );
        $("#soft-id-zone").append(
            $("<a>").addClass("link").attr("title", soft.id).attr("onclick", "scrollToElem('" + soft.id + "')").html(soft.Name)
        );
    });
    museumSnapshot.forEach((doc) => {
        museum.push({ id: doc.id, ...doc.data() })
    });
    museum.reverse().forEach(exhibit => {
        $("#about").append(
            $("<div>").addClass("post").append(
                $("<p>").addClass("id-label").html(exhibit.id).css(
                    "font-size", "18px"
                ).css(
                    "margin-top", "0"
                ).css(
                    "margin-bottom", "5px"
                )
            ).append(
                $("<label for='date'>Date: </label>")
            ).append(
                $("<input>").attr("name", "date").addClass('date').val(exhibit.date)
            ).append(
                $("<label for='path'>Path: </label>")
            ).append(
                $("<input>").attr("name", "path").addClass('path').val(exhibit.path)
            ).append(
                $("<textarea>").attr("name", "description").addClass('description').val(exhibit.text)
            ).append(
                $("<button>").addClass("button").append(
                    $("<span>").html("Update")
                ).attr("onclick", "updateMuseum('" + exhibit.id + "')")
            ).attr(
                "id", exhibit.id
            ).attr(
                "style", "width: 70%;padding-top:10px;padding-bottom:10px"
            )
        )
    });

    $("#new-post").fadeIn();
    $("#new-soft").fadeIn();
    $("#new-museum").fadeIn();
    determinePane();
}

async function updateBlog(id) {
    const id2 = "#" + id;
    const title = $(id2).children(".title").val();
    const year = $(id2).children(".year").val();
    const month = $(id2).children(".month").val();
    const day = $(id2).children(".day").val();
    const content = $(id2).children(".post-content").val();
    await db.collection("blog").doc(id).set({
        Title: title,
        Year: year,
        Month: month,
        Day: day,
        Content: content
    }).catch(function(error) {
        alert("Something went very wrong while pushing update.");
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("%c" + errorCode + ": " + errorMessage, "color:red;font-weight:bold;font-style:italic;");
        return;
    }).then(alert("Success!"));
    resetCookie();
}

async function updateSoft(id) {
    const id2 = "#" + id;
    const name = $(id2).children(".name").val();
    const version = $(id2).children(".version").val();
    const release = $(id2).children(".release").val();
    const current = $(id2).children(".current").val();
    const language = $(id2).children(".language").val().split(", ");
    const tags = $(id2).children(".tags").val().split(", ");
    const image = $(id2).children(".image").val();
    const button1 = [$(id2).children(".btn1t").val(), $(id2).children(".btn1l").val()];
    const button2 = [$(id2).children(".btn2t").val(), $(id2).children(".btn2l").val()];
    const button3 = [$(id2).children(".btn3t").val(), $(id2).children(".btn3l").val()];
    const description = $(id2).children(".description").val();
    await db.collection("software").doc(id).set({
        Name: name,
        Version: version,
        Release: release,
        Current: current,
        Language: language,
        Tags: tags,
        Image: image,
        Button1: button1,
        Button2: button2,
        Button3: button3,
        Description: description
    }).catch(function(error) {
        alert("Something went very wrong while pushing update.");
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("%c" + errorCode + ": " + errorMessage, "color:red;font-weight:bold;font-style:italic;");
        return;
    }).then(alert("Success!"));
    resetCookie();
}

async function updateMuseum(id) {
    const id2 = "#" + id;
    const date = $(id2).children(".date").val();
    const path = $(id2).children(".path").val();
    const content = $(id2).children(".description").val();
    await db.collection("museum").doc(id).set({
        date: date,
        path: path,
        text: content
    }).catch(function(error) {
        alert("Something went very wrong while pushing update.");
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("%c" + errorCode + ": " + errorMessage, "color:red;font-weight:bold;font-style:italic;");
        return;
    }).then(alert("Success!"));
    resetCookie();
}

async function newPost() {
    const title = $("#new-post").children(".title").val();
    const year = $("#new-post").children(".year").val();
    const month = $("#new-post").children(".month").val();
    const day = $("#new-post").children(".day").val();
    const content = $("#new-post").children(".post-content").val();
    const id = year.replace(/\D/g, '') + "-" + ('0' + month).slice(-2) + "-" + ('0' + day).slice(-2);
    await db.collection("blog").doc(id).set({
        Title: title,
        Year: year,
        Month: month,
        Day: day,
        Content: content
    }).catch(function(error) {
        alert("Something went very wrong while pushing update.");
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log("%c" + errorCode + ": " + errorMessage, "color:red;font-weight:bold;font-style:italic;");
        return;
    }).then(alert("Success!"));
    refresh();
    resetCookie();
}

async function newSoft() {
    const name = $("#new-soft").children(".name").val();
    const version = $("#new-soft").children(".version").val();
    const release = $("#new-soft").children(".release").val();
    const current = $("#new-soft").children(".current").val();
    const language = $("#new-soft").children(".language").val().split(", ");
    const tags = $("#new-soft").children(".tags").val().split(", ");
    const image = $("#new-soft").children(".image").val();
    const button1 = [$("#new-soft").children(".btn1t").val(), $("#new-soft").children(".btn1l").val()];
    const button2 = [$("#new-soft").children(".btn2t").val(), $("#new-soft").children(".btn2l").val()];
    const button3 = [$("#new-soft").children(".btn3t").val(), $("#new-soft").children(".btn3l").val()];
    const description = $("#new-soft").children(".description").val();
    const id = $("#new-soft").children(".id").val();
    await db.collection("software").doc(id).set({
        Name: name,
        Version: version,
        Release: release,
        Current: current,
        Language: language,
        Tags: tags,
        Image: image,
        Button1: button1,
        Button2: button2,
        Button3: button3,
        Description: description
    }).catch(function(error) {
        alert("Fuck!");
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("%c" + errorCode + ": " + errorMessage, "color:red;font-weight:bold;font-style:italic;");
        return;
    }).then(alert("Success!"));
    refresh();
    resetCookie();
}

async function newMuseum() {
    const id = $("#new-museum").children(".id").val();
    const date = $("#new-museum").children(".date").val();
    const path = $("#new-museum").children(".path").val();
    const content = $("#new-museum").children(".description").val();
    await db.collection("museum").doc(id).set({
        date: date,
        path: path,
        text: content
    }).catch(function(error) {
        alert("Fuck!");
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("%c" + errorCode + ": " + errorMessage, "color:red;font-weight:bold;font-style:italic;");
        return;
    }).then(alert("Success!"));
    refresh();
    resetCookie();
}

function resetCookie() {
    const d = new Date();
    document.cookie = "cache-time = " + d.getTime() + "; expires = " + d.toUTCString();
}

function logout() {
    document.cookie = "state=unlogged"
    console.log("%cUser logged out, bye bye!", "color:green;font-weight:bold;font-style:italic;");
    firebase.auth().signOut();
    resetCookie();
    location.href = '../';
}

function login() {
    console.log("%cthe403 login system (hi zee)", "color:cyan;font-weight:bold;font-style:italic;");
    console.log("%cInit login attempt...", "color:yellow;font-weight:bold;font-style:italic;");
    const fields = $("#login-form").serializeArray();
    const email = fields[0]['value'];
    const password = fields[1]['value'];

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(user) {
            document.cookie = "state=logged;";
            console.log("%cLogin successful, redirecting...", "color:green;font-weight:bold;font-style:italic;");
            adminLoadFromFire();
            $(".init-shown").hide();
            $(".init-hidden").removeClass("init-hidden");
            $("#login-box").fadeOut();
            $("#sign-out").fadeIn();
            $("#refresh").fadeIn();
        })
        .catch(function(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("%c" + errorCode + ": " + errorMessage, "color:red;font-weight:bold;font-style:italic;");
            $("#errmsg").html(error.message).css("opacity", "1");
            $("#errmsg").html(error.message).css("height", "50px");
            setTimeout(() => { $("#errmsg").css("opacity", "0"); }, 2000);
            setTimeout(() => { $("#errmsg").css("height", "0"); }, 2000);
            setTimeout(() => { $("#errmsg").html(""); }, 2000);
        });
}

function sortTags() {
    let matchTag = "";
    let matchLang = "";
    let t = 0;
    let l = 0;
    $("#soft-tag-zone").children("input").each(function() {
        if ($(this).is(":checked")) {
            matchTag += $(this).attr("id").replace(/ /g, "_");
            t++;
        }
    });
    $("#soft-lang-zone").children("input").each(function() {
        if ($(this).is(":checked")) {
            matchLang += $(this).attr("id").replace(/ /g, "_");
            l++;
        }
    });

    $(".soft").each(function() {
        $(this).addClass('hidden');
        const tags = $(this).attr("tag").replace(/ /g, "_").split(",_");
        tags.forEach(tag => {
            if (matchTag.includes(tag) || t == 0) {
                const langs = $(this).attr("lang").replace(/ /g, "_").split(",_");
                langs.forEach(lang => {
                    if (matchLang.includes(lang) || l == 0) {
                        $(this).removeClass('hidden');
                    }
                })
            }
        })
    });

    $("#soft-id-zone").children().each(function() { $(this).addClass('hidden') });

    $("#soft-id-zone").children().each(function() {
        if ($(this).attr("tag")) {
            const tags = $(this).attr("tag").replace(/ /g, "_").split(",_");
            tags.forEach(tag => {
                if (matchTag.includes(tag) || t == 0) {
                    const langs = $(this).attr("lang").replace(/ /g, "_").split(",_");
                    langs.forEach(lang => {
                        if (matchLang.includes(lang) || l == 0) {
                            $(this).removeClass('hidden')
                        }
                    })
                }
            })
        }
    });
}

function clearTags() {
    $("#soft-tag-zone").children("input").each(function() {
        $(this).prop("checked", false);
    });
    $("#soft-lang-zone").children("input").each(function() {
        $(this).prop("checked", false);
    });
    sortTags();
}

function refresh() {
    $("#new-soft").children(".id").val("");
    $("#new-soft").children(".name").val("");
    $("#new-soft").children(".version").val("");
    $("#new-soft").children(".release").val("");
    $("#new-soft").children(".current").val("");
    $("#new-soft").children(".language").val("");
    $("#new-soft").children(".tags").val("");
    $("#new-soft").children(".image").val("");
    $("#new-soft").children(".btn1t").val("");
    $("#new-soft").children(".btn1l").val("");
    $("#new-soft").children(".btn2t").val("");
    $("#new-soft").children(".btn2l").val("");
    $("#new-soft").children(".btn3t").val("");
    $("#new-soft").children(".btn3l").val("");
    $("#new-soft").children(".description").val("");
    $("#new-post").children(".title").val("");
    $("#new-post").children(".year").val("");
    $("#new-post").children(".month").val("");
    $("#new-post").children(".day").val("");
    $("#new-post").children(".post-content").val("");
    $("#new-museum").children(".id").val("");
    $("#new-museum").children(".date").val("");
    $("#new-museum").children(".path").val("");
    $("#new-museum").children(".description").val("");
    $("#home").children('.post').slice(1).remove();
    $("#feed").children('.post').remove();
    $("#about").children('.post').slice(1).remove();
    $("#soft").children('.post').slice(1).remove();
    $("#blog-nav").children('a').remove();
    $("#blog-nav").children('br').remove();
    $("#soft-nav").children('a').remove();
    $("#soft-nav").children('br').remove();

    adminLoadFromFire();
}

function cookieExists(str) {
    return document.cookie.split(";").some((item) => item.trim().startsWith(`${str}=`));
}
