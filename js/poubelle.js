// poubelle...


// dans le main.js :


bMonstreMort: false, ///// useless.... naaaaaannnnnnn
bEvalFait: false,


//globalVar.aMap[globalVar.oActiveTile.x][globalVar.oActiveTile.y].showScript();

//globalVar.aMap[0][0] = new Content("cat", globalVar.aImg_Content[0], ""); //ok

function collision (cat) // KO, so bad...........
{
	debugger;
	var bool = false;

	if(cat.xi != 0)
	{
		if(globalVar.aMap[cat.xi-1][cat.yj].id == "enemy" || globalVar.aMap[cat.xi-1][cat.yj].id == "empty" || globalVar.aMap[cat.xi-1][cat.yj].id == "end")
		{
			bool = true;
			return(globalVar.aMap[cat.xi-1][cat.yj]);
		}
	}

	if(cat.xi != 15)
	{
		if(globalVar.aMap[cat.xi+1][cat.yj].id == "enemy" || globalVar.aMap[cat.xi+1][cat.yj].id == "empty"|| globalVar.aMap[cat.xi+1][cat.yj].id== "end")
		{
			bool = true;	
			return(globalVar.aMap[cat.xi+1][cat.yj]);
		}

	}

	if(cat.yj != 0)
	{
		if(globalVar.aMap[cat.xi][cat.yj-1].id == "enemy" || globalVar.aMap[cat.xi][cat.yj-1].id == "empty"|| globalVar.aMap[cat.xi][cat.yj-1].id== "end")
		{
			bool = true;
			return(globalVar.aMap[cat.xi][cat.yj-1]);
		}
	}

	if(cat.yj != 6)
	{
		if(globalVar.aMap[cat.xi][cat.yj+1].id == "enemy" || globalVar.aMap[cat.xi][cat.yj+1].id == "empty"|| globalVar.aMap[cat.xi][cat.yj+1].id== "end")
		{
			bool = true;
			return(globalVar.aMap[cat.xi][cat.yj+1]);
		}
	}

	if(!bool) return(false);
}

// dans content.js :

//, xi, yj)
this.xi = xi;
this.yj = yj;

if(id == "cat")
{
	this.life = 50;
	this.attack = 30;
	this.defense = 10;
	this.cpt = 0;
	this.targetX = 0;
	this.targetY = 0;
}
else if (id == "enemy")
{
	this.life = 50;
	this.attack = 40;
	this.defense = 10;
}

//debugger;
this.xi = x;
this.yj = y;
var detect = collision([globalVar.aMap[x][y]]); // non, à tester dans le main

console.log("detect : " + detect)

if(detect == false)
{
	if(this.targetX > 15)
		this.targetX = 15;

	if(this.targetY > 6)
		this.targetY = 6;

	if(x != this.targetX)
	{
		if(x > this.targetX)
			swap("-x", x, y);

		else
			swap("x", x, y);
	}

	if(y != this.targetY)
	{
		if(y > this.targetY)
			swap("-y", x, y);

		else
			swap("y", x, y);
	}
}

		// var prop;

		// for (prop in this)
		// {
		// 	console.log(prop)
		// 	prop = null;
		// }

			// this.deploy = function()
	// {
	// 	console.log('deploy');
	// }

else if(detect.id == "enemy")
	combat(globalVar.aMap[x][y], detect); // "if (combat(globalVar.aMap[x][y], detect))" ou "if (!combat(globalVar.aMap[x][y], detect))" à la place

else if(detect.id == "empty")
	globalVar.aMap[x][y] = new Content("ground", globalVar.aImg_Content[1], "//Rien à modifier", x, y);


else if(detect.id == "end" && globalVar.bMonstreMort == true)
{
	alert("WIN");
	globalVar.bPause = true;	
}

else if(detect.id == "end" && globalVar.bMonstreMort == false)
{
	alert("TUE LE MONSTRE");
	globalVar.bPause = true;
}


// dans runloop.js

//var mouseBox = [gVar.iMouse_x - gVar.canvas.offsetLeft, gVar.iMouse_y - gVar.canvas.offsetTop, 10, 10];
//gFunc.drawStrokeBox(mouseBox, "#fff", 6);

gVar.bEvalFait = false; // so bad............

if (gVar.bEvalFait == false)
{
	gVar.aMap[gVar.oActiveTile.x][gVar.oActiveTile.y].evalu();
	gVar.bEvalFait = true;
}

if (!!gVar.aMap[i][j]) // useless, c'est tous des objets
{
	if(gVar.aMap[i][j].id == "cat" && !swapee) // so bad....
	{
		gVar.aMap[i][j].move(i, j);
		swapee = true;
	}
}

		//gVar.oActiveTile = (!!gVar.oActiveTile) ? gVar.oActiveTile : {x: 0, y: 0};
		//console.log(gVar.aMap[0][0])

		//var bSwapee = false; /* pour savoir si  quoi à bouger ???? wtf? */

		//timestamp = (!!timestamp) ? timestamp : 0;