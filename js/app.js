const VERSION = "5.0.0";
const DATE = "02/12/2023";
const TIME = "18:48";

function showPanes(n) {
    let i;
    const panes = $(".pane");
    const tabs = $(".nav-link");

    if (n > panes.length) { n = 1; } //don't fuck up
    if (n < 1) { n = panes.length; }

    for (i = 0; i < panes.length; i++) {
        if (i != n - 1) {
            //yeet all the other panes out of existence
            let id = "#" + panes[i].id;
            $(id).css("opacity", "0");
            $(id).css("height", "0");
            $(id).css("z-index", "-1");
            $(id).css("display", "none");
        }
    }
    for (i = 0; i < tabs.length; i++) {
        //remove the "active" class from all the tabs
        tabs[i].className = tabs[i].className.replace(" active", "");
    }

    if (mainNav) {
        mainNav.classList.remove("active");
    }
    $(".post").removeClass("animated");


    //fade in the correct pane
    const id = "#" + panes[n - 1].id;
    $(id).css("display", "block");
    $(id).css("height", "auto");
    const h = $(id).height();
    $(id).css("height", h);
    $(id).css("opacity", "1");
    $(id).css("z-index", "auto");

    //give the corresponding tab the "active" class
    tabs[n - 1].className += " active";
}

function determinePane() {
    const tabs = $("#edit-tabs").children("span");
    let x = 0;
    tabs.each(function() {
        if ($(this).hasClass("active")) {
            $(this).click();
            return;
        } else {
            x++;
        }
    });
    if (x == tabs.length) {
        showPanes(1);
    }
}


function scrollToElem(id, offset = -125) {
    const elem = document.getElementById(id);
    $(".post").removeClass("animated");
    let rect = elem.getBoundingClientRect();
    let targetPosition = Math.ceil(rect.top + self.scrollY + offset);

    if (window.scrollY != targetPosition) {
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        window.onscroll = e => {
            let currentScrollOffset = window.scrollY || document.documentElement.scrollTop
                // Scroll reach the target
            if (currentScrollOffset === targetPosition || currentScrollOffset === document.documentElement.scrollHeight - window.innerHeight) {
                elem.classList.add("animated");
                window.onscroll = null // remove listener
            }
        }
    } else {
        elem.classList.add("animated");
    }

    if (window.innerWidth < 1000) {
        hideSideNav('blog-nav');
        hideSideNav('soft-nav');
    }
}

function showSideNav(id) {
    $('#' + id).css('right', '2.5%');
    $('#' + id + '-toggle').css('right', '-250px');
}

function hideSideNav(id) {
    $('#' + id).css('right', '-250px');
    $('#' + id + '-toggle').css('right', '10px');
}

function getVersionInfo() {
    $("#version").text("v" + VERSION);
    $("#date").text(DATE + " " + TIME);
}

function load() {
    console.log("%c" + art, "color:#b20acb; font-weight: bold; font-size:12px");
    getVersionInfo();
    loadFromFire();

    const e = new Date(2018, 0, 18, 18, 45);
    let d = new Date();
    let dif = (d.getTime() - e.getTime()) / 1000;
    $("#time").text(dif);
    setInterval(function() {
        d = new Date();
        dif = Math.round((d.getTime() - e.getTime()) / 1000);
        $("#time").text(dif);
    }, 1000);

    widthCheck();
    firefoxCheck();
}

function widthCheck() {
    if (window.innerWidth >= 1000) {
        showSideNav('blog-nav');
        showSideNav('soft-nav');
    } else {
        hideSideNav('blog-nav');
        hideSideNav('soft-nav');
    }
}

function firefoxCheck() {
    // Realistically, we should check if the browser supports CSS backdrop-filter, but from my testing it seems like Firefox falsely claims it does
    // Firefox doesn't support backdrop-filter out of the box, rather, it hides it deep within config where no normal user would ever find it.
    // Boy, i sure hope there aren't other browsers out there that also don't support it that this check would miss :monkas:
    // remind me to check if safari supports it next week at work
    // oh no i forgot
    if (navigator.userAgent.indexOf("Firefox") > -1) {
        console.log("%cFirefox detected, making things that use backdrop-filter opague.", "color:red; font-weight: bold;");
        $(".header").css("background-color", "var(--background)");
        $(".nav").css("background-color", "var(--background)");
        $(".prev").css("background-color", "var(--background)");
        $(".next").css("background-color", "var(--background)");
    }
}

window.onresize = function() {
    //to ensure we don't end up out of bounds when the window resizes itself
    const tabs = $(".nav-link");
    for (i = 0; i < tabs.length; i++) {
        if ($(tabs[i]).hasClass("active")) { //Find active tab
            const y = window.pageYOffset; //store page scroll pos
            showPanes(i + 1); //Show corresponding pane to recalculate window height
            window.scrollTo({
                top: y,
                left: 0,
                behavior: "smooth"
            }); //restore old scroll position
        }
    }
    showSideNav('blog-nav');
    showSideNav('soft-nav');

    mainNav.classList.remove("active");

}

let mainNav = document.getElementById("main-nav");
let navBarToggle = document.getElementById("navbar-toggle");

if (navBarToggle) {
    navBarToggle.addEventListener("click", function() {
        mainNav.classList.toggle("active");
    });
}

const navDynamicHeight = $('#main-nav').find('.nav-link').length * 41;
$('#main-nav').css('--nav-dynamic-height', navDynamicHeight + 'px');




//this seems like a horrible way to do this.
const art1 = " _________________    _______________    _________________    _______________";
const art2 = " \\_______________/ /| \\_____________/ /| \\_______________/ /| \\_____________/ /| ";
const art3 = "   ________ ____  / |  _______ ____  / |   ______   ____  / |      ______    / | 01/";
const art4 = "   |__  __| |  | |  | /   ___/ |  | |  |  /      \\  |  | |  |     /      \\  |  |  /18/";
const art5 = "     |  |   |  | |  | |  |     |  | |  | /   __   \\ |  | |  |    /   __   \\ |  |    /2018";
const art6 = "     |  |   |  | |  | |  |__   |  |_|  | |  /  \\  | |  |_|  |    |  |  |  | |  |";
const art7 = "    _|  |   |  |_|  | |  __/   |  __   | |  |  |  | |  __   |    |  |  |  | |  |     ";
const art8 = "    \\   |   |  |\\   | |  |     | /  \\  | |  |  |  | | /  \\  |    |  |  |  | |  |     /|";
const art9 = "     |  |   |  | |  | |  |  /| |/   |  | |  \\__/  | |/   |  | __ |  |  |  | |  |    / |";
const art10 = "     |  |   |  | |  | \\  |_/ |      |  | \\        /      |  ||  | \\ |  |  | \\  |___|  |";
const art11 = "     | /    | /  |__|  \\_____|      |__|  \\______/       |__||__|  \\|   \\ |  \\________|"
const art12 = "     |/ ___ |/ _________________________________________________________ \\| ____________";
const art13 = "       /__/   /_________________________________________________________\\   \\___________\\";
const art14 = "                                                                              Owen Bowden";

const art = "" + art1 + "\n" + art2 + "\n" + art3 + "\n" + art4 + "\n" + art5 + "\n" + art6 + "\n" + art7 + "\n" + art8 + "\n" + art9 + "\n" + art10 + "\n" + art11 + "\n" + art12 + "\n" + art13 + "\n" + art14;