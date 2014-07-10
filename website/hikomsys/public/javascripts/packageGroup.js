/* ------------------------------------------------------------ PackageGroup Class ----------------------------------------------------------- */
function PackageGroup(text, color, infos) {
	this.className = 'packageGroup';
	this.text = text;
	this.infos = infos;
	this.color = color || 'white';
	this.isHighlightened = false;

	this.infoBoxEnabled = this.classesEnabled = this.childrenEnabled = this.dependenciesEnabled = false; 
	this.texts = ['Classes' , 'Children', 'Dependencies'];

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
<<<<<<< HEAD
			.add(this.textField);

		packageLayer.add(this.group);
=======
			.add(this.textField)
			//need to check if to packages are overlapping, would not be nice
			.move({x:1 + Math.floor(Math.random() * (CONTAINER_WIDTH-this.rect.getWidth())),
				y:1 + Math.floor(Math.random() * (480-this.rect.getHeight()))});

		packageLayer.add(this.group);
		return this;
	};

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
>>>>>>> 3ef42a1a0dbb03d23c2d7b016a8d4c52544e2a01
	};

	this.addEventListener = function(){
		/*this.group.on('click', function(){
			if(event.button == 2){console.log('right mouse button')}
		})*/

		this.group.on('mousedown', function() {
<<<<<<< HEAD
			if(drawingEnabled){ mouseDownOnPackage(this); }
		}, false);
		this.group.on('mouseup', function() {
			if(drawingEnabled){ mouseUpOnPackage(this); }
=======
			if(drawingEnabled){
				mouseDownOnPackage(this);
			}
		}, false);
		this.group.on('mouseup', function() {
			if(drawingEnabled){
				mouseUpOnPackage(this);}
>>>>>>> 3ef42a1a0dbb03d23c2d7b016a8d4c52544e2a01
		}, false);

		this.group.on('dragstart dragmove', function(){
			var pack = findPackageById(this.getId());
			pack.removeInfos();

			for (var i = 0; i < arrows.length; i++){
				var packageIds = arrows[i].id.split("_");
				//see the bug in Arrow.draw() - I don't see a bug..
				if(packageIds[0] == this.getId() || packageIds[1] == this.getId()){
					arrows[i].remove();
					arrows[i].draw();
				}
			}
			packages = [];
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

			//TODO this if is really ugly - how could I improve it...
			if(drawingEnabled && (typeof firstSelectedPackage == 'undefined' || this.getId() !== firstSelectedPackage.text)){
				pack.highlightBox.remove();
				packageLayer.draw();		
			}
<<<<<<< HEAD
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

/* ---------------------------------------------------- Additional Information ---------------------------------------------------- */

	var createMenu = function(name){
		temp = this.infos[name];
		tempArray = [];
		var i = 0;
		for(key in temp){
			if(temp[key].name){
				name = temp[key].name;
				text = kineticText({
					"size" : 12,
					"x" : 5,
					"y" : 5+i*(PACKAGE_HEIGHT-2),
					"text" : name
				});
				tempArray.push(text);
				i++;
			}
		}
		return tempArray;
	};

	this.createDependencies = function(){
		var allDependencies = this.infos['allDependencies'];
		var yOffset = 0;	
		
		this.dependenciesInfoBox = [];
		
		for(key in allDependencies){	
			currentDependency = allDependencies[key];
			currentDependencyFrom = currentDependency['from'];
			if(currentDependencyFrom){
				from = kineticText({
					"size" : 12, 
					"x" : 5, 
					"y" : (5+ yOffset *(PACKAGE_HEIGHT-2)), 
					"text" : currentDependencyFrom['class']+'.'+currentDependencyFrom['name'], 
					"id" : currentDependencyFrom['package'] + 'From',
					"name" : yOffset	
				});

				this.dependenciesInfoBox.push({'from' : from, 'to' : createToGroup(currentDependency['to'])});
				
				yOffset++;
=======
			if(drawingEnabled){
				if(typeof firstSelectedPackage !== 'undefined' && this.getId() === firstSelectedPackage.text){return;}
				var pack = findPackageById(this.getId());
				pack.highlight.remove(); 
				packageLayer.draw();
>>>>>>> 3ef42a1a0dbb03d23c2d7b016a8d4c52544e2a01
			}
		}
		return this;
	};

	var createToGroup = function(array){
		return new Kinetic.Group()
			.add(createTitle('to', 14))
			.add(createToBox(array));
	};

	var createTitle = function(title, width){
		return new Kinetic.Group()
			.add(new Kinetic.Rect({
					width: width + 8,
					height: (PACKAGE_HEIGHT-4),
					x: 0,
					y: -(PACKAGE_HEIGHT-4),
					fill: 'white',
					stroke: 'black',
					strokeWidth:2
				})
			)
			.add(kineticText({
					"size" : 12, 
					"x" : 4, 
					"y" : -(PACKAGE_HEIGHT-8), 
					"text" : title.toUpperCase()
				})
			);
	};

	var createToBox = function(array){
		toClass = createToContent('Class: ' + array['class'], 0);
		toName = createToContent('Name: ' + array['name'], 1);
		toPackage = createToContent('Package: ' + array['package'], 2);

		toBox = new Kinetic.Rect({
			width: Math.max(toClass.getWidth(),toName.getWidth(),toPackage.getWidth())+10,
			height: (PACKAGE_HEIGHT-2)*3,
			fill: 'white',
			stroke: 'black',
			strokeWidth:2
		});

		return new Kinetic.Group()
			.add(toBox)
			.add(toClass)
			.add(toName)
			.add(toPackage);
	};

	var createToContent = function(content, offset){
		return kineticText({
			"size" : 12, 
			"x" : 5, 
			"y" : (5 + offset *(PACKAGE_HEIGHT-2)), 
			"text" : content
		});
	};

	this.addInfoBox = function(){
		this.infoCount = !(this.classesInfoBox.length === 0) + !(this.childrenInfoBox.length === 0 ) + !(this.dependenciesInfoBox.length === 0);
		this.infoBoxEnabled = true;

		this.createInfoTexts();
		this.createCloseButton();

		this.infoBox = new Kinetic.Rect({
			width: this.dependenciesInfoBoxText.getWidth()+10,
			height: (PACKAGE_HEIGHT-3)*this.infoCount,
			fill: 'white',
			stroke: 'black',
			strokeWidth:2
		});							

		this.infoGroup = new Kinetic.Group({
			x:this.position().x+this.rect.getWidth()+1,
			y:this.position().y,
			opacity: 0,
			name: 'infoGroup'	
		});
		this.infoGroup.add(this.infoBox);
		this.infoGroup.add(this.closeButton);
		//this is not really nice it also add the info to the infoGroup either use a better name or seperate functions
		this.moveInfoTexts();
									
		infoLayer.add(this.infoGroup);
		this.show(this.infoGroup,2);

		this.infoAddEventHandler();
	};

	this.infoAddEventHandler = function(){
		this.classInfoBoxTextEventHandler();
		this.childrenInfoBoxTextEventHandler();
		this.dependenciesInfoBoxTextEventHandler();
	};

	this.classInfoBoxTextEventHandler = function(){		
		this.classesInfoText.on('mouseenter', function(){
			var id = this.getId().replace('Classes', '');
			var pack = findPackageById(id);
			this.setFill('blue');

			resetOthers(pack, 'classes');

			if(!pack.classesEnabled){
				pack.classesEnabled = true;
				pack.classGroup = pack.addInfo(pack.classesInfoBox);
			}	
			infoLayer.draw();
		});
	};

	this.childrenInfoBoxTextEventHandler = function(){		
		this.childrenInfoBoxText.on('mouseenter', function(){
			var id = this.getId().replace('Children', '');
			var pack = findPackageById(id);
			this.setFill('blue');

			resetOthers(pack, 'children');

			if(!pack.childrenEnabled){
				pack.childrenEnabled = true;
				pack.childrenGroup = pack.addInfo(pack.childrenInfoBox);
			}	
			infoLayer.draw();
		});
	};

	this.dependenciesInfoBoxTextEventHandler = function(){		
		this.dependenciesInfoBoxText.on('mouseenter', function(){
			var id = this.getId().replace('Dependencies', '');
			var pack = findPackageById(id);
			this.setFill('blue');

			resetOthers(pack, 'dependencies');

			if(!pack.dependenciesEnabled){
				pack.dependenciesEnabled = true;
				pack.addDependenciesInfoBox();
			}	
			infoLayer.draw();
		});
	};	

	var resetOthers = function(packagegroup, name){
		switch(name){
			case 'classes':
				resetChildren(packagegroup);
				resetDependencies(packagegroup);
				break;
			case 'children':
				resetClasses(packagegroup);
				resetDependencies(packagegroup);
				break;
			case 'dependencies':
				resetClasses(packagegroup);
				resetChildren(packagegroup);
				break;
		}
	};

	var resetClasses = function(packagegroup){
			packagegroup.classesInfoText.setFill('black');
			removeIfExists(packagegroup.classGroup);
			packagegroup.classesEnabled = false;
	};

	var resetChildren = function(packagegroup){
		packagegroup.childrenInfoBoxText.setFill('black');
		removeIfExists(packagegroup.childrenGroup);
		packagegroup.childrenEnabled = false;
	};

	var resetDependencies = function(packagegroup){
		packagegroup.dependenciesInfoBoxText.setFill('black');
		removeIfExists(packagegroup.dependenciesGroup);
		packagegroup.dependenciesEnabled = false;
	};

	this.createCloseButton = function(){
		this.closeButton = new Kinetic.Rect({
			width: 13,
			height: 13,
			fill: 'red',
			stroke: 'black',
			strokeWidth:2,
			id: this.textField.getText()+'CloseButton'
		});

		this.closeButton.move({x:0, y:-this.closeButton.getHeight()});
										
		this.closeButton.on('click', function(){
			var id = this.getId().replace('CloseButton', '');
			var pack = findPackageById(id);
			pack.hide(pack.infoGroup);
			pack.removeInfos();
		});
	};

	this.moveInfoTexts = function(){
		if(this.classesInfoBox.length > 0){
			this.classesInfoText.move({x:5, y:5});
			this.infoGroup.add(this.classesInfoText);
		}
		if(this.childrenInfoBox.length > 0){
<<<<<<< HEAD
			var offset = this.classesInfoBox.length > 0; 
=======
			var offset = this.classesInfoBox.length > 0 ? 1 : 0; 
>>>>>>> 3ef42a1a0dbb03d23c2d7b016a8d4c52544e2a01
			this.childrenInfoBoxText.move({x:5, y:5+offset*(PACKAGE_HEIGHT-3)});
			this.infoGroup.add(this.childrenInfoBoxText);
		}
		if(this.dependenciesInfoBox.length > 0){
<<<<<<< HEAD
			var offset = (this.classesInfoBox.length > 0) + (this.childrenInfoBox.length > 0);
			this.dependenciesInfoBoxText.move({x:5, y:5+offset*(PACKAGE_HEIGHT-3)});
			this.infoGroup.add(this.dependenciesInfoBoxText);
		}
	};
=======
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
>>>>>>> 3ef42a1a0dbb03d23c2d7b016a8d4c52544e2a01

	this.createInfoTexts = function(){
		infoTexts = [];
		for(var i = 0; i < this.texts.length; i++){
			infoTexts.push(kineticText({
				"size" : 12, 
				"text" : this.texts[i].toUpperCase(),
				"id" : 	this.text + this.texts[i]
				})
			);
		}
		this.classesInfoText = infoTexts[0];
		this.childrenInfoBoxText = infoTexts[1];
		this.dependenciesInfoBoxText = infoTexts[2];
	};

	this.addInfo = function(infoBox){
		var maxLength = 0;
		var length = infoBox.length;
		
		for (var i = 0; i < length; i++){
			if(infoBox[i].getWidth() > maxLength){ maxLength = infoBox[i].getWidth();};
		}

		var box = new Kinetic.Rect({
			width: maxLength+10,
			height: (PACKAGE_HEIGHT-2)*length,
			fill: 'white',
			stroke: 'black',
			strokeWidth:2
		});
		var group = new Kinetic.Group({
			opacity: 0
		});
		group.add(box);

		for (var i = 0; i < length; i++){
			group.add(infoBox[i]);
		}

<<<<<<< HEAD
		group.move({x:this.infoBox.getWidth()+1, y:0});
		this.infoGroup.add(group);
		this.show(group,1);
		
		return group;
	};

	this.addDependenciesInfoBox = function(){
		this.dependenciesMaxLength = this.dependenciesInfoBox.reduce(
			function(a,b){
				return a['from'].getWidth() > b['from'].getWidth() ? a : b;
			})['from'].getWidth();
=======
		this.classGroup.move({x:this.infoBox.getWidth()+1, y:0});
		this.infoGroup.add(this.classGroup);
		this.show(this.classGroup,1);
	}
>>>>>>> 3ef42a1a0dbb03d23c2d7b016a8d4c52544e2a01

		this.createDependenciesGroup();

		for (var i = 0; i < this.dependenciesInfoBox.length; i++){
			from  = this.dependenciesInfoBox[i]['from'];
			this.dependenciesGroup.add(from);
			boxEventHandler(from);
		}

		this.dependenciesGroup.add(createTitle('from', 31));
		this.infoGroup.add(this.dependenciesGroup);
		this.show(this.dependenciesGroup,1);
	};

	var boxEventHandler = function(box){
		boxAddMouseEnter(box);
		boxAddMouseLeave(box);
	};

<<<<<<< HEAD
	var boxAddMouseEnter = function(box){
		box.on('mouseenter', function(event){
			var id = box.getId().replace('From', '');
			var pack = findPackageById(id);
			this.setFill('blue');
			toBox = getToBox(this);
=======
		this.childrenGroup.move({x:this.infoBox.getWidth()+1, y:0});
		this.infoGroup.add(this.childrenGroup);
		this.show(this.childrenGroup,1);
	}
>>>>>>> 3ef42a1a0dbb03d23c2d7b016a8d4c52544e2a01

			toBox.setPosition({x:pack.dependenciesBox.getWidth(), y: 0});
			pack.dependenciesGroup.add(toBox);

			pack.show(toBox,1);
			stage.draw();
		});
	};

	var boxAddMouseLeave = function(box){
		box.on('mouseleave', function(event){
			this.setFill('black');
			toBox = getToBox(this);

			if(toBox){
				toBox.remove();
				stage.draw();
			}
		});
	};

	var getToBox = function(box){
		var index = box.getName();
		var id = box.getId().replace('From', '');
		var pack = findPackageById(id);
		return pack.dependenciesInfoBox[index]['to'];
	};

	this.createDependenciesGroup = function(){
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
<<<<<<< HEAD
		this.dependenciesGroup.add(this.dependenciesBox)
			.move({x:this.infoBox.getWidth()+1, y:0});
	};
=======
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
>>>>>>> 3ef42a1a0dbb03d23c2d7b016a8d4c52544e2a01

	this.removeInfos = function(){
		this.infoBoxEnabled = this.classesEnabled = this.childrenEnabled = this.dependenciesEnabled = false;
		removeIfExists(this.infoGroup);
		removeIfExists(this.classGroup);
		removeIfExists(this.childrenGroup);
		removeIfExists(this.dependenciesGroup);
		infoLayer.draw();
	};
/*-------------------------------------------------------- DEPRECATED --------------------------------------------------------*/
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
<<<<<<< HEAD
=======

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
		this.highlight.move({x:x,y:y});
		this.isHighlighted = true;
		packageLayer.add(this.highlight);
		this.highlight.setZIndex(0);
		packageLayer.draw();
	};	

	this.removeInfos = function(){
		this.infoBoxEnabled = this.classesEnabled = this.childrenEnabled = this.dependenciesEnabled = false;
		if(typeof this.infoGroup !== 'undefined'){this.infoGroup.remove();}
		if(typeof this.classGroup !== 'undefined'){this.classGroup.remove();}
		if(typeof this.childrenGroup !== 'undefined'){this.childrenGroup.remove();}
		if(typeof this.dependenciesGroup !== 'undefined'){this.dependenciesGroup.remove();}
		infoLayer.draw();
	}

	this.position = function(){
		return this.group.getAbsolutePosition();
	};

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

>>>>>>> 3ef42a1a0dbb03d23c2d7b016a8d4c52544e2a01
}