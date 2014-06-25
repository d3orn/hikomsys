var moving = false; 

var moreInfosEnabled = false;

function mouseDownOnPackage(packageGroup, event){
	clickCount++;
	var pack = findPackageById(packageGroup.getId());
	pack.highlightPackage("lightblue"); 
	if(clickCount == 1){
		packages.push(pack);
	}
	console.log('test');
}

function mouseUpOnPackage(packageGroup, event) {
	clickCount++;
	if(clickCount == 2){
		var firstPack = findPackageById(packages[0].text);
		var pack = findPackageById(packageGroup.getId());
		packages.push(pack);
		firstPack.highlight.remove();
		pack.highlight.remove();
		var id = packages[0].text + "_" + packages[1].text;
		if(packages[0].text == packages[1].text){
			writeMessage("You cannot add a loop");
		}
		else if(findArrowById(id) === -1){
			var arrow = new Arrow(packages[0],packages[1],id);
			arrows.push(arrow);
			arrow.draw();
		}
		else {
			writeMessage("dependency already drawn");
		}
		packages = [];
		clickCount = 0;

	}
	stage.draw();
}

function switchMode(){
	if(packages.length > 0){
		packages[0].highlight.remove();
	}
	clickCount = 0;
	packages = [];

	drawingEnabled = !drawingEnabled;
	var groups = packageLayer.get('Group');
	for (var i = 0; i < groups.length; i++){
		groups[i].setDraggable(!drawingEnabled );
	}
}

/* =============================================================== Eventhandler ============================================================== */
stage.on("mousedown", function (e) {
	if(clickCount === 0) return;
	if (moving) {
		moving = false;
		arrowLayer.drawScene();
	} else {
		var mousePos = getRelativePointerPosition;
		tmpArrow = new Arrow(packages[0], mousePos, "tmpArrow");
		tmpArrow.draw();
		moving = true;
	}
});

stage.on("mousemove", function (e) {
	if (moving) {
		tmpArrow.remove();
		var mousePos = getRelativePointerPosition();
		tmpArrow = new Arrow(packages[0], mousePos, "tmpArrow");
		tmpArrow.draw();
		moving = true;
		stage.draw();
	}
});

stage.on("mouseup", function (e) {
	moving = false;
	if(drawingEnabled && packages.length > 0){
		packages[0].highlight.remove();
		clickCount = 0;
		packages = [];
	}
	if(typeof tmpArrow !== "undefined") {tmpArrow.remove();} //remove only if there is one, if arrow exists dont let it be there twice or more check id
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
	for ( var i = 0; i < allPackages.length; i = i + 1 ) {
		var p;
		var position = {"X" : allPackages[i].position().x, "Y" : allPackages[i].position().y};
		name = allPackages[i].text;
		var dep =[];
		for ( var j = 0; j < arrows.length; j++){
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
