let slideIndex = 1;

function scrollToElem(id) {
    console.log(id);
    const elem = document.getElementById(id);
    const offset = elem.offsetTop - 120;
    window.scrollTo({
        top: offset,
        behavior: "smooth"
    });
}

function getJSON(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        let status = xhr.status;
        if (status === 200) {
            callback(null, xhr.responseText);
        } else {
            callback(status, xhr.responseText);
        }
    };
    xhr.send();
}

function loadInstructionsFromJSON() {
    let sets = [];
    $.getJSON("./data/instructions.json", function(jsonData) {
        Object.keys(jsonData).forEach(key => {
            let id = clean(key);
            $("#main").append(
                $("<div>").addClass("post").addClass("model").attr("id", id).append(
                    $("<h3>").addClass("post-head").html(key)
                ).append(
                    $("<h4>").addClass("post-date").html(jsonData[key].base)
                ).append(
                    $("<div>").addClass("post-body").html("<b>Requires Sets:</b>")
                ).append(
                    $("<ul>").attr("id", id + "-sets")
                ).append(
                    $("<div>").addClass("post-body").html("<b>Files:</b>")
                ).append(
                    $("<ul>").attr("id", id + "-files")
                ).attr("tag", jsonData[key].sets.join().replace(/,/g, ", ")).attr("type", jsonData[key].base)
            );

            jsonData[key].sets.forEach(set => {
                $("#" + id + "-sets").append(
                    $("<li>").html(set)
                );
            });

            jsonData[key].files.forEach(file => {
                let prefix1 = "instructions/";
                let prefix2 = jsonData[key].base + "/";
                if (file.startsWith("http")) {
                    prefix1 = "";
                    prefix2 = "";
                }
                let prefix = prefix1 + prefix2;
                $("#" + id + "-files").append(
                    $("<li>").append($("<a>").addClass("link").attr("href", prefix + file).html(file))
                );
            });

            $("#robo-id-zone").append(
                $("<a>").addClass("link").attr(
                    "title", key
                ).attr(
                    "tag", jsonData[key].sets.join().replace(/,/g, ", ")
                ).attr(
                    "onclick", "scrollToElem('" + id + "')"
                ).html(key)
            ).append(
                $("<br>")
            ).append(
                $("<br>")
            );

            jsonData[key].sets.forEach(set => {
                if (!sets.includes(set)) {
                    sets.push(set);
                    $("#robo-tag-zone").append(
                        $("<input>").attr(
                            "type", "checkbox"
                        ).attr(
                            "onclick", "sortTags('.model')"
                        ).attr(
                            "name", set
                        ).attr(
                            "style", "width:auto"
                        ).attr(
                            "id", set
                        )
                    ).append(
                        $("<label>").attr(
                            "for", set
                        ).attr(
                            "onclick", "sortTags('.model')"
                        ).html(
                            set
                        ).addClass(
                            "link"
                        ).append(
                            $("<span>").addClass("checkmark")
                        )
                    ).append(
                        $("<br>")
                    ).append(
                        $("<br>")
                    );
                }
            });
        });


    });
}

function loadImagesFromJSON() {
    $.getJSON("./data/images.json", function(jsonData) {
        Object.keys(jsonData).forEach(key => {
            let id = clean(key);
            $("#main").append(
                $("<div>").addClass("post").attr("id", id).append(
                    $("<h3>").addClass("post-head").html(key)
                ).append(
                    $("<h4>").addClass("post-date").html(jsonData[key].type)
                ).append(
                    $("<p>").addClass("post-body").html(jsonData[key].description)
                )
            );

            let i = 0;
            jsonData[key].galleries.forEach(gallery => {
                $("#" + id).append(
                    $("<div>").addClass("robo-gallery").attr("id", id + "-" + i).append(
                        $("<h4>").addClass("post-date").html(gallery.name)
                    )
                )
                let path = gallery.path;
                let j = 0;
                gallery.images.forEach(image => {
                    $("#" + id + "-" + i).append(
                        $("<img>").attr("src", path + image).addClass("robo-gallery-image").attr("id", id + "-" + i + "-" + j).attr("gallery", id + "-" + i).attr("onclick", "showImageOverlay('" + id + "-" + i + "-" + j + "')").attr("loading", "lazy")
                    )
                    j++;
                });
                i++;
            });
        });
    });
}

function loadProgramsFromJSON() {
    let tags = [];
    $.getJSON("./data/programs.json", function(jsonData) {
        let ids = [];
        console.log(Object.keys(jsonData));
        Object.keys(jsonData).forEach(key => {
            let id = clean(key);
            ids.push(id);
            $("#main").append(
                $("<div>").addClass("post").addClass("program").attr("id", id).append(
                    $("<h3>").addClass("post-head").html(key)
                ).append(
                    $("<h4>").addClass("post-date").html(jsonData[key].date)
                ).append(
                    $("<h4>").addClass("post-author").html("<b>Author:</b> " + jsonData[key].author)
                ).append(
                    $("<h4>").addClass("post-author").html("<b>Type:</b> " + jsonData[key].type)
                ).append(
                    $("<h4>").addClass("post-author").html("<b>Tags:</b> " + jsonData[key].tags.join().replace(/,/g, ", "))
                ).append(
                    $("<br>")
                ).append(
                    $("<div>").addClass("post-body").html(jsonData[key].description)
                ).append(
                    $("<br>")
                ).append(
                    $("<div>").addClass("post-body").html("<b>Files:</b>")
                ).append(
                    $("<ul>").attr("id", id + "-files")
                ).attr("tag", jsonData[key].tags.join().replace(/,/g, ", ")).attr("type", jsonData[key].type)
            );

            jsonData[key].files.forEach(file => {
                $("#" + id + "-files").append(
                    $("<li>").append($("<a>").addClass("link").attr("href", "programs/" + file).html(file))
                );
            });

            $("#robo-id-zone").append(
                $("<a>").addClass("link").attr(
                    "title", key
                ).attr(
                    "tag", jsonData[key].tags.join().replace(/,/g, ", ")
                ).attr(
                    "onclick", "scrollToElem('" + id + "')"
                ).attr(
                    "type", jsonData[key].type
                ).html(key)
            ).append(
                $("<br>")
            ).append(
                $("<br>")
            );

            jsonData[key].tags.forEach(tag => {
                if (!tags.includes(tag)) {
                    tags.push(tag);
                    $("#robo-tag-zone").append(
                        $("<input>").attr(
                            "type", "checkbox"
                        ).attr(
                            "onclick", "sortTags('.program')"
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
                            "onclick", "sortTags('.program')"
                        ).html(
                            tag
                        ).addClass(
                            "link"
                        ).append(
                            $("<span>").addClass("checkmark")
                        )
                    ).append(
                        $("<br>")
                    ).append(
                        $("<br>")
                    );
                }
            });

            if (!tags.includes(jsonData[key].type)) {
                tags.push(jsonData[key].type);
                $("#robo-type-zone").append(
                    $("<input>").attr(
                        "type", "checkbox"
                    ).attr(
                        "onclick", "sortTags('.program')"
                    ).attr(
                        "name", jsonData[key].type
                    ).attr(
                        "style", "width:auto"
                    ).attr(
                        "id", jsonData[key].type
                    )
                ).append(
                    $("<label>").attr(
                        "for", jsonData[key].type
                    ).attr(
                        "onclick", "sortTags('.program')"
                    ).html(
                        jsonData[key].type
                    ).addClass(
                        "link"
                    ).append($("<span>").addClass("checkmark"))
                ).append(
                    $("<br>")
                ).append(
                    $("<br>")
                );
            }
        });

    });
}

function sortTags(className) {
    let matchTag = "";
    let matchLang = "";
    let t = 0;
    let l = 0;
    $("#robo-tag-zone").children("input").each(function() {
        if ($(this).is(":checked")) {
            matchTag += $(this).attr("id").replace(/ /g, "_");
            t++;
        }
    });
    $("#robo-type-zone").children("input").each(function() {
        if ($(this).is(":checked")) {
            matchLang += $(this).attr("id").replace(/ /g, "_");
            l++;
        }
    });

    $(className).each(function() {
        $(this).css("display", "none");
        const tags = $(this).attr("tag").replace(/ /g, "_").split(",_");
        tags.forEach(tag => {
            if (matchTag.includes(tag) || t == 0) {
                const langs = $(this).attr("type").replace(/ /g, "_").split(",_");
                langs.forEach(lang => {
                    if (matchLang.includes(lang) || l == 0) {
                        $(this).css("display", "block")
                    }
                })
            }
        })
    });

    $("#robo-id-zone").children().each(function() { $(this).css("display", "none") });

    $("#robo-id-zone").children().each(function() {
        if ($(this).attr("tag")) {
            const tags = $(this).attr("tag").replace(/ /g, "_").split(",_");
            tags.forEach(tag => {
                if (matchTag.includes(tag) || t == 0) {
                    try {
                        const langs = $(this).attr("type").replace(/ /g, "_").split(",_");
                        langs.forEach(lang => {
                            if (matchLang.includes(lang) || l == 0) {
                                $(this).css("display", "inline")
                                $(this).next("br").css("display", "inline");
                                $(this).next("br").next("br").css("display", "inline");
                            }
                        });
                    } catch (error) {
                        $(this).css("display", "inline")
                        $(this).next("br").css("display", "inline");
                        $(this).next("br").next("br").css("display", "inline");
                    }
                }
            })
        }
    });
}

function clearTags(className) {
    $("#robo-tag-zone").children("input").each(function() {
        $(this).prop("checked", false);
    });
    $("#robo-type-zone").children("input").each(function() {
        $(this).prop("checked", false);
    });
    sortTags(className);
}

function roboDateFlip() {
    const parent = $("#main");
    const children = parent.children(".program");
    parent.append(children.get().reverse());

    const parent2 = $("#robo-id-zone");
    parent2.children().slice(-2).remove()
    const children2 = parent2.children();
    parent2.append(children2.get().reverse()).append($("<br>")).append($("<br>"));

    if ($("#roboFlipper").html() == "↑") {
        $("#roboFlipper").attr("title", "Sorting Descending").html("↓");
    } else {
        $("#roboFlipper").attr("title", "Sorting Ascending").html("↑");
    }

    sortTags();
}

function clean(str) {
    return str.replace(/\W/g, '')
}

function showSort() {
    $('#robo-nav').css('right', '2.5%');
    $('#sort-tab-wrapper').css('right', '-250px');
}

function hideSort() {
    $('#robo-nav').css('right', '-300px');
    $('#sort-tab-wrapper').css('right', '0px');
}

function widthCheck() {
    if (window.innerWidth >= 1000) {
        $('#sort-tab-wrapper').css('right', '-250px');
    }
}

window.onresize = function() {
    showSort();
}

function showImageOverlay(imageID) {
    console.log(imageID);
    $('#image-overlay').fadeIn();
    $('#' + imageID).addClass("active");
    let imageSource = $('#' + imageID).attr('src');
    $("#image-overlay-img").attr('src', imageSource);
    $("body").css('overflow', 'hidden');
    let targetGallery = $('#' + imageID).attr('gallery');
    $("#image-overlay-gallery").html($("#" + targetGallery).html());
    let badTitleElem = $("#image-overlay-gallery").children("h4")[0]
    $("#image-overlay-title").html($(badTitleElem).html());
    $(badTitleElem).remove();
    $('#' + imageID).removeClass("active");
    slideIndex = parseInt(imageID.slice(imageID.lastIndexOf('-') + 1)) + 1;
}

function hideImageOverlay() {
    $('#image-overlay').fadeOut(400, function() {
        $("body").css('overflow', 'scroll');
    });
    slideIndex = 1;
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    const thumbs = $("#image-overlay-gallery").children("img");
    if (n > thumbs.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = thumbs.length }
    for (i = 0; i < thumbs.length; i++) {
        $(thumbs[i]).removeClass("active");
    }
    $(thumbs[slideIndex - 1]).addClass("active");
    try {
        $("#image-overlay-img").attr('src', $("#image-overlay-gallery").children("img")[slideIndex - 1].src);
        $("#image-overlay-gallery").children("img")[slideIndex - 1].scrollIntoView({ behavior: 'smooth' });
    } catch (error) {

    }
}

$(document).keyup(function(e) {
    if (e.key === "Escape") {
        hideImageOverlay();
    } else if (e.key === "ArrowRight") {
        plusSlides(1);
    } else if (e.key === "ArrowLeft") {
        plusSlides(-1);
    }
});
widthCheck();