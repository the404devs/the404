<?php
	$text = strip_tags($_POST["emailContent"]);
	$email = strip_tags($_POST["return-address"]);
	if ($text && $email){
		mail("the404devs@gmail.com", "404 Feedback", $text, "From: ".$email);
		echo "<script>alert('Your feedback was submitted successfully.\\nThank you!');location.href='http://www.the404.nl';</script>')";
	}
	else{
		echo "<script>alert('Nice try, you forgot the feedback though.\\nGo back and try again.');location.href='http://www.the404.nl';</script>')";
	}	
?>