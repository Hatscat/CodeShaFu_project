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

	reset_array(p_public_config.map);

	for (var i = p_private_config.tiles_nb; i--; p_public_config.map[i] = new Tile(0, i, p_public_config));
	p_private_config.active_tile = 0;
	show_script(p_private_config, p_public_config.map[0]);
	resize_canvas(p_private_config, p_editor_config);
}

function create_loaded_map (p_map_data, p_private_config, p_editor_config, p_public_config) {

	reset_array(p_public_config.map);

	for (var i = p_private_config.tiles_nb; i--;) {
		p_public_config.map[i] = new Tile(p_map_data[i].id, i, p_public_config);
		p_public_config.map[i].script = p_map_data[i].script;
	}

	p_private_config.active_tile = 0;
	show_script(p_private_config, p_public_config.map[0]);
	resize_canvas(p_private_config, p_editor_config);
}

function reset_array (p_array) {

	if (p_array.length) {
		p_array.forEach(function (elem) {
			elem = null;
		});
	}
	p_array = [];
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
