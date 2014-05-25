/*
** first script launched, initialize things like events
*/

addEventListener('load', init_game);

function init_game () {

	var canvas_render 	= document.getElementById('canvas');
	var canvas_buffer 	= document.createElement('canvas');
	var private_config 	= new_private_config(canvas_render, canvas_buffer);
	var editor_config 	= new_editor_config();
	var public_config 	= new_public_config(private_config);

	private_config.ace_editor.setTheme("ace/theme/monokai");
	private_config.ace_editor.getSession().setMode("ace/mode/javascript");
	resize_canvas(private_config);

	window.addEventListener('resize', function(){resize_canvas(private_config)});
	window.addEventListener('mousemove', function(){mouse_pos_onmove(private_config, editor_config, public_config)});
	window.addEventListener('mouseup', function(){mouse_pos_onclick(private_config, editor_config, public_config)});
	
	for (var bt in private_config.buttons) {

		var click_function = bt + '_onclick';

		if (window[click_function] && private_config.buttons[bt]) {
			private_config.buttons[bt].action = window[click_function];
			private_config.buttons[bt].addEventListener('click', function(){this.action(private_config, editor_config, public_config)});
		}
	};

	if (is_editor) {
		for (var i = 9; i--;) {
			$("#" + i).draggable({
				revert: true,
				helper: 'clone',
				revertDuration: 1,
				stop: function (event, ui) {
					drag_stoped(ui, private_config, editor_config, public_config);
				}
			});
		}
	}

	private_config.img_files.forEach(function (file) {
		private_config.tilset_img = load_image(file, private_config, editor_config, public_config);
	});
}

function loading_end (p_private_config, p_editor_config, p_public_config) {

	p_private_config.can_edit = true;
	create_empty_map(p_private_config, p_editor_config, p_public_config);
	draw(p_private_config, p_editor_config, p_public_config);	
}