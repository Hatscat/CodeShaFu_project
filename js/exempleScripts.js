/* -*-*-*-*-*-*-*-*-*-*-*-*-*-* exemples de script pour l'editeur *-*-*-*-*-*-*-*-*-*-*-*-*-*- */


// pattern haut / bas
this.state.loop = (!!this.state.loop) ? this.state.loop : 1;

if (this.y < 1)             this.state.loop = 2;
else if (this.y > 5)        this.state.loop = 1;

if (this.state.loop == 1)   this.move2Top();
else                        this.move2Bottom();




// pattern haut / bas
this.state.loop = (!!this.state.loop) ? this.state.loop : 1;

if (this.x < 1)             this.state.loop = 2;
else if (this.x > 14)        this.state.loop = 1;

if (this.state.loop == 1)   this.move2Left();
else                        this.move2Right();	




// déplacement en escalier
if (iTurn % 3)      this.move2Right();
else                this.move2Top();




// gestionnaire de vie
var lifeMax = 5;

this.state.life = (!!this.state.life) ? this.state.life : lifeMax;

if (this.state.life < 1)
{
	var r = confirm("Vous êtes mort... Recommencer?")
	if (r) location.reload();
}

// les detections // collisions
if (!!this.detection("rat")) console.log("bouh")







this.setup = {

	name : 10
};

this.update = function () {

	this.moveX(-1)
}



// RULES :

for (var i = map.length; i--;) {

	if (map[i].setup.name && !(map[i].pos % p_public_config.col_nb)) {

		if (map[i].setup.name == 'dog') {
			victory = true;
		} else {
			defeat = true;
		}
	}
}



this.setup = {
	name : 'dog'
};

this.update = function () {
	this.moveX(-0.3);
}

this.setup = {
	name : 'cat'
};

this.update = function () {
	this.moveX(-0.5);
}

this.setup = {
	name : 'rat'
};

this.update = function () {
	this.moveX(-1);
}

this.setup = {
	name : 'tree'
};

this.update = function () {
	// les arbres ne cours pas...
}

