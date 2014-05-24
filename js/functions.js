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

function dragStoped(e, div) {
	console.log('caca')
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

	/*for (var s = 1, c = iColNb, r = iRowNb-1;
		c ? c-- : 0 || r-- ? s-- ? c = iColNb-1 : 0 : 0;
		globalVar.aImg_Content[(iColNb)*((iRowNb*r)+(1-r))-(iColNb-c)] = {sx: globalVar.iTileSize * c, sy: globalVar.iTileSize * r});*/
	
}

// function overflew_tile (p_game)
// {
// 	var x = (p_game.input.activePointer.worldX - p_game.config.hud_column_width) / p_game.gd.cell_size | 0;
// 	var y = ((p_game.input.activePointer.worldY - p_game.config.hud_height) / p_game.gd.cell_size | 0) * p_game.gd.column_nb;
	
// 	return x + y;
// }

function draw_stroke_box (xywh, color, size, p_private_config) {

	p_private_config.buffer_ctx.strokeStyle = color;
	p_private_config.buffer_ctx.lineWidth = size;
	p_private_config.buffer_ctx.strokeRect(xywh[0], xywh[1], xywh[2], xywh[3]);

	p_private_config.buffer_ctx.fillStyle = color;
	p_private_config.buffer_ctx.globalAlpha = 0.25;
	p_private_config.buffer_ctx.fillRect(xywh[0], xywh[1], xywh[2], xywh[3]);
	p_private_config.buffer_ctx.globalAlpha = 1;
}

function create_empty_map (p_private_config, p_editor_config, p_public_config) {

	p_public_config.map = [];

	for (var i = p_private_config.tiles_nb; i--; p_public_config.map[i] = new Tile(0, p_public_config));
	p_private_config.active_tile = {x:0, y:0};
	//map[0].show_script();

	//return map;

	/*for (var i = 0; i < 16; i++)  // les colonnes
	{
		map[i] = [];

		for (var j = 0; j < 7; j++) // les lignes
		{
			map[i][j] = new Content("hole", globalVar.aImg_Content[globalVar.aImg_Content.length-1], "");
		}
	}*/
	//globalVar.aMap = map;
	//globalVar.oActiveTile = {x: 0, y: 0};
	//globalVar.aMap[globalVar.oActiveTile.x][globalVar.oActiveTile.y].showScript();
}
/*
function draw_map_grid (p_private_config) {

	for (var i = p_map.length; i--;) {
		p_private_config.buffer_ctx.strokeStyle = "#6f6";
		p_private_config.buffer_ctx.lineWidth = 1;
		p_private_config.buffer_ctx.strokeRect(
			i * p_private_config.tilemap_size,
			j * p_private_config.tilemap_size,
			p_private_config.tilemap_size,
			p_private_config.tilemap_size);
	}
}*/
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