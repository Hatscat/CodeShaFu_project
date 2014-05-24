/*
** return some brand new config
*/
function new_private_config (p_canvas_render, p_canvas_buffer) {

	if (p_canvas_render && p_canvas_buffer) {

		var config = {

			col_nb 				: 16,
			row_nb 				: 7,
			canvas 				: p_canvas_render,
			ctx 				: p_canvas_render.getContext('2d'),
			buffer 				: p_canvas_buffer,
			buffer_ctx 			: p_canvas_buffer.getContext('2d'),
			ace_editor 			: ace.edit('editor'),
			is_editor 			: false,
			can_edit 			: true,
			is_paused 			: true,
			runIntervalID 		: null,
			tileset_sprites_sxy : null,
			tilset_img 			: null,
			mouse_pos 			: -1,
			active_tile 		: {x:0, y:0},
			tileset_tilesize 	: 64,
			img_files : [
								'img/tilset.jpg'
			],
			buttons : {
				run_pause 		: document.getElementById('run_bt'),
				step 			: document.getElementById('step_bt'),
				reset 			: document.getElementById('reset_bt'),
				format 			: document.getElementById('format_bt'),
				save 			: document.getElementById('save_bt')
			},
			text_inputs : {
				cat_dialog 		: document.getElementById('cat_dialog_text'),
				gm_rules 		: document.getElementById('gm_rules_text')
			}
		};

		config.row_col_ratio = config.row_nb / config.col_nb;
		config.tiles_nb = config.row_nb * config.col_nb;

		resize_canvas(config);

		return config;
	}
}

function new_editor_config () {

	var config = {

		speed 			: 500,
		cat_dialog_text : '',
		gm_rules_text 	: ''
	};

	return config;
}

function new_public_config () {

	var config = {

		time 			: 0,
		step_count 		: 0,
		map 			: [],
		setup_script 	: 'this.setup = function () {\n\n\n}\n',
		update_script 	: '\nthis.update = function () {\n\n\n}'
	};

	return config;
}

/*
** canvas responsive !
*/
function resize_canvas (p_private_config) {

	//p_private_config.canvas_size = (p_canvas_render.style.width.replace('%', '') | 0) * 0.01 * window.innerWidth;
	p_private_config.canvas_size = $("canvas").width();
	p_private_config.canvas_height = p_private_config.canvas_size * p_private_config.row_col_ratio;
	p_private_config.height_diff = p_private_config.canvas_size - p_private_config.canvas_height;
	p_private_config.canvas.width = p_private_config.buffer.width = p_private_config.buffer.height = p_private_config.canvas_size;
	p_private_config.canvas.height = p_private_config.canvas_height;
	p_private_config.tile_size = p_private_config.canvas_size / p_private_config.col_nb;
	mouse.setOffset(p_private_config.canvas.offsetLeft, p_private_config.canvas.offsetTop);
	//$("editor").("height", document.body.offsetHeight - $("editor").offset().top + "px");
	p_private_config.ace_editor.resize();
}
