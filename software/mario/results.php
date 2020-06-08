<!--Mario 64 Quiz in PHP by Owen and Kevin
	Mr. Krnic
	March 2nd, 2018
	When the user enters their ID number, they are sent here.
	This php code loads their results that were saved in a directory 
	corresponding to their ID number, and checks if they were correct or not.-->

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
		<div id="fadeout">
			
			<!--Bar with Mario running across the screen-->	
			<div id="navbar">
				<div class="scroll-right"> 
					<span>
						<img id="runImage" src="images/run/6.gif" height="50px">
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
			<br>
			<br>
			<br>

			<!--Main page content
				More PHP code, this time we're gonna load up the seesionfo.txt file.
				Get the ID number the user gave us in results.html
					(If the ID doesn't actually exist, we show a message telling the user so)
				Create an array from the contents of 'sessions/<ID number>/sessioninfo.txt'
					Remember how the answers are separated by commas?
					Well, we use that to our advantage while creating this array.
				Cycle through each element of the array of user answers, and compare it to the array we made of the correct answers.
				When the answer is correct, we add 1 to the total number of correct answers.
				If it's wrong, we echo out a message, saying what question was wrong and what the right answer was.
				Echo out the user's score, we even calculate their percentage.
				Display a different image of MArio, depending on how well they did.-->
			<div class="content">
				<?php 
					/*Get the ID number the user inputted*/
					$id = $_POST["txtID"];

					/********************************
					*****CUSTOM MARKING FUNCTION*****
					********************************/

					function mark($id){
						/*Create an array that stores all of the correct answers.
						Safer than storing them in a text file and loading them in, 
						because if the user has taken Mr. Krnic's class they'd probably 
						know to try and look through the files to find the answers*/

						/*...well, at least that's what I would do anyways*/
						$rightAnswers = array('','','','B','C','A','B','D','mario','bowser','scuttlebug','eyerok','right','True','False','True','quick','star','1','3','8','2','7','10','6','4','12','5','13');
						
						//Get the contents of the file
						$fileText = file_get_contents("sessions/".$id."/sessioninfo.txt");
						
						//Explode it into an array, each element is an answer separated by a comma
						$userAnswers= explode(",", $fileText);
						
						//little greeting message for the user
						echo "<h2>Results for <u>$userAnswers[1] $userAnswers[2]:</u><br>";						
						echo "Session #$id<br><br>";

						//Set our variable to 0
						//This keeps track of how many answers the user got correct.
						$correctAnswersNum = 0;


						/*Loop! Cycle through the elements of the parallel arrays
						Notice the counter starts at 3. This is because the first 3 elements
						in the array are the ID number, and the user's first and last names.*/
						for ($i=3; $i < sizeof($rightAnswers); $i++) 
						{
							if ($userAnswers[$i]==$rightAnswers[$i]) {
								//if they got the right answer add 1 to the total
								$correctAnswersNum++;
							}
							else{
								echo 'You got question '.($i-2).' wrong. Correct answer was: '.$rightAnswers[$i].'<br>';
							}							
						}

						//Tell the user how many answers they got right
						echo "<br> In total, you got $correctAnswersNum answers correct, out of 26 questions.<br>";

						//Calculate their percentage, rounded up to the nearest interger.
						$percent = ceil(($correctAnswersNum/26)*100);
						echo "$correctAnswersNum/26 = $percent%";

						/*Show an image to represent how they did*/
						if($percent == 100){
							//if they got perfect, show mario showing some swag
							echo "<br><img src='images/100.gif'><br>Awesome!<br>You're a Mario master!<br>You must have 200 IQ<br>Shoutouts to Simpleflips";
						}
						elseif ($percent > 90) {
							//if they pretty good, show mario giving the peace sign
							echo "<br><img src='images/peace.gif'><br>Awesome!";
						}
						elseif ($percent > 75) {
							//if they did good show mario with sunglasses, he's not too happy
							echo "<br><img src='images/sunglasses.gif'><br>You can do better than that!";
						}
						elseif ($percent > 60) {
							//if they did kinda bad show mario looking pretty out of it
							echo "<br><img src='images/derp.png'><br>You can do better than that!";
						}
						elseif ($percent > 50) {
							//if they did bad show mario, who is speechless at how bad they did
							echo "<br><img src='images/broken.gif'><br>...<br>The image says it all.<br>Do better!";
						}
						elseif($percent == 0){
							//if they got 0, show mario at mcdonalds
							echo "<br><img src='images/mcmario.jpg' width=500px><br>Mario got a career change.";
						}
						else {
							//if they did brutal show a crying mario
							echo "<br><img src='images/cry.gif'><br>Good work, you made Mario cry!";
						}
					}
					
					/*******************************
					**********END FUNCTION**********
					********************************/




					/*******************************
					********CODE STARTS HERE********
					********************************/

					/*Check if the ID number the user gave us actually exists*/
					if (!file_exists('sessions/'.$id)) {
						/*ID doesn't exist*/
				    	echo "Invalid ID number";				    	
					}
					else{
						/*ID does exist, we can continue*/
						/*Call up our custom function, and give em a mark*/
						mark($id);
					}
					/*******************************
					************END CODE************
					********************************/
				 ?>
			</div>

			<!--The line breaks are back, giving us a nice clean look.-->
			<br>
			<br>
			<br>
			<br>
			<br>
			<br>
			<br>
			<br>
			<br>
			<br>
			<br>
			<br>
			<br>
			<br>
			<br>
			<br>

			<!--Same old footer, same old navigation buttons.-->
			<div class="footer">
				<p> 
					This page was last updated on <b>02/28/18 at 10:43</b>
				</p>
				<div class="footerWrapper">
					<span class="footButton" style="font-size:30px;cursor:pointer;left: 0;" onclick="location.href = 'MarioHome.html';">🏠</span></a>
					<span class="footButton" style="font-size:30px;cursor:pointer;right: 25px;" onclick="location.href = 'help.html';"><i" class="fa fa-question-circle-o"></i></span></a>
				</div>
			</div>
		</div>
	</body>
</html>