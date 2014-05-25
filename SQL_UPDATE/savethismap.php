<?php

	include('config.php');







	// recuperer variable post ID MAP
	$table_name = 'maphackathon42';

	// initialisation de la MAP
	$map = array();
	$i = 1;
	while ($i <= 112) {
		$map[$i] = array();
		$map[$i]['id'] = $i;
		if ($i == 34)
			$map[$i]['image'] = 'http://codshafu.comze.com/elements/superniveau/ab1f19fb9a192c1c1fa223c3e2a71222.png';
		else
			$map[$i]['image'] = 'http://codshafu.comze.com/elements/superniveau/498206239258ccb757a1d34c17f77885.png';
		$i++;
	}











	// ENREGISTREMENT DANS LA BDD

	$link = mysqli_connect($mysql_host, $mysql_user, $mysql_password, $mysql_database);
	if (mysqli_connect_errno()) {
		print("Echec de la connexion à la BDD");
		exit();
	}

	if (mysqli_query($link, "DROP TABLE IF EXISTS ".$table_name.";") === FALSE) {

		print("<br />Erreur pendant la sauvegarde de la table '".$table_name."'.");
		exit();
	}
	if (mysqli_query($link, "

		CREATE TABLE ".$table_name."(
		id_cellule int(3) NOT NULL AUTO_INCREMENT ,
		img_cellule varchar(512) COLLATE latin1_general_ci NOT NULL ,
		PRIMARY KEY (id_cellule)
		);") === FALSE) {


		print("<br />Erreur pendant la creation de la table '".$table_name."'.");
	}
	else {

		$current = 1;
		while ($current <= 112) {
			if (mysqli_query($link, "INSERT INTO ".$table_name." (id_cellule, img_cellule) VALUES (".$map[$current]['id'].", '".$map[$current]['image']."');") === FALSE) {
				print("<br />Erreur pendant la sauvegarde de la colonne #".$current.".");
			}
			$current++;
		}
		print('ok');
	}
	mysqli_close($link);

?>
