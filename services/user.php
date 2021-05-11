<?php
session_start();
include("../includes/config-db.php");

// Get action from URL
$action = $_GET["action"];

if (!$action){
	$action = $_POST["action"];
}

$id = $_GET["id"];
header('Content-Type: text/xml');

if ($action == "get"){
	$sql = 'SELECT * FROM arrows_user WHERE id=' . $id;
	$req = mysql_query($sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysql_error());

	$data = mysql_fetch_assoc($req);
	if($data){
		$xml = '<user id="' . $data["id"] . '" login="' . $data["login"] . '" mail="' . $data["mail"] . '" doneCount="' . $data["doneCount"] . '" bonusCount="' . $data["bonusCount"] . '"/>';
	}
}


if ($action == "login"){
	$user_login = $_POST["login"];
	$user_password = $_POST["password"];

	$sql = 'SELECT id FROM arrows_user WHERE login="' . $user_login . '" AND password="' . $user_password . '"';
	$req = mysql_query($sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysql_error());

	$data = mysql_fetch_assoc($req);
	if($data){
		//setcookie('loggedUserId', $data["id"] , (time() + 3600));
		session_start();
		$_SESSION["loggedUserId"] = $data["id"];
		session_write_close();
                header('Status: 202 Accepted');
		$xml = '<ok/>';
	}else{
		//setcookie('loggedUserId');
		session_start();
		unset($_SESSION["loggedUserId"]);
		session_write_close();
                header('Status: 404 Not Found');
		$xml = '<ko/>';
	}
}

if ($action == "add"){
	$user_login = $_POST["login"];
	$user_password = $_POST["password"];
	$user_mail = $_POST["mail"];

	if ($user_login && $user_password && $user_mail){
		$sql = "SELECT login FROM arrows_user WHERE login='" . $user_login . "'";
		$req = mysql_query($sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysql_error());
		$data = mysql_fetch_assoc($req);
		if($data){
			$xml = "<ko>L'identifiant " . $user_login . " existe deja. Veuillez en choisir un autre.</ko>";
		}else{
			$sql = "INSERT INTO `arrows_user` (`login`, `password`, `mail`) VALUES ('" . $user_login . "', '" . $user_password . "', '" . $user_mail . "');";
			$req = mysql_query($sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysql_error());
			$xml = '<ok/>';
			
			$sql = "SELECT id FROM arrows_user WHERE login='" . $user_login . "'";
			$req = mysql_query($sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysql_error());
			$data = mysql_fetch_assoc($req);
			$newUserId = $data["id"];

			$userUrl = 'http://bonsmots.fr/joueur/'. $newUserId . '-fiche.html';

			$sql = "UPDATE `arrows_user` SET `url` = '" . $userUrl . "' WHERE `id` = " . $newUserId;
			$req = mysql_query($sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysql_error());

			session_start();
			$_SESSION["loggedUserId"] = $newUserId;
			session_write_close();
                        header('Status: 201 Created');
		}
	}else{
                header('Status: 400 Bad Request');
		$xml = '<ko/>';
	}
}

if ($action == "finishGrid"){
	$score = $_GET["score"];
	$gridId = $_GET["gridId"];

	if ($score  && $gridId  && $id){
		$sql = "INSERT INTO `arrows_user_grid` (`userId`, `gridId`, `score`) VALUES ('" . $id . "', '" . $gridId . "', '" . $score . "');";
		$req = mysql_query($sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysql_error());
                header('Status: 204 No Content');
	}else{
                header('Status: 400 Bad Request');
        }
}

// Close connection
mysql_close();

// Print string
echo $xml;
?>