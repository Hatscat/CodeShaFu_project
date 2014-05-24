<?php

	include('config.php');

	print('<head>
			<meta charset="utf-8">
			</head>
		');

	if (isset($_POST['niveau']) && $_POST['niveau'] != '')
	{

		print('<center>');
		$image_max_height = 150; // en pixel
		$image_max_width = 150; // en pixel
		$extensions_valides = array( 'jpg' , 'jpeg' , 'gif' , 'png' );
		$extension_upload = strtolower(substr(strrchr($_FILES['image']['name'], '.'),1));
		$image_sizes = getimagesize($_FILES['image']['tmp_name']);

		if ($_FILES['image']['error'] > 0)
			print("Erreur lors du transfert");
		else if ($_FILES['image']['size'] > 512000)
			print("Le fichier est trop gros");

		else if (!in_array($extension_upload,$extensions_valides))
			print("Extension incorrecte");
		else if ($image_sizes[0] > $image_max_width OR $image_sizes[1] > $image_max_height)
			print("Image trop grande");


		else {

			if (@opendir("elements/".$_POST['niveau']) == FALSE)
				mkdir("elements/".$_POST['niveau']);

			$nom = md5(uniqid(rand(), true)).".".$extension_upload;
			while (file_exists("elements/".$_POST['niveau']."/".$nom) == TRUE)
				$nom = md5(uniqid(rand(), true)).".".$extension_upload;

			$resultat = move_uploaded_file($_FILES['image']['tmp_name'], "elements/".$_POST['niveau']."/".$nom);
			if ($resultat)
				print("Element uploadé :<br />"."<img src=\"elements/".$_POST['niveau']."/".$nom."\" width=150 height=150 />");

			$link = mysqli_connect($mysql_host, $mysql_user, $mysql_password, $mysql_database);
			if (mysqli_connect_errno()) {
				print("Echec de la connexion à la BDD");
				exit();
			}
			if (mysqli_query($link, "INSERT INTO ".$mysql_table_images." (id_niveau, url_image) VALUES ('".$_POST['niveau']."', 'http://".$site_url."/elements/".$_POST['niveau']."/".$nom."');") === TRUE) {
				print("<br />Element ajouté avec succès.\n");
			}
			else {
				print("<br />Erreur lors de la sauvegarde de l'élément.\n");
			}
			mysqli_close($link);

		}

		print('</center>');
	}
	else {
?>
		<center>
		<form method="POST" action="" enctype="multipart/form-data">
			<input type="hidden" name="niveau" value="superniveau" />
			Chargez votre image (jpg, jpeg, gif, png), max size 512ko, dimensions max 150px x 150px : <br />
			<input type="file" name="image" /><br />
			<input type="submit" value="Ajouter l'element" />
		</form>
		</center>

<?php
	}

	print('<center><br /><br />
	<a href="/">Ajouter un élément</a><br />
	<a href="/remove">Supprimer un élément</a><br />
	</center>');
?>