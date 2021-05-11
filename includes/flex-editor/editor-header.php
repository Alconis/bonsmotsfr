<!-- Include CSS to eliminate any default margins/padding and set the height of the html element and 
	 the body element to 100%, because Firefox, or any Gecko based browser, interprets percentage as 
	 the percentage of the height of its parent container, which has to be set explicitly.  Fix for
	 Firefox 3.6 focus border issues.  Initially, don't display flashContent div so it won't show 
	 if JavaScript disabled.
-->
<style type="text/css" media="screen">
	object:focus { outline:none; }
	#flashcontent { display:none; }
</style>

<!-- Enable Browser History by replacing useBrowserHistory tokens with two hyphens -->
<!-- BEGIN Browser History required section -->
<link rel="stylesheet" type="text/css" href="http://bonsmots.fr/includes/flex-editor/history/history.css" />
<script type="text/javascript" src="http://bonsmots.fr/includes/flex-editor/history/history.js"></script>
<!-- END Browser History required section -->  
	
<script type="text/javascript" src="http://bonsmots.fr/includes/flex-editor/swfobject.js"></script>
<script type="text/javascript">
	<!-- For version detection, set to min. required Flash Player version, or 0 (or 0.0.0), for no version detection. --> 
	var swfVersionStr = "10.0.0";
	<!-- To use express install, set to playerProductInstall.swf, otherwise the empty string. -->
	var xiSwfUrlStr = "http://bonsmots.fr/includes/flex-editor/playerProductInstall.swf";
	var flashvars = {};
	var params = {};
	params.quality = "high";
	params.bgcolor = "#ffffff";
	params.allowscriptaccess = "sameDomain";
	params.allowfullscreen = "true";
/*params.wmode = "Transparent";*/
	var attributes = {};
	attributes.id = "ArrowsEditor";
	attributes.name = "ArrowsEditor";
	attributes.align = "middle";
	swfobject.embedSWF(
		"http://bonsmots.fr/includes/flex-editor/ArrowsEditor.swf", "flashContent", 
		"100%", "800px", 
		swfVersionStr, xiSwfUrlStr, 
		flashvars, params, attributes);
	<!-- JavaScript enabled so display the flashContent div in case it is not replaced with a swf object. -->
	swfobject.createCSS("#flashContent", "display:block;text-align:left;");
</script>