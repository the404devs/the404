<?php
    $page = $_SERVER['PHP_SELF'];
    $sec = "300";//5 minutes
?>
<link rel='stylesheet' href='style.css'>

<!-- meta redirect to self every 300s (5min) -->
<meta http-equiv="refresh" content="<?php echo $sec?>;URL='<?php echo $page?>'">

<?php 
    //get xml content
    $xml=simplexml_load_file("http://199.195.194.92:2199/rpc/meyima03/streaminfo.get?x=1") or die("Error: Cannot create object");
    
    echo "<img src=".$xml->data->item->track->imageurl.">";

    echo "<h1>" . $xml->data->item->track->title . "</h1><br>";
    echo "<h2>" . $xml->data->item->track->artist . "</h2>";
    echo "<h2>" . $xml->data->item->track->album . "</h2>";
?>