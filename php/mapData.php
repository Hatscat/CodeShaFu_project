<?php
	
	global $mapsDir;
	$mapsDir = "./maps/";

	if (!empty($_POST["requestMap"]))
	{
		$mapData = readMap($_POST["requestMap"]);
		echo json_encode($mapData);
	}
	else if (isset($_POST["setMap"]) && isset($_POST["mapName"]) && isset($_POST["hints"]) && isset($_POST["rules"]))
	{
		$mapData = $_POST["setMap"];
		$mapName = $_POST["mapName"];
		$hints	 = $_POST["hints"];
		$rules	 = $_POST["rules"];
		saveData($mapData, $mapName);
		insertBDD($mapName, $hints, $rules);
	}
	else //infos manquantes
	{
		echo json_encode("miss");
	}

	function searchMaps ()
	{
		// parcourir l'arborescence des fichiers pour trouver une map en particulier
	}
	
	function saveData ($mapData, $mapName)
	{
		$fileName = "map_".$mapName.".json"; //$mapsDir.
		$filePointer = fopen($fileName, "w");
		fwrite($filePointer, $mapData);
		fclose($filePointer);
	}

	function insertBDD ($mapName, $hints, $rules)
	{
		include("../config.php");
		$connexion = new PDO($source, $utilisateur, $motDePasse);

		try
		{
			$connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$requete = 'INSERT INTO `lvl`(`ID`, `nomFichier`, `hints`, `rules`) VALUES ("","'.$mapName.'","'.$hints.'","'.$rules.'")';
			$resultat = $connexion->exec($requete);

		}
		catch(PDOException $e)
		{
			print 'Erreur PDO : '.$e->getMessage().'<br />';
			die();
		}
	}

	
	function readMap ($mapName)
	{
		$fileName = "map_".$mapName.".json"; //$mapsDir.

		if (file_exists($fileName))
		{
			$filePointer = fopen($fileName, "r");
			$fileSize = @filesize($fileName);
			$fileContent = fread($filePointer, $fileSize);
			return $fileContent;
			fclose($filePointer);
		}
		
	}
?>