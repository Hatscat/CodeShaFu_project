function step (p_private_config, p_editor_config, p_public_config) {

	//p_private_config.can_edit = false;

	/*p_public_config.map.forEach(function (tile) {
		
		tile.eval_script();
	}*/

	//draw(p_private_config, p_editor_config, p_public_config);

	p_private_config.text.cat_dialog.innerHTML = p_editor_config.cat_dialog_text;
	p_private_config.text.gm_rules.innerHTML = p_editor_config.gm_rules_text;

	globalVar.context.fillStyle = "#000";
	globalVar.context.fillRect(0, 0, p_private_config.buffer.width, p_private_config.buffer.height);

	p_public_config.map.forEach(function (tile, i) {

		if (!p_private_config.is_paused) {
			
			if (tile.script.indexOf('this.setup') > -1 && tile.script.indexOf('this.update') > -1) { // one shoot

				if (!tile.setup_script) {
					tile.setup_script = eval(tile.script.slice(0, tile.script.indexOf('this.update')));
					tile.setup_script();
				}

				tile.update_script = eval(tile.script.slice(tile.script.indexOf('this.update')));
				tile.update_script();
			}
		}

		p_private_config.buffer_ctx.drawImage(
			p_private_config.tilset_img,
			p_private_config.tilset_sprites_sxy[tile.id].sx,
			p_private_config.tilset_sprites_sxy[tile.id].sy,
			p_private_config.tileset_tilesize,
			p_private_config.tileset_tilesize,
			(i % p_private_config.col_nb) * p_private_config.tile_size,
			(i / p_private_config.col_nb | 0) * p_private_config.tile_size);
	});

	p_private_config.ctx.drawImage(p_private_config.buffer, 0, -p_private_config.height_diff);

	p_private_config.step_count++;

//     globalVar.oldMap = [];
// 	for (var i = 0; i < globalVar.aMap.length; i++) {
// 	    globalVar.oldMap[i] = [];
// 		for(var j = 0;j < globalVar.aMap[i].length;j++)
// 		{
// 			globalVar.oldMap[i][j] = globalVar.aMap[i][j];
// 		}
// 	};

// 	var boxText = document.getElementById('text');
// 	boxText.innerHTML = globalVar.aText[globalVar.iTextIndex];

// 	var boxText2 = document.getElementById('text2');

// 	globalVar.context.fillStyle = "#000";
// 	globalVar.context.fillRect(0, 0, globalVar.iCanvas_w, globalVar.iCanvas_y);

// /* ****************** Scene ****************** */

// 	drawMap(globalVar.aMap);

// 	if (!globalVar.bPause) // le jeu en mode lecture + execution du code de l'éditeur
// 	{
// 		globalVar.oActiveTile = null;
// 		/* ****************** Content ****************** */
// 		if (!(((gameTime / 300) | 0) % 2) && globalVar.bNewTurn) // tour par tour
// 		{
// 			globalVar.bNewTurn = false;
// 			iTurn += 1;

// 			boxText2.innerHTML = "";
// 			for (var i = 0; i < globalVar.oldMap.length; i++) // les colonnes
// 			{	
// 				for (var j = 0; j < globalVar.oldMap[i].length; j++) // les lignes
// 				{
// 					// var props, sStateProps;

// 					// for (sStateProps in globalVar.oldMap[i][j]) {
// 					// 	props += sStateProps;
// 					// };

// 					var sState = JSON.stringify(globalVar.oldMap[i][j].state);
					
// 					var sText = "<b>" + globalVar.oldMap[i][j].id + " (" + i + ", " + j + ") :</b><br><em>"
// 								+ sState + "</em><br>"; //  + globalVar.oldMap[i][j].script

// 					if (!!globalVar.aMap[i][j].script)
// 					{
// 						boxText2.innerHTML += sText;
// 					}

// 					globalVar.oldMap[i][j].runScript();
// 				}
// 			}
// 		}
// 		else if (((gameTime / 300) | 0) % 2)
// 		{
// 			globalVar.bNewTurn = true;
// 		}
// 	}
// 	else // en pause == en mode edition
// 	{
// 		if (!!globalVar.oActiveTile)// && !!globalVar.aMap[0][0].aBox)
// 			var aTileBox = [
// 				globalVar.aMap[globalVar.oActiveTile.x][globalVar.oActiveTile.y].aBox[0],
// 				globalVar.aMap[globalVar.oActiveTile.x][globalVar.oActiveTile.y].aBox[1],
// 				globalVar.aMap[globalVar.oActiveTile.x][globalVar.oActiveTile.y].aBox[2],
// 				globalVar.aMap[globalVar.oActiveTile.x][globalVar.oActiveTile.y].aBox[3]
// 			];

// 		drawMapGrid();

// 		if (aTileBox) globalFunc.drawStrokeBox(aTileBox, "#f0f", 4);
// 		else globalVar.editor.setValue("");

// 		for (var i = 0; i < globalVar.aMap.length; i++) // les colonnes
// 		{
// 			for (var j = 0; j < globalVar.aMap[i].length; j++) // les lignes
// 			{
// 				if (!!globalVar.aMap[i][j].script)
// 				{
// 					//globalVar.aMap[i][j].reset(); // crado

// 					var aScriptedBox = [
// 						globalVar.aMap[i][j].aBox[0],
// 						globalVar.aMap[i][j].aBox[1],
// 						globalVar.aMap[i][j].aBox[2],
// 						globalVar.aMap[i][j].aBox[3]
// 					];

// 					globalFunc.drawStrokeBox(aScriptedBox, "#33f", 2);
// 				}
// 			}
// 		}

// 		if (globalVar.sMode == "editor")
// 		{
// 			globalVar.oToolsBox.display();
// 		}


// 		if (globalVar.bMouseDown) ////////////////******************************************----------------____________
// 		{
// 			var xi = ((globalVar.iMouse_x - globalVar.canvas.offsetLeft) / globalVar.iTileSize) | 0;
// 			var yj = ((globalVar.iMouse_y - globalVar.canvas.offsetTop) / globalVar.iTileSize) | 0;

// 			if (globalVar.oActiveTile) globalVar.aMap[globalVar.oActiveTile.x][globalVar.oActiveTile.y].saveScript();	
			
// 			if (xi >= 0 && yj >= 0 && xi < globalVar.aMap.length && yj < globalVar.aMap[0].length)
// 			{
// 				if (!globalVar.oActiveTile) globalVar.oActiveTile = {x: 0, y: 0};

// 				globalVar.oActiveTile.x = xi;
// 				globalVar.oActiveTile.y = yj;

// 				globalVar.aMap[globalVar.oActiveTile.x][globalVar.oActiveTile.y].showScript();
// 				globalVar.editor.focus();

// 				if (globalVar.bElementDrag)
// 				{
// 					globalVar.aMap[xi][yj] = new Content(globalVar.aId[globalVar.sElementDragId],
// 						globalVar.aImg_Content[globalVar.sElementDragId],
// 						"");
// 				}
// 			}

// 			else
// 			{
// 				globalVar.bElementDrag = false;

// 				for (var i = 0, c = globalVar.oToolsBox.aContent.length; i < c; i++)
// 				{
// 					if (globalFunc.isButtonClicked(globalVar.oToolsBox.aContent[i].aBox))
// 					{
// 						globalVar.bElementDrag = true;
// 						globalVar.sElementDragId = i;
// 						globalVar.oToolsBox.aContent[i].bDragged = false;
// 					}
// 				}
// 			}
// 		}
// 		else /* globalVar.bMouseDown = false; */
// 		{
// 			if (globalVar.bElementDrag)
// 			{
// 				for (var i = 0, c = globalVar.oToolsBox.aContent.length; i < c; i++)
// 				{
// 					if (i == globalVar.sElementDragId)
// 					{	
// 						if (!globalVar.oToolsBox.aContent[i].bDragged)
// 						{
// 							globalVar.oToolsBox.aContent[i].bDragged = true;
// 							globalVar.oToolsBox.aContent[i].iOffset_X = 
// 								globalVar.iMouse_x - globalVar.canvas.offsetLeft - globalVar.oToolsBox.aContent[i].x_px;
// 							globalVar.oToolsBox.aContent[i].iOffset_Y = 
// 								globalVar.iMouse_y - globalVar.canvas.offsetTop - globalVar.oToolsBox.aContent[i].y_px;
// 						}
						
// 						var local_x = globalVar.iMouse_x - globalVar.canvas.offsetLeft - globalVar.oToolsBox.aContent[i].iOffset_X;
// 						var local_y = globalVar.iMouse_y - globalVar.canvas.offsetTop - globalVar.oToolsBox.aContent[i].iOffset_Y;

// 						globalVar.oToolsBox.aContent[i].drawCopy(local_x, local_y);
// 					}
// 				}
// 			}
// 		}
// 	}

}
