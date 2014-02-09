$(document).ready(function(){
	$("#package_list").jstree({
		"checkbox" : {
			"real_checkboxes" : true, 
			"two_state" : true,
			"override_ui" : true
		},
		"themes" : {
			"theme" : "classic",
			"dots" : true,
			"icons" : false
		},
		"plugins" : [ "themes", "html_data", "checkbox" ]
	});

	jQuery("#package_list").bind("loaded.jstree", function (event, data) {
		setTimeout(function(){treeLoaded();},6000);
	});

	progressBar();
});

function progressBar(){
	$('#progress').removeClass('running').delay(10).queue(function(next){
		$(this).addClass('running');
		next();
	});
}

function treeLoaded(){
	$(".container").fadeOut(1000);
	setTimeout(function(){
		$("#package_viewer").fadeIn(1000);
	}, 1000);
}
