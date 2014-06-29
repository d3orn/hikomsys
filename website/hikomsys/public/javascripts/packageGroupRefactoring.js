/* ------------------------------------------------------------ PackageGroup Class ----------------------------------------------------------- */
function PackageGroup(text, color, infos) {
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
										width: this.textField.getWidth() + 10,
										height: PACKAGE_HEIGHT,
										fill: this.color,
										stroke: 'black'
									}); 

									this.createGroup = function() {
										var maxX = stage.getWidth()-this.rect.getWidth();
										this.group = new Kinetic.Group({
											width: this.rect.getWidth(),
											draggable: true,
											dragBoundFunc: function(pos) {
												var xCoordinate = pos.x;
												var yCoordinate = pos.y;
												if(xCoordinate < MIN_X) { xCoordinate = MIN_X; }
												if(xCoordinate > maxX) { xCoordinate = maxX; }
												if(yCoordinate < MIN_Y) { yCoordinate = MIN_Y; }
												if(yCoordinate > MAX_Y) { yCoordinate = MAX_Y; }
												return ({ x: xCoordinate, y: yCoordinate });
											},
											id: this.textField.getText()
										});

										this.group.add(this.rect)
											.add(this.textField);

										packageLayer.add(this.group);
									};

									this.addEventListener = function(){
										/*this.group.on('click', function(){
											if(event.button == 2){console.log('right mouse button')}
										})*/

										this.group.on('mousedown', function() {
											if(drawingEnabled){ mouseDownOnPackage(this); }
										}, false);
										this.group.on('mouseup', function() {
											if(drawingEnabled){ mouseUpOnPackage(this); }
										}, false);

										this.group.on('dragstart dragmove', function(){
			var pack = findPackageById(this.getId());
			pack.removeInfos();

											for (var i = 0; i < arrows.length; i++){
												var packageIds = arrows[i].id.split("_");
												//see the bug in Arrow.draw() - I don't see what bug..
												if(packageIds[0] == this.getId() || packageIds[1] == this.getId()){
													arrows[i].remove();
													arrows[i].draw();
												}
											}
											packages = [];
			infoLayer.drawScene();
											arrowLayer.drawScene();
										});

										this.group.on('mouseenter', function(){
											var pack = findPackageById(this.getId());
											if(moreInfosEnabled && !pack.infoBoxEnabled){
												pack.addInfoBox();
												stage.draw();
											}
											if(drawingEnabled){
												pack.highlightPackage("lightblue", 5); 
											}
										});

										this.group.on('mouseleave', function(evt){
											var pack = findPackageById(this.getId());
			if(moreInfosEnabled){
				stage.draw();
			}What the hell those this?
			//TODO this if is really ugly - how could I improve it...
											if(drawingEnabled && (typeof firstSelectedPackage == 'undefined' || this.getId() !== firstSelectedPackage.text)){
												pack.highlightBox.remove();
												packageLayer.draw();		
											}
										});
									};


									this.highlightPackage = function(color, size){
										removeIfExists(this.highlightBox);
										var pos = this.rect.getAbsolutePosition();
										this.highlightBox = new Kinetic.Rect({
											x: pos.x - size,
											y: pos.y - size,
											width: this.rect.getWidth() + 2*size,
											height: this.rect.getHeight() + 2*size,
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















 /* CURRENT NOT REFACTORED */





	/* Additional Information */

	var createMenu = function(name){
		temp = this.infos[name];
		tempArray = [];
		var i = 0;
		for(key in temp){
			if(temp[key].name)
				name = temp[key].name;
				text = kineticText({
					"size" : 12, 
					"x" : 5, 
					"y" : 5+i*(PACKAGE_HEIGHT-2), 
					"text" : name, 	
				});
				tempArray.push(text);
				i++;
		}
		return tempArray;
	}

	this.removeInfos = function(){
		this.infoBoxEnabled = this.classesEnabled = this.childrenEnabled = this.dependenciesEnabled = false;
		removeIfExists(this.infoGroup);
		removeIfExists(this.classGroup);
		removeIfExists(this.childrenGroup);
		removeIfExists(this.dependenciesGroup);
		infoLayer.draw();
	}

		this.createDependencies = function(){
		var dependencies = this.infos['allDependencies'];
		this.dependenciesInfoBox = [];
		var i = 0;	
		for(key in dependencies){	
			if(dependencies[key]['from']){
				toGroup = new Kinetic.Group();

				from = kineticText({
					"size" : 12, 
					"x" : 5, 
					"y" : (5+i*(PACKAGE_HEIGHT-2)), 
					"text" : dependencies[key]['from']['class']+'.'+dependencies[key]['from']['name'], 
					"id" : dependencies[key]['from']['package'] + 'From',
					"name" : i	
				});

				toClass = kineticText({
					"size" : 12, 
					"x" : 5, 
					"y" : (5+0*(PACKAGE_HEIGHT-2)), 
					"text" : 'Class: '+dependencies[key]['to']['class']
				});

				toName = kineticText({
					"size" : 12, 
					"x" : 5, 
					"y" : (5+1*(PACKAGE_HEIGHT-2)), 
					"text" : 'Name: '+dependencies[key]['to']['name']
				});

				toPackage = kineticText({
					"size" : 12, 
					"x" : 5, 
					"y" : (5+2*(PACKAGE_HEIGHT-2)), 
					"text" : 'Package: '+dependencies[key]['to']['package']
				});

				toBox = new Kinetic.Rect({
					width: Math.max(toClass.getWidth(),toName.getWidth(),toPackage.getWidth())+10,
					height: (PACKAGE_HEIGHT-2)*3,
					fill: 'white',
					stroke: 'black',
					strokeWidth:2
				})

				title = kineticText({
					"size" : 12, 
					"x" : 4, 
					"y" : -(PACKAGE_HEIGHT-8), 
					"text" : 'TO'
				});

				titleBox = new Kinetic.Rect({
					width: title.getWidth()+10,
					height: (PACKAGE_HEIGHT-4),
					fill: 'white',
					stroke: 'black',
					strokeWidth:2
				})
			
				toGroup.add(titleBox)
					.add(title)
					.add(toBox)
					.add(toClass)
					.add(toName)
					.add(toPackage);

				titleBox.move({x:0, y:-(PACKAGE_HEIGHT-4)});

				this.dependenciesInfoBox.push({'from' : from, 'to' : toGroup});
				
				i++;
			}
		}
		return this;
	};
	
	this.addInfoBox = function(){
		this.infoCount = (this.classesInfoBox.length === 0 ? 0 : 1) + (this.childrenInfoBox.length === 0 ? 0 : 1) + (this.dependenciesInfoBox.length === 0 ? 0 : 1);
		this.infoBoxEnabled = true;

		this.classesInfoText = kineticText({
			"size" : 12, 
			"text" : 'CLASSES', 
			"id" : 	this.text + 'Classes',
		});

		this.childrenInfoBoxText = kineticText({
			"size" : 12, 
			"text" : 'CHILDREN', 
			"id" : 	this.text + 'Children',
		}); 

		this.dependenciesInfoBoxText = kineticText({
			"size" : 12, 
			"text" : 'DEPENDENCIES', 
			"id" : 	this.text + 'Dependencies',
		}); 

		this.classesInfoText.on('mouseenter', function(){
			var id = this.getId().replace('Classes', '');
			var pack = findPackageById(id);
			this.setFill('blue');
			pack.childrenInfoBoxText.setFill('black');
			pack.dependenciesInfoBoxText.setFill('black');
			if(typeof pack.childrenGroup !== 'undefined'){pack.childrenGroup.remove(); pack.childrenEnabled = false;}
			if(typeof pack.dependenciesGroup !== 'undefined'){pack.dependenciesGroup.remove(); pack.dependenciesEnabled = false;}
			if(!pack.classesEnabled){
				pack.classesEnabled = true;
				pack.addClassesInfo();
			}	
			infoLayer.draw();
		});

		this.childrenInfoBoxText.on('mouseenter', function(){
			var id = this.getId().replace('Children', '');
			var pack = findPackageById(id);
			this.setFill('blue');
			pack.classesInfoText.setFill('black');
			pack.dependenciesInfoBoxText.setFill('black');
			if(typeof pack.classGroup !== 'undefined'){pack.classGroup.remove(); pack.classesEnabled = false;}
			if(typeof pack.dependenciesGroup !== 'undefined'){pack.dependenciesGroup.remove(); pack.dependenciesEnabled = false;}
			if(!pack.childrenEnabled){
				pack.childrenEnabled = true;
				pack.addchildrenInfoBox();
			}	
			infoLayer.draw();
		});

		this.dependenciesInfoBoxText.on('mouseenter', function(){
			var id = this.getId().replace('Dependencies', '');
			var pack = findPackageById(id);
			this.setFill('blue');
			pack.classesInfoText.setFill('black');
			pack.childrenInfoBoxText.setFill('black');
			if(typeof pack.classGroup !== 'undefined'){pack.classGroup.remove(); pack.classesEnabled = false;}
			if(typeof pack.childrenGroup !== 'undefined'){pack.childrenGroup.remove();pack.childrenEnabled = false;}
			if(!pack.dependenciesEnabled){
				pack.dependenciesEnabled = true;
				pack.adddependenciesInfoBox();
			}	
			infoLayer.draw();
		});

		this.infoBox = new Kinetic.Rect({
			width: this.dependenciesInfoBoxText.getWidth()+10,
			height: (PACKAGE_HEIGHT-3)*this.infoCount,
			fill: 'white',
			stroke: 'black',
			strokeWidth:2
		});
		this.closeButton = new Kinetic.Rect({
			width: 13,
			height: 13,
			fill: 'red',
			stroke: 'black',
			strokeWidth:2,
			id: this.textField.getText()+'CloseButton'
		});
		this.closeButton.on('click', function(){
			var id = this.getId().replace('CloseButton', '');
			var pack = findPackageById(id);
			pack.hide(pack.infoGroup);
			pack.removeInfos();
		});

		this.infoGroup = new Kinetic.Group({
			opacity: 0,
			name: 'infoGroup'	
		});
		this.infoGroup.add(this.infoBox);

		if(this.classesInfoBox.length > 0){
			this.classesInfoText.move({x:5, y:5});
			this.infoGroup.add(this.classesInfoText);
		}
		if(this.childrenInfoBox.length > 0){
			var offset = this.classesInfoBox.length > 0 ? 1 : 0; 
			this.childrenInfoBoxText.move({x:5, y:5+offset*(PACKAGE_HEIGHT-3)});
			this.infoGroup.add(this.childrenInfoBoxText);
		}
		
		if(this.dependenciesInfoBox.length > 0){
			var offset = (this.classesInfoBox.length > 0 ? 1 : 0) + (this.childrenInfoBox.length > 0 ? 1 : 0);
			this.dependenciesInfoBoxText.move({x:5, y:5+offset*(PACKAGE_HEIGHT-3)});
			this.infoGroup.add(this.dependenciesInfoBoxText);
		}
		
		this.infoGroup.add(this.closeButton)
			.move({x:this.position().x+this.rect.getWidth()+1, y:this.position().y});
		this.closeButton.move({x:0, y:-this.closeButton.getHeight()});
		infoLayer.add(this.infoGroup);
		this.show(this.infoGroup,2);
	}

	this.addClassesInfo = function(){
		this.classesMaxLength = 0;
		if(typeof this.classGroup !== 'undefined'){this.classGroup.remove();}

		for (var i = 0; i < this.classesInfoBox.length; i++){
			if(this.classesInfoBox[i].getWidth() > this.classesMaxLength){this.classesMaxLength = this.classesInfoBox[i].getWidth()};
		}

		this.classesBox = new Kinetic.Rect({
			width: this.classesMaxLength+10,
			height: (PACKAGE_HEIGHT-2)*this.classesInfoBox.length,
			fill: 'white',
			stroke: 'black',
			strokeWidth:2
		});
		this.classGroup = new Kinetic.Group({
			opacity: 0
		});
		this.classGroup.add(this.classesBox);

		for (var i = 0; i < this.classesInfoBox.length; i++){
			this.classGroup.add(this.classesInfoBox[i]);
		}

		this.classGroup.move({x:this.infoBox.getWidth()+1, y:0});
		this.infoGroup.add(this.classGroup);
		this.show(this.classGroup,1);
	}

	this.addchildrenInfoBox = function(){
		this.childrenMaxLength = 0;
		if(typeof this.childrenGroup !== 'undefined'){this.childrenGroup.remove();}

		for (var i = 0; i < this.childrenInfoBox.length; i++){
			if(this.childrenInfoBox[i].getWidth() > this.childrenMaxLength){this.childrenMaxLength = this.childrenInfoBox[i].getWidth()};
		}

		this.childrenBox = new Kinetic.Rect({
			width: this.childrenMaxLength+10,
			height: (PACKAGE_HEIGHT-2)*this.childrenInfoBox.length,
			fill: 'white',
			stroke: 'black',
			strokeWidth:2
		});
		this.childrenGroup = new Kinetic.Group({
			opacity: 0
		});
		this.childrenGroup.add(this.childrenBox);

	 	for (var i = 0; i < this.childrenInfoBox.length; i++){
			this.childrenGroup.add(this.childrenInfoBox[i]);
		}

		this.childrenGroup.move({x:this.infoBox.getWidth()+1, y:0});
		this.infoGroup.add(this.childrenGroup);
		this.show(this.childrenGroup,1);
	}

	this.adddependenciesInfoBox = function(){
		this.dependenciesMaxLength = 0;
		if(typeof this.classGroup !== 'undefined'){this.classGroup.remove();}

		for (var i = 0; i < this.dependenciesInfoBox.length; i++){
			if(this.dependenciesInfoBox[i]['from'].getWidth() > this.dependenciesMaxLength){this.dependenciesMaxLength = this.dependenciesInfoBox[i]['from'].getWidth()};
		}

		this.dependenciesBox = new Kinetic.Rect({
			width: this.dependenciesMaxLength+10,
			height: (PACKAGE_HEIGHT-2)*this.dependenciesInfoBox.length,
			fill: 'white',
			stroke: 'black',
			strokeWidth:2
		});
		this.dependenciesGroup = new Kinetic.Group({
			opacity: 0
		});
		this.dependenciesGroup.add(this.dependenciesBox);

	 	for (var i = 0; i < this.dependenciesInfoBox.length; i++){
	 		from  = this.dependenciesInfoBox[i]['from'];

			this.dependenciesGroup.add(from);
			from.on('mouseenter', function(event){
				this.setFill('blue');
				var index = this.getName();
				var id = this.getId().replace('From', '');
				var pack = findPackageById(id);
				var to = pack.dependenciesInfoBox[index]['to'];
				to.setPosition(pack.dependenciesBox.getWidth(),0);
				pack.dependenciesGroup.add(to);

				pack.show(to,1);
				stage.draw();
			})
			from.on('mouseleave', function(event){
				this.setFill('black');
				var index = this.getName();
				var id = this.getId().replace('From', '');
				var pack = findPackageById(id);
				var to = pack.dependenciesInfoBox[index]['to'];

				if(to){
					to.remove();
					stage.draw();
				}
			})
		}

		title = new Kinetic.Text({
			text: 'FROM',
			fontSize: 12,
			fontFamily: 'Calibri',
			fill: 'black',
			align: 'left',
		})

		titleBox = new Kinetic.Rect({
			width: title.getWidth()+10,
			height: (PACKAGE_HEIGHT-4),
			fill: 'white',
			stroke: 'black',
			strokeWidth:2
		})

		this.dependenciesGroup.add(titleBox)
			.add(title)
			.move({x:this.infoBox.getWidth()+1, y:0})
		
		titleBox.move({x:0, y:-(PACKAGE_HEIGHT-4)});
		title.move({x:4, y:-(PACKAGE_HEIGHT-8)});
		this.infoGroup.add(this.dependenciesGroup);
		this.show(this.dependenciesGroup,1);
	}



































	/* DEPRECATED */
	this.hide = function(element, time){
		var tween = new Kinetic.Tween({
			node: element,
			opacity: 0,
			duration:time,
		});
		tween.play(function(){
			element.removeChildren()
				.remove();
		});
	}

	this.show = function(element, time){
		var tween = new Kinetic.Tween({
			node: element,
			opacity: 1,
			duration:time,
		});
		tween.play();
	}
}