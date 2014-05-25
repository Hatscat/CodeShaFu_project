<!-- *** CodShaFu Editor ! :p *** -->
<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>CodShaFu</title>
	<link rel="stylesheet" href="css/foundation.css" />
	<script src="js/vendor/modernizr.js"></script>
</head>

<body> <!-- id="cleanScreen" to remove some stuffs -->

	<?php
		error_reporting(E_ALL);
		include("config.php");
		$connexion = new PDO($source, $utilisateur, $motDePasse);

		try
		{
			$connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$requete = 'SELECT ID, nomFichier FROM lvl';
			$resultat = $connexion->query($requete);

			if($resultat->rowCount() == 0)
			{
				Header('Location:index.php');
				die();
			}

		}
		catch(PDOException $e)
		{
			print 'Erreur PDO : '.$e->getMessage().'<br />';
			die();
		}
	?>
	<br/><br/><br/>
	<div class="row">
		<div class="large-4 large-offset-4 columns">
			<h1>Level Selection</h1>
		</div>
	</div>

	<div class="row">
		<div class="large-6 large-offset-3 columns">
			<form method="post" action="play_game.php">
				<br/><br/><br/>
				<div class="row">
					<div class="large-4 columns"
						<label for="blueprint"  class="right inline" >Select Level  :</label>
					</div>

					<div class="large-6 columns">
						<select name="lvl">
							<?php
								$temp = '<option value="none" selected>None</option>';

								foreach ($resultat as $ligne) 
								{
									$temp .= '<option value="'. $ligne["ID"] .'">'.$ligne["nomFichier"].' </option>';
								}

								echo $temp;
							?>
						</select>
					</div>
				</div>

				<br/>

				<div class="row">
					<div class="large-3 large-centered columns">
						<input type="submit" class="large radius round button" value="Play"/>
					</div>
				</div>

			</form>

		</div>
	</div>




	<script src="js/libs/vendor/jquery.js"></script>
	<script src="js/libs/foundation.min.js"></script>
	<script>
	$(document).foundation();
	</script>

</body>


</html>