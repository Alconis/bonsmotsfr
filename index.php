<?php
/*
ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(-1);
*/

session_start();

if(isset($_GET['deconnexion'])){
	$_SESSION = array();
	session_write_close();
}
$userId = $_SESSION['loggedUserId'];

include("includes/config-db.php");
require_once("includes/model/grid.php");
require_once("includes/model/user.php");

// Publish scheduled grids
include("includes/publisher.php");

if ($userId){
	echo '<!-- logged user: "' . $userId . '"-->';
	$the_user = new User();
	$the_user->id = $userId;
	
	$sql = 'SELECT * FROM arrows_user WHERE id=' . $the_user->id;
	$req = mysqli_query($conn, $sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysqli_error($conn));
	$data = mysqli_fetch_assoc($req);
	if ($data){
		$the_user->login = $data['login'];
		$the_user->mail = $data['mail'];
		$the_user->url = $data['url'];
	}
}

$page = $_GET['page'];

$is_home = $page == "home" || $page == "";
$is_grid = $page == "grid";
$is_user = $page == "user";
$is_users = $page == "users";
$is_editor = $page == "editor";
$is_dico = $page == "dico";
$is_test = $page == "test";

if ($is_grid && $_GET["id"]){
	echo '<!-- requested grid: ' . $_GET["id"] . '-->';
	
	$the_grid = new Grid();
	$the_grid->id = $_GET["id"];
	
	$sql = "SELECT G.*, U.login FROM arrows_grids G, arrows_user U WHERE G.id =" . $the_grid->id . " AND G.author = U.id AND status='published'";
	$req = mysqli_query($conn, $sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysqli_error($conn));
	$data = mysqli_fetch_assoc($req);
	if ($data){
		$the_grid->title = $data['title'];
		$the_grid->level = $data['level'];
		$the_grid->author = $data['login'];
		$the_grid->rowCount = $data['rowCount'];
		$the_grid->colCount = $data['colCount'];
		$the_grid->url = $data['url'];
		$the_grid->XMLData = $data['data'];
		$the_grid->Base64Data = base64_encode($the_grid->XMLData);
	}
}

include("includes/header.php");

if ($is_home){include("includes/list.php");}
else if ($is_grid){include("includes/grid.php");}
else if ($is_user){include("includes/user.php");}
else if ($is_users){include("includes/users.php");}
else if ($is_editor){include("includes/editor.php");}
else if ($is_dico){include("includes/dico.php");}
else if ($is_test){include("includes/test.php");}

if (!$is_editor && !($the_grid && $the_grid->is_big())){
	include("includes/sidebar.php");
}
include("includes/popups.php");
include("includes/footer.php");

?>