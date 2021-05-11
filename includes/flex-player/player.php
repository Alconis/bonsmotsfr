<!-- SWFObject's dynamic embed method replaces this alternative HTML content with Flash content when enough 
	 JavaScript and Flash plug-in support is available. The div is initially hidden so that it doesn't show
	 when JavaScript is disabled.
-->
<div id="flashContent">
	<p>
		To view this page ensure that Adobe Flash Player version 
		10.0.0 or greater is installed. 
	</p>
	<script type="text/javascript"> 
		var pageHost = ((document.location.protocol == "https:") ? "https://" :	"http://"); 
		document.write("<a href='http://www.adobe.com/go/getflashplayer'><img src='" 
						+ pageHost + "www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Get Adobe Flash player' /></a>" ); 
	</script> 
</div>

<noscript>
	<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%" id="Arrows">
		<param name="movie" value="http://bonsmots.fr/includes/flex-player/Arrows.swf" />
		<param name="quality" value="high" />
		<param name="bgcolor" value="#ffffff" />
		<param name="allowScriptAccess" value="sameDomain" />
		<param name="allowFullScreen" value="true" />
		<param name='flashVars' value='gridId=<?=$gridId;?>&gridXML=<?=$the_grid->Base64Data;?>'/>

		<!--[if !IE]>-->
		<object type="application/x-shockwave-flash" data="http://bonsmots.fr/includes/flex-player/Arrows.swf" width="100%" height="100%">
			<param name="quality" value="high" />
			<param name="bgcolor" value="#ffffff" />
			<param name="allowScriptAccess" value="sameDomain" />
			<param name="allowFullScreen" value="true" />
		<!--<![endif]-->
		<!--[if gte IE 6]>-->
			<p> 
				Either scripts and active content are not permitted to run or Adobe Flash Player version
				10.0.0 or greater is not installed.
			</p>
		<!--<![endif]-->
			<a href="http://www.adobe.com/go/getflashplayer">
				<img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash Player" />
			</a>
		<!--[if !IE]>-->
		</object>
		<!--<![endif]-->
	</object>
</noscript>
