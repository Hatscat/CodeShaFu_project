<!-- *** CodShaFu Editor ! :p *** -->

<!DOCTYPE html>
<html>

	<head>
	  <meta charset="utf-8" />
	  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
	  <title>Foundation | Welcome</title>
	  <link rel="stylesheet" href="css/foundation.css" />
	  <link rel="stylesheet" href="css/style.css" />
	  <script src="js/libs/vendor/modernizr.js"></script>
	</head>

	<body> <!-- id="cleanScreen" to remove some stuffs -->
		<div class="row">
			<div class="large-5 large-offset-4 columns">
		    		<h1>Titre Map</h1>
			</div>
		</div>
		<div class="rowCustom">
			<div class="large-2 columns">
				<div class="container">
					<p class="text-center"><!-- start slipsum code -->
						My money's in that office, right? If she start giving me some bullshit about it ain't there, and we got to go someplace else and get it, I'm gonna shoot you in the head then and there. Then I'm gonna shoot that bitch in the kneecaps, find out where my goddamn money is. She gonna tell me too. Hey, look at me when I'm talking to you, motherfucker. You listen: we go in there, and that nigga Winston or anybody else is in there, you the first motherfucker to get shot. You understand?</p>
				</div>
			</div>
		    <canvas class="large-6 large-offset-1 columns" id="canvas"></canvas>

		    <div class="large-2 large-offset-1 columns">
		    	<div class="container">
		    		<p class="text-center"><!-- start slipsum code -->
		    			My money's in that office, right? If she start giving me some bullshit about it ain't there, and we got to go someplace else and get it, I'm gonna shoot you in the head then and there. Then I'm gonna shoot that bitch in the kneecaps, find out where my goddamn money is. She gonna tell me too. Hey, look at me when I'm talking to you, motherfucker. You listen: we go in there, and that nigga Winston or anybody else is in there, you the first motherfucker to get shot. You understand?</p>
		    	</div>
		    </div>

		</div>

		<div class="rowCustom">
		    <div class="large-2 large-offset-3 columns">
		    	<button class="button" id="run_bt">RUN</button>
		    </div>
		    <div class="large-2 columns">
		    	<button class="button" id="step_bt">STEP</button>
		    </div>
		    <div class="large-2 columns end">
		    	<button class="button" id="reset_bt">RESET</button>
		    </div>
		</div>

		<div class="rowCustom">
		    <div class="large-8 large-offset-2 columns">
		    	<pre id="editor"></pre>
		    </div>

		</div>


		<script src="js/libs/vendor/jquery.js"></script>
		<script src="js/libs/foundation.min.js"></script>
		<script src="js/libs/ace.js" type="text/javascript"></script>
		<script>
		  $(document).foundation();
		</script>
		<script>
		    editor = ace.edit("editor");
		    editor.setTheme("ace/theme/monokai");
		    editor.getSession().setMode("ace/mode/javascript");
		</script>

	</body>
	

</html>