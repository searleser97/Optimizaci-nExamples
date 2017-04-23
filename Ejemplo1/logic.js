var w = $('.container').width();
var h = $('.container').height();

var r = w / h;
r = r.toFixed(2);
if (r > 0.8) {
    var aux = h * 0.8;
    $('.container').width(aux);
}

var sqrt3 = Math.sqrt(3);

var inputUserTriangleS = document.getElementById('tlado');
var inputRectangleH = document.getElementById('rheight');
var slider = document.getElementById('slider');
var inputArea = document.getElementById('area');

var triangleS = $('.square').width();
var triangleH = ((triangleS / 2) * sqrt3).toFixed(2);


var userTriangleS = inputUserTriangleS.value;
var userTriangleH = (userTriangleS / 2) * sqrt3;

$('.square').height(triangleH);

$('.triangle').css({
    'border-width': '0 ' + triangleS / 2 + 'px ' + triangleH + 'px ' + triangleS / 2 + 'px'
});

$('#theight').val(userTriangleH.toFixed(2));

noUiSlider.create(slider, {
    start: 4.33,
    connect: [true, false],
    step: 0.02,
    range: {
        'min': 0,
        'max': userTriangleH
    }
});

slider.noUiSlider.on('update', function(values, handle) {

    var rectangleH = values[handle];
    var rectangleW = ((userTriangleS * (userTriangleH - rectangleH)) / userTriangleH);
    var rectangleHpercentage = rectangleH / userTriangleH * 100;

    $('.verticall').css({ 'height': rectangleHpercentage + '%' });

    $('.rectangle').css({
        'width': rectangleW / userTriangleS * 100 + '%',
        'height': rectangleHpercentage + '%'
    });

    inputArea.value = (rectangleH * rectangleW).toFixed(2);
    inputRectangleH.value = values[handle];
});

inputRectangleH.addEventListener('change', function() {
    slider.noUiSlider.set(this.value);
});

inputUserTriangleS.addEventListener('change', function() {

    userTriangleS = inputUserTriangleS.value;
    userTriangleH = (userTriangleS / 2) * sqrt3;
    $('#theight').val(userTriangleH.toFixed(2));

    slider.noUiSlider.updateOptions({
        range: {
            'min': 0,
            'max': userTriangleH
        }
    });
});

var isPlus = 0;

$('#area').keydown(function(e) {
    if (e.which == 13 || e.which == 9) {
        var areaVal = inputArea.value;
        var a = userTriangleS / userTriangleH;
        var b = -1 * userTriangleS;
        var c = areaVal;
        var PlusOrMinus = [-1, 1];
        var aux;
        if (isPlus) {
            aux = 1;
            isPlus = 0;
        } else {
            aux = 0;
            isPlus = 1;
        }
        var rH = (-1 * b + PlusOrMinus[aux] * (Math.sqrt(Math.pow(b, 2) - 4 * a * c))) / (2 * a);
        slider.noUiSlider.set(rH);
        return false;
    }
});
