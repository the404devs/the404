<!DOCTYPE html>
<html>
	<head>
		<title>404 - Goodwin's Site</title>
		<link rel="stylesheet" type="text/css" href="css/style.css">
	</head>
	<body>
		<div class="header">
			<h1>
				www.the404.nl
			</h1> 
		</div>
		<div class="content">
			<div class="slide-container">
				<div class="wrapper" style="text-align:center">
					<span class="tab" onclick="currentSlide(1)"><b>Main</b></span>
					<span class="tab" onclick="currentSlide(2)"><b>Software & Development</b></span>
					<span class="tab" onclick="currentSlide(3)"><b>404Editor - Online Code Editor</b></span>
					<span class="tab" onclick="currentSlide(4)"><b>Contact</b></span>
				</div>
				<div class="slide fade">
			        <div class="section">
			            <div class="container-fluid">
			            	<p>1</p>	                
			            </div>
			        </div>
	  				<br>
				</div>
				<div class="slide fade">
			        <div class="section">
			            <div class="container-fluid">
			            	<p>2</p>				                
			            </div>
			        </div>
	  				<br>
				</div>
				<div class="slide fade">
			        <div class="section">
			            <div class="container-fluid">
			            	<p>404Editor was something I came up with in May 2018 out of a need to work on something other than our current CS assignment (Crazy 8s, go check it out). It is an "intuitive" text editor with syntax highlighting for various languages. Its key component is its collaborative nature, allowing multiple users to work on the same thing at the same time from any device. It has been described (by myself, to someone who doesn't understand computers that well) as a Google Docs for code. You can also set a password when creating a workspace, but its not required. Anyone wishing to work in someone's workspace will need to know the workspace name, as well as the password, if there is one.<br><br>On a side note, don't ever type on the same line as somebody else unless you want to destroy all of your hard work. Crazy stuff happens, and I haven't really figured out how to fix it yet.</p>
			            	<br>
			            	<br>
			            	<a href="editor"><button><span class="button2">Go to 404Editor</span></button></a>
			            	<p><a href="editor" style="color: black">go to the editor</a></p>			                
			            </div>
			        </div>
	  				<br>
				</div>
				<div class="slide fade">
			        <div class="section">
			            <div class="container-fluid">	
			            	<p>4</p>	                
			            </div>
			        </div>
	  				<br>
				</div>
			</div>
		</div>

		<script type="text/javascript">
			var slideIndex = 1;
			showSlides(slideIndex);

			// Next/previous controls
			function plusSlides(n) {
			  showSlides(slideIndex += n);
			}

			// tabs controls
			function currentSlide(n) {
			  showSlides(slideIndex = n);
			}

			function showSlides(n) {
			  var i;
			  var slides = document.getElementsByClassName("slide");
			  var tabs = document.getElementsByClassName("tab");
			  if (n > slides.length) {slideIndex = 1;}
			  if (n < 1) {slideIndex = slides.length;}
			  for (i = 0; i < slides.length; i++) {
			      slides[i].style.display = "none"; 
			  }
			  for (i = 0; i < tabs.length; i++) {
			      tabs[i].className = tabs[i].className.replace(" active", "");
			  }
			  slides[slideIndex-1].style.display = "block"; 
			  tabs[slideIndex-1].className += " active";
			}
		</script>
	</body>
</html>