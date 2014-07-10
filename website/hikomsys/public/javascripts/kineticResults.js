var WIDTHGREEN = 1;
var WIDTHORANGE = 3;
var WIDTHRED = 5;

var allPackages = [];

var moreInfosEnabled = true;

var moving, draggable = false;

function switchMode() {
    draggable = !draggable;
    for (var i = 0; i < allPackages.length; i++) {
        allPackages[i].group.setDraggable(draggable);
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
                        arrow.isVisible = false;
                        arrow.draw();
                    }
                }
            }
            stage.draw();
            moreInfosEnabled = false;
        });

});

/* ------  Buttons ------*/
$('#move').click(function() {
    switchMode();
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

var clicks = 0;
$('#continue').click(function() {
    var color;
    switch(clicks){
        case 0:
            color = 'green';
            $('.meter').css({'width': '33%', 'background': '#B3DAB3'});
            show('green');
            break;
        case 1:
            color = 'orange';
            $('.meter').css({'width': '66%', 'background': '#FCE5B3'});
            show('orange');
            break;
        case 2:
            color = 'red';
            $('.meter').css({'width': '100%', 'background': '#FEB3B3'});
            $('#continue').text('Finish');
            show('red');
            break;
        default:
            window.location.href = '/hikomsys/quizzes/success';
            break;
    }
    ++clicks;
});


function show(color){
    animationComplete = true;
    if(animationComplete){
        var animationComplete = false;
        var bgColor, direction, newPoints;
        greenPoints = document.getElementById('green-points').value;
        redPoints = document.getElementById('red-points').value;
        points = parseFloat(greenPoints)+parseFloat(redPoints);
        switch(color){
            case 'green':
                bgColor = '#B3DAB3';
                direction = 'tb';
                newPoints = greenPoints;
                break;
            case 'orange':
                bgColor = '#FCE5B3';
                direction = 'rl';
                newPoints = 0;
                break;
            case 'red':
                bgColor = '#FEB3B3';
                direction = 'bt';
                newPoints = redPoints;
                break;
        }
        flip(color, bgColor, direction, points, newPoints);
    }   
}

function flip(color, bgColor, direction, points, newPoints){
    $("#flipped").flip({
        direction: direction,
        color: bgColor,
        content: '<p>Points: ' + points + ' (+' + newPoints + ')</p>',
        onAnimation: function(){
            for (var i = 0; i < arrows.length; i++) {
                if (arrows[i].color == color) {
                    arrows[i].changeVisibility();
                }
            }   
        },
        onEnd: function(){
            animationComplete = true;
        }
    })
}