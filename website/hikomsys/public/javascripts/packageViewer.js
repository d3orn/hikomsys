$(document).ready(function(){
	$("#package_list").jstree({
		"core" : 
		{
		"themes" : 
		{ 
			"stripes" : true,
			"dots" : true,
			"icons" : false
		},
		},
		"checkbox" : 
		{
			"three_state" : false
		},
		"plugins" : ["checkbox", "sort", "state", "wholerow"]
	});

	$("#package_list").jstree(true).clear_state();

});

$('form').submit(function (e) {
	stuff = $("#package_list").jstree("get_selected", true, false);
	var array = [];
	$.each(stuff, function(idx, obj) {
		array.push(obj.id);
	});
	var $hidden = $("<input type='hidden' name='selected'/>");
	$hidden.val(JSON.stringify(array));
	$(this).append($hidden);
});

$("#package_list").bind("dblclick.jstree", function (event) {
	var node = $(event.target).closest("li");
	var data = node.data("jstree");
	var id = node[0].id;
	uncheckChilds(node);
	if(node.hasClass('jstree-open')){
		$("#package_list").jstree("close_all",id);
 	}
	else{
		$("#package_list").jstree("open_all",id);
	}
});

function uncheckChilds(node){
	var id = node[0].id;
	$("#package_list").jstree("deselect_node",id);
	var children = $("#package_list").jstree("get_children_dom", id)); 
	for(var i = 0, i < children.length, i++){
		console.log(i);
	}
}