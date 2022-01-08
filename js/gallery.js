let slideIndex = 1;
// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Dots controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("gallery-slide");
    const dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}


async function loadMuseumFromFire() {
    const museum = [];
    let museumSnapshot = await db.collection("museum").get({ source: 'cache' });
    if (museumSnapshot) {
        console.log("%cUsing cached museum db", "color:green;font-weight:bold;font-style:italic;");
    } else {
        museumSnapshot = await db.collection("museum").get({ source: 'server' });
        console.log("%cNo museum cache, falling back to server", "color:red;font-weight:bold;font-style:italic;");
    }

    console.log("%cQuerying cookie for cache status...", "color:lightblue;font-weight:bold;font-style:italic;");
    if (document.cookie.includes("cache-time")) {
        console.log("%cFound cache cookie. Cache is probably fresh, no need to update.", "color:green;font-weight:bold;font-style:italic;");
    } else {
        console.log("%cNo cache cookie, cache must be expired.", "color:orange;font-weight:bold;font-style:italic;");
        museumSnapshot = await db.collection("museum").get({ source: 'server' });
        console.log("%cGrabbed updated database", "color:yellow;font-weight:bold;font-style:italic;");
        console.log("%cSet new cookie. Cache good for 1 hour.", "color:lightblue;font-weight:bold;font-style:italic;");
        let d = new Date();
        let e = new Date(d.getTime() + 3600000); //expiry in 1 hour
        document.cookie = "cache-time = " + d.getTime() + "; expires = " + e.toUTCString();
        console.log("%cReloading!", "color:lightblue;font-weight:bold;font-style:italic;");
        loadMuseumFromFire();
        return;
    }

    museumSnapshot.forEach((doc) => {
        museum.push({ id: doc.id, ...doc.data() })
    })
    museum.reverse().forEach(exhibit => {
        $("#museum").prepend(
            $("<div>").addClass("gallery-slide").css("display", "none").append(
                $("<img>").attr("src", exhibit.path)
            ).append(
                $("<h4>").html(exhibit.date)
            ).append(
                $("<p>").html(exhibit.text)
            ).attr(
                "id", exhibit.id
            )
        )
    })

    for (let i = 1; i < $("#museum").children(".gallery-slide").length + 1; i++) {
        $("#dots").append(
            $("<span>").addClass("dot").attr(
                "onclick", "currentSlide(" + i + ")"
            )
        )
    }

    showSlides(1);
}