function step (p_private_config, p_editor_config, p_public_config) {

	//var game_config = p_editor_config;


	var victory, defeat; // arg, degueu... pour l'eval...
	var map = p_public_config.map; // arg, degueu... pour l'eval...



	p_public_config.previous_map = p_public_config.map.splice();

	p_public_config.map.forEach(function (tile) {
		tile._can_update = true;
	});

	//console.log(p_editor_config.gm_rules_text)

	p_public_config.map.forEach(function (tile) {

		/* lecture des scripts */
		if (tile.script.indexOf('this.setup') > -1 && tile.script.indexOf('this.update') > -1) {

			var setup_str = tile.script.slice(0, tile.script.indexOf('this.update'));
			var new_setup_str = p_public_config.setup_script;
			var props = '';
			
			if (tile._can_setup) {
				tile._can_setup = false;
				tile.setup = eval(setup_str);
			}

			if (tile._can_update) {
				tile._can_update = false;
				tile.update_script = eval(tile.script.slice(tile.script.indexOf('this.update')));
				tile.update_script();
			}

			for (var i in tile.setup) {
				props += '\n    ' + i + ': ' + JSON.stringify(tile.setup[i]) + ',';
			}

			if (props) {
				new_setup_str = setup_str.replace(setup_str.slice(setup_str.indexOf('\n')), props + '\n};\n\n');
				tile.script = tile.script.replace(setup_str, new_setup_str);
			}

			if (tile.pos == p_private_config.active_tile) {
				show_script(p_private_config, tile);
			}
			//console.log(tile.script);
		}
	});

	eval(p_editor_config.gm_rules_text);

	// 	console.log(p_editor_config.gm_rules_text, victory, defeat ) 	

	// arf ! degueu
	p_editor_config.victory = victory;
	p_editor_config.defeat = defeat;


	if (p_editor_config.victory) {

		// TODO : display Victory
		//debugger;
		run_pause_onclick (p_private_config, p_editor_config, p_public_config);
		$("#message").text("victory !");
		$("#feedbackSave").fadeIn(1500);
	}

	if (p_editor_config.defeat) {

		// TODO : display Defeat
		run_pause_onclick (p_private_config, p_editor_config, p_public_config);
		$("#message").text("Defeat !");
		$("#feedbackSave").fadeIn(1500);
	}

	p_public_config.step_count++;
}
