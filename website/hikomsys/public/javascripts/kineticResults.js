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
        });

    moreInfosEnabled = true;
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
            break;
        case 1:
            color = 'orange';
            break;
        case 2:
            color = 'red';
            $('#continue').text('Finish');
            break;
        default:
            window.location.href = '/hikomsys/quizzes/success';
            break;
    }
    for (var i = 0; i < arrows.length; i++) {
        if (arrows[i].color == color) {
            arrows[i].changeVisibility();
        }
    }
    ++clicks;
});


//REFACTOR HARD
/* FLIPBOX */
var points = 0;
var red, orange, green = false;
var animationComplete = true;

$('#green').click(function(){
    if(animationComplete){
        animationComplete = false;
        green = !green;
        greenPoints = (green ? document.getElementById('green-points').value : 0);
        redPoints = (red ? document.getElementById('red-points').value : 0);
        points = parseFloat(greenPoints)+parseFloat(redPoints);

        $("#flipped").flip({
            direction:'tb',
            color: '#B3DAB3',
            content: '<p>Points: '+points+' (+'+greenPoints+')</p>',
            onAnimation: function(){
                for (var i = 0; i < arrows.length; i++) {
                    if (arrows[i].color == 'green') {
                        arrows[i].changeVisibility();
                    }
                }   
            },
            onEnd: function(){
                animationComplete = true;
                if(green){
                    $('#green > span').text('Hide Correct');
                }
                else{
                    $('#green > span').text('Show Correct');
                }
            }
        })
    }
})

$('#orange').click(function(){
    if(animationComplete){
        animationComplete = false;
        orange = !orange;

        $("#flipped").flip({
            direction:'rl',
            color: '#FCE5B3',
            content: '<p>Points: '+points+' (+0)</p>',
            onAnimation: function(){
                for (var i = 0; i < arrows.length; i++) {
                    if (arrows[i].color == 'orange') {
                        arrows[i].changeVisibility();
                    }
                }   
            },
            onEnd: function(){
                animationComplete = true;
                if(orange){
                    $('#orange > span').text('Hide Missing');
                }
                else{
                    $('#orange > span').text('Show Missing');
                }
            }
        })
    }
})

$('#red').click(function(){
    if(animationComplete){
        animationComplete = false;
        red = !red;
        greenPoints = (green ? document.getElementById('green-points').value : 0);
        redPoints = (red ? document.getElementById('red-points').value : 0);
        points = parseFloat(greenPoints)+parseFloat(redPoints);

        $("#flipped").flip({
            direction:'bt',
            color: '#FEB3B3',
            content: '<p>Points: '+points+' (+'+redPoints+')</p>',
            onAnimation: function(){
                for (var i = 0; i < arrows.length; i++) {
                    if (arrows[i].color == 'red') {
                        arrows[i].changeVisibility();
                    }
                }   
            },
            onEnd: function(){
                animationComplete = true;
                if(red){
                    $('#red > span').text('Hide Wrong');
                }
                else{
                    $('#red > span').text('Show Wrong');
                }
            }
        })
    }
})
