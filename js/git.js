$.ajax({
    url: "https://api.github.com/users/the404devs/repos?sort=pushed&per_page=100",
    jsonp: true,
    method: "GET",
    dataType: "json",
    success: function(res) {
        // console.log(res);
        res.forEach(repo => {
            // console.log(repo.name)
            if (repo.name != "the404devs" && repo.name != "gg") {
                $("#git-container").append(
                    $("<div>").addClass("git-box").css("padding-top", "20px").css("padding-bottom", "20px").append(
                        $("<a>").addClass("post-head").addClass("link").css("cursor", "pointer").html(repo.name).attr("href", "https://www.github.com/the404devs/" + repo.name)
                    ).append(
                        $("<h4>").addClass("post-date").css("margin-bottom", "5px").html("Last Commit: " + repo.pushed_at.replace(/[^\d:-]/g, ' '))
                    ).append(
                        $("<p>").addClass("post-body").css("margin-top", "0").css("margin-bottom", "5px").html(repo.description)
                    ).append(
                        $("<a>").addClass("link").attr("href", repo.homepage).html(repo.homepage)
                    )
                );
            }
        })
    }
});