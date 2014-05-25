<?php

	include('../config.php');
	// fake auth
	$niveau = 'superniveau';




	print('<head>
			<meta charset="utf-8">
			</head>
		');

	if (isset($_POST['element']) && $_POST['element'] != '') {


		if (@unlink('../elements/'.$niveau.'/'.$_POST['element'].'')) {

			$link = mysqli_connect($mysql_host, $mysql_user, $mysql_password, $mysql_database);
			if (mysqli_connect_errno()) {
				print("Echec de la connexion à la BDD");
				exit();
			}
			if (mysqli_query($link, "DELETE FROM ".$mysql_table_images." WHERE id_niveau='".$niveau."' AND url_image LIKE '%".$_POST['element']."';") === TRUE) {
				
				print('<center>
					Elément effacé<br /><br />
					<a href="/">retour à la page d\'ajout</a><br />
					<a href="/remove">retour à la page de suppression</a><br />
					</center>');
			}

			else {
				print('<center>
					Erreur lors de la suppression de l\'élément<br /><br />
					<a href="/">retour à la page d\'ajout</a><br />
					<a href="/remove">retour à la page de suppression</a><br />
					</center>');
			}
			mysqli_close($link);


		}
		else {

			print('<center>
				Erreur lors de la suppression de l\'élément<br /><br />
				<a href="/">retour à la page d\'ajout</a><br />
				<a href="/remove">retour à la page de suppression</a><br />
				</center>');
		}
	}

	else {

		if ($dossier = @opendir('../elements/'.$niveau.'')) {

			print('<center>
				<h1>Effacer un élément:</h1>
				<form action="" method="POST">
			');

			while (false !== ($fichier = readdir($dossier))) {

				if ($fichier != '.' && $fichier != '..' && $fichier != 'index.php') {
					print('
						<div style="width: 400px; margin: 2px auto; border: 1px solid black; border-radius: 2px;">
							<input type="radio" name="element" value="'.$fichier.'" />'.$fichier.'
							<img src="../elements/'.$niveau.'/'.$fichier.'" height=50 width=50 />
						</div>');
				}
			}

			print('
				<input type="submit" value="Effacer cet élément"/>
				</form>
				<br /><br />
				<a href="/">retour à la page d\'ajout</a><br />
				<a href="/remove">retour à la page de suppression</a><br />
				</center>');
		}

		else {

			print('<center>niveau inconnu.</center>');
		}
		
	}

?>