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
        console.log(arrows[i].color);
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
            switchDependencies('green');
            normalClick($('#greenArrow'));
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
            $('.infotext h3').html("Ahem. You forgot about the dependencies in <span style=\"color: orange\">yellow</span>.");
            switchDependencies('orange');
            normalClick($('#orangeArrow'));
            break;
        case 1:
            $('.infotext h3').html("The dependencies in <span style=\"color: red\">red</span> are not actually present in your system.");
            switchDependencies('red');
            normalClick($('#redArrow'));
            break;
        case 2:
            $('.infotext h3').html("And a final overview...");
            $('#finalscore').show();
            $('.functions').show();
            $('#continue').html('Finish')
            break;
        default:
            window.location.href = '/hikomsys/quizzes/success';
            break;
    }
    ++clicks;
});
