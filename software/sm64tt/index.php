<!--Super Mario 64: Toad's Terror (Final Summative)
June 18th, 2018
By Owen and Kevin
This is the login page-->
<!DOCTYPE HTML>

 <?php
    session_start();//Access the global vars
    $_SESSION['login'] = false;//Login should be false when we're on the login page, right? Because we're not logged in?  
    $_SESSION['username'] = "";//No username yet
    $text = $_SESSION['message'];//Get the message var
    if ($text != "") {//If there is any message to display, show it
    	echo "<script>alert('$text');</script>";//by echoing some js code
    	$_SESSION['message'] = "";//and clear the message var
    }
?> 

<html lang="en">
	<head> 
		<title> 
			ICS4U Summative
		</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="shortcut icon" type="image/x-icon" href="img/favicon.ico">
		<link rel="stylesheet" type="text/css" href="css/style.css">
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
		<script src="http://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
		<script type="text/javascript" src="js/toad.js"></script>
	</head>
	<body>
		<canvas id="smoke-effect"></canvas>
		<div id="main">

			<div id="navbar" class="navbar">	
					<span style="font-size: 40px;">Log in</span>
			</div>

			<br>		

			<!--Main page content-->
			<div class="content" style="margin-top: 20%">				
				<div class="slide-container">
					<div class="wrapper" style="text-align:center">
				  		<span class="tab" id="leftTab" onclick="currentSlide(1)" style="width: 40%"><b>Log in</b></span> 
				  		<span class="tab" id="rightTab" onclick="currentSlide(2)" style="width: 40%"><b>Register</b></span> 
					</div>
					<div class="slide fade">
				        <div class="section">
				            <div class="container-fluid">
				                <div>	
					                		                	
									<form id='login' action='login.php' method='post' accept-charset='UTF-8'>
										<fieldset>
											<legend>Log in</legend>
											<label for='username'>Username:</label>
											<input type='text' name='username' maxlength="10" required>
											<nobr>
											<label for='password'>Password:</label>
											<input type='password' name='password' maxlength="20" required>
											<br>
											<br>
											<button type="submit" class="button2"><span>Submit</span></button>

										</fieldset>
									</form>
				                </div>
				            </div>
				        </div>
					</div>
					<div class="slide fade">
						<div class="section">
				            <div class="container-fluid">
				                <div>
									<form id='register' action='register.php' method='post' accept-charset='UTF-8'>
										<fieldset>
											<legend>Register</legend>
											<input type='hidden' name='submitted' id='submitted' value='1'>
											<label for='name' >Your Full Name: </label>
											<input type='text' name='name' maxlength="50" required>
											<br>
											<label for='email' >Email Address:</label>
											<input type='text' name='email' maxlength="50" required>
											<br>
											<label for='username' >Username:</label>
											<input type='text' name='username' maxlength="10" required>
											<br>
											<label for='password' >Password:</label>
											<input type='password' name='password' maxlength="20" required>
											<br>
											<br>
											<button type="submit" class="button2"><span>Submit</span></button>
										</fieldset>
									</form>
				                </div>
				            </div>
				        </div>
					</div>
				</div>
			</div>			

			<!--Standard footer for all pages, with some navigation buttons as well.-->
			<div class="specialFooter">
				<p> 					
					This page was last updated on <b>06/01/18 at 11:27</b>
				</p>
				<p>
					<a href="http://www.the404.nl/">the404</a> <img src="img/logofullinvert.png" width="30px"> © 2018
				</p>
			</div>
		</div>

		<script src="js/scripts.js"></script>
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