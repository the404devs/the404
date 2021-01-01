function showPanes(n) {
    var i;
    var panes = document.getElementsByClassName("pane");
    var tabs = document.getElementsByClassName("tab");

    if (n > panes.length) { n = 1; } //dont fuck up
    if (n < 1) { n = panes.length; }

    for (i = 0; i < panes.length; i++) {
        if (i != n - 1) {
            //yeet all the other panes out of existence
            var id = "#" + panes[i].id;
            $(id).css("opacity", "0");
            $(id).css("height", "0");
        }
    }
    for (i = 0; i < tabs.length; i++) {
        //remove the "active" class from all the tabs
        tabs[i].className = tabs[i].className.replace(" active", "");
    }

    //fade in the correct pane
    var id = "#" + panes[n - 1].id;
    $(id).css("height", "auto");
    var h = $(id).height();
    $(id).css("height", h);

    $(id).css("opacity", "1");

    //give the corresponding tab the "active" class
    tabs[n - 1].className += " active";
}


window.onresize = function() {
    //to ensure we don't end up out of bounds when the window resizes itself
    var tabs = document.getElementsByClassName("tab");
    for (i = 0; i < tabs.length; i++) {
        if ($(tabs[i]).hasClass("active")) { //Find active tab
            var y = window.pageYOffset; //store page scroll pos
            showPanes(i + 1); //Show corresponding pane to recaulculate window height
            window.scrollTo(0, y); //restore old scroll position
        }
    }
    showNav();
}

var scrollToElem = function(id) {
    console.log(id);
    var offset = document.getElementById(id).offsetTop - 0;
    window.scrollTo({
        top: offset,
        behavior: "smooth"
    });
    if (window.innerWidth < 850) {
        hideNav();
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

var navScroll = function() {
    document.getElementById("blog-nav").scrollBy({ top: document.getElementById("blog-nav").scrollHeight, behavior: "smooth" });
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
var art14 = "                                                                             Owen Goodwin";

var art = "" + art1 + "\n" + art2 + "\n" + art3 + "\n" + art4 + "\n" + art5 + "\n" + art6 + "\n" + art7 + "\n" + art8 + "\n" + art9 + "\n" + art10 + "\n" + art11 + "\n" + art12 + "\n" + art13 + "\n" + art14;