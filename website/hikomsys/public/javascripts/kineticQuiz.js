var moving = false; 

var moreInfosEnabled = false;

function mouseDownOnPackage(packageGroup, event){
	firstSelectedPackage = findPackageById(packageGroup.getId());
	firstSelectedPackage.highlightPackage("lightblue"); 
}

function mouseUpOnPackage(packageGroup, event) {
	var toPackage = findPackageById(packageGroup.getId());
	
	if(firstSelectedPackage.text == toPackage.text){
		writeMessage("You cannot add a loop");
		return;
	}
	var id = firstSelectedPackage.text + "_" + toPackage.text;

	if(findArrowById(id) === -1){
		var arrow = new Arrow(firstSelectedPackage,toPackage,id);
		arrows.push(arrow);
		arrow.draw();
	}
	else {
		writeMessage("dependency already drawn");
	}

	firstSelectedPackage.highlight.remove();
	toPackage.highlight.remove();
	firstSelectedPackage = undefined;
	stage.draw();
}

function switchMode(){
	if(typeof firstSelectedPackage !== 'undefined'){
		firstSelectedPackage.highlight.remove();
	}

	drawingEnabled = !drawingEnabled;
	var groups = packageLayer.get('Group');
	for (var i = 0; i < groups.length; i++){
		groups[i].setDraggable(!drawingEnabled);
	}
}

/* =============================================================== Eventhandler ============================================================== */
stage.on("mousedown", function (e) {
	if (typeof firstSelectedPackage !== 'undefined' && drawingEnabled) {
		var mousePos = getRelativePointerPosition;
		tmpArrow = new Arrow(firstSelectedPackage, mousePos, "tmpArrow");
		tmpArrow.draw();
		moving = true;
	}
});

stage.on("mousemove", function (e) {
	if (moving) {
		tmpArrow.remove();
		var mousePos = getRelativePointerPosition();
		tmpArrow = new Arrow(firstSelectedPackage, mousePos, "tmpArrow");
		tmpArrow.draw();
		stage.draw();
	}
});

stage.on("mouseup", function (e) {
	moving = false;
	if(typeof firstSelectedPackage !== 'undefined'){
		firstSelectedPackage.highlight.remove();
		firstSelectedPackage = undefined;
	}
	if(typeof tmpArrow !== "undefined") {tmpArrow.remove();} 
	stage.draw();
});


/* ------  Buttons ------*/
$('#draw').click(function(){
	clicked($(this));
	switchMode();
});

$('#move').click(function(){
	clicked($(this));
	switchMode();
});

$('#submit').click(function(){
	output = createJSON();
	quizId = document.getElementById('quizId').value;
	$.ajax({
		url : '/hikomsys/quizzes/create_result',
		type : 'post',
		data : {"packages": output, "quizId" : quizId},
		success : function(data){
			window.location.href = '/hikomsys/quizzes/'+quizId
		}
	});
});

function createJSON(){
	var output = [];
	for(var i = 0; i < allPackages.length; i = i + 1 ) {
		var p;
		var position = {"X" : allPackages[i].position().x, "Y" : allPackages[i].position().y};
		name = allPackages[i].text;
		var dep =[];
		for(var j = 0; j < arrows.length; j++){
			currentPackage = arrows[j];
			if(currentPackage.from.text == name){
				toName = currentPackage.to.text;
				thisDep = {"to" : toName};
				dep.push(thisDep);
			}
			
		}
		if (dep.length !== 0){
			p={"name" : name, "dependencies" : dep, "position": position };
		}
		else{
			p={"name" : name, "position": position};
		}
		output.push(p);
	}
	var packagesAsJson = JSON.stringify(output);
	return packagesAsJson;
}

function get_type(thing){
    if(thing===null)return "[object Null]"; // special case
    return Object.prototype.toString.call(thing);
}

//ALT key soll temporär mode wechseln
/*$(window).on("keydown", function(event) {
    if (event.which === 18) {
        switchMode();
    }
}).on("keyup", function(event) {
	switchMode();
});*/

$(document).ready(function(){
	for(var i = 0; i < allPackages.length; i++){
		allPackages[i].create();
	}	
	stage.draw();
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
