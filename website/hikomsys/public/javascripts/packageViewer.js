$(document).ready(function(){
	$("#package_list").jstree({
		"core" : 
		{
			"themes" : 
			{ 
				"stripes" : true,
				"dots" : true,
				"icons" : false
			}
		},
		"checkbox" : 
		{
				"three_state" : false
		},
		"contextmenu" : {
			items : function(node){ 
				return{
					"expand" : {
						label: "Expand all children", 
						action: function(){ $("#package_list").jstree("open_all",node.id);}
					},
					"close" : {
						label: "Close and deselect all children", 
						action: function(){ 
							$("#package_list").jstree("close_all",node.id);
							closeAndDeselectChildren(node.id)
						}
					}
				}
			},
			"select_node" : false

		},
		"plugins" : ["checkbox", "sort", "state", "wholerow", "contextmenu"]
	});

	$("#package_list").jstree(true).clear_state();
	$("#package_list").bind('ready.jstree', function (e, data) {
		var depth = 2;
		console.log(data.instance);
		data.instance.get_container().find('li').each(function (i) {
			var counter = 1;
			if (counter <= depth) {
				console.log($(this));
				console.log(i);
				// console.log($(this).0.id);
				
				// console.log(data.instance.get_children($(this)));
				data.instance.open_node($(this));


	// var this_node = $("#package_list").jstree("get_node", id);
	// var children = this_node.children;
	// for(var i = 0; i < children.length;	 i++){
	// 	closeAndDeselectChildren(children[i]);
	// }
				
			}
		});
	});


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

function closeAndDeselectChildren(id){
	$("#package_list").jstree("deselect_node",id);
	var this_node = $("#package_list").jstree("get_node", id);
	var children = this_node.children;
	for(var i = 0; i < children.length;	 i++){
		closeAndDeselectChildren(children[i]);
	}
}