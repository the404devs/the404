<!--Mario 64 Quiz in PHP by Owen and Kevin
	Mr. Krnic
	March 2nd, 2018
	Backend code to mark the quiz and all that-->

<!DOCTYPE html>
<html lang="en">
	<head> 
		<title> 
			ICS4U Assignment #1 
		</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="shortcut icon" type="image/x-icon" href="images/favicon.ico">
		<link rel="stylesheet" type="text/css" href="css/style.css">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		<script src="http://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
		<script src="js/scripts.js"></script>
	</head>
	<body>
		<div>			
			<!--Bar with Mario running across the screen-->	
			<div id="navbar">
				<div class="scroll-right"> 
					<span>
						<img id="runImage" src="images/run/11.gif" height="50px">
					</span>
				</div>
				<script type="text/javascript">
					//This script block is to make the bar of running Marios stay at the top of the page.
					window.onscroll = function() {myFunction()};
					var navbar = document.getElementById("navbar");
					var sticky = navbar.offsetTop;

					function myFunction() {
					  if (window.pageYOffset >= sticky) {
					    navbar.classList.add("sticky")
					  } else {
					    navbar.classList.remove("sticky");
					  }
					}
				</script>
			</div>
			<br>
			<!--Main page content
				Look, php stuff!-->	
			<div class="content">
				<!--This PHP code works like this:
					Get the user's name from the first quiz page
					Check if there is a 'sessions' folder on the server
						(Make one if there isn't)
					Make a unique ID number, this is very important.
					Check if it's taken already, and if it is make a new one.
					Make a folder 'sessions/<ID number>'
					Save each of the user's answers into their own variable.
						Some answers contain text, so simplify them.
					Write all of those variables to a file called 'sessioninfo.txt'
						in their ID's directory.
					Echo out a message so the user knows everything went alright.
					More detailed explanations to follow.-->

				<?php 
					/*Get the user's first and last names*/
					$first = $_POST["txtFirst"];
					$last = $_POST["txtLast"];

					/*Check if a 'sessions' directory exists
					and make one if it does not*/
					if (!file_exists('sessions')) {
				    	mkdir('sessions', 0777, true);
					}	

					/*Generate a random session ID so that the user can view their results later*/
					$sessionID = rand(0 , 1000000);
					/*The while loop generates a random ID until it finds one that is avaliable*/
					while (file_exists("sessions/".$sessionID)==true) {
						$sessionID = rand(0 , 1000000);
					}
					/*Once an avaliable ID is found, create a directory for it*/
					mkdir("sessions/".$sessionID, 0777, true);

					/*Side note to the ID generating part:
					Since we just pick a number from 1 to 1000000, 
					there is a limit to how many unique sessions can be created.
					Supposedly if a million people took this quiz, we'd run into a problem,
					because this PHP script would become stuck in that while loop forever, because every possible idea is taken.
					Why didn't we make it more than a million?
					Well, how many times are you going to take the quiz, really?
					Since this problem won't really come to pass for a few centuries, we didn't worry too much about it, but what
					we would probably do to fix it would be a new block of code, executed when all 1000000 IDs are taken.
					It would identify the oldest session, and overwrite it.
					Solution number 2 is to just add a bunch of 0s to the line generating the ID*/
					

					/*Collect user's answers for multiple choice questions*/
					$q1 = $_POST["radQ1"];
					$q2 = $_POST["radQ2"];
					$q3 = $_POST["radQ3"];
					$q4 = $_POST["radQ4"];
					$q5 = $_POST["radQ5"];

					/*Collect user's answers for one-word answer questions*/
					/*Using string functions, we remove all of the spaces in each answer, so something like "Whomp's Fortress" would become "Whomp'sFortress"*/
					/*We also convert the entire string to lower case, turning it then into "whomp'sfortress"*/
					/*This will make marking the quiz much simpler later on.*/
					
					$q6 = str_replace(' ', '', strtolower($_POST["txtQ6"]));
					$q7 = str_replace(' ', '', strtolower($_POST["txtQ7"]));
					$q8 = str_replace(' ', '', strtolower($_POST["txtQ8"]));
					$q9 = str_replace(' ', '', strtolower($_POST["txtQ9"]));
					$q10 = str_replace(' ', '', strtolower($_POST["txtQ10"]));

					/*Collect the user's answers for the true/false questions*/
					$q11 = $_POST["radQ11"];
					$q12 = $_POST["radQ12"];
					$q13 = $_POST["radQ13"];
					
					/*Collect the user's answers for the true/false questons*/
					$q14 = str_replace(' ', '', strtolower($_POST["txtQ14"]));
					$q15 = str_replace(' ', '', strtolower($_POST["txtQ15"]));

					/*collect the user's answers for the matching questions*/
					$q16 = $_POST["selBoss1"];
					$q17 = $_POST["selBoss2"];
					$q18 = $_POST["selBoss3"];
					$q19 = $_POST["selBoss4"];
					$q20 = $_POST["selBoss5"];
					$q21 = $_POST["selBoss6"];
					$q22 = $_POST["selBoss7"];
					$q23 = $_POST["selBoss8"];
					$q24 = $_POST["selBoss9"];
					$q25 = $_POST["selBoss10"];
					$q26 = $_POST["selBoss11"];


					/*Save the user's answers and other info.
					They are written to a text file, separated by commas, sort fo like this:
					answer1,answer2,answer3,blah,blah,blah,
					When we mark the quiz, this makes it super easy to create an array from the contents of the file.*/
					file_put_contents("sessions/".$sessionID."/sessioninfo.txt", $sessionID.",".$first.",".$last.",".$q1.",".$q2.",".$q3.",".$q4.",".$q5.",".$q6.",".$q7.",".$q8.",".$q9.",".$q10.",".$q11.",".$q12.",".$q13.",".$q14.",".$q15.",".$q16.",".$q17.",".$q18.",".$q19.",".$q20.",".$q21.",".$q22.",".$q23.",".$q24.",".$q25.",".$q26.",\n");

					/*Message to tell the user they are all done.*/
					echo "Success!<br><br>Your ID number is:<br> <h2>$sessionID</h2><br>Remember this number!<br>Enter it on the 'Results' page to see how you did.<br><br>You can check your results at any time with this number.<br><br><a href='results.html'><button  class='qzbutton' width='25px'><span>Results </span></button></a>";	
				?>	
			</div>


			<!--Yes, this footer is a little bit special. 
			Slightly different behavior than a normal one, 
			just becuase this particular page doesn't have much content, 
			meaning the footer would actually be positioned mid-page, which looks stupid.
			That's why some other pages have a bunch of <br> tags after the main content.
			Here, though, it would need like a million, so we just made a special one.
			It behaves sort of like the running mario bar, hovering fixed at the bottom of the screen.-->
			<div class="specialFooter">
				<p> 
					This page was last updated on <b>02/28/18 at 10:44</b>
				</p>
				<div class="footerWrapper">
					<span class="footButton" style="font-size:30px;cursor:pointer;left: 0;" onclick="location.href = 'MarioHome.html';">🏠</span></a>
					<span class="footButton" style="font-size:30px;cursor:pointer;right: 25px;" onclick="location.href = 'help.html';"><i" class="fa fa-question-circle-o"></i></span></a>
				</div>				
			</div>
		</div>
	</body>
</html>
