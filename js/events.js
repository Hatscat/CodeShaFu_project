function run_pause_onclick (p_private_config, p_editor_config, p_public_config) {

	if (p_public_config.is_paused) {
		p_public_config.is_paused = false;
		p_private_config.runIntervalID = setInterval(function(){step(p_private_config, p_editor_config, p_public_config)}, p_editor_config.speed);
		p_private_config.buttons.run_pause.innerHTML = 'PAUSE';
		console.log('run');
	} else {
		set_pause(p_private_config, p_editor_config, p_public_config);
		p_private_config.buttons.run_pause.innerHTML = 'RUN';
	}
}

function step_onclick (p_private_config, p_editor_config, p_public_config) {

	step(p_private_config, p_editor_config, p_public_config);
	console.log('step');
}

function reset_onclick (p_private_config, p_editor_config, p_public_config) {

	private_config.can_edit = true;
	set_pause(p_private_config, p_editor_config, p_public_config);
	console.log('stop');
}

function format_onclick (p_private_config, p_editor_config, p_public_config) {

	console.log('reset');
}

function save_onclick (p_private_config, p_editor_config, p_public_config) {

	console.log('save');
}


function set_pause (p_private_config, p_editor_config, p_public_config) {

	p_public_config.is_paused = true;
	clearInterval(p_private_config.runIntervalID);
	p_private_config.runIntervalID = null;
	console.log('pause');
}