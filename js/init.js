/*
** first script launched, initialize things like events
*/

addEventListener('load', init_game);

function init_game () {

	var canvas_render 	= document.getElementById('canvas');
	var canvas_buffer 	= document.createElement('canvas');
	var private_config 	= new_private_config(canvas_render, canvas_buffer);
	var editor_config 	= new_editor_config();
	var public_config 	= new_public_config();

	if (is_editor) {
		editor_config.ace_hints.setTheme("ace/theme/monokai");
		editor_config.ace_rules.setTheme("ace/theme/monokai");
		editor_config.ace_hints.getSession().setMode("ace/mode/text");
		editor_config.ace_rules.getSession().setMode("ace/mode/javascript");
		
	} else {
		editor_config.ace_hints.setTheme("ace/theme/github");
		editor_config.ace_hints.setReadOnly(true);
		editor_config.ace_rules.setTheme("ace/theme/github");
		editor_config.ace_rules.setReadOnly(true);
	}

	private_config.ace_editor.setTheme("ace/theme/monokai");
	private_config.ace_editor.getSession().setMode("ace/mode/javascript");
	resize_canvas(private_config, editor_config);

	window.addEventListener('resize', function(){resize_canvas(private_config, editor_config)});
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
		for (var i = 10; i--;) {
			$('#' + i).draggable({
				revert: true,
				helper: 'clone',
				revertDuration: 1,
				stop: function (event, ui) {
					drag_stoped(ui, private_config, editor_config, public_config);
				}
			});
		}
	}

	if(lvl != 'none') {
		loadMap(private_config, editor_config, public_config);
	}
	
	private_config.img_files.forEach(function (file) {
		private_config.tilset_img = load_image(file, private_config, editor_config, public_config);
	});

	if(localStorage['lvl'])
		localStorage.removeItem('lvl');

	if(localStorage['hints'])
		localStorage.removeItem('hints');

	if(localStorage['rules'])
		localStorage.removeItem('rules');
}

function loading_end (p_private_config, p_editor_config, p_public_config) {

	p_private_config.can_edit = true;
	p_editor_config.show_script();
	create_empty_map(p_private_config, p_editor_config, p_public_config);
	draw(p_private_config, p_editor_config, p_public_config);	
}