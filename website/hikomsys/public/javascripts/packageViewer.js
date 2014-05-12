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


    var rootChildren = $("#package_list").jstree._get_children(-1), 
    rootNodes = [], 
    i;
    for(i = 0; i < rootChildren.length; i += 1){
        rootNodes[i] = rootChildren[i];
    }
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

