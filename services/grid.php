<?php
session_start();
// Force no cache for the request
Header('Cache-Control: no-cache');
Header('Pragma: no-cache');


include("../includes/config-db.php");

// Get action from URL
$action = $_GET["action"];
$id = $_GET["id"];

// Init user id
if (isset($_GET["userId"]) && intval($_GET["userId"]) != -1){
    $userId = intval($_GET["userId"]);
}else if(isset($_SESSION["loggedUserId"])){
    $userId = intval($_SESSION["loggedUserId"]);
}

if ($action == "get"){
        // Final base 64 string that will be printed
        header('Content-Type: text/plain');
	$sql = 'SELECT data FROM arrows_grids WHERE id=' . $id;
	$req = mysqli_query($conn, $sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysqli_error($conn));

	while($data = mysqli_fetch_assoc($req)){
		$str = base64_encode($data['data']);
	}
}

if ($action == "INCR_DONE"){
        header('Content-Type: text/xml');
        $str = "";
	$sql = 'UPDATE arrows_grids SET doneCount = doneCount + 1 WHERE id =' . $id;
	$req = mysqli_query($conn, $sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysqli_error($conn));

	// If a user is logged in,
	// - add it to arrows_grid_user table if never played by this user
	// - update user score according to the level of the grid
	if($userId && $userId != -1){

	    $sql = 'SELECT * FROM `arrows_user_grid` WHERE `userId` = ' . $userId . ' AND `gridId` = ' . $id;
	    $req = mysqli_query($conn, $sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysqli_error($conn));
	    $num_rows = mysqli_num_rows($req);

	    if($num_rows == 0){
		$nbErrors = $_GET["nbErrors"];
		$sql = 'SELECT level, rowCount, colCount FROM arrows_grids WHERE id=' . $id;
		$req = mysqli_query($conn, $sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysqli_error($conn));
		$data = mysqli_fetch_assoc($req);
		$gridLevel = $data["level"];

		if (intval($data["rowCount"]) * intval($data["colCount"]) > 35){
			$gridLevel *= 2;
		}
		if (intval($nbErrors) > 0){
			$gridLevel -= intval($nbErrors);
		}
		
		$sql = "INSERT INTO `arrows_user_grid` (`userId`, `gridId`, `score`) VALUES ('" . $userId . "', '" . $id . "', '" . $gridLevel . "')";
		$req = mysqli_query($conn, $sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysqli_error($conn));

		$sql = 'UPDATE arrows_user SET doneScore = doneScore + ' . $gridLevel . ' WHERE id =' . $userId;
		$req = mysqli_query($conn, $sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysqli_error($conn));
	    }
	}
}

if ($action == "add"){
    header('Content-Type: text/xml');
    $str = "";

    if($userId && $userId != -1){
        $gAuthorId = $userId;
        $gData = $_POST["data"];
        $gTitle = $_POST["title"];
        $gLevel = intval($_POST["level"]);
        $gRowCount = intval($_POST["rowCount"]);
        $gColCount = intval($_POST["colCount"]);

        $gPrivate = $_POST["private"];
        $gDate = strtotime($_POST["date"]);
        $gStatus = $_POST["status"];
        
        if($gAuthorId != -1 && $gData != "" && $gTitle != "" && $gLevel != 0 && $gRowCount != 0 && $gColCount != 0){
            
            if($gStatus == ""){$gStatus = "scheduled";}// By default we schedule a grid for publication
            if(!$gDate){
                $sql = "SELECT date FROM `arrows_grids` WHERE 1 ORDER BY date DESC LIMIT 0, 1";
		$req = mysqli_query($conn, $sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysqli_error($conn));
		$data = mysqli_fetch_assoc($req);
		$gDate = strtotime($data["date"]);

		if($gDate < time()){
	            $gDate = date('Y-m-d H:i:s', time());
		}else{
	            $gDate = date('Y-m-d H:i:s', $gDate + (24*60*60));// Add 24 hours to the last scheduled date in the database
		}
            }

	    $sql =  "INSERT INTO `arrows_grids` (`title`, `level`, `author`, `rowCount`, `colCount`, `data`, `private`, `date`, `doneCount`, `status`) ";
            $sql .= "VALUES ('".$gTitle."', '".$gLevel."', '".$gAuthorId."', '".$gRowCount."', '".$gColCount."', '".$gData."', '".$gPrivate."', '".$gDate."', '0', '".$gStatus."');";
	    $req = mysqli_query($conn, $sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysqli_error($conn));

	    $gID = mysqli_insert_id();
	    $gURL = 'http://bonsmots.fr/grille/'.$gID.'-grille.html';
	    $sql =  "UPDATE `arrows_grids` SET `url` = '".$gURL."' WHERE `id` = ".$gID ;
            $req = mysqli_query($conn, $sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysqli_error($conn));

            header('Status: 200 OK');
            $str = '<ok>'.$gID.'</ok>';
        }else{
            header('Status: 400 Bad Request');
            $str = "<ko><gAuthorId>".$gAuthorId."</gAuthorId><gTitle>".$gTitle."</gTitle><gLevel>".$gLevel."</gLevel><gRowCount>".$gRowCount."</gRowCount><gColCount>".$gColCount."</gColCount><gData>".$gData."</gData></ko>";
        }
    }else{
        header('Status: 401 Not Authorized');
        $str = "<ko>Identifiant " . $userId  . "(GET[userId]:" . $_GET['userId'] . ", SESSION[loggedUserId]:" . $_SESSION['loggedUserId'] . ") inconnu</ko>";
    }
}

// Close connection
mysqli_close();

// Print string
echo $str;
?>
