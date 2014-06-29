/* ------------------------------------------------------------ PackageGroup Class ----------------------------------------------------------- */
function PackageGroup(text, color, infos){

	this.create = function(){
		this.createGroup();
		this.addEventListener();
	};


	this.createGroup = function(){
		var maxX = stage.getWidth()-this.rect.getWidth();
	}

	this.position = function(){
		return this.group.getAbsolutePosition();
	};
	
}