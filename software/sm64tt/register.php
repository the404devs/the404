<!--Super Mario 64: Toad's Terror (Final Summative)
June 18th, 2018
By Owen and Kevin
This is script to register a new user. We use binary search to make sure the username they want isn't taken-->
<?php
	session_start();//Access global vars
    $name = strip_tags($_POST['name']);//Get the contents from the 4 inputs in the register form
    $email = strip_tags($_POST['email']);
    $username = strip_tags($_POST['username']);
    $password = strip_tags($_POST['password']);

    function binarySearch($arr, $item){//binary search function
        $first = 0;
        $last = sizeof($arr)-1;
        while ($first!=$last) {
            $mid = floor(($first+$last)/2);
            $firstItem = substr($arr[$first], 0, strpos($arr[$first], ","));
            $lastItem = substr($arr[$last], 0, strpos($arr[$last], ","));
            $midItem = $arr[$mid];
            if (strcasecmp($item, $firstItem)==0) {
                return true;//return true if the name is found
            }
            else if (strcasecmp($item, $lastItem)==0) {
                return true;//return true if the name is found
            }
            else if (strcasecmp($item, $midItem)>0) {
                $first = $mid+1;
            }
            else if (strcasecmp($item, $midItem)<0) {
                $last = $mid;
            }
        }
        if ($first==$last) {
            return false;//return false if the name isn't found
        }        
    }

    $file = "reg.csv";//path to the file
    $fileContent = file_get_contents("$file");//get file content
    $lineArray = explode("\n", $fileContent);//turn it into an array line by line

    if (binarySearch($lineArray, $username)) {//Search for the name they want
        $_SESSION['message'] = "Hey! That name is taken already!";//If it's taken we have to be the bearer of bad news
        // header('LOCATION:index.php');//send them back to try again
        echo "<script>location.href='index.php'</script>";
    }
    else{//else username isn't taken
        $text = "Hey, $name!\nYou've registered successfully!\nYour username is: $username\nYour password is: $password\nHave a nice day!";//This text will go in the email
        mail("$email", "Super Mario 64: Toad's Terror Registration", $text, "From: automail@the404.nl");//Send them an email
        $entry = "$username,$password";//new entry in the form of username,password
        file_put_contents ("reg.csv" , "\n$entry", FILE_APPEND);//add that entry to the file so they can log in again
        $_SESSION['login'] = true;//they're logged in for the first time
    	$_SESSION['message'] = "Welcome, $username!\\nYou\'ve completed your registration! You will receive an email shortly to confirm your account details!";//message will tell them they did a good job of registering
        $_SESSION['username'] = $username;//store that username in our global var
        // header('LOCATION:index2.php');//send them to the homepage
        echo "<script>location.href='index2.php'</script>";
    }
    ?>