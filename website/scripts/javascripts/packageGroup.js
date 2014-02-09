/* ------------------------------------------------------------ PackageGroup Class ----------------------------------------------------------- */
function PackageGroup(text){
	//this is a little hack to find out if one point of an arrow is a packageGroup or not
	this.className = 'packageGroup';
	this.text = text;
	this.color = 'white';
	this.isHighlightened = false;
	this.create = function(){
		this.createTextField();
		this.createContainer();
		this.createGroup();
		this.addEventListener();
	};

	this.createTextField = function() {
		this.textField = new Kinetic.Text({
			x: 5,
			y: 5,
			text: this.text,
			fontSize: 15,
			fontFamily: 'Calibri',
			fill: 'black',
			align: 'center',
			name: 'textField'
		});
	};

	this.createContainer = function(){
		this.rect = new Kinetic.Rect({
			width: this.textField.getWidth()+10,
			height: PACKAGE_HEIGHT,
			fill: this.color,
			stroke: 'black',
			name: 'packageRect'
		}); 
	};	

	this.createGroup = function(){
		var maxX = stage.getWidth()-this.rect.getWidth();
		this.group = new Kinetic.Group({
			width: this.rect.getWidth(),
			draggable: true,
			dragBoundFunc: function (pos) {
				var X = pos.x;
				var Y = pos.y;
				if (X < MIN_X) { X = MIN_X; }
				if (X > maxX) { X = maxX; }
				if (Y < MIN_Y) { Y = MIN_Y; }
				if (Y > MAX_Y) { Y = MAX_Y; }
				return ({ x: X, y: Y });	
			},
			id: this.textField.getText(),
			name: 'packageGroup'	
		});

		this.group.add(this.rect);
		this.group.add(this.textField);
		//need to check if to packages are overlapping, would not be nice
		this.group.move(1+Math.floor(Math.random() * (CONTAINER_WIDTH-this.rect.getWidth())), 1 + Math.floor(Math.random()*(480-this.rect.getHeight())));

		layer.add(this.group);
	};

	this.addEventListener = function(){
		this.group.on('mousedown', function (event) {
			if(drawingEnabled){
				mouseDownOnPackage(this,event);
			}
		}, false);
		this.group.on('mouseup', function (event) {
			if(drawingEnabled){
				mouseUpOnPackage(this, event);}
		}, false);

		//redraw arrows whenever a package is dragged arround
		this.group.on('dragstart dragmove', function(){
			for (var i = 0; i < arrows.length; i++){
				var packageIds = arrows[i].id.split("_");
				//see the bug in Arrow.draw()
				packages = [layer.find('#'+packageIds[0])[0], layer.find('#'+packageIds[1])[0]];
				if(packages[0].getId() == this.getId() || packages[1].getId() == this.getId()){
					arrows[i].remove();
					arrows[i].draw();
				}
			}
			packages = [];
			arrowLayer.drawScene();
		});

		this.group.on('mouseenter', function(){
			if(drawingEnabled){
				var pack = findPackageById(this.getId());
				pack.highlightPackage("lightblue"); 
			}
		});

		this.group.on('mouseleave', function(){
			if(drawingEnabled){
				if(packages.length > 0 && this.getId() === packages[0].text){return;}
				var pack = findPackageById(this.getId());
				pack.highlight.remove(); 
				layer.draw();
			}
		});
	};

	this.highlightPackage = function(color){
		if(typeof this.highlight !== 'undefined'){this.highlight.remove();}
		var pos = this.rect.getAbsolutePosition();
		var x = pos.x-4;
		var y = pos.y-4;
		var width = this.rect.getWidth()+8;
		var height = this.rect.getHeight()+8;
		this.highlight = new Kinetic.Rect({
			width: width,
			height: height,
			fill: color,
			stroke: color,
			strokeWidth:2
		});
		this.highlight.move(x,y);
		this.isHighlighted = true;
		layer.add(this.highlight);
		this.highlight.setZIndex(2);
		layer.draw();
	};	

	this.position = function(){
		return this.group.getAbsolutePosition();
	};

}