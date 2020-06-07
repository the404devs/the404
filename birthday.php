<!DOCTYPE html>
<html>
	<head>
		<title>404 - Goodwin's Site</title>
		<!-- <meta name="theme-color" content="#800080"> -->
		<link rel="stylesheet" type="text/css" href="css/birthday.css">
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
		<link rel="shortcut icon" type="image/x-icon" href="img/faviconold.ico">
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
		<script type="text/javascript" src="js/html2canvas.min.js"></script>
		<script type="text/javascript" src="js/remove-branding.js"></script>
	</head>
	<body  onload="showPanes(1)">
		<div class="header">
			<h1 id="header-text">Welcome to 404!</h1>
			<!-- <div id="tab-wrapper" style="margin-top: 0px;">
				<span class="tab" id="tab1" onclick="showPanes(1)">Main</span>
				<br>
				<span class="tab" id="tab2" onclick="showPanes(2)">About</span>
				<br>
				<span class="tab" id="tab3" onclick="showPanes(3)">Software</span>
				<br>
			</div> -->
		</div>
		<br>
		<br>
		<div class="content">
			<hr>
			<div class="header2">
				<h2>This is Owen's 2-year-old site! STILL under maintenance, in case you're wondering.</h2>
			</div>
			<hr>
			<br>

			<div id="home" class="pane">
				<br>
				<a href="#" onclick="showPanes(1)">Home</a>
				<br>
				<a href="#" onclick="showPanes(3)">Software Downloads</a>
				<br>
				<a href="#" onclick="showPanes(2)">About</a>
				<br>
				<br>
				Your browser shouldn't be saying this site is malicious.... I sorted that problem out years ago, so don't worry, it's perfectly safe now!
				<br>
				<img src="img/spook.gif">

				<?php
					$dir = "blog-posts/*";

					// Open a known directory, and proceed to read its contents
					foreach(array_reverse(glob($dir)) as $file) 
					{
						// Read JSON file
						$json = file_get_contents($file);

						//Decode JSON
						$json_data = json_decode($json,true);
						foreach ($json_data as $key => $value) {
							echo "<hr class='inner-line'>
							<div class='post'>
								<h3 class='post-head'>".$json_data[$key]["Title"]."</h3>
								<h4 class='post-date'>".$json_data[$key]["Month"]."/".$json_data[$key]["Day"]."/".$json_data[$key]["Year"]."</h4>
								<p class='post-body'>".$json_data[$key]["Content"]."</p>
							</div>";
						}           
					}
				?>
			</div>
			<div id="about" class="pane">
				<br>
				<a href="#" onclick="showPanes(1)">Home</a>
				<br>
				<a href="#" onclick="showPanes(3)">Software Downloads</a>
				<br>
				<a href="#" onclick="showPanes(2)">About</a>
				<br>
				<br>
				<div class="row">
					<p>
						Welcome! I started the404 on January 18th, 2018. 
						This site has become my own little corner of the internet, 
						and hosts a variety of different projects I have worked on over the years.
					</p>					
				</div>
				<br>
				<div class="row">
					<div class="column">
						<h3>Get in touch!</h3>
						<button class="big-button button" id="twitter" onclick="location.href='https://twitter.com/the404devs'">
							<i class="fab fa-twitter"></i> @the404devs
						</button>
						<br>
						<button class="big-button button" id="email" onclick="location.href='mailto:the404devs@gmail.com'">
							<i class="fa fa-envelope"></i> the404devs@gmail.com
						</button>
						<br>
						<button class="big-button button" id="discord">
							<i class="fab fa-discord"></i> @the404devs#0810
						</button>
						<br>
						<button class="big-button button" id="github" onclick="location.href='https://github.com/the404devs'">
							<i class="fab fa-github"></i> the404devs
						</button>
						<br>
						<button class="big-button button" id="reddit" onclick="location.href='https://www.reddit.com/user/the404devs'">
							<i class="fab fa-reddit"></i> u/the404devs
						</button>
						<br>
						<br>
					</div>
			  		<div class="column">
						<h3>Send feedback here!</h3>
			  			<form action="contact.php" method="POST">
							<input type="email" name="return-address" placeholder="Your e-mail address" required>
							<br>
							<textarea name="emailContent" rows="14" cols="40" placeholder="Type your thoughts here..."></textarea>
							<br> 
							<br>
							<button type="submit" class="button"><span>Send!</span></button>
						</form>
			  		</div>      	        			
					<div class="column">
						<h3>The404 Archives!</h3>
						<button class="big-button button archive" onclick="location.href='old'">
						     <i class="fas fa-archive"></i> The404 v1 <label>(01/18/18 - 08/27/18)</label>
						</button>
						<br>
						<button class="big-button button archive" onclick="location.href='old2'">
						     <i class="fas fa-archive"></i> The404 v2 <label>(08/27/18 - 03/10/19)</label>
						</button>
						<br>
						<button class="big-button button archive" onclick="location.href='ics11'">
						     <i class="fas fa-archive"></i> ICS 11 <label>(2017)</label>
						</button>
						<br>
						<button class="big-button button archive" onclick="location.href='ics12'">
						     <i class="fas fa-archive"></i> ICS 12 <label>(2018)</label>
						</button>
						<br>
						<button class="big-button button archive" onclick="location.href='stuco/indexNEW.html'">
						     <i class="fas fa-archive"></i> Stuco <label>(2018)</label>
						</button>
						<br>
						<button class="big-button button archive" onclick="location.href='cps530'">
						     <i class="fas fa-archive"></i> CPS530 <label>(2019)</label>
						</button>
						<br>
						<br>
					</div>		            		
				</div>	
				<br>
			  	<div class="row">
			  		<div class="column" style="text-align: center;">
			  			<h3 class="creeper">The404 Minecraft Server</h3>
			  			<h4 class="creeper">mc.the404.nl - v1.15.1</h4>
			  			<div id="rest"></div>
			  		</div>
			  	</div>		
				<br>
				<div class="blob">
					<label>Site updated 01/12/20 11:54</label>
					<br>
					<label id="404time"></label>
				</div>	            	
				
				<script>
					var e = new Date(2018, 0, 18, 18, 45);
					var d = new Date();
					var dif = (d.getTime() - e.getTime())/1000;

					document.getElementById("404time").innerHTML = dif;
					var time = setInterval(timer, 1000);
					function timer() {
						d = new Date();
						dif = Math.round((d.getTime() - e.getTime())/1000);
						document.getElementById("404time").innerHTML = dif;
					}
				</script>
			</div>
			<div id="software" class="pane">
				<br>
				<a href="#" onclick="showPanes(1)">Home</a>
				<br>
				<a href="#" onclick="showPanes(3)">Software Downloads</a>
				<br>
				<a href="#" onclick="showPanes(2)">About</a>
				<br>
				<br>
			     <?php
					$dir = "software/*";

					// Open a known directory, and proceed to read its contents
					foreach(glob($dir) as $file) 
					{
						// Read JSON file
						$json = file_get_contents($file);

						//Decode JSON
						$json_data = json_decode($json,true);
						foreach ($json_data as $key => $value) {
							echo "<div class='blob'>
								<h2>".$json_data[$key]["Name"]."</h2>";
								if ($json_data[$key]["Image"]){
									echo "<img src=".$json_data[$key]["Image"]." width='100px'>";
								}
								echo "<ul>
									<li><b>Version:</b> ".$json_data[$key]["Version"]."</li>
									<li><b>Release Date:</b> ".$json_data[$key]["Release"]."</li>
									<li><b>Last Update:</b> ".$json_data[$key]["Current"]."</li>
									<li><b>Language:</b> ".str_replace(",", ", ",str_replace( array('[',']','"'), '' , json_encode($json_data[$key]["Language"]))) ."</li>
									<li><b>Category:</b> ".str_replace(",", ", ",str_replace( array('[',']','"'), '' , json_encode($json_data[$key]["Category"]))) ."</li>
								</ul>
								<p>".$json_data[$key]["Description"]."</p>
								<a href=".$json_data[$key]["Button1Link"]." class='downloadlink'><button class='button'><span>".$json_data[$key]["Button1Text"]."</span></button></a>";
								if ($json_data[$key]["Button2Text"]) {
									echo "<a href=".$json_data[$key]["Button2Link"]." class='downloadlink'><button class='button'><span>".$json_data[$key]["Button2Text"]."</span></button></a>";
								}
							echo "</div>";
						}           
					}
				?>
			</div>
		</div>
		<div><!-- This is a debug div. Pay it no mind. --></div>
		<script type="text/javascript" src="js/app.js"></script>
		<script type="text/javascript" src="js/mc.js"></script>
		<script type="text/javascript" src="js/html2canvas.min.js"></script>
		<script type="text/javascript" src="js/remove-branding.js"></script>
	</body>
</html>