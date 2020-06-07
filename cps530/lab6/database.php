

<?php

$servername = "localhost";
$username = "id925603_the404db";
$password = "EvilArchie15";
$database = "id925603_testingdb";

// Create connection
$con = new mysqli($servername, $username, $password, $database);

// Check connection
if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}
$result = mysqli_query($con, "SELECT * FROM Pictures WHERE Location LIKE '%ontario%'");
echo "<link rel='stylesheet' type='text/css' href='css/lab6-database.css'>";
echo "<h1 id='header'>Lab #6</h1>";
echo "<h6 id='name'>Owen Goodwin - 500909196</h6>";

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "<div class='img-box'>";
        echo "<img src='".$row["url"]."' width=100px> <br>";
        echo "Subject: " . $row["subject"]."<br>";
        echo "Taken: ".$row["location"].", ".$row["date_taken"];
        echo "</div>";
        echo "<br>";
    }
} else {
    echo "0 results";
}
?>