<!-- *** CodShaFu Editor ! :p *** -->
<?php
	error_reporting(E_ALL);
	if(isset($_POST["lvl"]) )
	{
		include("config.php");
		$connexion = new PDO($source, $utilisateur, $motDePasse);

		try
		{
			$connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$requete = 'SELECT nomFichier, hints, rules FROM lvl WHERE ID="'.$_POST["lvl"].'"';
			$resultat = $connexion->query($requete);

			foreach ($resultat as $ligne) 
			{
				$nom 	= $ligne["nomFichier"] ? $ligne["nomFichier"] : 'nope';
				$hints 	= $ligne["hints"] ?  $ligne["hints"]:'nope';
				$rules 	= $ligne["rules"] ?  $ligne["rules"]:'nope';
			}

		}
		catch(PDOException $e)
		{
			print 'Erreur PDO : '.$e->getMessage().'<br />';
			die();
		}
		
	}
?>

<!DOCTYPE html>
<html>

	<head>
	  <meta charset="utf-8" />
	  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
	  <title>CodShaFu</title>
	  <link rel="stylesheet" href="css/foundation.css" />
	  <link rel="stylesheet" href="css/style.css" />
	  <script src="js/libs/vendor/modernizr.js"></script>
	</head>

	<body> <!-- id="cleanScreen" to remove some stuffs -->
		<div class="row">
			<div class="large-5 large-offset-4 columns">
		    		<h1 id="levelName" class="text-center"></h1>
			</div>
		</div>
		<div class="rowCustom">
			<div class="large-2 columns">
				<pre id="cat_dialog_editor"></pre>
			</div>

		    <div id="feedbackSave" class="large-6 columns large-offset-1 hide">
		    	<div class="container">
		    		<h1 id="message" class="text-center"></h1>
		    	</div>
		    </div>

		    <canvas class="large-8 columns" id="canvas"></canvas>
		    <div class="large-1 columns ">
	    		<?php 
	    			$temp = "";
	    			for($i = 0; $i<5;$i++)
	    				$temp.='<div id="'.$i.'"><img  src="img/tile'.$i.'.png" alt="tile"></div>';

	    			echo $temp;
	    		?>
		    </div>

    	    <div class="large-1 columns end">
        		<?php 
        			$temp = "";
        			for($i = 5; $i<10;$i++)
        				$temp.='<div id="'.$i.'"><img  src="img/tile'.$i.'.png" alt="tile"></div>';

        			echo $temp;
        		?>
    	    </div>


		</div>

		<div class="rowCustom">

			<div class="large-1 large-offset-2 columns">
				<button class="success button" id="home_bt">Home</button>
			</div>

		    <div class="large-1 large-offset-1 columns text-center">
		    	<button class="button" id="run_bt">RUN</button>
		    </div>
		    <div class="large-1 columns text-center">
		    	<button class="button" id="step_bt">STEP</button>
		    </div>
		    <div class="large-1 columns text-center">
		    	<button class="button" id="reset_bt">RESET</button>
		    </div>

		    <div class="large-1 columns text-center end">
		    	<button class="button" id="save_bt">SAVE</button>
		    </div>
		</div>

		<div class="rowCustom">

			<div class="large-2 columns">
				<img src="img/chat.png" alt="here's a cat">
			</div>

		    <div class="large-8 columns">
		    	<pre id="editor"></pre>
		    </div>

		    <div class="large-2 columns">
		    	<pre id="gm_rules_editor"></pre>
		    </div>

		</div>


		<script src="js/libs/vendor/jquery.js"></script>
		<script src="js/libs/jquery-ui-1.10.4.min.js"></script>
		<script src="js/libs/mouse.js"></script>
		<script src="js/libs/foundation.min.js"></script>
		<script src="js/libs/ace.js" type="text/javascript"></script>
		<script>
		  $(document).foundation();
		  is_editor = true
		  lvl = <?php echo isset($nom) ? json_encode($nom):json_encode('nope')  ?>;
		  hints = <?php echo isset($hints) ? json_encode($hints):json_encode('none') ?>;
		  rules = <?php echo isset($rules) ? json_encode($rules):json_encode('none') ?>;
		  name = <?php echo isset($_POST["mapName"]) ? json_encode($_POST["mapName"]):json_encode('false') ?>;
		</script>
		<script src="js/config.js" type="text/javascript"></script>
		<script src="js/functions.js" type="text/javascript"></script>
		<script src="js/draw.js" type="text/javascript"></script>
		<script src="js/tile.class.js" type="text/javascript"></script>
		<script src="js/events.js" type="text/javascript"></script>
		<script src="js/step.js" type="text/javascript"></script>
		<script src="js/init.js" type="text/javascript"></script>

	</body>
	
</html>