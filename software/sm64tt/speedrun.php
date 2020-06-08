<!--Super Mario 64: Toad's Terror (Final Summative)
June 18th, 2018
By Owen and Kevin
This is script to submit a time to the leaderboard-->
<?php
	session_start();//Access our global vars
    if ($_SESSION['login'] != true) {//If they're not logged in we send them to the login page
        $_SESSION['message'] = "You must log in first!";
        // header('LOCATION:index.php'); 
        echo "<script>location.href='index.php'</script>";
    }
    else{//If they are logged in we're all good
        //timeCode is in seconds. split into hours, mins, seconds.
        $timeCode = strip_tags($_POST['code']);//Get the inputted timecode. strip tags again in case of zee messing with me 
        $type = strip_tags($_POST['type']);//get the type of run
        $username = $_SESSION['username'];//Get their username, stored in our global vars
        
        //Basically what we do here is take the number of seconds (433) and turn it into hours:minutes:seconds (00:07:13)
        $hours = floor($timeCode/3600);//Do math to get the number of hours it took
        $minutes = floor(($timeCode-($hours*3600))/60);//Math to get the number of minutes
        $seconds = floor(($timeCode-($hours*3600))-($minutes*60));//Math to get the number of seconds
        if (strlen($hours)==1) {//If any of the hours, minutes or seconds values are single digit, put a 0 in front so it looks good (7 becomes 07)
            $hours = "0".$hours;
        }
        if (strlen($minutes)==1) {
            $minutes = "0".$minutes;
        }
        if (strlen($seconds)==1) {
            $seconds = "0"."$seconds";
        }


        $time = $hours.":".$minutes.":".$seconds;//Construct a string, so that the values are formatted as hh:mm:ss
        $entry = $username.","."$time".",".$type; //Construct an entry for the file, formatted as username,time(above),typeOfRun
        file_put_contents ("times.csv" , "\n$entry", FILE_APPEND);//add that entry to the file
        $file = "times.csv";//path to that file
        $fileContent = file_get_contents("$file");//get the contents
        $lineArray = explode("\n", $fileContent);//Turn it into an array line by line

        //Now we bubble sort the times
        for ($i=1; $i < sizeof($lineArray)-1; $i++) {             
            for ($j=0; $j < sizeof($lineArray)-$i; $j++) { 
                $dataArray1 = explode(",", $lineArray[$j]);
                $dataArray2 = explode(",", $lineArray[$j+1]);
                $timeArray1 = explode(":", $dataArray1[1]);
                $timeArray2 = explode(":", $dataArray2[1]);

                if (intval($timeArray1[0])>intval($timeArray2[0])) {//Comparing by hours
                    $temp = $lineArray[$j];
                    $lineArray[$j] = $lineArray[$j+1];
                    $lineArray[$j+1] = $temp;
                }
                else if (intval($timeArray1[0])==intval($timeArray2[0])) {//If hours are the same we go to minutes
                    if (intval($timeArray1[1])>intval($timeArray2[1])) {
                        $temp = $lineArray[$j];
                        $lineArray[$j] = $lineArray[$j+1];
                        $lineArray[$j+1] = $temp;
                    }
                    else if (intval($timeArray1[1])==intval($timeArray2[1])) {//If minutes are the same we go to seconds
                        if (intval($timeArray1[2])>intval($timeArray2[2])) {
                            $temp = $lineArray[$j];
                            $lineArray[$j] = $lineArray[$j+1];
                            $lineArray[$j+1] = $temp;
                        }
                    }
                }
            }                                     
        }

        $bigString = "";//Yeah that's right. A big string
        for ($i=0; $i < sizeof($lineArray); $i++) {//Loop through each line that we took from the file, then sorted
            $bigString .= $lineArray[$i]."\n";//add each of those lines to the big string, separated by line breaks
        }

        $bigString = substr($bigString, 0, strlen($bigString)-1);//Get rid of that last line break.
        file_put_contents ("times.csv" , "$bigString");//Overwrite the existing file with the big string, which contains the same data as old, with the new time sorted into place

        $_SESSION['message'] = "Time submitted successfully!";//Tell them that after all that work, their time was submitted successfully 
        // header('LOCATION:index2.php');//send them back to the homepage
        echo "<script>location.href='index2.php'</script>";
    }	
?>