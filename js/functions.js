/* --------------------------------- Global Functions --------------------------------- */

function load_image (sImageSrc, p_private_config, p_editor_config, p_public_config) {

	var img = new Image();
	img.onload = function () {
		// TODO : loader
		p_private_config.tileset_sprites_sxy = cut_tileset(img, p_private_config.tileset_tilesize);
		loading_end(p_private_config, p_editor_config, p_public_config);
	};
	img.src = sImageSrc;
	return img;
}

function is_square_over (xywh) {

	if (mouse.x >= xywh[0] && mouse.x < xywh[0] + xywh[2] && mouse.y >= xywh[1] && mouse.y < xywh[1] + xywh[3]) {
		return true;
	}
	return false;
}

function cut_tileset (tileset_img, tile_size) {

	var col_nb = tileset_img.width / tile_size;
	var row_nb = tileset_img.height / tile_size;
	var sprites = [];

	for (var r = row_nb; r--;) {
		for (var c = col_nb; c--;) {
			sprites.push({sx: tile_size * c, sy: tile_size * r});
		}
	}
	return sprites;
}

function draw_stroke_box (xywh, color, alpha, size, p_private_config) {

	if (size) {
		p_private_config.buffer_ctx.strokeStyle = color;
		p_private_config.buffer_ctx.lineWidth = size;
		p_private_config.buffer_ctx.strokeRect(xywh[0], xywh[1], xywh[2], xywh[3]);
	}

	p_private_config.buffer_ctx.fillStyle = color;
	p_private_config.buffer_ctx.globalAlpha = alpha;
	p_private_config.buffer_ctx.fillRect(xywh[0], xywh[1], xywh[2], xywh[3]);
	p_private_config.buffer_ctx.globalAlpha = 1;
}

function create_empty_map (p_private_config, p_editor_config, p_public_config) {

	p_public_config.map = [];

	for (var i = p_private_config.tiles_nb; i--; p_public_config.map[i] = new Tile(0, i, p_public_config));
	p_private_config.active_tile = 0;
	show_script(p_private_config, p_public_config.map[0]);
}

function show_script (p_private_config, p_tile) {

	p_private_config.ace_editor.setValue(p_tile.script);
	//console.log('script loaded');
}

function save_script (p_private_config, p_tile) {

	p_tile.script = p_private_config.ace_editor.getValue();
	p_tile._can_setup = true;
	//console.log('script saved');
}


/*
function readJsonMap (jsonMap) {
	try
	{
		var originalMap = JSON.parse(jsonMap);
		originalMap = JSON.parse(originalMap);
		
		//console.log("originalMap : " + originalMap.aMap) //ok

		for (var i = 0; i < originalMap.aMap.length; i++) // les colonnes
		{	

			for (var j = 0; j < originalMap.aMap[i].length; j++) // les lignes
			{
				switch (originalMap.aMap[i][j].id)
				{
					case "ground" :
						globalVar.aMap[i][j] = new Content(originalMap.aMap[i][j].id, globalVar.aImg_Content[0], originalMap.aMap[i][j].script);
					break;
					case "fish" :
						globalVar.aMap[i][j] = new Content(originalMap.aMap[i][j].id, globalVar.aImg_Content[1], originalMap.aMap[i][j].script);
					break;
					case "key" :
						globalVar.aMap[i][j] = new Content(originalMap.aMap[i][j].id, globalVar.aImg_Content[2], originalMap.aMap[i][j].script);
					break;
					case "rat" :
						globalVar.aMap[i][j] = new Content(originalMap.aMap[i][j].id, globalVar.aImg_Content[3], originalMap.aMap[i][j].script);
					break;
					case "cat" :
						globalVar.aMap[i][j] = new Content(originalMap.aMap[i][j].id, globalVar.aImg_Content[4], originalMap.aMap[i][j].script);
					break;
					case "flower" :
						globalVar.aMap[i][j] = new Content(originalMap.aMap[i][j].id, globalVar.aImg_Content[5], originalMap.aMap[i][j].script);
					break;
					case "tree" :
						globalVar.aMap[i][j] = new Content(originalMap.aMap[i][j].id, globalVar.aImg_Content[6], originalMap.aMap[i][j].script);
					break;
					case "chest" :
						globalVar.aMap[i][j] = new Content(originalMap.aMap[i][j].id, globalVar.aImg_Content[7], originalMap.aMap[i][j].script);
					break;
					case "dog" :
						globalVar.aMap[i][j] = new Content(originalMap.aMap[i][j].id, globalVar.aImg_Content[8], originalMap.aMap[i][j].script);
					break;
					case "hole" :
						globalVar.aMap[i][j] = new Content(originalMap.aMap[i][j].id, globalVar.aImg_Content[9], originalMap.aMap[i][j].script);
					break;
				}

				globalVar.aMap[i][j].x_px = i * globalVar.iTileSize;
				globalVar.aMap[i][j].y_px = j * globalVar.iTileSize;

				globalVar.aMap[i][j].x = i;
				globalVar.aMap[i][j].y = j;
			}
		}
		//return map;
	}
	catch (err) 
	{
		console.log("fuck you");
		create_empty_map();
	}
}

function loadMap (map_name) {
	$.ajax("php/mapData.php", {

		data: {"requestMap": map_name},
		cache: false,
		success: function (datas)
		{
			globalVar.oActiveTile = null;

			var jsonMap = datas;
			if (jsonMap == "\"miss\"" || !jsonMap.length) // == pas de map
			{
				create_empty_map();
			}
			else
			{
				readJsonMap(jsonMap);
				//globalVar.oActiveTile = {x: 0, y: 0};
				//globalVar.aMap[globalVar.oActiveTile.x][globalVar.oActiveTile.y].showScript();
			}
		},
		error: function (datas) {
			create_empty_map();
		}
	});
}

document.getElementById("reset_button").onclick = function()
{
	if (confirm("êtes vous sûr ?")) create_empty_map();
}

document.getElementById("save_button").onclick = function()
{
	var jsData = {aMap: []}; //globalVar.aMap

	for (var i = 0; i < globalVar.aMap.length; i++) // les colonnes
	{	
		jsData.aMap[i] = [];

		for (var j = 0; j < globalVar.aMap[0].length; j++) // les lignes
		{
			jsData.aMap[i][j] = {};
			jsData.aMap[i][j].id = globalVar.aMap[i][j].id;
			jsData.aMap[i][j].script = globalVar.aMap[i][j].script;
		}
	}
	//console.log(jsData);
	var jsonData = JSON.stringify(jsData);

	var mapName = document.getElementById("save_name").value;

	$.ajax("php/mapData.php", {

		data: {"setMap": jsonData, "mapName": mapName},
		cache: false,
		success: function(datas)
		{
			console.log("success");
		},
		error: function(datas)
		{
			console.log("error : " + datas);
		}
	});

	document.getElementById("save_name").value = "";
	create_empty_map();
}

document.getElementById("load_button").onclick = function()
{
	var mapName = document.getElementById("save_name").value;
	loadMap(mapName);
}

function collision (aSelf, aTarget) // aSelf = [x, y]; aTarget = [x, y];
{
	switch (globalVar.aMap[aTarget[0]][aTarget[1]])
	{
		case globalVar.aMap[aSelf[0]-1][aSelf[1]] : // collision: cible à gauche
			return [-1, 0];
		break;
		case globalVar.aMap[aSelf[0]+1][aSelf[1]] : // collision: cible à droite
			return [1, 0];
		break;
		case globalVar.aMap[aSelf[0]][aSelf[1]-1] : // collision: cible en haut
			return [0, -1];
		break;
		case globalVar.aMap[aSelf[0]][aSelf[1]+1] : // collision: cible en bas
			return [0, 1];
		break;
		default : // pas de collision
			return false;
		break;
	}
}


var logNumber = 0;
var logLimit  = 0;

function consoleMap() {
    console.log('--------- MAP --------');
    for (var j = 0; j < globalVar.aMap[0].length; j++) {
        var s = '';
		for(var i = 0; i < globalVar.aMap.length; i++) {
		    if (globalVar.aMap[i][j].id === 'hole') {
		        s += '.';
	        } else {
	            s += 'o';
	        }
		}
		console.log(s);
	}
}

function swap (direction, x, y) // ok
{
    if (logNumber < logLimit)
    {
	    consoleMap();
	}
	

	var newX = x;
	var newY = y;


	if (direction == "y" && y < globalVar.aMap[x].length + 1)
	{
		newY += 1;
	}
	
	else if (direction == "x" && x < globalVar.aMap.length + 1)
	{
		newX += 1;
	}

	else if (direction == "-y" && y > 0) // ok
	{
		newY -= 1;
	}
	
	else if (direction == "-x" && x > 0) // ok
	{
		newX -= 1;
	}
	
	
	var t = globalVar.aMap[x][y];
	
	globalVar.aMap[x][y]   = globalVar.aMap[newX][newY];
	globalVar.aMap[x][y].x = x;
	globalVar.aMap[y][y].y = y;
	
	globalVar.aMap[newX][newY]   = t;
	globalVar.aMap[newX][newY].x = newX;
	globalVar.aMap[newX][newY].y = newY;

	
	if (logNumber < logLimit) {
	    consoleMap();
    	logNumber += 1;
	}
	
}

function fight (A, B) // ok 	A = { life: #, attack: #, defense: # }
						//ou	A = { life: this.state.life, attack: this.state.attack, defense: this.state.defense }
{
	//while (A.life > 0 && B.life > 0)
	//{
	B.life -= A.attack - B.defense;
	A.life -= B.attack - A.defense;
	//}
	if (A.life <= 0)
	{
		//globalVar.aMap[A.x][A.y] = new Content("ground", globalVar.aImg_Content[0]);
		return false; // A est mort
	}
	else
	{
		//globalVar.aMap[B.x][B.y] = new Content("ground", globalVar.aImg_Content[0]);
		return true; // A est vivant
	}
}

*/