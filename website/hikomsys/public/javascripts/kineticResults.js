var WIDTHGREEN = 1;
var WIDTHORANGE = 3;
var WIDTHRED = 5;

var allPackages = [];

var moreInfosEnabled = true;

var moving, draggable = false; 



function switchMode(){
	draggable = !draggable;
	var groups = packageLayer.find('.packageGroup');
	for (var i = 0; i < groups.length; i++){
		groups[i].setDraggable(draggable);
	}
}

function switchDependencies(object, color){
	//Hides/Shows arrows depending on theire color
	for(var i = 0; i < arrows.length; i++){
		if (arrows[i].color == color){ 
			arrows[i].changeVisibility();
		}
	}
	arrowLayer.draw();
}

/* =============================================================== Eventhandler ============================================================== */
// this requests gets all the information from the PROJECTNAMEResults table
$(document).ready(function(){ 
	quizId = document.getElementById('quizId').value;
	$.post('sendJSON', {'quizId' : quizId})
		.done(function(data){
			data = $.parseJSON(data);
			//console.log(data);
			for(var i = 0; i < data.length; i++){
				infos = [];
				//console.log(data[i].classes);
				infos['classes'] = data[i].classes;
				infos['children'] = data[i].children;
				infos['allDependencies'] = data[i].allDependencies;
				var thisPackage = new PackageGroup(data[i].name, data[i].color, infos);
				allPackages.push(thisPackage);
				thisPackage.create();
				thisPackage.group.setPosition(data[i].position.X ,data[i].position.Y);
				thisPackage.group.setDraggable(draggable);
			}
			for(var i = 0; i < data.length; i++){
				var thisPackage = findPackageById(data[i].name);
				var dependencies = data[i].dependencies;
				if(dependencies){
					for(var j = 0; j < dependencies.length; j++){
						var to = findPackageById(dependencies[j]['to']);
						var id = thisPackage.text+'_'+to.text;
						var arrow = new Arrow(thisPackage,to,id);
						arrow.color = dependencies[j]['color'];
						arrows.push(arrow);
						arrow.draw();
					}
				}			
			}
			stage.draw();
		});
	
	$.post('getPoints', {'quizId' : quizId})
		.done(function(data){
			writeMessage(data);
			stage.draw();
		});
});

/* ------  Buttons ------*/
$('#move').click(function(){
	switchMode();
});

$('#greenArrow').click(function(){
	switchDependencies($(this),'green')
});

$('#redArrow').click(function(){
	switchDependencies($(this),'red');
});

$('#orangeArrow').click(function(){
	switchDependencies($(this),'orange');
});

$('#infosEnabled').click(function(){
	moreInfosEnabled = !moreInfosEnabled;
	for (var i = 0; i < allPackages.length; i++){
		allPackages[i].removeInfos();
	}
});


$('#help').click(function(){
	$('#help_container').toggle();
});

$('.buttonlike').click(function(){
	var currentId = $(this).attr('id');
	clicked($(this));
});

/* =============================================================== Prototype Methods ============================================================== */

//REFACTORING NEEDED
//save initial scale
var initialScale = {x: 1, y: 1};
var initialWidth = $("#container").innerWidth(); // initial width
var initialHeight = $("#container").innerHeight(); // initial height

/*window.onresize = function(event) { // listen for change
  var width = $("#container").innerWidth(); // new width of page
    var height = $("#container").innerHeight(); // new height of page
   console.log(width);
    console.log(height);
    var xScale =  (width  / initialWidth) * initialScale.x;  // percent change in width (Ex: 1000 - 400/1000 means the page scaled down 60%, you should play with this to get wanted results)
    var yScale = (height / initialHeight) * initialScale.y;
    var newScale = {x: xScale, y: yScale};
        console.log(newScale);
    stage.setAttr('width', width);
    stage.setAttr('height', height);    
    stage.setAttr('scale', newScale ); 
    stage = new Kinetic.Stage({
    	container: 'container',
		width: width,
		height: height
	});
    stage.add(layer);
    stage.draw();
}*/

$(window).on('resize',function(){
	if(this.resizeTO) clearTimeout(this.resizeTO);
	this.resizeTO = setTimeout(function(){
		$(this).trigger('resizeEnd');
	},500);
});


//after resizing the draboundfunction fails need to update MaxX for every element
$(window).on('resizeEnd orientationchange',function(){
	var width = $("#container").innerWidth(); // new width of page
	var height = $("#container").innerHeight(); // new height of page
	background.setWidth(width);
	background.setHeight(height);
	stage.setWidth(width);
	stage.setHeight(height);
	var groups = layer.get('Group');
	for (var i = 0; i < groups.length; i++){
		//alert(groups[i].maxX);
	}
});
