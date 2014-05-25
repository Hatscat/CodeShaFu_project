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
		this.game_config.map[p_old_pos] = new Tile(9, p_old_pos, this.game_config); // 9 = l'herbe
	}
	this._below_self = this.game_config.map[this.pos]; // on met le tile actuel sous celui-ci
	this.game_config.map[this.pos] = this; // puis on met le nouveau tile à sa place dans la map
}
