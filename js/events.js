function run_pause_onclick (p_private_config, p_editor_config, p_public_config) {

	if (p_public_config.is_paused) {
		set_pause(p_private_config, p_editor_config, p_public_config);
		p_private_config.buttons.run_pause.innerHTML = 'RUN';
	} else {
		p_public_config.is_paused = true;
		save_script(p_private_config, p_public_config.map[p_private_config.active_tile]);
		p_private_config.runIntervalID = setInterval(function(){step(p_private_config, p_editor_config, p_public_config)}, p_editor_config.speed);
		p_private_config.buttons.run_pause.innerHTML = 'PAUSE';
		console.log('run');
	}
}

function step_onclick (p_private_config, p_editor_config, p_public_config) {

	save_script(p_private_config, p_public_config.map[p_private_config.active_tile]);
	step(p_private_config, p_editor_config, p_public_config);
	//console.log('step');
}

function reset_onclick (p_private_config, p_editor_config, p_public_config) {

	//private_config.can_edit = true;
	//set_pause(p_private_config, p_editor_config, p_public_config);
	//console.log('stop');
	localStorage['lvl'] = lvl;
	localStorage['hints'] = hints;
	localStorage['rules'] = rules;
	
	window.location.reload();
}

function format_onclick (p_private_config, p_editor_config, p_public_config) {

	//console.log('reset');
	window.location.reload();
}

function home_onclick (p_private_config, p_editor_config, p_public_config) {

	document.location.href="index.php";
}


function save_onclick (p_private_config, p_editor_config, p_public_config) {

	var jsData = {aMap: []};

	for (var i = 0; i < p_public_config.map.length; i++) {	
		jsData.aMap[i] = {};
		jsData.aMap[i].id = p_public_config.map[i].id;
		jsData.aMap[i].script = p_public_config.map[i].script;
	}

	var jsonData = JSON.stringify(jsData);
	$.ajax("php/mapData.php", {
		type:"post",
		data: {"setMap": jsonData, "mapName": name,"hints":p_editor_config.ace_hints.getValue(), rules:p_editor_config.ace_rules.getValue()},
		cache: false,
		success: function(datas) {
			//console.log(datas);
			//debugger;
			$("#feedbackSave").fadeIn(1500, function () {
				$("#feedbackSave").fadeOut(1000);
			});
		},
		error: function (datas) {
			console.log("error : " + datas);
		}
	});

	//create_empty_map(p_private_config, p_editor_config, p_public_config);
}

function loadMap (p_private_config, p_editor_config, p_public_config) {

	p_editor_config.ace_hints.setValue(hints);
	p_editor_config.ace_rules.setValue(rules);

	var configprivate = p_private_config;
	var configEditor = p_editor_config;
	var configPublic = p_public_config;
	$.ajax("php/mapData.php", {
		type: "post",
		data: {"requestMap": lvl},
		cache: false,
		success: function (datas) {
			readJsonMap(configprivate, p_editor_config, p_public_config, datas);
		},
		error: function (datas) {
			create_empty_map(configprivate, p_editor_config, p_public_config);
		}
	});
}

function readJsonMap (p_private_config, p_editor_config, p_public_config, jsonMap) {
	
	try {
		var originalMap = JSON.parse(jsonMap);
		originalMap = JSON.parse(originalMap);
		
		create_loaded_map(originalMap.aMap, p_private_config, p_editor_config, p_public_config);

		/*if (!p_public_config.map.length) {
			create_empty_map(p_private_config, p_editor_config, p_public_config);
		}

		for (var i = originalMap.aMap.length; i--;)  {	
			p_public_config.map[i].id = originalMap.aMap[i].id
			p_public_config.map[i].script = originalMap.aMap[i].script
		}*/
		
	} catch (err) {
		//debugger;
		create_empty_map(p_private_config, p_editor_config, p_public_config);
	}
}

function mouse_pos_onmove (p_private_config, p_editor_config, p_public_config) {

	p_private_config.mouse_pos = is_square_over([0, 0, p_private_config.canvas.width, p_private_config.canvas.height]) ?
		(mouse.x / p_private_config.tile_size | 0) + (mouse.y / p_private_config.tile_size | 0) * p_private_config.col_nb : -1;
}

function mouse_pos_onclick (p_private_config, p_editor_config, p_public_config) {

	//console.log("mouse pos :", p_private_config.mouse_pos);
	
	if (p_private_config.mouse_pos > -1) {
		save_script(p_private_config, p_public_config.map[p_private_config.active_tile]);
		p_private_config.active_tile = p_private_config.mouse_pos;
		show_script(p_private_config, p_public_config.map[p_private_config.active_tile]);
	}
}

function drag_stoped (p_div, p_private_config, p_editor_config, p_public_config) {

	if (p_public_config.map[p_private_config.mouse_pos]) {
		p_public_config.map[p_private_config.mouse_pos].id = p_div.helper.context.id | 0;
		
		mouse_pos_onclick(p_private_config, p_editor_config, p_public_config);
	}
}

function set_pause (p_private_config, p_editor_config, p_public_config) {

	p_public_config.is_paused = false;
	clearInterval(p_private_config.runIntervalID);
	p_private_config.runIntervalID = null;
	console.log('pause');
}