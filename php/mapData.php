<?php
	
	global $mapsDir;
	$mapsDir = "./maps/";

	if (!empty($_GET["requestMap"]))
	{
		$mapData = readMap($_GET["requestMap"]);
		echo json_encode($mapData);
	}
	else if (isset($_GET["setMap"]) && isset($_GET["mapName"]))
	{
		$mapData = $_GET["setMap"];
		$mapName = $_GET["mapName"];

		saveData($mapData, $mapName);
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