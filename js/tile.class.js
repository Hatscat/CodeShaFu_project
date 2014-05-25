/* ******* Tile class ******* */

var Tile = function (p_id, p_pos, p_public_config) {

	this.id 			= p_id;
	this.pos 			= p_pos;
	this.game_config 	= p_public_config;
	this.script 		= this.game_config.setup_script + this.game_config.update_script;
	this._below_self 	= null;
	this._can_setup 	= false;
	this._can_update 	= true;
	this.setup 			= {};
	this.update_script 	= {};
}

Tile.prototype.moveX = function (p_step) {

	if ( !(this.game_config.step_count % (Math.abs(1 / p_step) | 0) | 0) // délai
		&& ( (p_step < 0 && this.pos % this.game_config.col_nb > 0) // bord gauche
			|| (p_step > 0 && this.pos % this.game_config.col_nb < this.game_config.col_nb - 1) ) ) { // bord droit
		
		this._manage_new_pos(this.pos, p_step, false);
	}
}

Tile.prototype.moveY = function (p_step) {

	if ( !(this.game_config.step_count % (Math.abs(1 / p_step) | 0) | 0) // délai
		&& ( (p_step < 0 && this.pos > this.game_config.col_nb) // bord haut
			|| (p_step > 0 && this.pos + this.game_config.col_nb < this.game_config.col_nb * this.game_config.row_nb) ) ) { // bord bas

		this._manage_new_pos(this.pos, p_step, true);
	}
}

Tile.prototype._manage_new_pos = function (p_old_pos, p_step, p_y_axis) {

	this.pos = p_old_pos + (p_step / Math.abs(p_step)) * (p_y_axis * this.game_config.col_nb || 1);

	if (this._below_self) { // il y a quelqu'un sous lui
		this.game_config.map[p_old_pos] = this._below_self;
	} else {
		this.game_config.map[p_old_pos] = new Tile(0, p_old_pos, this.game_config);
	}
	this._below_self = this.game_config.map[this.pos]; // on met le tile actuel sous celui-ci
	this.game_config.map[this.pos] = this; // puis on met le nouveau tile à sa place dans la map
}

	// this.x = 0;
	// this.y = 0;
	// this.x_px = 0;
	// this.y_px = 0;
	// this.id = id;
	// this.script = script;
	// this.imgSource_sx = XY_imgSource.sx;
	// this.imgSource_sy = XY_imgSource.sy;
	// this.w = globalVar.iTileSize;
	// this.h = globalVar.iTileSize;
	// this.state = {};
	
	// /* pour les "models" de la toolsbox */
	// this.bDragged = false;
	// this.iOffset_X = 0;
	// this.iOffset_Y = 0;

	// this.aBox = [this.x_px, this.y_px, this.w, this.h];

	// /*this.draw = function ()
	// {

	// 	globalVar.context.drawImage(globalVar.imgTileset,
	// 		this.imgSource_sx, this.imgSource_sy, globalVar.iTileSize, globalVar.iTileSize,
	// 		this.x_px, this.y_px, this.w, this.h);


	// 	this.aBox[0] = this.x_px;
	// 	this.aBox[1] = this.y_px;
	// }

	// this.drawCopy = function (x, y)
	// {

	// 	globalVar.context.drawImage(globalVar.imgTileset,
	// 		this.imgSource_sx, this.imgSource_sy, globalVar.iTileSize, globalVar.iTileSize,
	// 		x, y, this.w, this.h);

	// 	this.aBox[0] = this.x_px;
	// 	this.aBox[1] = this.y_px;
	// }*/



	// this.showScript = function () {
	// 	globalVar.editor.setValue(this.script);
	// }

	// this.saveScript = function ()
	// {
	// 	this.script = globalVar.editor.getValue();
	// 	//console.log(this.script);
	// }

	// this.runScript = function ()
	// {
	//     var that = this;
	//     function moveLeft () {
	//         that.moveLeft();
	//     }
	//     function moveRight () {
	//         that.moveRight();
	//     }
	//     function moveTop () {
	//         that.moveTop();
	//     }
	//     function moveBottom () {
	//         that.moveBottom();
	//     }
	//     var left  = moveLeft;
	//     var right = moveRight;
	//     var top   = moveTop;
	//     var bottom= moveBottom;
	    
	// 	eval(this.script);
	// }


	// this.moveLeft = function ()
	// {
	// 	swap("-x", this.x, this.y);
	// }
	// this.moveRight = function ()
	// {
	// 	swap("x", this.x, this.y);
	// }
	// this.moveTop = function ()
	// {
	// 	swap("-y", this.x, this.y);
	// }
	// this.moveBottom = function ()
	// {
	// 	swap("y", this.x, this.y);
	// }

	// this.detection = function (sId)
	// {	
	// 	switch (sId)
	// 	{
	// 		case globalVar.aMap[this.x][this.y].id : // detection: cible sur this
	// 			return [this.x, this.y];
	// 		break;
	// 		case globalVar.aMap[this.x-1][this.y].id : // detection: cible à gauche
	// 			return [this.x-1, this.y];
	// 		break;
	// 		case globalVar.aMap[this.x+1][this.y].id : // detection: cible à droite
	// 			return [this.x+1, this.y];
	// 		break;
	// 		case globalVar.aMap[this.x][this.y-1].id : // detection: cible en haut
	// 			return [this.x, this.y-1];
	// 		break;
	// 		case globalVar.aMap[this.x][this.y+1].id : // detection: cible en bas
	// 			return [this.x, this.y+1];
	// 		break;
	// 		// case globalVar.aMap[this.x-1][this.y-1].id : // detection: cible en haut à gauche
	// 		// 	return [-1, -1];
	// 		// break;
	// 		// case globalVar.aMap[this.x+1][this.y-1].id : // detection: cible en haut à droite
	// 		// 	return [1, -1];
	// 		// break;
	// 		// case globalVar.aMap[this.x-1][this.y+1].id : // detection: cible en bas à gauche
	// 		// 	return [-1, 1];
	// 		// break;
	// 		// case globalVar.aMap[this.x+1][this.y+1].id : // detection: cible en bas à droite
	// 		// 	return [1, 1];
	// 		// break;
	// 		default : // pas de detection
	// 			return false;
	// 		break;
	// 	}
	// }
	// // this.reset = function ()
	// // {
	// // 	this.oTarget = null;
	// // }
//}

