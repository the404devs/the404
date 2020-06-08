function randomRunner() {				
	var rand = Math.floor(Math.random() * 12)+1;
	console.log(rand);					
	document.getElementById("runImage").src = "images/run/"+rand+".gif";
}

$(document).ready(function() {
setInterval(function() {
		var oldrand = 11;
		var rand = Math.floor(Math.random() * 11)+1;
		while (rand==oldrand)
		{
			rand = Math.floor(Math.random() * 11)+1;
		}
		console.log(rand);					
		document.getElementById("runImage").src = "images/run/"+rand+".gif";
	}
	, 15000);
})

$(document).ready(function(e) {
setInterval(function() {
	
	var width = "+=" + ($(document).width()-100);
		$("#henry").animate({
		left: width
		}, 1000, function() {
		document.getElementById("henryImg").style.transform = "rotateY(180deg)";
		});
	var width = "-=" + ($(document).width()-100);
		$("#henry").animate({
		left: width
		}, 1000, function() {
		document.getElementById("henryImg").style.transform = "rotateY(0deg)";
		});
	})
});






