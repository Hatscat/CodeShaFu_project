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

	private_config.img_files.forEach(function (file) {
		load_image(file);
	});

	mouse.setOffset(private_config.canvas.offsetLeft, private_config.canvas.offsetTop);

	private_config.ace_editor.setTheme("ace/theme/monokai");
	private_config.ace_editor.getSession().setMode("ace/mode/javascript");
	private_config.ace_editor.resize();

	addEventListener('resize', function(){resize_canvas(private_config)});
	
	for (var bt in private_config.buttons) {

		var click_function = bt + '_onclick';

		if ([click_function]) {

			private_config.buttons[bt].addEventListener('click', function () {
				[click_function](private_config, editor_config, public_config);
			});
		}
	});

	private_config.can_edit = true;
	draw(private_config, editor_config, public_config);
}
