var showPanes = function(n) {
    var i;
    var panes = document.getElementsByClassName("pane");
    var tabs = document.getElementsByClassName("tab");

    if (n > panes.length) { n = 1; } //don't fuck up
    if (n < 1) { n = panes.length; }

    for (i = 0; i < panes.length; i++) {
        if (i != n - 1) {
            //yeet all the other panes out of existence
            var id = "#" + panes[i].id;
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
    var id = "#" + panes[n - 1].id;
    $(id).css("display", "block");
    $(id).css("height", "auto");
    var h = $(id).height();
    $(id).css("height", h);
    $(id).css("opacity", "1");
    $(id).css("z-index", "auto");


    //give the corresponding tab the "active" class
    tabs[n - 1].className += " active";
}

var determinePane = function() {
    var tabs = $("#edit-tabs").children(".tab");
    var x = 0;
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

window.onresize = function() {
    //to ensure we don't end up out of bounds when the window resizes itself
    var tabs = document.getElementsByClassName("tab");
    for (i = 0; i < tabs.length; i++) {
        if ($(tabs[i]).hasClass("active")) { //Find active tab
            var y = window.pageYOffset; //store page scroll pos
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

var scrollToElem = function(id) {
    console.log(id);
    var offset = document.getElementById(id).offsetTop - 0;
    window.scrollTo({
        top: offset,
        behavior: "smooth"
    });
    if (window.innerWidth < 1000) {
        hideNav();
        hideSort();
    }
}

var showNav = function() {
    $('#blog-nav').css('right', '2.5%');
    $('#nav-tab-wrapper').css('right', '-250px');
}

var hideNav = function() {
    $('#blog-nav').css('right', '-230px');
    $('#nav-tab-wrapper').css('right', '0px');
}

var showSort = function() {
    $('#soft-nav').css('right', '2.5%');
    $('#sort-tab-wrapper').css('right', '-250px');
}

var hideSort = function() {
    $('#soft-nav').css('right', '-230px');
    $('#sort-tab-wrapper').css('right', '0px');
}

var load = function() {
    console.log("%c" + art, "color:#b20acb; font-weight: bold; font-size:12px");
    loadFromFire();
    //showPanes() is now called within loadFromFire()
}


var art1 = " _________________    _______________    _________________    _______________";
var art2 = " \\_______________/ /| \\_____________/ /| \\_______________/ /| \\_____________/ /| ";
var art3 = "   ________ ____  / |  _______ ____  / |   ______   ____  / |      ______    / | 01/";
var art4 = "   |__  __| |  | |  | /   ___/ |  | |  |  /      \\  |  | |  |     /      \\  |  |  /18/";
var art5 = "     |  |   |  | |  | |  |     |  | |  | /   __   \\ |  | |  |    /   __   \\ |  |    /18";
var art6 = "     |  |   |  | |  | |  |__   |  |_|  | |  /  \\  | |  |_|  |    |  |  |  | |  |";
var art7 = "    _|  |   |  |_|  | |  __/   |  __   | |  |  |  | |  __   |    |  |  |  | |  |     ";
var art8 = "    \\   |   |  |\\   | |  |     | /  \\  | |  |  |  | | /  \\  |    |  |  |  | |  |     /|";
var art9 = "     |  |   |  | |  | |  |  /| |/   |  | |  \\__/  | |/   |  | __ |  |  |  | |  |    / |";
var art10 = "     |  |   |  | |  | \\  |_/ |      |  | \\        /      |  ||  | \\ |  |  | \\  |___|  |";
var art11 = "     | /    | /  |__|  \\_____|      |__|  \\______/       |__||__|  \\|   \\ |  \\________|"
var art12 = "     |/ ___ |/ _________________________________________________________ \\| ____________";
var art13 = "       /__/   /_________________________________________________________\\   \\___________\\";
var art14 = "                                                                              Owen Bowden";

var art = "" + art1 + "\n" + art2 + "\n" + art3 + "\n" + art4 + "\n" + art5 + "\n" + art6 + "\n" + art7 + "\n" + art8 + "\n" + art9 + "\n" + art10 + "\n" + art11 + "\n" + art12 + "\n" + art13 + "\n" + art14;