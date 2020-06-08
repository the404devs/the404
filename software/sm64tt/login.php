<!--Super Mario 64: Toad's Terror (Final Summative)
June 18th, 2018
By Owen and Kevin
This is the script to authenticate users.-->
<?php 
    session_start(); //Access our session vars.
    $_SESSION['message'] = ""; //Reset the message popup                              
    $username = strip_tags($_POST['username']);//Get the inputted username and password.
    $password = strip_tags($_POST['password']);//We do strip tags for security and Zeeshan defense
    $file = "reg.csv";//Path to file
    $fileContent = file_get_contents("$file");//Get the contents of the file
    $lineArray = explode("\n", $fileContent);//Turn it into an array line by line

    for ($i=0; $i < sizeof($lineArray); $i++) { //Loop through each line

        $dataArray = explode(",", $lineArray[$i]);//Turn the username/password combo into a mini array
        if($dataArray[0]==$username) {//check if the username on this line matches the inputted username
            if ($dataArray[1]==$password) {//If username matches, check the password too
                $_SESSION['login'] = true;//If password matches, set our global login var to true
                $_SESSION['message'] = "Welcome, $username!";//Set the message to welcome them
                $_SESSION['username'] = $username;//Store their username
                // header('LOCATION:index2.php');//send them to the homepage
                // die();
                echo "<script>location.href='index2.php'</script>";
                alert("");
            }
            else{//else password is wrong
                $_SESSION['message'] = "Incorrect password!";//tell em they're wrong
                // header('LOCATION:index.php');//send them back to the login form
                echo "<script>location.href='index.php'</script>";
            }
        }                                           
    } 
    if ($_SESSION['message'] == "") {//Otherwise the username doesn't exist, so we set the message to that
        $_SESSION['message'] = "No user with that name exists!";
    }
    // header('LOCATION:index.php'); //and send em back to the login form
    echo "<script>location.href='index.php'</script>";                                                            
?>