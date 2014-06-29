/* ------------------------------------------------------------ PackageGroup Class ----------------------------------------------------------- */
function PackageGroup(text, color, infos){
	//this is a little hack to find out if one point of an arrow is a packageGroup or not
	this.className = 'packageGroup';
	this.text = text;
	this.infos = infos;
	this.color = (color ? color : 'white');
	this.isHighlightened = false;
	this.infoBoxEnabled = this.classesEnabled = this.childrenEnabled = this.dependenciesEnabled = false;

	this.create = function(){
		this.createGroup();
		if(moreInfosEnabled){
			this.childrenInfoBox = createMenu('children');
			this.classesInfoBox = createMenu('classes');
			this.createDependencies();
		}
		this.addEventListener();
	};

	this.textField = kineticText({
		"size" : 15, 
		"x" : 5, 
		"y" : 5, 
		"text" : this.text, 
		"name" : 'textField'	
	});

	this.rect = new Kinetic.Rect({
		width: this.textField.getWidth()+10,
		height: PACKAGE_HEIGHT,
		fill: this.color,
		stroke: 'black',
		name: 'packageRect'
	}); 

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

		this.group.add(this.rect)
			.add(this.textField)
			//need to check if to packages are overlapping, would not be nice
			.move({x:1 + Math.floor(Math.random() * (CONTAINER_WIDTH-this.rect.getWidth())),
				y:1 + Math.floor(Math.random() * (480-this.rect.getHeight()))});

		packageLayer.add(this.group);
		return this;
	};

	this.addEventListener = function(){
		/*this.group.on('click', function(){
			if(event.button == 2){console.log('right mouse button')}
		})*/

		this.group.on('mousedown', function() {
			if(drawingEnabled){
				mouseDownOnPackage(this);
			}
		}, false);
		this.group.on('mouseup', function() {
			if(drawingEnabled){
				mouseUpOnPackage(this);}
		}, false);

		//redraw arrows whenever a package is dragged arround
		this.group.on('dragstart dragmove', function(){
			var pack = findPackageById(this.getId());
			pack.removeInfos();

			for (var i = 0; i < arrows.length; i++){
				var packageIds = arrows[i].id.split("_");
				//see the bug in Arrow.draw()
				packages = [packageLayer.find('#'+packageIds[0])[0], packageLayer.find('#'+packageIds[1])[0]];
				if(packages[0].getId() == this.getId() || packages[1].getId() == this.getId()){
					arrows[i].remove();
					arrows[i].draw();
				}
			}
			packages = [];
			infoLayer.draw();
			arrowLayer.drawScene();
		});

		this.group.on('mouseenter', function(){
			var pack = findPackageById(this.getId());
			if(moreInfosEnabled && !pack.infoBoxEnabled){
				pack.addInfoBox();
				stage.draw();
			}
			if(drawingEnabled){
				var pack = findPackageById(this.getId());
				pack.highlightPackage("lightblue", 5); 
			}
		});

		this.group.on('mouseleave', function(evt){
			if(moreInfosEnabled){
				var pack = findPackageById(this.getId());
				stage.draw();
			}
			if(drawingEnabled){
				if(typeof firstSelectedPackage !== 'undefined' && this.getId() === firstSelectedPackage.text){return;}
				var pack = findPackageById(this.getId());
				pack.highlightBox.remove(); 
				packageLayer.draw();
			}
		});
	};

							this.highlightPackage = function(color, size){
								removeIfExists(this.highlightBox);
								var pos = this.rect.getAbsolutePosition();
								this.highlightBox = new Kinetic.Rect({
									x: pos.x-size,
						       		y: pos.y-size,
									width: this.rect.getWidth()+2*size,
									height: this.rect.getHeight()+2*size,
									fill: color
								});
								this.isHighlighted = true;
								packageLayer.add(this.highlightBox);
								this.highlightBox.setZIndex(0);
								packageLayer.draw();
							};	


							this.position = function(){
								return this.group.getAbsolutePosition();
							};




}