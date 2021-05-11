<?php

class Grid {
	var $id;
	var $title;
	var $level;
	var $rowCount;
	var $colCount;
	var $author;
	var $url;

	var $XMLData;
	var $Base64Data;
	
	function is_big() {
		return intval($this->rowCount) * intval($this->colCount) > 35;
	}
}

?>