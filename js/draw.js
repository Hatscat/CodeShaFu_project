function draw (p_private_config, p_editor_config, p_public_config) {

	var active_tile_box = [
		(p_private_config.active_tile % p_private_config.col_nb) * p_private_config.tile_size,
		(p_private_config.active_tile / p_private_config.col_nb | 0) * p_private_config.tile_size,
		p_private_config.tile_size,
		p_private_config.tile_size
	];

	p_private_config.buffer_ctx.fillStyle = "#000";
	p_private_config.buffer_ctx.fillRect(0, 0, p_private_config.buffer.width, p_private_config.buffer.height);

	p_public_config.map.forEach(function (tile, i) {

		p_private_config.buffer_ctx.drawImage(
			p_private_config.tilset_img,
			p_private_config.tileset_sprites_sxy[tile.id].sx,
			p_private_config.tileset_sprites_sxy[tile.id].sy,
			p_private_config.tileset_tilesize,
			p_private_config.tileset_tilesize,
			(i % p_private_config.col_nb) * p_private_config.tile_size,
			(i / p_private_config.col_nb | 0) * p_private_config.tile_size,
			p_private_config.tile_size,
			p_private_config.tile_size);
		
		if (p_private_config.is_paused) {
			
			p_private_config.buffer_ctx.strokeStyle = "#393";
			p_private_config.buffer_ctx.lineWidth = 1;
			p_private_config.buffer_ctx.strokeRect(
				(i % p_private_config.col_nb) * p_private_config.tile_size,
				(i / p_private_config.col_nb | 0) * p_private_config.tile_size,
				p_private_config.tile_size,
				p_private_config.tile_size);
		}
		

		if (tile.script != p_public_config.setup_script + p_public_config.update_script) {

			draw_stroke_box([
				(i % p_private_config.col_nb) * p_private_config.tile_size,
				(i / p_private_config.col_nb | 0) * p_private_config.tile_size,
				p_private_config.tile_size,
				p_private_config.tile_size
			], '#09f', 0.3, 0, p_private_config);
		}
	});
	
	draw_stroke_box(active_tile_box, '#a3f', 0.2, 2, p_private_config);

	p_private_config.ctx.drawImage(p_private_config.buffer, 0, 0);

	/* le raf (pour la fluidité visuel) */
	requestAnimationFrame(function(){draw(p_private_config, p_editor_config, p_public_config)});
}
