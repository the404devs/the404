let slideIndex = 1;
let overlayActive = false;

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
    let counts = [];
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
                ).attr("tag", jsonData[key].sets.join().replace(/[^0-9a-zA-Z:,]+/g, "").replace(/,/g, ", ")).attr("type", jsonData[key].base)
            );

            if (jsonData[key].interlink) {
                $("#" + id).append(
                    $("<div>").addClass("post-body").html("<b>Additional Resources:</b>")
                )
                constructInterlinks(id, jsonData[key].interlink);
            }

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
                    "tag", jsonData[key].sets.join().replace(/[^0-9a-zA-Z:,]+/g, "").replace(/,/g, ", ")
                ).attr(
                    "onclick", "scrollToElem('" + id + "')"
                ).html(key)
            ).append(
                $("<br>")
            ).append(
                $("<br>")
            );

            jsonData[key].sets.forEach(set => {
                const cleanedSet = clean(set, true);
                if (!sets.includes(cleanedSet)) {
                    sets.push(cleanedSet);
                    counts.push(0);
                    $("#robo-tag-zone").append(
                        $("<input>").attr(
                            "type", "checkbox"
                        ).attr(
                            "onclick", "sortTags('.model')"
                        ).attr(
                            "name", cleanedSet
                        ).attr(
                            "style", "width:auto"
                        ).attr(
                            "id", cleanedSet
                        )
                    ).append(
                        $("<label>").attr(
                            "for", cleanedSet
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
                counts[sets.indexOf(cleanedSet)]++;
                const label = $("#" + cleanedSet).next();
                const x = counts[sets.indexOf(cleanedSet)];
                const cache = label.children("span");
                label.html(set + " <b class='counter'>[" + x + "]</b>").append(cache);
            });
        });
    }).then(() => { getIdFromURL(); });;
}

function loadImagesFromJSON() {
    tags = [];
    counts = [];
    $.getJSON("./data/images.json", function(jsonData) {
        Object.keys(jsonData).forEach(key => {
            const id = clean(key);
            const cleanedType = clean(jsonData[key].type);
            $("#main").append(
                $("<div>").addClass("post").addClass("botimage").attr("id", id).attr("tag", "dummy").attr(
                    "type", cleanedType
                ).append(
                    $("<h3>").addClass("post-head").html(key)
                ).append(
                    $("<h4>").addClass("post-date").html(jsonData[key].type)
                ).append(
                    $("<p>").addClass("post-body").html(jsonData[key].description)
                )
            );

            if (jsonData[key].interlink) {
                $("#" + id).append(
                    $("<div>").addClass("post-body").html("<b>Resources:</b>")
                )
                constructInterlinks(id, jsonData[key].interlink);
            }

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
                    const thumbifiedPath = path.replace("images/", "images/THUMBS/");
                    const ext = image.split(".").pop();
                    const thumbifiedImage = image.replace("." + ext, "_thumb." + ext);
                    $("#" + id + "-" + i).append(
                        $("<img>").attr("src", thumbifiedPath + thumbifiedImage).addClass("robo-gallery-image").attr("id", id + "-" + i + "-" + j).attr("gallery", id + "-" + i).attr("onclick", "showImageOverlay('" + id + "-" + i + "-" + j + "')")
                    )
                    j++;
                });
                i++;
            });

            $("#robo-id-zone").append(
                $("<a>").addClass("link").attr(
                    "title", key
                ).attr(
                    "onclick", "scrollToElem('" + id + "')"
                ).attr("tag", "dummy").attr(
                    "type", cleanedType
                ).html(key)
            ).append(
                $("<br>")
            ).append(
                $("<br>")
            );

            if (!tags.includes(jsonData[key].type)) {
                tags.push(jsonData[key].type);
                counts.push(0);
                $("#robo-type-zone").append(
                    $("<input>").attr(
                        "type", "checkbox"
                    ).attr(
                        "onclick", "sortTags('.botimage')"
                    ).attr(
                        "name", jsonData[key].type
                    ).attr(
                        "style", "width:auto"
                    ).attr(
                        "id", cleanedType
                    )
                ).append(
                    $("<label>").attr(
                        "for", cleanedType
                    ).attr(
                        "onclick", "sortTags('.botimage')"
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

            counts[tags.indexOf(jsonData[key].type)]++;
            const label = $("#" + cleanedType).next();
            const x = counts[tags.indexOf(jsonData[key].type)];
            const cache = label.children("span");
            label.html(jsonData[key].type + " <b class='counter'>[" + x + "]</b>").append(cache);
        });
    }).then(() => {
        Promise.all(Array.from(document.querySelectorAll('.robo-gallery-image')).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
            console.log('Images loaded, scrolling now!');
            getIdFromURL();
        });
    });;
}

function loadProgramsFromJSON() {
    let tags = [];
    let counts = [];
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
                    $("<h4>").addClass("post-author").html("<b>Language:</b> " + jsonData[key].type.join().replace(/ /g, "").replace(/,/g, ", "))
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
                ).attr(
                    "tag", jsonData[key].tags.join().replace(/ /g, "").replace(/,/g, ", ")
                ).attr("type", jsonData[key].type.join().replace(/ /g, "").replace(/,/g, ", "))
            );

            if (jsonData[key].interlink) {
                $("#" + id).append(
                    $("<div>").addClass("post-body").html("<b>Additional Resources:</b>")
                )
                constructInterlinks(id, jsonData[key].interlink);
            }

            jsonData[key].files.forEach(file => {
                $("#" + id + "-files").append(
                    $("<li>").append($("<a>").addClass("link").attr("href", "programs/" + file).html(file))
                );
            });

            $("#robo-id-zone").append(
                $("<a>").addClass("link").attr(
                    "title", key
                ).attr(
                    "tag", jsonData[key].tags.join().replace(/ /g, "").replace(/,/g, ", ")
                ).attr(
                    "onclick", "scrollToElem('" + id + "')"
                ).attr(
                    "type", jsonData[key].type.join().replace(/ /g, "").replace(/,/g, ", ")
                ).html(key)
            ).append(
                $("<br>")
            ).append(
                $("<br>")
            );

            jsonData[key].tags.forEach(tag => {
                const cleanedTag = clean(tag);
                if (!tags.includes(cleanedTag)) {
                    tags.push(cleanedTag);
                    counts.push(0);
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
                            "id", cleanedTag
                        )
                    ).append(
                        $("<label>").attr(
                            "for", cleanedTag
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
                counts[tags.indexOf(cleanedTag)]++;
                const label = $("#" + cleanedTag).next();
                const x = counts[tags.indexOf(cleanedTag)];
                const cache = label.children("span");
                label.html(tag + " <b class='counter'>[" + x + "]</b>").append(cache);
            });

            jsonData[key].type.forEach(type => {
                if (!tags.includes(type)) {
                    tags.push(type);
                    counts.push(0);
                    $("#robo-type-zone").append(
                        $("<input>").attr(
                            "type", "checkbox"
                        ).attr(
                            "onclick", "sortTags('.program')"
                        ).attr(
                            "name", type
                        ).attr(
                            "style", "width:auto"
                        ).attr(
                            "id", type
                        )
                    ).append(
                        $("<label>").attr(
                            "for", type
                        ).attr(
                            "onclick", "sortTags('.program')"
                        ).html(
                            type
                        ).addClass(
                            "link"
                        ).append($("<span>").addClass("checkmark"))
                    ).append(
                        $("<br>")
                    ).append(
                        $("<br>")
                    );
                }
                counts[tags.indexOf(type)]++;
                const label = $("#" + type).next();
                const x = counts[tags.indexOf(type)];
                const cache = label.children("span");
                label.html(type + " <b class='counter'>[" + x + "]</b>").append(cache);
            });
        });
    }).then(() => { getIdFromURL(); });
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

    flipIcon($('#robo-sidenav-sort-icon'));

    sortTags(".program");
}

function clean(str, nuke) {
    if (nuke)
        return str.replace(/[^0-9a-zA-Z:,]+/g, "");
    else
        return str.replace(/\W/g, '')
}

window.onresize = function() {
    showSideNav('robo-nav');
    hideMainNav();
}

function showImageOverlay(imageID) {
    overlayActive = true;
    console.log(imageID);
    $('#' + imageID).addClass("active");
    const imageSource = unthumbifySource($('#' + imageID).attr('src'));
    $("#image-overlay-img").attr('src', imageSource);
    $("body").css('overflow', 'hidden');
    const targetGallery = $('#' + imageID).attr('gallery');
    $("#image-overlay-gallery").html($("#" + targetGallery).html());
    const badTitleElem = $("#image-overlay-gallery").children("h4")[0]
    $("#image-overlay-title").html($(badTitleElem).html());
    $(badTitleElem).remove();
    $('#' + imageID).removeClass("active");
    $('#image-overlay').fadeIn();
    slideIndex = parseInt(imageID.slice(imageID.lastIndexOf('-') + 1)) + 1;
}

function unthumbifySource(src) {
    const unthumbed = src.replace("THUMBS/", "").replace("_thumb", "");
    // console.log("Unthumbified " + src, unthumbed);
    return unthumbed;
}

function hideImageOverlay() {
    overlayActive = false;
    $('#image-overlay').fadeOut(400, function() {
        $("body").css('overflow', 'scroll');
        $("#image-overlay-img").attr('src', '');
    });
    slideIndex = 1;
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    const thumbs = $("#image-overlay-gallery").children("img");
    $("#image-overlay-img").attr('src', "images/null.png");
    $("#image-overlay-img").css('opacity', '0');
    $("#image-overlay-img").attr('onclick', "");
    if (n > thumbs.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = thumbs.length }
    for (i = 0; i < thumbs.length; i++) {
        $(thumbs[i]).removeClass("active");
    }
    $(thumbs[slideIndex - 1]).addClass("active");
    $("#image-overlay-img").attr('src', unthumbifySource($("#image-overlay-gallery").children("img")[slideIndex - 1].src));
    $("#image-overlay-img").css('opacity', '1');
    $("#image-overlay-img").attr('onclick', "window.open(this.src)");
    $("#image-overlay-gallery").children("img")[slideIndex - 1].scrollIntoView({ behavior: 'smooth' });
}

function getIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const requestedId = urlParams.get('id');
    if (requestedId != null) {
        if (document.getElementById(requestedId)) {
            console.log("Scrolling to " + requestedId);
            scrollToElem(requestedId);
        } else {
            alert("Nothing for " + requestedId + "!");
        }
    }
}

function constructInterlinks(id, interlinkData) {
    if (!interlinkData) return;
    const progURL = "./programs.html?id=";
    const instURL = "./instructions.html?id=";
    const imagURL = "./images.html?id=";
    const interlinkId = id + "-interlink-zone";
    $("#" + id).append(
        $("<ul>").attr("id", interlinkId).addClass("interlink-zone")
    );
    if (interlinkData.programs) {
        interlinkData.programs.forEach(program => {
            $("#" + interlinkId).append(
                $("<li>").append(
                    $("<a>").addClass("link")
                    .attr("href", progURL + program.id)
                    .html(program.text)
                )
            );
        });
    }
    if (interlinkData.instructions) {
        interlinkData.instructions.forEach(instruction => {
            $("#" + interlinkId).append(
                $("<li>").append(
                    $("<a>").addClass("link")
                    .attr("href", instURL + instruction.id)
                    .html(instruction.text)
                )
            );
        });
    }
    if (interlinkData.images) {
        interlinkData.images.forEach(image => {
            $("#" + interlinkId).append(
                $("<li>").append(
                    $("<a>").addClass("link")
                    .attr("href", imagURL + image.id)
                    .html(image.text)
                )
            );
        });
    }
}


function widthCheck() {
    if (window.innerWidth >= 1575) {
        showSideNav('robo-nav');
    } else {
        hideSideNav('robo-nav');
    }
}

$(document).keydown(function(e) {
    if (overlayActive) {
        if (e.key === "Escape") {
            hideImageOverlay();
        } else if (e.key === "ArrowRight") {
            plusSlides(1);
        } else if (e.key === "ArrowLeft") {
            plusSlides(-1);
        }
    }
});

// let navDynamicWidth = 0;
// $('#main-nav').find('.nav-link').each(function() {
//     navDynamicWidth += $(this).width()
// });

// $('#main-nav').find('.spacer').each(function() {
//     navDynamicWidth += $(this).width()
// });

// // console.log(navDynamicWidth);
// $('html').css('--nav-dynamic-width', navDynamicWidth + 'px');

function menuHider(e) {
    const clicked = $(e.target);

    //Hide sidenav if clicked outside of.
    if (window.innerWidth <= 1010 && !e.target.className.includes('sidenav') && clicked.parents('.sidenav').length == 0 && clicked.parents('.sidenav-toggle').length == 0) {
        hideSideNav('robo-nav');
    }

    //Hide main nav if clicked outside of.
    if ((e.target.className != 'header') && clicked.parents('.header').length == 0) {
        hideMainNav();
    }
}
window.addEventListener("click", menuHider);
window.addEventListener("touchStart", menuHider);

widthCheck();