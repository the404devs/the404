//Owen Goodwin (500909196)
//CPS530 Lab 7
//18/11/19

// Function to initialize all the different mouse events, etc.
jQuery.fn.drag = function(el) {
    var thisTarget; //corresponds to the element being dragged
    var relX; //Relative x and y values. 
    var relY;
    var targetW; //Width and height of dragged element
    var targetH;
    var docW; //Width and height of the document
    var docH;
    var ismousedown; //We might need to know if the mouse is currently pressed. Might.

    //Mousedown event (fired when moues is pressed)
    this.bind('mousedown', function(e) {
        //First, figure out which thing has been clicked
        thisTarget = $(e.target).closest('.draggable');
        //Then get its width and height
        var targetW = thisTarget.width();
        var targetH = thisTarget.height();

        //Ensure that the clicked thing is actually a Mario face part.
        //Sometimes, closest() has a heart attack and returns null. We need to catch that.
        if (thisTarget.attr('class') == "draggable") {
            var pos = $(thisTarget).offset(); //Get the offset (css top, left, etc) values of the element
            var srcX = pos.left; //Resolve those into individual values
            var srcY = pos.top;

            docW = $('#canvas').width(); //Grab the width and height of the container
            docH = $('#canvas').height();

            relX = e.pageX - srcX; //Do some quick maths to figure out the element's position relative to the container's
            relY = e.pageY - srcY;

            ismousedown = true; //Oh, and the mouse is pressed now. Don't forget that.
        }
    });

    //Mousemove event (fires when mouse is moved)
    this.bind('mousemove', function(e) {
        //Only do stuff when the mouse button is down (ie: we're dragging Mario's eyeball or something)
        if (ismousedown) {
            //Again, get the dimensions of the dragged element
            targetW = thisTarget.width();
            targetH = thisTarget.height();

            //Figure out the max X and Y values by subtracting the width of the element from the width of the container.
            //We take off an additional 6 b/c the border of the container is 3px, x2 because it's on both sides.
            var maxX = docW - targetW - 6;
            var maxY = docH - targetH - 6;

            //Grab the mouse coordinates
            var mouseX = e.pageX;
            var mouseY = e.pageY;

            //Figure out how far the mouse is from the element's starting pos
            var diffX = mouseX - relX;
            var diffY = mouseY - relY;

            //Ensure the mouse hasn't gone outside the bounds of the container
            if (diffX < 0) diffX = 0;
            if (diffY < 0) diffY = 0;
            if (diffX > maxX) diffX = maxX;
            if (diffY > maxY) diffY = maxY;

            //Update the position of the element
            $(thisTarget).css('top', diffY + 'px');
            $(thisTarget).css('left', diffX + 'px');
        }
    });

    this.bind('mouseup', function(e) {
        //The mouse is no longer pressed. 
        ismousedown = false;
    });

    //Keypress event (fires when a key is pressed)
    $(window).bind('keypress', function(e) {
        //Only do stuff when the mouse button is down (ie: we're dragging Mario's nose or something)
        if (ismousedown) {
            var Rdelta = 0; //To store the change in rotation of the element
            var Zdelta = 0; //To store the change in z-index of the element
            //These are initially set to 0, because we update both regardless of which button is pressed


            if (e.key == 'a') {
                //If A was pressed, rotate anticlockwise 5deg
                Rdelta = -5;
            } else if (e.key == 'd') {
                //If D was pressed, rotate clockwise 5deg
                Rdelta = 5;
            } else if (e.key == 'w') {
                //If W was pressed, increase z-index by 1
                Zdelta = 1;
            } else if (e.key == 's') {
                //If S was pressed, decrease z-index by 1
                Zdelta = -1;
            }
        }
        //Figure out the new value for the rotation property
        var rotation = getRotationDegrees($(thisTarget)) + Rdelta;
        //Update the rotation value
        $(thisTarget).css('transform', 'rotate(' + rotation + 'deg)');

        //Update the z-index value
        $(thisTarget).css('z-index', '+=' + Zdelta);

        //Ensure the z-index doesn't go too far in either directon
        if ($(thisTarget).css('z-index') == '0') {
            $(thisTarget).css('z-index', '1');
        } else if ($(thisTarget).css('z-index') == '5') {
            $(thisTarget).css('z-index', '4');
        }
    });
}


//Runs on document load
$(function() {
    $('#canvas').drag(); //Initalize the stuff
    //Click event for download button
    $("#download").click(function() {
        //Temporarily remove border from canvas, or else it'll show up in the image
        $('#canvas').css('border', 'none');

        //Do some shenanigans to turn the canvas div into an actual canvas element
        //Gonna be honest, this came from stackoverflow

        html2canvas($("#canvas").get(0)).then(function(canvas) {
            //Once canvas has been rendered...
            // onrendered: function(canvas) {
            // Convert and download as image 
            console.log(canvas.toDataURL());

            //Create a temporary link element
            var link = document.createElement('a');
            //"Click" event for the link
            link.addEventListener('click', function(ev) {
                //Get a URL for the canvas' image data
                link.href = canvas.toDataURL();
                console.log(canvas.toDataURL());
                //Filename will be MarioFace.png when downloaded
                link.download = "MarioFace.png";
            }, false);
            //Click that link we just made
            link.click();
            // }
        });
        //Turn the border back on
        $('#canvas').css('border', '3px solid red');
    });
});

//Copy-pasted function from stackoverflow to properly extract the degrees value from a transition property
//something like transform: rotate(45deg)

//Internally, it uses a matrix notation to store the rotation, so we do a bit of math on the correct values to convert them to degrees.
function getRotationDegrees(obj) {
    var matrix = obj.css("-webkit-transform") ||
        obj.css("-moz-transform") ||
        obj.css("-ms-transform") ||
        obj.css("-o-transform") ||
        obj.css("transform");
    if (matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    } else { var angle = 0; }
    return (angle < 0) ? angle + 360 : angle;
}