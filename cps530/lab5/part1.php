<html>
    <head>
        <style>
            div{width:40px;display:inline-block;text-align:center}
        </style>
    </head>
    <body>
        <?php   
            session_start();//Access the global vars
            #We use a session variable to count the number of hits.
            if($_SESSION["count"] == null){
                $_SESSION["count"] = 0;#If no counter exists, start one.
            }
            $_SESSION["count"]++;#Counter goes up by one, cause we've viewed the page again.

            $cols = $_POST["cols"];#Grab the user's input values
            $rows = $_POST["rows"];

            if ($rows >= 3 && $rows <= 12 && $cols >= 3 && $cols <= 12){
                $column = array();#initialize array to create our first column, with numbers from 1 to whatever the user gave us
                for ($i=1; $i < $rows+1; $i++) { 
                    array_push($column, $i);#For-loop counter to construct the first column
                }
                $row = array();#Same as before, but we're making the first row
                for ($i=1; $i < $cols+1; $i++) { 
                    array_push($row, $i);
                }

                #Nested loops to go through each pair
                #Does some multiplication, then spits out the correct value to construct our table.
                foreach ($column as $colnum) {
                    foreach ($row as $rownum){
                        echo "<div>".$rownum*$colnum."</div>";
                    }
                    echo "<br>";
                }
            }
            else {
                echo "Invalid size! Dimensions must be between 3 & 12.";
            }
            echo "<br><br>";
            echo "You've visted this page ".$_SESSION["count"]." times this session.";
            
        ?>
    </body>
</html>