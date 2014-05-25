<!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8">
			<style type="text/css">
				.ligne {
					display: block;
					width: 700px;
					height: 34px;
					margin: 1px auto;
					overflow: hidden;
				}
				.casenormale {
					margin-left: 1px;
					display: block;
					width: 34px;
					height: 34px;
					float: left;
					background-color: #777777;
					border: 1px solid #000000;
					overflow: hidden;
				}
				.caserouge {
					margin-left: 1px;
					display: block;
					width: 34px;
					height: 34px;
					float: left;
					background-color: #FF0000;
					border: 1px solid #000000;
					overflow: hidden;
				}
			</style>
		</head>
		<body>
		</body>
	</html>
<?php

	include('../config.php');

	$table_name = 'maphackathon42';

	$x = 1;
	$y = 1;

	print('<form action="" method=<div class="ligne">');

	$link = mysqli_connect($mysql_host, $mysql_user, $mysql_password, $mysql_database);
	if (mysqli_connect_errno()) {
		print("Echec de la connexion à la BDD");
		exit();
	}
	if ($result = mysqli_query($link, "SELECT id_cellule, img_cellule FROM ".$table_name." ORDER BY id_cellule ASC;") === FALSE) {

		print("<br />Erreur pendant la sauvegarde de la table '".$table_name."'.");
		exit();
	}
	else {

		print('<div class="ligne">');
		$current = 1;
		while ($row = mysqli_fetch_array($result, MYSQLI_BOTH)) {

			print('<div class="casenormale"><img src="'.$row['img_cellule'].'" width=32 height=32 /></div>');

			if (($current % 16) == 0)
				print('</div><div class="ligne">');
			$current++;
		}
		print('</div>');

	}
	mysqli_free_result($result);
	mysqli_close($link);

?>