var WIDTHGREEN = 1;
var WIDTHORANGE = 3;
var WIDTHRED = 5;

var allPackages = [];

var moreInfosEnabled = true;

var moving, draggable = false;

function switchMode() {
    draggable = !draggable;
    var groups = packageLayer.find('.packageGroup');
    for (var i = 0; i < groups.length; i++) {
        groups[i].setDraggable(draggable);
    }
}

function switchDependencies(color) {
    for (var i = 0; i < arrows.length; i++) {
        if (arrows[i].color == color) {
            arrows[i].changeVisibility();
        }
    }
}

/* =============================================================== Eventhandler ============================================================== */
// this requests gets all the information from the PROJECTNAMEResults table
$(document).ready(function() {
    //document.oncontextmenu = function() {return false;};
    quizId = document.getElementById('quizId').value;
    $.post('sendJSON', {
        'quizId': quizId
    })
        .done(function(data) {
            data = $.parseJSON(data);
            for (var i = 0; i < data.length; i++) {
                infos = [];
                infos['classes'] = data[i].classes;
                infos['children'] = data[i].children;
                infos['allDependencies'] = data[i].allDependencies;
                var thisPackage = new PackageGroup(data[i].name, data[i].color, infos);
                allPackages.push(thisPackage);
                thisPackage.create();
                thisPackage.group.setX(data[i].position.X)
                    .setY(data[i].position.Y);
                thisPackage.group.setDraggable(draggable);
            }
            for (var i = 0; i < data.length; i++) {
                var thisPackage = findPackageById(data[i].name);
                var dependencies = data[i].dependencies;
                if (dependencies) {
                    for (var j = 0; j < dependencies.length; j++) {
                        var to = findPackageById(dependencies[j]['to']);
                        var id = thisPackage.text + '_' + to.text;
                        var arrow = new Arrow(thisPackage, to, id);
                        arrow.color = dependencies[j]['color'];
                        arrows.push(arrow);
                        arrow.draw();
                    }
                }
            }
            for (var i = 0; i < arrows.length; i++) {
                if (arrows[i].color == 'red' || arrows[i].color == 'orange') {
                    arrows[i].changeVisibility();
                }
            }
            stage.draw();
        });

    $.post('getPoints', {
        'quizId': quizId
    })
        .done(function(data) {
            $('.points').append(data);
        });

    moreInfosEnabled = false;
});

/* ------  Buttons ------*/
$('#move').click(function() {
    switchMode();
});

var clicks = 0;
$('#continue').click(function() {
    if(clicks == 0){
        for (var i = 0; i < arrows.length; i++) {
            if (arrows[i].color == 'orange') {
                arrows[i].changeVisibility();
            }
        }
    }else if(clicks == 1){
        for (var i = 0; i < arrows.length; i++) {
            if (arrows[i].color == 'red') {
                arrows[i].changeVisibility();
            }
        }
    }else{
        window.location.href = '/hikomsys/quizzes/success';
    }
    ++clicks;
});

$('.btn').click(function() {
    normalClick($(this));
});

//Currently not used
$('.arrowbtn').click(function() {
    color = $(this).attr('id').replace('Arrow', '');
    switchDependencies(color);
});

//Currently not used
$('#infosEnabled').click(function() {
    moreInfosEnabled = !moreInfosEnabled;
    for (var i = 0; i < allPackages.length; i++) {
        allPackages[i].removeInfos();
    }
});



/* FLIPBOX */

$('#green').click(function(){
    $("#flipbox").flip({
        direction:'tb',
        color: '#FF8D2C',
        content: 'green'
    })
})

$('#orange').click(function(){
    $("#flipbox").flip({
        direction:'tb',
        color: '#FF8D2C',
        content: 'orange'
    })
})

$('#red').click(function(){
    $("#flipbox").flip({
        direction:'tb',
        color: '#FF8D2C',
        content: 'red'
    })
})
