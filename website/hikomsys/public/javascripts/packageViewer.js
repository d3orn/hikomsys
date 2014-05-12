$.ajaxSetup({
    cache: false
});

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

	$("#package_list").jstree("open_all","#etc");

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
   console.log($(this));
   console.log(node);
   console.log(date);
   // Do my action
});