$.ajax({
    url: "https://api.github.com/users/the404devs/repos?sort=pushed&per_page=100",
    jsonp: true,
    method: "GET",
    dataType: "json",
    success: function(res) {
        // console.log(res);
        const container = $(".git-container")[0];
        const loader = $(container).children(".loader")[0];
        res.forEach(repo => {
            // console.log(repo.name)
            if (repo.name != "the404devs" && repo.name != "gg") {
                const title = $("<a>").addClass("post-head").addClass("link").html(repo.name).attr("href", "https://www.github.com/the404devs/" + repo.name);

                const date = $("<h4>").addClass("post-date").css("margin-bottom", "5px").html("Last Update: " + repo.pushed_at.replace(/[^\d:-]/g, ' '));

                const body = $("<p>").addClass("post-body").css("margin-top", "0").css("margin-bottom", "5px").html(repo.description);

                let link = (repo.homepage) ? $("<a>").addClass("repo-link").addClass("link").attr("href", repo.homepage).html(repo.homepage) : null;

                $(container).append(
                    $("<div>").addClass("git-box").append(
                        title
                    ).append(
                        date
                    ).append(
                        body  
                    ).append(
                        link
                    )
                );
            }
        });
        $(loader).fadeOut();
    }
});