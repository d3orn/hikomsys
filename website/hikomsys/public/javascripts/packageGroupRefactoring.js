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
			/*if(moreInfosEnabled){
				stage.draw();
			}*///What the hell those this?
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
													"text" : name, 	
												});
												tempArray.push(text);
												i++;
											}
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
									this.infoCount = !(this.classesInfoBox.length === 0) + !(this.childrenInfoBox.length === 0 ) + !(this.dependenciesInfoBox.length === 0);
									this.infoBoxEnabled = true;

									this.createInfoTexts();





		this.classesInfoText.on('mouseenter', function(){
			var id = this.getId().replace('Classes', '');
			var pack = findPackageById(id);
			this.setFill('blue');
			pack.childrenInfoBoxText.setFill('black');
			pack.dependenciesInfoBoxText.setFill('black');

			removeIfExists(pack.childrenGroup);
			removeIfExists(pack.dependenciesGroup);
			pack.childrenEnabled = false;
			pack.dependenciesEnabled = false;

			if(!pack.classesEnabled){
				pack.classesEnabled = true;
				this.classGroup = pack.addInfo(pack.classesInfoBox);
			}	
			infoLayer.draw();
		});

		this.childrenInfoBoxText.on('mouseenter', function(){
			var id = this.getId().replace('Children', '');
			var pack = findPackageById(id);
			this.setFill('blue');
			pack.classesInfoText.setFill('black');
			pack.dependenciesInfoBoxText.setFill('black');

			removeIfExists(pack.classGroup);
			removeIfExists(pack.dependenciesGroup);
			pack.classesEnabled = false;
			pack.dependenciesEnabled = false;

			if(!pack.childrenEnabled){
				pack.childrenEnabled = true;
				this.childrenGroup = pack.addInfo(pack.childrenInfoBox);
			}	
			infoLayer.draw();
		});

		this.dependenciesInfoBoxText.on('mouseenter', function(){
			var id = this.getId().replace('Dependencies', '');
			var pack = findPackageById(id);
			this.setFill('blue');
			pack.classesInfoText.setFill('black');
			pack.childrenInfoBoxText.setFill('black');

			removeIfExists(pack.classGroup);
			removeIfExists(pack.childrenGroup);
			pack.classesEnabled = false;
			pack.childrenEnabled = false;

			if(!pack.dependenciesEnabled){
				pack.dependenciesEnabled = true;
				pack.addDependenciesInfoBox();
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

						this.closeButton = this.createCloseButton();

		this.infoGroup = new Kinetic.Group({
			opacity: 0,
			name: 'infoGroup'	
		});
		this.infoGroup.add(this.infoBox);








									this.moveInfoTexts()



	




		this.infoGroup.add(this.closeButton)
			.move({x:this.position().x+this.rect.getWidth()+1, y:this.position().y});
		this.closeButton.move({x:0, y:-this.closeButton.getHeight()});
		infoLayer.add(this.infoGroup);
		this.show(this.infoGroup,2);
	}









this.createCloseButton = function(){
	var closeBtn = new Kinetic.Rect({
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

	return closeBtn;
}




this.moveInfoTexts = function(){
	if(this.classesInfoBox.length > 0){
		this.classesInfoText.move({x:5, y:5});
		this.infoGroup.add(this.classesInfoText);
	}
	if(this.childrenInfoBox.length > 0){
		var offset = this.classesInfoBox.length > 0; 
		this.childrenInfoBoxText.move({x:5, y:5+offset*(PACKAGE_HEIGHT-3)});
		this.infoGroup.add(this.childrenInfoBoxText);
	}
	if(this.dependenciesInfoBox.length > 0){
		var offset = (this.classesInfoBox.length > 0) + (this.childrenInfoBox.length > 0);
		this.dependenciesInfoBoxText.move({x:5, y:5+offset*(PACKAGE_HEIGHT-3)});
		this.infoGroup.add(this.dependenciesInfoBoxText);
	}
}






									this.createInfoTexts = function(){
										texts = ['Classes' , 'Children', 'Dependencies'];
										infoTexts = [];
										for(var i = 0; i < texts.length; i++){
											infoTexts.push(kineticText({
												"size" : 12, 
												"text" : texts[i].toUpperCase(), 
												"id" : 	this.text + texts[i],
												})
											);
										}
										this.classesInfoText = infoTexts[0];
										this.childrenInfoBoxText = infoTexts[1];
										this.dependenciesInfoBoxText = infoTexts[2];
									}





									this.addInfo = function(infoBox){
										var maxLength = 0;
										var length = infoBox.length;
										
										for (var i = 0; i < length; i++){
											if(infoBox[i].getWidth() > maxLength){ maxLength = infoBox[i].getWidth()};
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

										group.move({x:this.infoBox.getWidth()+1, y:0});
										this.infoGroup.add(group);
										this.show(group,1);
										
										return group;
									}

























	this.addDependenciesInfoBox = function(){
		this.dependenciesMaxLength = 0;
		removeIfExists(this.classGroup);

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
				to.setPosition({x:pack.dependenciesBox.getWidth(), y: 0});
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