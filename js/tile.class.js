/* ******* Content class ******* */

var Content = function (id, XY_imgSource, script) /* la classe de tout ! */
{
	this.x = 0;
	this.y = 0;
	this.x_px = 0;
	this.y_px = 0;
	this.id = id;
	this.script = script;
	this.imgSource_sx = XY_imgSource.sx;
	this.imgSource_sy = XY_imgSource.sy;
	this.w = globalVar.iTileSize;
	this.h = globalVar.iTileSize;
	this.state = {};
	
	/* pour les "models" de la toolsbox */
	this.bDragged = false;
	this.iOffset_X = 0;
	this.iOffset_Y = 0;

	this.aBox = [this.x_px, this.y_px, this.w, this.h];

	this.draw = function ()
	{

		globalVar.context.drawImage(globalVar.imgTileset,
			this.imgSource_sx, this.imgSource_sy, globalVar.iTileSize, globalVar.iTileSize,
			this.x_px, this.y_px, this.w, this.h);


		this.aBox[0] = this.x_px;
		this.aBox[1] = this.y_px;
	}

	this.drawCopy = function (x, y)
	{

		globalVar.context.drawImage(globalVar.imgTileset,
			this.imgSource_sx, this.imgSource_sy, globalVar.iTileSize, globalVar.iTileSize,
			x, y, this.w, this.h);

		this.aBox[0] = this.x_px;
		this.aBox[1] = this.y_px;
	}



	this.showScript = function ()
	{
		globalVar.editor.setValue(this.script);
	}

	this.saveScript = function ()
	{
		this.script = globalVar.editor.getValue();
		//console.log(this.script);
	}

	this.runScript = function ()
	{
	    var that = this;
	    function moveLeft () {
	        that.moveLeft();
	    }
	    function moveRight () {
	        that.moveRight();
	    }
	    function moveTop () {
	        that.moveTop();
	    }
	    function moveBottom () {
	        that.moveBottom();
	    }
	    var left  = moveLeft;
	    var right = moveRight;
	    var top   = moveTop;
	    var bottom= moveBottom;
	    
		eval(this.script);
	}


	this.moveLeft = function ()
	{
		swap("-x", this.x, this.y);
	}
	this.moveRight = function ()
	{
		swap("x", this.x, this.y);
	}
	this.moveTop = function ()
	{
		swap("-y", this.x, this.y);
	}
	this.moveBottom = function ()
	{
		swap("y", this.x, this.y);
	}

	this.detection = function (sId)
	{	
		switch (sId)
		{
			case globalVar.aMap[this.x][this.y].id : // detection: cible sur this
				return [this.x, this.y];
			break;
			case globalVar.aMap[this.x-1][this.y].id : // detection: cible à gauche
				return [this.x-1, this.y];
			break;
			case globalVar.aMap[this.x+1][this.y].id : // detection: cible à droite
				return [this.x+1, this.y];
			break;
			case globalVar.aMap[this.x][this.y-1].id : // detection: cible en haut
				return [this.x, this.y-1];
			break;
			case globalVar.aMap[this.x][this.y+1].id : // detection: cible en bas
				return [this.x, this.y+1];
			break;
			// case globalVar.aMap[this.x-1][this.y-1].id : // detection: cible en haut à gauche
			// 	return [-1, -1];
			// break;
			// case globalVar.aMap[this.x+1][this.y-1].id : // detection: cible en haut à droite
			// 	return [1, -1];
			// break;
			// case globalVar.aMap[this.x-1][this.y+1].id : // detection: cible en bas à gauche
			// 	return [-1, 1];
			// break;
			// case globalVar.aMap[this.x+1][this.y+1].id : // detection: cible en bas à droite
			// 	return [1, 1];
			// break;
			default : // pas de detection
				return false;
			break;
		}
	}
	// this.reset = function ()
	// {
	// 	this.oTarget = null;
	// }
}

