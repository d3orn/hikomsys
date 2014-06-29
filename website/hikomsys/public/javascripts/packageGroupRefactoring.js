/* ------------------------------------------------------------ PackageGroup Class ----------------------------------------------------------- */
function PackageGroup(text, color, infos) {
									this.className = 'packageGroup';
									this.text = text;
	//this.infos = infos;
									this.color = (color ? color : 'white');
									this.isHighlightened = false;
	//this.infoBoxEnabled = this.classesEnabled = this.childrenEnabled = this.dependenciesEnabled = false;

									this.create = function(){
										this.createGroup();
	/*if(moreInfosEnabled){
		this.childrenInfoBox = createMenu('children');
		this.classesInfoBox = createMenu('classes');
		this.createDependencies();
	}*/
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
											//var pack = findPackageById(this.getId());
											//pack.removeInfos();

											for (var i = 0; i < arrows.length; i++){
												var packageIds = arrows[i].id.split("_");
												//see the bug in Arrow.draw() - I don't see what bug..
												if(packageIds[0] == this.getId() || packageIds[1] == this.getId()){
													arrows[i].remove();
													arrows[i].draw();
												}
											}
											packages = [];
											//infoLayer.drawScene();
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
			}What the hell those this?*/
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

									var isRectCollide = function(rect1, rect2) {
										if (rect1.x - rect1.width  >= rect2.x + rect2.width  &&
											rect1.y - rect1.height >= rect2.y + rect2.height &&
											rect1.x + rect1.width  <= rect2.x + rect2.width  &&
											rect1.x + rect1.height <= rect2.y - rect2.height )
											return false;
										else
											return true;
									}


}