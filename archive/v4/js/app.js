const VERSION = "4.2.5";
const DATE = "04/23/2022";
const TIME = "11:08";

function showPanes(n) {
    let i;
    const panes = $(".pane");
    const tabs = $(".tab");

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

function scrollToElem(id) {
    console.log(id);
    const offset = document.getElementById(id).offsetTop + 0;
    window.scrollTo({
        top: offset,
        behavior: "smooth"
    });
    if (window.innerWidth < 1000) {
        hideNav();
        hideSort();
    }
}

function showNav() {
    $('#blog-nav').css('right', '2.5%');
    $('#nav-tab-wrapper').css('right', '-250px');
}

function hideNav() {
    $('#blog-nav').css('right', '-230px');
    $('#nav-tab-wrapper').css('right', '0px');
}

function showSort() {
    $('#soft-nav').css('right', '2.5%');
    $('#sort-tab-wrapper').css('right', '-250px');
}

function hideSort() {
    $('#soft-nav').css('right', '-230px');
    $('#sort-tab-wrapper').css('right', '0px');
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
        $('#nav-tab-wrapper').css('right', '-250px');
        $('#sort-tab-wrapper').css('right', '-250px');
    }
}

function firefoxCheck() {
    // Realistically, we should check if the browser supports CSS backdrop-filter, but from my testing it seems like Firefox falsely claims it does
    // Firefox doesn't support backdrop-filter out of the box, rather, it hides it deep within config where no normal user would ever find it.
    // Boy, i sure hope there aren't other browsers out there that also don't support it that this check would miss :monkas:
    // remind me to check if safari supports it next week at work
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
    const tabs = $(".tab");
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
    showNav();
    showSort();
}

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