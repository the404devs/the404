$.ajax({
    url: "https://api.github.com/users/the404devs/repos?per_page=1000",
    jsonp: true,
    method: "GET",
    dataType: "json",
    success: function(res) {
        console.log(res);
        res.forEach(repo => {
            console.log(repo.name)
            $(".content").append(
                $("<div>").addClass("post").css("padding-top", "20px").css("padding-bottom", "20px").append(
                    $("<a>").addClass("post-head").addClass("link").css("cursor", "pointer").html(repo.name).attr("href", "https://www.github.com/the404devs/" + repo.name)
                ).append(
                    $("<h4>").addClass("post-date").css("margin-bottom", "5px").html("Last Commit: " + repo.pushed_at.replace(/[^\d:-]/g, ' '))
                ).append(
                    $("<p>").addClass("post-body").css("margin-top", "0").css("margin-bottom", "5px").html(repo.description)
                ).append(
                    $("<a>").addClass("link").attr("href", repo.homepage).html(repo.homepage)
                )
            );
        })
    }
});