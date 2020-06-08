<!--Super Mario 64: Toad's Terror (Final Summative)
June 18th, 2018
By Owen and Kevin
This is script to log a user out. Happens when they click the logout button-->
<?php 
    session_start(); //Access global vars
    $_SESSION['message'] = "You\'ve logged out."; //little goodbye message
    $_SESSION['login'] = false;//Not logged in anymore
    $_SESSION['username'] = "";//clear the username
    // header('LOCATION:index.php');//send them to the login form     
    echo "<script>location.href='index.php'</script>";                                       
?>
