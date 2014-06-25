function findArrowById(id) {
    for (var i = 0; i < arrows.length; i++) {
        if (arrows[i].id == id) {
            return i
        };
    }
    return -1;
}

//Kineticjs can search by id just set text = ID

function findPackageById(id) {
    for (var i = 0; i < allPackages.length; i++) {
        if (allPackages[i].text === id) {
            return allPackages[i];
        }
    }
    return -1;
}

function getRelativePointerPosition() {
    var pointer = stage.getPointerPosition();
    var pos = stage.getPosition();
    var offset = stage.getOffset();
    var scale = stage.getScale();
    
    return {
        x : ((pointer.x / scale.x) - (pos.x / scale.x) + offset.x),
        y : ((pointer.y / scale.y) - (pos.y / scale.y) + offset.y)
    };
}

function kineticText(array) {
    return new Kinetic.Text({
        x: array.x,
        y: array.y,
        fontSize: array.size,
        fontFamily: 'Calibri',
        fill: 'black',
        align: 'left',
        text: array.text,
        id: array.id,
        name: array.name
    });
}

//some refactoring needed

function xOffset(center1, center2, center1_width) {
    if (isRightOf(center1, center2, center1_width)) {
        return center1_width / 2;
    }
    if (isLeftOf(center1, center2, center1_width)) {
        return -center1_width / 2;
    }
    return (0);
}

function yOffset(center1, center2, center1_height) {
    if (isBellow(center1, center2, center1_height)) {
        return center1_height / 2;
    }
    if (isAbove(center1, center2, center1_height)) {
        return -center1_height / 2;
    }
    return (0);
}

function isRightOf(center1, center2, center1_width) {
    return center2.x > (center1.x + center1_width / 2);
}

function isLeftOf(center1, center2, center1_width) {
    return center2.x < (center1.x - center1_width / 2);
}

function isAbove(center1, center2, center1_height) {
    return center2.y < (center1.y - center1_height / 2);
}

function isBellow(center1, center2, center1_height) {
    return center2.y > (center1.y + center1_height / 2);
}

function normalClick(object) {
    if (object.parent().hasClass('active')) {
        object.parent().removeClass('active')
    } else {
        object.parent().addClass("active")
    }
}

function clicked(object) {
    if (object.attr('id') == 'move') {
        $('#draw').parent().removeClass("active")
    } else {
        $('#move').parent().removeClass("active")
    };
    object.parent().addClass("active")

}

function removeIfExists(object){
    if(typeof object !== "undefined") {object.remove();}  
}

/* =============================================================== Prototype Methods ============================================================== */
// Array Remove - By John Resig (MIT Licensed)
//Do I still use this?
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};
