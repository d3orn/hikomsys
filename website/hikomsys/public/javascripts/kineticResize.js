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