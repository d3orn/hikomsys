/* --------------------------------------------------------------- Arrow Class --------------------------------------------------------------- */
//refactoring HARD
function Arrow(from, to, id){
	this.from = from;
	this.to = to;
	this.id = id;
	this.color = 'black';
	this.isVisible = true;
	this.width = 2;
	this.center = function(packageGroup){
		var centerX = Math.round(packageGroup.group.getX() + packageGroup.group.getWidth()/2);
		var centerY = Math.round(packageGroup.group.getY() + PACKAGE_HEIGHT/2);
		return {x: centerX, y: centerY};
	};

	//Oman there is a big bug in here the packages.lenght has to be > 1 if i want to redraw the packages need to fix this
	this.draw = function(){
		this.calcWidth();
		var fromCenter = this.center(this.from);

		var toCenter = (this.to.className == 'packageGroup' ? this.center(this.to) : this.to);
	
		var anchor1 = this.calcAnchor(fromCenter, toCenter, this.from.group.getWidth());
		var anchor2 = (this.to.className == 'packageGroup' ? this.calcAnchor(toCenter, fromCenter, this.to.group.getWidth()) : this.to);

		this.createArrow(anchor1, anchor2);
	};

	//Draws an arrow from @anchor1 to @anchor2 with an arrowHead at @anchor2
	this.createArrow = function(anchor1, anchor2){
		var vektor = {x: anchor1.x - anchor2.x, y: anchor1.y - anchor2.y };

		var line = this.createLine(anchor1, anchor2);

		var rotation = Math.acos((vektor.y * VERTICAL_VECTOR.y)/(Math.sqrt(Math.pow(vektor.x,2)+Math.pow(vektor.y,2))* Math.sqrt(Math.pow(VERTICAL_VECTOR.y,2))));
		//if the vektor points to the left I have to make the angle negative
		if (anchor1.x > anchor2.x){rotation = -rotation;}
		var norm = Math.sqrt(Math.pow(vektor.x,2) + Math.pow(vektor.y,2));
		var head = this.createHead({x: anchor2.x+(vektor.x*(this.width*5/2)/norm), y: anchor2.y+(vektor.y*(this.width*5/2)/norm)}, rotation);

		this.line = line;
		this.head = head;
		this.arrowGroup = new Kinetic.Group({
			id: this.id,
			visible: this.isVisible
		});
		this.arrowGroup.add(this.line);
		this.arrowGroup.add(this.head);
		arrowLayer.add(this.arrowGroup);
		this.addEventListener();
	};

	this.createLine = function(point1, point2) {
		return new Kinetic.Line({
			points: [point1.x, point1.y, point2.x, point2.y],
			stroke: this.color,
			strokeWidth: this.width-1,
			name: 'arrowLine'
		});
	};

	this.createHead = function(point, rotation) {
		return (new Kinetic.RegularPolygon({
			x: point.x,
			y: point.y,
			sides: 3,
			radius: this.width * 5/2,
			stroke: this.color,
			strokeWidth: 1,
			fill: this.color,
			name: 'arrowHead',
			rotation: (Math.PI-rotation)*180/Math.PI
		}));
	};

	this.calcAnchor = function(from, to, width){
		return {x: (from.x + xOffset(from, to, width)), y: (from.y + yOffset(from, to, PACKAGE_HEIGHT))};
	};

	this.calcWidth = function(){
		if(this.color == 'red'){this.width = WIDTHRED;}
		else if(this.color == 'orange'){this.width = WIDTHORANGE;}
	}

	this.changeVisibility = function(){
		this.isVisible = !this.isVisible;

		this.remove();
		this.draw();
		arrowLayer.draw();
	}

	this.remove = function(){
		this.arrowGroup.remove();
	};

	this.deleteArrow = function(){
		this.arrowGroup.remove();
		delete this.from;
		delete this.to;
		delete this.id;
	};

	this.addEventListener = function(){
		this.arrowGroup.on('click', function(e){
			if(e.button == 2){console.log('right mouse button')}
		})
	}

	/*this.addEventListener = function(){
		this.arrowGroup.on('click', function(){
			var index = findArrowById(this.getId());
			arrows[index].deleteArrow();
			arrows.remove(index); //prototype

			arrowLayer.draw();
		});
	};*/
}