<!--Super Mario 64: Toad's Terror (Final Summative)
June 18th, 2018
By Owen and Kevin
This is the homepage for our game.
Our final project for 2018. It was lots of fun, and we used pretty much everything we learned this year.-->

<!DOCTYPE HTML> 
<?php
	session_start();//Access global vars
	if ($_SESSION['login'] != true) {//If they're not logged in, they can't view this page!
		$_SESSION['message'] = "You must log in first!";//tell them off
        // header('LOCATION:index.php'); //send them to the login form\
        echo "<script>location.href='index.php'</script>";
	}
	else{
		$text = $_SESSION['message'];//get any message there is to show
	    if ($text != "") {//if there's a message
	    	echo "<script>alert('$text');</script>";//show it
	    	$_SESSION['message'] = "";//and clear the message var
	    }
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
	</head>
	<body>
		<canvas id="smoke-effect"></canvas>
		<div id="main">
			<!--Header div, this is the first thing the user sees.-->
			<br>
			<div class="header">
				<br>
				<img src="img/title.png" width="75%"> 				
			</div>
			<br>

			<!--Bar with Mario running across the screen-->	
			<div id="navbar" class="navbar">				
				<div class="navWrapper">
					<div id="popcan1" onmouseenter="document.getElementById('popup1').style.visibility = 'visible';" onmouseleave="document.getElementById('popup1').style.visibility = 'hidden'">
						<span class="navButton" style="font-size:30px;cursor:pointer;left: 0px;" onclick="location.href = 'logout.php';"><i class="fas fa-sign-out-alt"></i></span>
						<span class="popup" id="popup1">Log Out</span>
					</div>
					<div id="popcan2" onmouseenter="document.getElementById('popup2').style.visibility = 'visible';" onmouseleave="document.getElementById('popup2').style.visibility = 'hidden'">
						<span class="navButton" style="font-size:30px;cursor:pointer;left: 70px;" onclick="location.href = 'index2.php';"><i class="fa fa-home"></i></span>
						<span class="popup" id="popup2">Home</span>
					</div>
					<div id="popcan3" onmouseenter="document.getElementById('popup3').style.visibility = 'visible';" onmouseleave="document.getElementById('popup3').style.visibility = 'hidden'">
						<span class="navButton" style="font-size:30px;cursor:pointer;left: 140px;" onclick="document.getElementById('highscorebox').style.display = 'block'"><i class="fas fa-stopwatch"></i></span>
						<span class="popup" id="popup3">Leaderboard</span>
					</div>
					<div id="popcan4" onmouseenter="document.getElementById('popup4').style.visibility = 'visible';" onmouseleave="document.getElementById('popup4').style.visibility = 'hidden'">
						<span class="navButton" style="font-size:30px;cursor:pointer;left: 210px;" onclick="alert('toad toad toad toad toad toad');toadify();"><i class="fa fa-skull"></i></span>
						<span class="popup" id="popup4">?</span>
					</div>
					<?php 
						echo "<span id='userhead'>Hello, ".$_SESSION['username']."</span>";//We show the user's name in the top right
					?>					
				</div>
			</div>
			<br>
			<!--Main page content-->
			<div class="content">
				<div class="slide-container">
					<div class="wrapper" style="text-align:center">
				  		<span class="tab" id="leftTab" onclick="currentSlide(1)"><b>Overview</b></span> 
				  		<span class="tab" id="rightTab" onclick="currentSlide(2)"><b>Stage 0</b></span> 
				  		<span class="tab" id="rightTab" onclick="currentSlide(3)"><b>Stage 1</b></span>
				  		<span class="tab" id="rightTab" onclick="currentSlide(4)"><b>Stage 2</b></span>
				  		<span class="tab" id="rightTab" onclick="currentSlide(5)"><b>Stage 3</b></span>
				  		<span class="tab" id="rightTab" onclick="currentSlide(6)"><b>Stage 4</b></span>
				  		<span class="tab" id="rightTab" onclick="currentSlide(7)"><b>Stage 5</b></span>
				  		<span class="tab" id="rightTab" onclick="currentSlide(8)"><b>Stage 6</b></span>
				  		<span class="tab" id="rightTab" onclick="currentSlide(9)"><b>Download</b></span>
					</div>
					<div class="slide fade">
				        <div class="section">
				            <div class="container-fluid">
				                <div>
				                	<h2>Mario's back!</h2>
									<h3>and Toad has taken control</h3>
									<hr>
									<img src="img/castle.png" width="20%">
									<br>
									<br>
									<p>
										Super Mario 64: Toad's Terror is a text-based horror adventure game that will send shivers down your spine. Players will follow their own path through the story in order to defeat the monster that is Toad, or descend into madness trying.
									</p> 
									<br>
									<p>
										Super Mario 64: Toad's Terror is no Baldi's Basics. We make our sprites in Word, not Paint. SM64TT will have HD 4K 60fps graphics that will blow your mind.
									</p>
				                </div>
				            </div>
				        </div>
		  				<br>
					</div>
					<div class="slide fade">
						<div class="section">
				            <div class="container-fluid">
				                <div>
				                	<br>
				                	<p>
										In this course, we’ve expanded our collection of tools used to program. We learned the societal issues involving computer technology. This involves things like privacy, security, and ethical use of information. We learned 2 new programming languages, Java and PHP. We learned how to create and use algorithms in our code. And lastly, we learned how to use Object Oriented Programming to organize and compact our code.
									</p>
									<h2>
										Mario Quiz (Unit 1)
									</h2>
									<p>
										Using php, we were reminded of the basics of coding and were taught new content related to the new language, used for server-side scripting.
									</p>
									<h2>
										Connect 4 (Unit 3)
									</h2>
									<p>
										Using Java, we learned how to use 2D arrays and apply them to create a game of Connect 4 in the Java console.
									</p>
									<h2>
										Waluigi's Taco Stand (Unit 3 part 2)
									</h2>
									<p>
										Using Java, we learned how to use algorithms in our project to create a game of our choice, so we made the best thing we could think of.
									</p>
									<h2>
										Crazy 8's (Unit 4)
									</h2>
									<p>
										We learned how to use Object Oriented Programming to our advantage to create a game of Crazy 8s. It was crazy.
									</p>
									<h2>
										Summative
									</h2>
									<p>
										The point of this summative project is to combine everything that we have learned this course and test our skill. 
									</p>
				                </div>
				            </div>
				        </div>
		  				<br>
					</div>
					<div class="slide fade">
						<div class="section">
				            <div class="container-fluid">
				                <div>
				                	<br>
				                	<div class="row">
										<div class="column"><img src="img/kevin.png"><br>Kevin is the lead writer and graphic designer.</div>
										<div class="column"><img src="img/owen.png"><br>Owen is the lead programmer.</div>				
									</div>
									<br>
				                	<a href="video.pptx"><button class="button"><span>Promo Video</span></button></a>
				                </div>
				            </div>
				        </div>
		  				<br>
					</div>
					<div class="slide fade">
						<div class="section">
				            <div class="container-fluid">
				                <div>
				                	<br>
				                	<img src="img/drakeboo.jpg" width="25%">
				                	<h2>A little more detail about the game...</h2>
				                	<div style="text-align: left; border-radius: 4px; padding: 10px;background-color:  rgba(255,0,0,0.3); font-family: 'roboto'; font-size: 20px;">As a text-based game, story and narration will be essential elements in the finished product. As of now, we expect the game to utilize a Player class, a StoryEvent class, an Inventory class, an Item class, a Diary class, and a DiaryPage class. 
				                	<br><br>
				                	The Player class will contain the player's name as well as score/time data (to be determined).
				                	<br><br>
				                	The StoryEvent class will be a basic template, copies of which will be used to display each event in the story. The class will have a large string, holding the narration/dialog for that event as well as the options the player has at that point in the game. It will also have two Image objects, one for the large image showing the situation the player is in and one for an image of whomever is speaking (Think ICS Sim 2017 style dialog). Since the player will likely be presented with many options, the StoryEvent class needs a variable to hold the 'correct' option so we know if the user is on the right path. The game will likely be very linear, with only one path the user can take to victory, and multiple wrong choices will cause the player to die.
				                	There will be different types of StoryEvents, ones where the player must choose where to go or what to do, and ones where the player must use an item from their inventory. StoryClass objects will have an int representing it's "chapter," so that as users progress throughout the story, they can see what chapter they are on. This will serve as an indicator of progress.
				                	<br><br>
				                	The Inventory class will extend ArrayList in order to be able to add/remove the Items the player collects. Players can access their inventory at any time. The Item class will contain the name of the item, path to the image of the item, and a short description of the item. A button will be present in the game window to open the inventory window, which will display the images and descriptions of each item in the player's inventory. Items will be collected by the player, and will become essential to the player's quest, meaning that if the player does not collect an item, they will find that eventually they will no longer be able to proceed. 
				                	<br><br>
				                	The Diary class will be a child of the Inventory, and it will hold all of the DiaryPages the user collects. Unlike Items, DiaryPages are not essential to the quest and cannot be dropped/used once collected. DiaryPages will contain clues and serve a purpose to provide more in-depth story. The user will be able to search diary pages for certain keywords (using binary search algorithm, think of a ctrl+f type thing) to uncover hints at what the user must do. Another variety of DiaryPages will be present, where instead of having a String containing all of the text, they will simply have an image. Both types will have a number corresponding to their page number in the diary, and the Diary will have a private method to sort the pages in order of their page number whenever a new one is collected. The Diary can be looked at anytime the user wishes, in a manner similar to the inventory.
				                	</div>
				                	<hr>
				                	<h2>How are we going to apply everything we've learned?</h2>
				                	<p>That's a good question! We've got it all planned out, mostly.</p>
				                	<button class="accordion button2" style="height: 50px; width: 100%; text-align: left;"><span>View information about the things the game will implement...</span></button>				                	
				                	<div class="panel" style="font-family: 'roboto'; font-size: 18px; text-align: left; z-index: 1000001">
				                		<h2>HTML/CSS</h2>
				                		<p>Well, you're looking at it! There's really not much more to say. Websites don't look this good naturally, you know.</p>
				                		<hr>
				                		<h2>PHP</h2>
				                		<p>A whole lot of PHP runs under the hood of this website. PHP is used to register a new user, log a user into the site, kick out users who try to access content without logging in, load top times from the server, and add and sort new times.</p>
				                		<br>
				                		<button class="button2" style="margin: 10px 10px; width: 30%" onclick="document.getElementById('phpmodal').style.display = 'block'"><span>Open PHP info</span></button>
				                		<hr>
				                		<h2>File IO</h2>
				                		<p>File IO is used by our PHP scripts to match the given username and password to those in our database, as well as add the information of a new user. Speedrun times are saved in a file on the server, so File IO is used to read and write to it when users wish to add their times.</p>
				                		<hr>
				                		<h2>Recursion</h2>
				                		<h3>Recursion</h3>
				                		<h4>Recursion</h4>
				                		<h5>Recursion</h5>
				                		<h6>Recursion</h6>
				                		<h5>Recursion</h5>
				                		<h4>Recursion</h4>
				                		<h3>Recursion</h3>
				                		<h2>Recursion</h2>
				                		<p>Each StoryEvent object has a function to display their narration, as well as the player's next options. Another function will be made to accept the user's input. If the player inputs an invalid option, the function will be made recursive to simply accept another input until the input is valid.</p>
				                		<hr>
				                		<h2>Binary Search</h2>
				                		<p>Binary search will come in handy when the user is given the option to scan the diary pages they collect throughout the game for clues or hints. The user will input a word, and the program will use binary search to look for that word in the content of the diary page. Binary search is also used in the login system, to find the inputted username in our database, as well as to ensure that new users don't choose a name that is already taken.</p>
				                		<hr>
				                		<h2>Sorting</h2>
				                		<p>Bubble sorting is used in the online leaderboard to sort the times from fastest to slowest. The game itself will use sorting to put the collected diary pages in order by page number. Sorting may also be used for a local high score system.</p>
				                		<hr>
				                		<h2>Immutability</h2>
				                		<p>Certain strings in the game can be made immutable, like the player's name. Story text won't be changed during the course of the game either, so it can remain immutable as well.</p>
				                		<hr>
				                		<h2>Visibility Modifiers</h2>
				                		<p>Most class members will be private because there is no need for state variables to be modified outside of their class. In some circumstances, visibility may be elevated, similar to the Player's hand in Crazy 8s.</p>
				                		<hr>
				                		<h2>Overridden Methods</h2>
				                		<p>Child classes such as Diary and DiaryPage will override some of their parent methods, since their behavior is slightly different. DiaryPages cannot be removed or used like normal Items, and Diary will have no method of removal. DiaryPage will have different methods than Item, because their content can be viewed by the user.</p>
				                		<hr>
				                		<h2>Multiple Constructors</h2>
				                		<p>DiaryPage will have two methods of being constructed, one with a String for the text, and one with an Image object for those pages with drawings instead of words. Pages with images would not the searchable. Both types of page would also take an int in their constructor to represent their page number.</p>
				                		<hr>
				                		<h2>Overloaded Methods</h2>
				                		<p>Functions to use an item, where some items can be used multiple times. In most cases, items are single use, but some items can be reused in multiple instances, so we can have another item use function that takes both the item to be used and the amount of times it can be reused.</p>
				                		<hr>
				                		<h2>Access Methods</h2>
				                		<p>Since we make use of classes extending ArrayList, we will need access methods to use the inherited methods. Access methods will also be used to do operations with state variables of Items and such which have private visibility. With access methods, we can avoid direct manipulation of each object's state variables.</p>
				                		<hr>
				                		<h2>Polymorphism</h2>
				                		<p>DiaryPages are children of Items, and are acquired in the same way, therefore since a DiaryPage is a Item, we can add it to the player's inventory in the same way and not create a whole new method of collecting diary pages.</p>
				                		<hr>
				                		<h2>Encapsulation</h2>
				                		<p>We will strive to keep the scope of variables as narrow as possible, as we have had memory issues in previous projects (ICS Sim 2017 flashbacks). We will avoid global variables as often as possible, but some objects like the player's inventory will need to be public.</p>
				                		<hr>
				                		<h2>Inheritance</h2>
				                		<p>The Inventory Class is where all of the player's collected Items are stored. It will be a child of Java's ArrayList. The Diary class will be a child of Inventory, and will be optimized to hold on the DiaryPage objects the player can collect throughout the story.</p>
				                		<hr>
				                		<h2>Constants</h2>
				                		<p>Most story events are unique, but there are a few that will be used it multiple places, such as "You died!" and "You can't go to that area!" events. These can be made constant.</p>
				                		<hr>
				                		<h2>Static Members</h2>
				                		<p>The StoryEvent and Item classes may have some static members used when initializing the class. Each particular item has a unique purpose and is usually essential to progressing in the story. StoryEvents will be numerous, there will be one for each narration-decision the player makes.</p>
				                	</div>	
				                	<hr>
				                	<h2>The Design Phase</h2>	
				                	<p>Otherwise known as coding in your head.</p>	
				                	<br>
				                	<button class="accordion button2" style="height: 50px; width: 100%; text-align: left;"><span>View design sketches and other info...</span></button>	
				                	<div class="panel" style="font-family: 'roboto'; font-size: 18px; text-align: left; z-index: 1000001">
				                		<h2>Website sketches</h2>
				                		<br>
				                		<img src="img/login.jpg" width="60%">
				                		<br>
				                		<p>Rough design for the login page.</p>
				                		<br>
				                		<img src="img/index.jpg" width="60%">
				                		<br>
				                		<p>Rough design for the homepage.</p>
				                		<br>
				                		<img src="img/modal.jpg" width="60%">
				                		<br>
				                		<p>Rough design for the speedrun times modal box.</p>
				                		<hr>
				                		<h2>Rough Game Window Design</h2>
				                		<br>
				                		<img src="img/gui.jpg" width="40%">
				                		<img src="img/window.png" width="40%">
				                	</div>
				                </div>
				            </div>
				        </div>
		  				<br>
					</div>
					<div class="slide fade">
						<div class="section">
				            <div class="container-fluid">
				                <div>
				                	<img src="img/931.png">
				                	<br>
				                	<img src="img/mario.png" class="mario">
				                	<br>
				                	<h2>Prototype</h2>
				                	<p>Our progress so far.</p>
				                	<br>
				                	<p>UPDATE: I FIXED IT, I FORGOT TO ADD THE FILE THE GAME LOADS THE STORY FROM. WHOOPS</p>
				                	<button class="button2" onclick="location.href='game/sm64tt_proto.exe'"><span>Download</span></button>
				                </div>
				            </div>
				        </div>
		  				<br>
					</div>
					<div class="slide fade">
						<div class="section">
				            <div class="container-fluid">
				                <div>
				                	<h2>Super cool video!</h2>
				                	<video style="z-index: 999999999" controls>
				                		<source src="vid/video.mp4" type="video/mp4">
				                	</video>
				                	<br>
				                	<p>Sorry for the horrible quality. We made up for it with good music.</p>
				                </div>
				            </div>
				        </div>
		  				<br>
					</div>
					<div class="slide fade">
						<div class="section">
				            <div class="container-fluid">
				                <div>				                	
				                	<h2>Beta Version</h2>
				                	<p>Almost done!</p>
				                	<br>			                	
				                	<button class="button2" onclick="location.href='game/sm64tt_beta.zip'" style="width: 200px;"><span>Download (.zip)</span></button>
				                	<button class="button2" onclick="location.href='game/sm64tt_beta.txt'" style="width: 200px;"><span>Download (.txt)</span></button>
				                </div>
				            </div>
				        </div> 
		  				<br>
					</div>
					<div class="slide fade">
						<div class="section">
				            <div class="container-fluid">
				                <div>				                	
				                	<h2>How did we implement everything we said we would?</h2>
				                	<p>That's a good question! We managed to, mostly.</p>
				                	<button class="accordion button2" style="height: 50px; width: 100%; text-align: left;"><span>View information about the things the game actually implemented...</span></button>				                	
				                	<div class="panel" style="font-family: 'roboto'; font-size: 18px; text-align: left; z-index: 1000001">
				                		<h2>HTML/CSS</h2>
				                		<p>COMPLETED: Hahahaha. We couldn't have made this website without HTML and CSS. Designing this site, I've actually come up with a few ideas for my own website. Look at that, we're learning things!</p>
				                		<hr>
				                		<h2>PHP</h2>
				                		<p>COMPLETED: We got a bunch of PHP in this site, and we managed to get that binary search working (try registering with a username that's already taken), so props to us for that. <br>We made a whole chart explaining our PHP code in Stage 2, but here it is again if you want it.</p>
				                		<br>
				                		<button class="button2" style="margin: 10px 10px; width: 30%" onclick="document.getElementById('phpmodal').style.display = 'block'"><span>Open PHP info</span></button>
				                		<br>
				                		<p>We got all of our PHP goals accomplished, hooray!</p>
				                		<hr>
				                		<h2>File IO</h2>
				                		<p>COMPLETED: Oh boy.<br>This game wouldn't work without file IO. In addition to it's uses in our PHP code (see stage 2), we use file IO to load in all story data to the game (there's a file called story.txt, open it and you'll see what I mean). Each line in the file contains the information for that particular StoryEvent. Most of the work was actually done making the story, the code was the easy part. We didn't expect that.</p>
				                		<hr>
				                		<h2>Recursion</h2>
				                		<h3>Recursion</h3>
				                		<h4>Recursion</h4>
				                		<h5>Recursion</h5>
				                		<h6>Recursion</h6>
				                		<h5>Recursion</h5>
				                		<h4>Recursion</h4>
				                		<h3>Recursion</h3>
				                		<h2>Recursion + Binary Search</h2>
				                		<p>COMPLETED: This is our wombo-combo. Our binary search function in our PHP code is recursive.<br><br>NOT COMPLETED: We didn't end up making any of the StoryEvent methods recursive, though, it didn't really make sense to.</p>			               
				                		<hr>
				                		<h2>Sorting</h2>
				                		<p>COMPLETED: We have bubble sorting in our game to put the various diary pages the player collects in order by page number. This is helpful because the diary pages aren't mandatory to collect, so you could collect #3, #6 and #7 and they would still be in order.<br>There's also the bubble sorting we use for our leaderboard system here, as mentioned back in stage 2.</p>
				                		<hr>
				                		<h2>Immutability</h2>
				                		<p>COMPLETED: Like we said we would, we made  strings like the player's name and some hard-coded story events at the beginning and end of the game immutable.<br><br>NOT COMPLETED: There's not that much of it.</p>
				                		<hr>
				                		<h2>Visibility Modifiers</h2>
				                		<p>COMPLETED: Most class members are private, requiring access methods, but there was one instance where the Diary window (a member of the main window) was made public and static, so it was not found in individual Window objects, and was referenced through the Window class (Window.DiaryView).<br><br>BONUS: We managed to not have a whole bunch of public static variables at the top of our game class for the first time ever. I guess OOP is working.</p>
				                		<hr>
				                		<h2>Overridden Methods</h2>
				                		<p>COMPLETED: The classes Diary and Inventory both inherit from ArrayList, and we override the add() and size() methods of them.</p>
				                		<hr>
				                		<h2>Multiple Constructors</h2>
				                		<p>COMPLETED: There are 3 different constructors for StoryEvent<br>1. Normal info<br>2. Normal info + int (for when we get a diary page)<br>3. Normal info + boolean + string (For when we get an item (true), or need an item (false))<br>These different constructors made writing the story.txt file a lot easier.<br><br>NOT COMPLETED: Remember what we said about DiaryPages having multiple constructors? that was a lie, we changed our minds about how DiaryPages would work.</p>
				                		<hr>
				                		<h2>Overloaded Methods</h2>
				                		<p>NOT COMPLETED: What we said about being able to use items multiple times never came to be implemented, and the item system we had in mind proved a little to complex for the type of game we were making, so we had to scrap most of it. There are 2 items in the game, neither are mandatory to beating the game.</p>
				                		<hr>
				                		<h2>Access Methods</h2>
				                		<p>COMPLETED: Since all of the members are private, all of the ones that change overtime need an access method. We're not really gonna explain all of them, but for example there are access methods to change the text/image in the Window components, because those change very frequently.</p>
				                		<hr>
				                		<h2>Polymorphism</h2>
				                		<p>COMPLETED: Like we said in stage 2, DiaryPages are subclasses of Items, so we can treat them both in the same manner. If only we hadn't scrapped the item system.</p>
				                		<hr>
				                		<h2>Encapsulation</h2>
				                		<p>COMPLETED: Keeping the scope of variables as narrow as possible was the name of the game, and we beat that game. We were very careful about our variables, and when to instantiate new objects. Keeping the amount of garbage low was our goal while making this game, and I think we did it pretty well.</p>
				                		<hr>
				                		<h2>Inheritance</h2>
				                		<p>COMPLETED: Inventory and Diary inherit from ArrayList, storing Items and DiaryPages. Window and DiaryView extend JFrame. That's some good inheritance right there.<br><br>SLIGHTLY CHANGED: Diary was originally planned to inherit from Inventory, but it proved wiser to keep them apart because the purpose of Diary shifted a bit from what we first planned. Diary required too many methods and variables that Inventory didn't, and it wouldn't have been logical for it to inherit from Inventory.</p>
				                		<hr>
				                		<h2>Constants</h2>
				                		<p>COMPLETED: In the DiaryView window, the player can scroll through the collected DiaryPages, and we use variables to keep track of the current index the player is viewing, the minimum index, and the maximum index. The maximum index changes depending on how many pages they have collected, but the minimum index won't ever change. That's why it's constant.<br>The Scream class (you read that right) has a String representing the path to the audio file, which never changes and so is constant.</p>
				                		<hr>
				                		<h2>Static Members</h2>
				                		<p>COMPLETED: As mentioned somewhere above, the DiaryView object is made to be a static member of the Window class, so there is only one of them.<br>We also use static members in the Window and DiaryView classes in the form of a couple objects used to load a font from a file. This font object is used in creating the objects, and aren't needed within the object.</p>
				                		<hr>
				                		<p>Why aren't you seeing a lot of "NOT COMPLETED"?<br>Well we've actually managed to meet most of our expectations for this game. Compared to last year's final, this one seems like a breeze, because we didn't try and go too big and end up in over our heads. About 90% of our initial goals were met, the only big thing we had to scrap was the majority of the item system. We found that the hardest part wasn't the actual code, but creating a story that was in-depth enough to be even a little bit fun. There are 24 different endings, only one of which is the correct one. The rest are deaths.
				                	</div>	
				                	<hr>
				                	<h2>Screenshots</h2>				                		
				                	<br>
				                	<button class="accordion button2" style="height: 50px; width: 100%; text-align: left;"><span>View screenshots...</span></button>	
				                	<div class="panel" style="font-family: 'roboto'; font-size: 18px; text-align: center; z-index: 1000001">
				                		<img src="img/screens/1.png">
				                		<br>
				                		<label>The game's opening screen</label>
				                		<hr>
				                		<img src="img/screens/2.png">
				                		<br>
				                		<label>A sample, showing how the player is presented with multiple options in each part of the story.</label>
				                		<hr>
				                		<img src="img/screens/3.png">
				                		<br>
				                		<label>The game's ending screen. It looks so peaceful! Good luck getting there, though.</label>
				                		<hr>
				                		<img src="img/screens/4.png">
				                		<br>
				                		<label>The game gives you your time code at the end, which you can enter on this website to add yourself to the leaderboard.</label>
				                		<hr>
				                		<img src="img/screens/5.png">
				                		<br>
				                		<label>One of the pages of Toad's diary. These pages are scattered throughout the game, and provide some insight into Toad's mind, and some clues as to how to defeat him.</label>
				                		<hr>
				                		<img src="img/screens/6.png">
				                		<br>
				                		<label>One of the many ways to die. Try to find them all!</label>
				                		<br>
				                	</div>
				                	<hr>
				                	<h2>Class Map</h2>				                		
				                	<br>
				                	<p>Our class map is broken up into sections, because the images are so large it'd be unreadable if I stitched them together.</p>
				                	<button class="accordion button2" style="height: 50px; width: 100%; text-align: left;"><span>View class map...</span></button>	
				                	<div class="panel" style="font-family: 'roboto'; font-size: 18px; text-align: left; z-index: 1000001">
				                		<h2>Part 1 - Stuff that extends from JFrame</h2>
				                		<img src="img/classes/1.png" width="100%">
				                		<br>
				                		<p>The Window class is the main window the user interacts with. It contains multiple graphical components, which require access methods, since their contents change frequently.</p>
				                		<p>The DiaryView class is a second window that allows the user to view all of the DiaryPages they have collected so far. It has an array of file paths as Strings that point to the image for each collected DiaryPage. There are int values used to determine which page to show on screen. A DiaryView object is attached to the Window object as a static member, as we want only one of them.</p>
				                		<p>Both of these classes extend Java's JFrame, which is the basis for a GUI in a Java program. They also implement ActionListener, which allows us to have code for certain events. We use ActionListener in Window to check for user input, and in both to check if they are clicking a button.</p>
				                		<hr>
				                		<h2>Part 2 - Stuff that extends from ArrayList</h2>
				                		<img src="img/classes/2.png" width="50%">
				                		<br>
				                		<p>The Diary class is used to store all of the collected DiaryPages. It is from here that the DiaryView class gets it's information. It overrides the add() and size() methods of ArrayList</p>
				                		<p>The Inventory class is used to store the player's items. It really isn't used as much as we planned, but oh well. It overrides the add() method of ArrayList.</p>
				                		<p>A Diary object and and Inventory object is assigned to each Player object.</p>
				                		<hr>
				                		<h2>Part 3 - Item and DiaryPage</h2>
				                		<img src="img/classes/3.png" width="25%">
				                		<br>
				                		<p>The Item class is used to represent an object the player can collect on the quest. It has a name. that's basically it, because we scrapped items when it became clear we wouldn't have time to implement them how we wanted to. These are stored in the Inventory.</p>
				                		<p>The DiaryPage class is a special type of item that we did not scrap, because it adds to the spookiness of the game. These are scattered throughout the story, and are numbered. We store this page number as a String and an int. They also have an image associated with them, represented by a String file path. These are stored in the Diary, and viewed in the DiaryView.</p>
				                		<hr>
				                		<h2>Part 4 - Various other classes</h2>
				                		<img src="img/classes/4.png" width="50%">
				                		<br>
				                		<p>The Player class contains a String to hold the user's name, two Date objects: one to hold the time they started playing, and one to hold the time they finished. There are access methods for both of those objects to set their values, and a third method calculates the elapsed time between the two so we know how many seconds it took to beat the game. This is the time code you enter in the online leaderboard. The Player object contains a method taking an item name as a String and will determine if that item exists in the player's inventory. Player also contains a method that uses bubble sorting to order the pages in the player's Diary.</p>
				                		<p>The Game class is the main class, it's the starting point for our code. It has the classic fan favourite delay function.</p>
				                		<p>The Scream class is mostly a joke. You'll hear what it's used for when you start the game. It contains a static String containing the path to that lovely audio file, and a File and Clip object to hold the file data. There are two methods: scream() and unscream(). scream() is what plays the file, just like the music in our other games, and unscream() is a failsafe that stops the audio from playing if there's an error.</p>
				                		<hr>
				                		<h2>Part 5 - StoryEvent</h2>
				                		<img src="img/classes/5.png" width="80%">
				                		<br>
				                		<p>That's really big! You're gonna be scrolling back up to read it, this is the most complex element in our game.</p>
				                		<p>The StoryEvent has 17 state variables, most of which are read from story.txt. The game starts off by making a StoryEvent object from the data from line 1 of story.txt, and that data plus the user's input (if needed) tells the game which line to make the next StoryEvent from. I'll explain the state vars in the order they appear in story.txt.</p>
				                		<p>The eventText string is what contains the story for that event. It's the text that you see in the window. ("Mario arrived at Peach's Castle", etc.).</p>
				                		<p>The imagePath string is the path to the large image that corresponds to whatever is happening in the story.</p>
				                		<p>The npcPath is the path to the little image of whoever is talking (usually  an image of Mario, sometimes others.)</p>
				                		<p>The npcName string is the name that goes with the image of whoever is talking ("Mario", most of the time).</p>
				                		<p>The options boolean represents whether the player is presented with options. If true, the game waits for the player to choose one of the options. If false, it advances automatically after 5 seconds.</p>
				                		<p>The strings opt1 through opt4 are the actual options the player is presented with. These are the same words that appear underlined on screen. If there are only 2 options, opt 3 and 4 are set to "n/a", and if there are no options, (the above boolean is false), they are all "n/a". </p>
				                		<p>The 4 ints opt1-4chap correspond to the 4 option strings. They represent which line in story.txt to read from next for each option, so for example if the player chooses yes we read from line 5 next, or if they choose no, we read from line 6. If an option is "n/a", the int that goes with it will be 0. If it is an automatic story event, the game will simply look at the first int option to determine where to go, all the rest are 0.</p>
				                		<p>Sometimes we append an additional String at the end of the above stuff (we call the above stuff the "normal info"). This additional string represents the page number of the DiaryPage we pick up in that StoryEvent, and we use the diary sting for that. This is the second constructor.</p>
				                		<p>Other times, we put an additional boolean and string at the end of the normal info. The boolean is stored in the item variable, and the String is the item's name, stored in the itemPickUp string. This is the third constructor.</p>
				                		<p>On to the methods, we have access methods for basically all of the state vars, especially those that are shown in the window (eventText, the images, etc.) The access methods for the option strins and ints are special, because they take an int argument indicating which option we want to look at.</p>
				                		<p>Sorry this was long, but since this is kind of crucial to the game we needed this.</p>
				                		<br>
				                	</div>
				                	<hr>
				                	<h2>Resources</h2>				                		
				                	<br>
				                	<p>We used a couple of resources in our game we found online.</p>
				                	<p>The StretchIcon class was used to make sure the images we show would fill the JLabel entirely, instead of being rendered in their native size. It can be found <a href="https://tips4java.wordpress.com/2012/03/31/stretch-icon/">here.</a></p>
				                	<p>The PointyCaret class is adapted from the first answer found <a href="https://stackoverflow.com/questions/24026774/how-to-change-the-caret-in-a-textfield?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa">here.</a></p>
				                	<br>				                	
				                </div>
				            </div>
				        </div>
		  				<br>
					</div>
					<div class="slide fade">
						<div class="section">
				            <div class="container-fluid">
				                <div>				                				                	
				                	<h2>Downloads</h2>				                			                	
				                	<br>	
				                	<button class="button2" onclick="location.href='https://drive.google.com/open?id=1H7EqKm5wGouF0lWEDp_7znjjKfzWDaHH'" style="width: 200px;"><span>Download (.exe)</span></button>		       	
				                	<button class="button2" onclick="location.href='https://drive.google.com/open?id=1b6eBO9ruy-Dsy11fNhXQwR4aEtFBe0fx'" style="width: 200px;"><span>Download (.zip)</span></button>
				                	<br>
				                	<p>Walkthrough, so Mr. Krnic can actually see the end of the game without having to waste time dying a million times. 
				                	<br>
				                	Happy teacher = good mark</p>
				                	<br>
				                	<button class="button2" onclick="location.href='game/cheat.txt'" style="width: 200px;"><span>Walkthrough</span></button>
				                	<hr>
				                	<h2>How to play....</h2>
				                	<p>The game is pretty straight-forward. If you downloaded the exe, just run it. If you downloaded the zip, extract all the files to somewhere else, and run the .bat file.<br><img src="img/screens/7.png"><br>Take a look at this image. The words that are underlined are the options that the player has. The box at the bottom is where you type in your choice. <br>Some story events won't have anything underlined. Read these carefully, they will either be a yes/no question, or the story will advance automatically after 5 seconds.</p>
				                </div>
				            </div>
				        </div> 
		  				<br>
					</div>

				</div>
			</div>	

			<!-- The Modal -->
			<div id="highscorebox" class="modal">
				<!-- Modal content -->
				<div class="modal-content">
					<div class="modal-header">
						<span class="close" onclick="document.getElementById('highscorebox').style.display = 'none'">&times;</span>
						<h2>Top Speedrun Times</h2>
					</div>
					<div class="modal-header" style="text-align: center; max-height: 100px;">
						<span style="white-space:nowrap;">
							<button class="button2" style="margin: 10px 10px; font-size: 1em; max-width: 40%;" onclick="showAll()"><span>All Times</span></button>					
							<button class="button2" style="margin: 10px 10px; font-size: 1em; max-width: 40%;" onclick="showCasual()"><span>Casual</span></button>
						</span>
						<span style="white-space:nowrap;">
							<button class="button2" style="margin: 10px 10px; font-size: 1em; max-width: 40%;" onclick="showAny()"><span>Any%</span></button>						
							<button class="button2" style="margin: 10px 10px; font-size: 1em; max-width: 40%;" onclick="show100()"><span>100%</span></button>
						</span>						
					</div>
					<div class="modal-body" style="max-height: 300px; overflow-y: scroll;">
						<table>
							<tbody>
								<tr>
									<th>Name</th>
									<th>Time</th>
									<th>Type</th>
									<?php
										$file = "times.csv";//path to the file
										$fileContent = file_get_contents("$file");//get the file data
  										$lineArray = explode("\n", $fileContent);//break it into an array line by line
  										for ($i=0; $i < sizeof($lineArray); $i++) { //loop through each line
									        $dataArray = explode(",", $lineArray[$i]);//turn each line into a mini array
									        echo "<tr class='timerow'><td>".$dataArray[0]."</td><td>".$dataArray[1]."</td><td class='type'>".$dataArray[2]."</td></tr>";//echo out a formatted table row with the contents of that line
									    }
									?>
								</tr>								
							</tbody>
						</table>							
					</div>
					<div class="modal-footer">
						<button class="button2" style="width: 95%; margin: 10px 10px;" onclick="document.getElementById('submittimes').style.display = 'block'"><span>Submit a Time</span></button>
					</div>
				</div>
			</div>

			<!-- The Modal -->
			<div id="submittimes" class="modal">
				<!-- Modal content -->
				<div class="modal-content" style="width: 50%">
					<form action='speedrun.php' method='post' accept-charset='UTF-8' style="font-family: 'roboto';">
						<div class="modal-header">
							<span class="close" onclick="document.getElementById('submittimes').style.display = 'none'">&times;</span>
							<h2>Submit a Speedrun Time</h2>
						</div>
						<div class="modal-body" style="text-align: left;">						
							<fieldset>
								<label for='type'>Type of Run:</label>
								<select name="type" id="typedropdown">
									<option value="Any%">Any%</option>
									<option value="100%">100%</option>
									<option value="Casual">Casual</option>
								</select>
								<br>
								<input type='hidden' name='submitted' id='submitted' value='1'>
								<label for='code'>Time Code: </label>
								<input type='number' name='code' maxlength="50" required>
								<br>
								<p style="font-size: 14px;">By submitting a time, you agree to our <a style="color: black; border-color: black; cursor: pointer;" onclick="location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'">privacy policy.</a></p>
								<label for="agree" style="font-size: 14px;">I agree</label>	
								<input type="checkbox" name="agree" required style="width: auto;">				
							</fieldset>					
						</div>
						<div class="modal-footer">
							<button class="button2" style="margin: 10px 10px;"><span>Submit</span></button>
						</div>
					</form>
				</div>
			</div>	

			<!-- The Modal -->
			<div id="phpmodal" class="modal">
				<!-- Modal content -->
				<div class="modal-content" style="width: 90%;">
					<div class="modal-header">
						<span class="close" onclick="document.getElementById('phpmodal').style.display = 'none'">&times;</span>
						<h2>PHP Information</h2>
					</div>
					<div class="modal-body" style="max-height: 400px; overflow-y: scroll;">						
						<img src="img/php-1.png" width="100%">
					</div>
					<div class="modal-footer">
						<p style="color: black">this is an easter egg</p>						
					</div>
				</div>
			</div>		

			<!--Standard footer for all pages, with some navigation buttons as well.-->
			<div class="footer">
				<p> 				
					This page was last updated on <b>06/18/18 at 21:07</b>
				</p>
				<p>
					<a href="http://www.the404.nl/">the404</a> <img src="img/logofullinvert.png" width="30px"> © 2018
				</p>
			</div>
		</div>

		<script src="js/scripts.js"></script>
		<script src="http://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>		
		<script type="text/javascript" src="js/toad.js"></script>
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
		<script>
			//This script block is what allows the panels to expand and retract smoothly.
	        var acc = document.getElementsByClassName("accordion");
	        var i;

	        for (i = 0; i < acc.length; i++) {
	          acc[i].addEventListener("click", function() {
	            this.classList.toggle("open");
	            var panel = this.nextElementSibling;
	            if (panel.style.maxHeight){
	              panel.style.maxHeight = null;
	            } else {
	              panel.style.maxHeight = panel.scrollHeight + "px";
	            } 
	          });
	        }
        </script>
	</body>
</html>