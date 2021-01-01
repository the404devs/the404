<html lang="en">
	<head> 
		<title> 
			404 - Goodwin's Site 
		</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" type="text/css" href="css/sheet.css">
		<link rel="shortcut icon" type="image/x-icon" href="images/favicon.ico">
		<script src="js/nav.js"></script>
	</head>
	<body> 
		<span class="navopen" style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776;</span> 
		<div class="header">
			<h1>
				The404
			</h1> 
		</div>

		<div class="warning">
			<p>
				Ever wanted to know your IP address? No? Well, here it is anyways.
			</p>
		</div>

		<div id="navbox" class="sidenav">
			<a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>			
			<a href="index.html">🏠 Home</a>
		
			<a href="software.html">⇓ Software</a>

			<a href="editor">404Editor</a>
			
			<a href="development">Fun Stuff!</a>
			
			<a href="http://www.sdsscomputers.com/OwenGoodwin/index.html">ICS Site</a>
			
			<a href="ip.php">IP Tool</a>

			<a href="contact.html">Contact</a>
			
			<a href="about.html">About</a>			
		</div>
		<hr>
		<div class="content"> 
			<h2>
				Your IP is:
			</h2>
			<?php 
    			function getIp(){

        			$ip = $_SERVER['REMOTE_ADDR'];     
        			if($ip){
          			  if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
                			$ip = $_SERVER['HTTP_CLIENT_IP'];
            			} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
                			$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
            			}
            			return $ip;
        			}
        			// There might not be any data
        			return false;
    			}
    			echo getIp();
			?>
			<br>
		</div>
	
		<div class="footer">
			<p> 
				This page was last updated on <b>02/15/18 at 11:28</b>
			</p>
		</div>
	</body>
</html>



