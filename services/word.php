<?php
session_start();
include("../includes/config-db.php");

// Init dictionary
$pspell_config = pspell_config_create("fr");
pspell_config_mode($pspell_config, PSPELL_FAST);
$pspell_link = pspell_new_config($pspell_config);

// Get action from URL
$action = $_GET["action"];

if (!$action){
	$action = $_POST["action"];
}

// Init user id
if (isset($_GET["userId"]) && intval($_GET["userId"]) != -1){
    $userId = intval($_GET["userId"]);
}else if(isset($_SESSION["loggedUserId"])){
    $userId = intval($_SESSION["loggedUserId"]);
}

header('Content-Type: text/xml');

if ($action == "check"){
	$word = $_GET["w"];
	$word = strtolower(trim($word));
  
	if ($word){
		if (!pspell_check($pspell_link, $word)) {
			$suggestions = pspell_suggest($pspell_link, $word);

			$suggArray = array();
			$wordReg = str_replace("-",".",$word);
			foreach ($suggestions as $suggestion) {
			
				if(strpos($suggestion, "'") === false){
					if(strlen($suggestion) == strlen($word)){
						$cleanSugg = htmlentities(strtolower($suggestion));
						$sources = array('&agrave;','&aacute;','&acirc;','ä',
                                                                 '&egrave;','&eacute;','&ecirc;','ë',
                                                                 '&igrave;','&iacute;','&icirc;','ï',
                                                                 '&ograve;','&oacute;','&ocirc;','ö',
                                                                 '&ugrave;','&uacute;','&ucirc;','ü',
                                                                 '&ygrave;','&yacute;','&ucirc;','ÿ');
						$targets = array('a','a','a','a','e','e','e','e','i','i','i','i','o','o','o','o','u','u','u','u','y','y','y','y');
						$cleanSugg = str_replace($sources, $targets, $cleanSugg);
						
						if(strpos($word, "-") === false){
							if($word == $cleanSugg){
								header("Status: 200 OK");
								$xml = "<ok/>";
								$suggArray = array();
								break;
							}
						}else{
							if(preg_match('/^' . $wordReg . '/i', $cleanSugg)){
								$suggArray[] = $cleanSugg; // Add cleanSugg to the end of the array
							}
						}
					}					
				}
			}
			
			if (count($suggArray) > 0){
				//header("Status: 303 See Other");
				header("Status: 200 OK");
				$xml = '<?xml version="1.0" encoding="utf-8"?><ko>';
				foreach ($suggArray as $sugg){
					$xml .= "<suggestion>" . utf8_encode($sugg) . "</suggestion>";
				}
				$xml .= "</ko>";
			}else{
				header("Status: 404 Not Found");
				$xml = "<ko>" . $_GET["w"] . "</ko>";
			}
			
		}else{
			header("Status: 200 OK");
			$xml = "<ok/>";
		}
	}else{  
		header("Status: 400 Bad Request");
		$xml = "<ko>Parametre GET 'w' manquant.</ko>";
	}
}

if ($action == "add"){
	$word = $_GET["w"];
	$word = strtoupper(trim($word));
	$definition = trim($_GET["definition"]);
	$level = intval($_GET["level"]);
  
	if($word != "" && strlen($word) > 1 && $definition != "" && strlen($definition) > 1){
		if($level == 0){ $level = 1; }// default level for a word

		$sql =  "SELECT * FROM `arrows_definitions` WHERE `word` LIKE '" . $word . "' AND `definition` LIKE '" . utf8_decode(addslashes($definition)) . "'";
		$req = mysql_query($sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysql_error());

		if (false === mysql_fetch_assoc($req)){
		
		    $sql =  "INSERT INTO `arrows_definitions` (`word`, `definition`, `level`, `authorId`)";
		    $sql .= " VALUES ('" . $word . "', '" . utf8_decode(addslashes($definition)) . "', '" . $level . "', '" . $userId . "');";
		    $req = mysql_query($sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysql_error());
		    $dID = mysql_insert_id();
		
		    header("Status: 201 CREATED");
		    $xml = "<ok/>";
                }else{
		    header("Status: 304 Not Modified");
		    $xml = "<ok>Existe deja</ok>";
                }
	}else{  
	  header("Status: 400 Bad Request");
	  $xml = "<ko>Parametre GET 'w' manquant.</ko>";
  }
}

if ($action == "addGridData"){
    $data = file_get_contents("php://input");

    if (!$data || $data == ""){
        $data = $_POST["data"];
    }
    if (!$data || $data == ""){
        $data = $_GET["data"];
    }

    if($data && $data != ""){
        $xmlDoc = simplexml_load_string($data);

        if($xmlDoc === false){
            header("Status: 400 Bad Request");
            $xml = "<ko>";
            foreach(libxml_get_errors() as $error) {
                $xml .= "<xmlerror>" + $error->message + "</xmlerror>";
            }
            $xml .= "</ko>";
        }else{
            $xml = "<ok>";
            foreach ($xmlDoc->word as $word){
                $solution= strtoupper($word["solution"]);
                $definition = $word["definition"];
                $level = $_GET["level"];

                if ($solution != "" && strlen($solution) > 1 && $definition != ""){

                    $sql =  "SELECT * FROM `arrows_definitions` WHERE `word` LIKE '" . $word . "' AND `definition` LIKE '" . utf8_decode(addslashes($definition)) . "'";
		    $req = mysql_query($sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysql_error());

		    if (false === mysql_fetch_assoc($req)){

                        $sql =  "INSERT INTO `arrows_definitions` (`word`, `definition`, `level`, `authorId`)";
                        $sql .= " VALUES ('" . $solution . "', '" . utf8_decode(addslashes($definition)) . "', '" . $level . "', '" . $userId . "');";
	                $req = mysql_query($sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysql_error());
            
                        $xml .= "<word>Definition '" . $definition . "' for word '" . $solution . "' added with level " . $level . " for userId " . $userId . "</word>";
                    }
                }
            }
            header("Status: 200 OK");
            $xml .= "</ok>";
        }
    }else{
        header("Status: 400 Bad Request");
        $xml = "<ko>Parametre POST 'data' manquant.</ko>";
    }
}

if ($action == "getDefinitions"){
	$word = $_GET["w"];
	$word = trim($word);
	$word = str_replace(array('-','*'),array('_','%'),$word);

	if($word != ""){
		$sql = "SELECT D.*, U.login FROM `arrows_definitions` D, `arrows_user` U WHERE D.authorId = U.id AND word LIKE '" . $word . "' ORDER BY word ASC";
		$req = mysql_query($sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysql_error());
		$nb_result = mysql_num_rows($req);
		
		if($nb_result){
			header("Status: 200 OK");
			$xml = '<?xml version="1.0" encoding="utf-8"?><ok>';
			while($data = mysql_fetch_assoc($req)){
				$xml .= '<word definition="' . utf8_encode(stripslashes($data["definition"])) . '" solution="' . strtoupper($data["word"]) . '" level="' . $data["level"] . '" authorId="' . $data["login"] . '"/>';
			}
			$xml .= "</ok>";
		}else{
			header("Status: 404 Not Found");
			$xml .= "<ko>" . $word . "</ko>";
		}
	}else{
	  header("Status: 400 Bad Request");
	  $xml = "<ko>Parametre GET 'w' manquant.</ko>";
	}
}


// Close connection
mysql_close();

// Print string
echo $xml;
?>