/* ------------------------------------------------------------ PackageGroup Class ----------------------------------------------------------- */
function PackageGroup(text){
	//this is a little hack to find out if one point of an arrow is a packageGroup or not
	this.className = 'packageGroup';
	this.text = text;
	this.color = 'white';
	this.isHighlightened = false;
	this.infoBoxEnabled = this.classesEnabled = this.childrenEnabled = this.dependenciesEnabled = false;
	this.create = function(){
		this.createTextField()
			.createContainer()
			.createGroup();
		if(moreInfosEnabled){
			this.getClasses()
				.getChildren()
				.getDependencies();
		}
		this.addEventListener();
	};

	this.createTextField = function() {
		this.textField = newText(15);
		this.textField.setPosition(5,5);
		this.textField.setText(this.text);
		this.textField.setName('textField');

		return this;
	};

	this.createContainer = function(){
		this.rect = new Kinetic.Rect({
			width: this.textField.getWidth()+10,
			height: PACKAGE_HEIGHT,
			fill: this.color,
			stroke: 'black',
			name: 'packageRect'
		}); 
		return this;
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

		this.group.add(this.rect)
			.add(this.textField)
			//need to check if to packages are overlapping, would not be nice
			.move(1+Math.floor(Math.random() * (CONTAINER_WIDTH-this.rect.getWidth())), 1 + Math.floor(Math.random()*(480-this.rect.getHeight())));

		packageLayer.add(this.group);
		return this;
	};

	//getClasses und getChildren -> getJSON auslagern
	this.getClasses = function(){
		var cla = [];
		$.getJSON("getClasses.php", {name : this.text})
			.done(function(data){
				if(data){
					for(var i = 0; i < data.length; i++){
						text = newText(12);
						text.setPosition(5,5+i*(PACKAGE_HEIGHT-2));
						text.setText(data[i]['name']);
						cla.push(text);
					}
				}
			});
		this.Classes = cla;
		return this;
	}

	this.getChildren = function(){
		var chi = [];
		$.getJSON("getChildren.php", {name : this.text})
			.done(function(data){
				if(data){
					for(var i = 0; i < data.length; i++){
						text = newText(12);
						text.setPosition(5,5+i*(PACKAGE_HEIGHT-2));
						text.setText(data[i]['name']);
						chi.push(text);
					}
				}
			});
		this.Children = chi;
		return this;
	};

	this.getDependencies = function(){
		var dep = [];
		$.getJSON("getDependencies.php", {name : this.text})
			.done(function(data){
				if(data){
					for(var i = 0; i < data.length; i++){
						toGroup = new Kinetic.Group();

						from = newText2({
											"size" : 12, 
											"x" : 5, 
											"y" : (5+i*(PACKAGE_HEIGHT-2)), 
											"text" : data[i]['from']['class']+'.'+data[i]['from']['name'], 
											"id" : data[i]['from']['package'] + 'From',
											"name" : i	
										});

						toClass = newText2({
												"size" : 12, 
												"x" : 5, 
												"y" : (5+0*(PACKAGE_HEIGHT-2)), 
												"text" : 'Class: '+data[i]['to']['class']
											});

						toName = newText2({
												"size" : 12, 
												"x" : 5, 
												"y" : (5+1*(PACKAGE_HEIGHT-2)), 
												"text" : 'Name: '+data[i]['to']['name']
											});

						toPackage = newText2({
												"size" : 12, 
												"x" : 5, 
												"y" : (5+2*(PACKAGE_HEIGHT-2)), 
												"text" : 'Package: '+data[i]['to']['package']
											});

						toBox = new Kinetic.Rect({
							width: Math.max(toClass.getWidth(),toName.getWidth(),toPackage.getWidth())+10,
							height: (PACKAGE_HEIGHT-2)*3,
							fill: 'white',
							stroke: 'black',
							strokeWidth:2
						})

						title = newText2({
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

						titleBox.move(0,-(PACKAGE_HEIGHT-4));

						dep.push({'from' : from, 'to' : toGroup});
					}
				}	
			});
		this.Dependencies = dep;
		return this;
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
				pack.highlightPackage("lightblue"); 
			}
		});

		this.group.on('mouseleave', function(evt){
			if(moreInfosEnabled){
				var pack = findPackageById(this.getId());
				stage.draw();
			}
			if(drawingEnabled){
				if(packages.length > 0 && this.getId() === packages[0].text){return;}
				var pack = findPackageById(this.getId());
				pack.highlight.remove(); 
				packageLayer.draw();
			}
		});
	};

	this.addInfoBox = function(){
		this.infoCount = (this.Classes.length === 0 ? 0 : 1) + (this.Children.length === 0 ? 0 : 1) + (this.Dependencies.length === 0 ? 0 : 1);
		this.infoBoxEnabled = true;

		this.classesInfoText = newText(12);
		this.classesInfoText.setText('CLASSES');
		this.classesInfoText.setId(this.text + 'Classes'); 

		this.childrenInfoText = newText(12);
		this.childrenInfoText.setText('CHILDREN');
		this.childrenInfoText.setId(this.text + 'Children'); 

		this.dependenciesInfoText = newText(12);
		this.dependenciesInfoText.setText('DEPENDENCIES');
		this.dependenciesInfoText.setId(this.text + 'Dependencies'); 

		this.classesInfoText.on('mouseenter', function(){
			var id = this.getId().replace('Classes', '');
			var pack = findPackageById(id);
			this.setFill('blue');
			pack.childrenInfoText.setFill('black');
			pack.dependenciesInfoText.setFill('black');
			if(typeof pack.childrenGroup !== 'undefined'){pack.childrenGroup.remove(); pack.childrenEnabled = false;}
			if(typeof pack.dependenciesGroup !== 'undefined'){pack.dependenciesGroup.remove(); pack.dependenciesEnabled = false;}
			if(!pack.classesEnabled){
				pack.classesEnabled = true;
				pack.addClassesInfo();
			}	
			infoLayer.draw();
		});

		this.childrenInfoText.on('mouseenter', function(){
			var id = this.getId().replace('Children', '');
			var pack = findPackageById(id);
			this.setFill('blue');
			pack.classesInfoText.setFill('black');
			pack.dependenciesInfoText.setFill('black');
			if(typeof pack.classGroup !== 'undefined'){pack.classGroup.remove(); pack.classesEnabled = false;}
			if(typeof pack.dependenciesGroup !== 'undefined'){pack.dependenciesGroup.remove(); pack.dependenciesEnabled = false;}
			if(!pack.childrenEnabled){
				pack.childrenEnabled = true;
				pack.addChildrenInfo();
			}	
			infoLayer.draw();
		});

		this.dependenciesInfoText.on('mouseenter', function(){
			var id = this.getId().replace('Dependencies', '');
			var pack = findPackageById(id);
			this.setFill('blue');
			pack.classesInfoText.setFill('black');
			pack.childrenInfoText.setFill('black');
			if(typeof pack.classGroup !== 'undefined'){pack.classGroup.remove(); pack.classesEnabled = false;}
			if(typeof pack.childrenGroup !== 'undefined'){pack.childrenGroup.remove();pack.childrenEnabled = false;}
			if(!pack.dependenciesEnabled){
				pack.dependenciesEnabled = true;
				pack.addDependenciesInfo();
			}	
			infoLayer.draw();
		});

		this.infoBox = new Kinetic.Rect({
			width: this.dependenciesInfoText.getWidth()+10,
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
			pack.infoBoxEnabled = pack.classesEnabled = pack.childrenEnabled = pack.dependenciesEnabled = false;
		});

		this.infoGroup = new Kinetic.Group({
			opacity: 0,
			name: 'infoGroup'	
		});
		this.infoGroup.add(this.infoBox);

		if(this.Classes.length > 0){
			this.classesInfoText.move(5,5);
			this.infoGroup.add(this.classesInfoText);
		}
		if(this.Children.length > 0){
			var offset = this.Classes.length > 0 ? 1 : 0; 
			this.childrenInfoText.move(5,5+offset*(PACKAGE_HEIGHT-3));
			this.infoGroup.add(this.childrenInfoText);
		}
		
		if(this.Dependencies.length > 0){
			var offset = (this.Classes.length > 0 ? 1 : 0) + (this.Children.length > 0 ? 1 : 0);
			this.dependenciesInfoText.move(5,5+offset*(PACKAGE_HEIGHT-3));
			this.infoGroup.add(this.dependenciesInfoText);
		}
		
		this.infoGroup.add(this.closeButton)
			.move(this.position().x+this.rect.getWidth()+1,this.position().y);
		this.closeButton.move(0,-this.closeButton.getHeight());
		infoLayer.add(this.infoGroup);
		this.show(this.infoGroup,2);
	}

	this.addClassesInfo = function(){
		this.classesMaxLength = 0;
		if(typeof this.classGroup !== 'undefined'){this.classGroup.remove();}

		for (var i = 0; i < this.Classes.length; i++){
			if(this.Classes[i].getWidth() > this.classesMaxLength){this.classesMaxLength = this.Classes[i].getWidth()};
		}

		this.classesBox = new Kinetic.Rect({
			width: this.classesMaxLength+10,
			height: (PACKAGE_HEIGHT-2)*this.Classes.length,
			fill: 'white',
			stroke: 'black',
			strokeWidth:2
		});
		this.classGroup = new Kinetic.Group({
			opacity: 0
		});
		this.classGroup.add(this.classesBox);

		for (var i = 0; i < this.Classes.length; i++){
			this.classGroup.add(this.Classes[i]);
		}

		this.classGroup.move(this.infoBox.getWidth()+1,0);
		this.infoGroup.add(this.classGroup);
		this.show(this.classGroup,1);
	}

	this.addChildrenInfo = function(){
		this.childrenMaxLength = 0;
		if(typeof this.childrenGroup !== 'undefined'){this.childrenGroup.remove();}

		for (var i = 0; i < this.Children.length; i++){
			if(this.Children[i].getWidth() > this.childrenMaxLength){this.childrenMaxLength = this.Children[i].getWidth()};
		}

		this.childrenBox = new Kinetic.Rect({
			width: this.childrenMaxLength+10,
			height: (PACKAGE_HEIGHT-2)*this.Children.length,
			fill: 'white',
			stroke: 'black',
			strokeWidth:2
		});
		this.childrenGroup = new Kinetic.Group({
			opacity: 0
		});
		this.childrenGroup.add(this.childrenBox);

	 	for (var i = 0; i < this.Children.length; i++){
			this.childrenGroup.add(this.Children[i]);
		}

		this.childrenGroup.move(this.infoBox.getWidth()+1,0);
		this.infoGroup.add(this.childrenGroup);
		this.show(this.childrenGroup,1);
	}

	this.addDependenciesInfo = function(){
		this.dependenciesMaxLength = 0;
		if(typeof this.classGroup !== 'undefined'){this.classGroup.remove();}

		for (var i = 0; i < this.Dependencies.length; i++){
			if(this.Dependencies[i]['from'].getWidth() > this.dependenciesMaxLength){this.dependenciesMaxLength = this.Dependencies[i]['from'].getWidth()};
		}

		this.dependenciesBox = new Kinetic.Rect({
			width: this.dependenciesMaxLength+10,
			height: (PACKAGE_HEIGHT-2)*this.Dependencies.length,
			fill: 'white',
			stroke: 'black',
			strokeWidth:2
		});
		this.dependenciesGroup = new Kinetic.Group({
			opacity: 0
		});
		this.dependenciesGroup.add(this.dependenciesBox);

	 	for (var i = 0; i < this.Dependencies.length; i++){
	 		from  = this.Dependencies[i]['from'];

			this.dependenciesGroup.add(from);
			from.on('mouseenter', function(event){
				this.setFill('blue');
				var index = this.getName();
				var id = this.getId().replace('From', '');
				var pack = findPackageById(id);
				var to = pack.Dependencies[index]['to'];
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
				var to = pack.Dependencies[index]['to'];

				to.remove();
				stage.draw();
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
			.move(this.infoBox.getWidth()+1,0)
		
		titleBox.move(0,-(PACKAGE_HEIGHT-4));
		title.move(4,-(PACKAGE_HEIGHT-8));
		this.infoGroup.add(this.dependenciesGroup);
		this.show(this.dependenciesGroup,1);
	}

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

}