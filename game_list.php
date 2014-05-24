<!-- *** CodShaFu Editor ! :p *** -->

<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8" />
		<title>editor</title>
		<link rel="stylesheet" type="text/css" href="css/style.css"/>
	</head>
	<body> <!-- id="cleanScreen" to remove some stuffs -->
		<canvas id="canvas">
			This browser is not supported
		</canvas>

		<img id="banTelethon" src="img/banniere.jpg" alt="banniere telethon" />

		<div id="container2">
			<div id="text"></div>
		</div>

		<div id="chat">
			<img id="chat" src="img/chat1.png" alt="un chat" />
		</div>

		<div id="bubule"></div>

		<div id="bubule2"></div>
		
		<div id="container3">
			<div id="text2"></div>
		</div>
		
		<div id="container">
			<button class="button" id="run_button">RUN</button>
			<button class="button" id="reset_button">RESET</button>
			<input type="text" id="save_name" placeholder="ex: amazingName"/>
			<button class="button" id="save_button">SAVE MAP</button>
			<button class="button" id="load_button">LOAD MAP</button>
			
			<pre id="editor"></pre>
		</div>

	</body>

	<script src="js/jquery.min.js" type="text/javascript"></script>
	<script src="js/ace-builds/src-noconflict/ace.js" type="text/javascript"></script>
	<script src="js/main.js" type="text/javascript"></script>
	<script src="js/content.js" type="text/javascript"></script>
	<script src="js/runLoop.js" type="text/javascript"></script>

</html>