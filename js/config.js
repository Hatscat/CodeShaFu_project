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
			active_tile 		: 0,
			tileset_tilesize 	: 64,
			img_files : [
								'img/tilset.jpg'
			],
			buttons : {
				run_pause 		: document.getElementById('run_bt'),
				home	 		: document.getElementById('home_bt'),
				step 			: document.getElementById('step_bt'),
				reset 			: document.getElementById('reset_bt'),
				format 			: document.getElementById('format_bt'),
				save 			: document.getElementById('save_bt')
			},
			text_inputs : {
				levelName		: document.getElementById("levelName"),
				cat_dialog 		: document.getElementById('cat_dialog_text'),
				save_name 		: document.getElementById('save_name'),
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
		cat_dialog_text : 'Hints :\n',
		gm_rules_text 	: '// RULES :\n\nif ( false ) {\n    victory = true;\n}\n\nif ( false ) {\n    defeat = true;\n}',
		victory 		: false,
		defeat 			: false,
		ace_hints 		: ace.edit('cat_dialog_editor'),
		ace_rules 		: ace.edit('gm_rules_editor'),
		show_script 	: function () {
			config.ace_hints.setValue(config.cat_dialog_text);
			config.ace_rules.setValue(config.gm_rules_text);
		},
		save_script 	: function () {
			config.cat_dialog_text = config.ace_hints.getValue();
			config.gm_rules_text = config.ace_rules.getValue();
		}
	};

	return config;
}

function new_public_config (p_private_config) {

	var config = {

		time 			: 0,
		step_count 		: 0,
		map 			: [],
		previous_map 	: [],
		col_nb 			: p_private_config.col_nb,
		row_nb 			: p_private_config.row_nb,
		setup_script 	: 'this.setup = {\n\n\n};\n\n',
		update_script 	: 'this.update = function () {\n\n\n}'
	};

	return config;
}

/*
** canvas responsive !
*/
function resize_canvas (p_private_config, p_editor_config) {

	p_private_config.canvas.width = p_private_config.buffer.width = p_private_config.buffer.height = p_private_config.canvas_size = $("canvas").width();
	p_private_config.canvas.height = p_private_config.canvas_height = p_private_config.canvas_size * p_private_config.row_col_ratio;
	p_private_config.tile_size = p_private_config.canvas_size / p_private_config.col_nb;
	mouse.setOffset(p_private_config.canvas.offsetLeft, p_private_config.canvas.offsetTop);
	//$("editor").("height", document.body.offsetHeight - $("editor").offset().top + "px");
	p_private_config.ace_editor.resize();

	if (p_editor_config) {
		p_editor_config.ace_hints.resize();
		p_editor_config.ace_rules.resize();
	}
}
