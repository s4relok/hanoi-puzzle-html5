var canvas;
var CANVAS_WIDTH = 600;
var FLOOR = 300;
var DISK_HEIGHT = 30;
var DISK_BASE_WIDTH = 50;
var DISK_DELTA_WIDTH = 30;
var LEFT_ORIGIN = CANVAS_WIDTH / 6;
var CENTER_ORIGIN = CANVAS_WIDTH / 2;
var RIGHT_ORIGIN = CANVAS_WIDTH - LEFT_ORIGIN;
var LEVEL = 3;

var leftShapes = [];
var centerShapes = [];
var rightShapes = [];
var markedShape;
var markedSide;
var steps = 0;
var stepsText;

var init = function() {
    canvas = jcotton.canvas("canvas");

    stepsText = jcotton.text("steps: 0").position(5, 5);
    canvas.add(stepsText);


    for (var i = LEVEL; i > 0; i--) {
        addDisk(i);
    }

    canvas.onMouseDown(function(x, y) {
        var oldMarkedShape = markedShape;

        if (x > 0 && x < LEFT_ORIGIN + CANVAS_WIDTH / 6) {
            if (markedShape == null && leftShapes.length > 0) {
                markedShape = leftShapes.pop();
                markedSide = "left";
            } else if (markedShape != null && isAllowed(leftShapes)) {
                leftShapes.push(markedShape);
                if (markedSide != "left") {
                    markedShape.position(LEFT_ORIGIN, FLOOR - (leftShapes.length - 1) * DISK_HEIGHT);
                    addStep()
                }
                markedShape = null;
            }
        } else if (x > LEFT_ORIGIN + CANVAS_WIDTH / 6 && x < CENTER_ORIGIN + CANVAS_WIDTH / 6) {
            if (markedShape == null && centerShapes.length > 0) {
                markedShape = centerShapes.pop();
                markedSide = "center";
            } else if (markedShape != null && isAllowed(centerShapes)) {
                centerShapes.push(markedShape);
                if (markedSide != "center") {
                    markedShape.position(CENTER_ORIGIN, FLOOR - (centerShapes.length - 1) * DISK_HEIGHT);
                    addStep()
                }
                markedShape = null;
            }

        } else if (x > CENTER_ORIGIN + CANVAS_WIDTH / 6 && x < CANVAS_WIDTH) {
            if (markedShape == null && rightShapes.length > 0) {
                markedShape = rightShapes.pop();
                markedSide = "right";
            } else if (markedShape != null && isAllowed(rightShapes)) {
                rightShapes.push(markedShape);
                if (markedSide != "right") {
                    markedShape.position(RIGHT_ORIGIN, FLOOR - (rightShapes.length - 1) * DISK_HEIGHT);
                    addStep()
                }
                markedShape = null;
            }
        }

        if (oldMarkedShape != markedShape) {
            if (oldMarkedShape) oldMarkedShape.animate({scale: 1.0}, 100);
            if (markedShape) markedShape.animate({scale: 1.1}, 100);
        }

        if (leftShapes.length == LEVEL || rightShapes.length == LEVEL) {
            alert("Congrats!");
            LEVEL += 1;
            clean();
            init();
        }

    })
};

function isAllowed(shapes) {
    if (shapes.length == 0 || shapes[shapes.length - 1].diskWidth > markedShape.diskWidth) {
        return true;
    }
    return false;
}



function clean() {
    leftShapes = [];
    centerShapes = [];
    rightShapes = [];
    markedShape = null;
    markedSide = null;
    steps =0;
    canvas.clear();
    stepsText.text("steps: 0");
}

function addStep(){
    steps++;
    stepsText.text("steps: " + steps);
}

function addDisk(index) {
    var shape = jcotton.group()
        .add(jcotton.roundrect(0, 0, DISK_BASE_WIDTH + DISK_DELTA_WIDTH * index, DISK_HEIGHT, 8))
        .origin((DISK_BASE_WIDTH + DISK_DELTA_WIDTH * index) / 2, 0)
        .add(jcotton.text(index).position((DISK_BASE_WIDTH + DISK_DELTA_WIDTH * index) / 2 - 2, 5))
        .position(CENTER_ORIGIN, FLOOR - DISK_HEIGHT * (LEVEL - index))
        .onMouseDown(function(x, y) {
        });
    shape.diskWidth = index;
    canvas.add(shape);
    centerShapes.push(shape);
}

if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", init, false);
}





