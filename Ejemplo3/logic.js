function f(x, coefs) {
    var ans = 0;
    var n = coefs.length - 1;
    coefs.forEach(function (a) {
        ans += a * Math.pow(x, n);
        n -= 1;
    });

    return ans;
}

function df(x, coefs) {
    var ans = 0;
    coefs = coefs.slice(0, -1);
    var n = coefs.length;
    coefs.forEach(function (a) {
        ans += a * n * Math.pow(x, n - 1);
        n -= 1;
    });

    return ans;
}

function dx(x, coefs) {
    return Math.abs(0 - f(x, coefs));
}

function newtons_method(x0, e, coefs) {
    var delta = dx(x0, coefs);
    var count = 0;
    while (delta > e) {
        x0 = x0 - f(x0, coefs) / df(x0, coefs);
        delta = dx(x0, coefs);
        count += 1;
    }
    return x0;

}
// [1, 0, -d^2, 0, area^2];
// alert(newtons_method(0.5, 1e-5, [1,0,-100,0,2500]));


$(document).ready(function() {
    var inputUserTriangleS = document.getElementById('tlado');
    var inputRectangleH = document.getElementById('rheight');
    var slider = document.getElementById('slider');
    var inputArea = document.getElementById('area');
    var isPlus = 0;
    var triangleS;
    var triangleH;
    var userTriangleS;
    var userTriangleH;

    noUiSlider.create(slider, {
        start: 4.33,
        connect: [true, false],
        step: 0.01,
        range: {
            'min': 0,
            'max': 10
        }
    });

    function init() {

        var w = $(window).width();
        var h = $(window).height();

        var r = w / h;
        r = r.toFixed(2);
        if (r > 0.8) {
            w = h * 0.8;
        }
        $('.container').width(w - 23);

        triangleS = $('.square').width();
        triangleH = triangleS;


        userTriangleS = inputUserTriangleS.value;
        userTriangleH = inputUserTriangleS.value;

        $('.square').height(triangleH);
        $('.square').width(triangleH);

        $('#theight').val(userTriangleH);

        $('.myrangeslider').css({ 'margin-top': triangleH / 3 });
    }

    init();

    slider.noUiSlider.on('update', function(values, handle) {

        var rectangleH = values[handle];
        // var rectangleW = ((userTriangleS * (userTriangleH - rectangleH)) / userTriangleH);
        var rectangleW = Math.sqrt(Math.pow(userTriangleS, 2) - Math.pow(rectangleH, 2));
        var rectangleHpercentage = rectangleH / userTriangleH * 100;
        console.log(rectangleW);
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
        if (this.value === '0')
            inputUserTriangleS.value = 0.01;

        userTriangleS = inputUserTriangleS.value;
        userTriangleH = userTriangleS;
        $('#theight').val(userTriangleH);

        slider.noUiSlider.updateOptions({
            range: {
                'min': 0,
                'max': userTriangleH
            }
        });
    });

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
            // var rH = newtons_method(1, 1e-5, [1,0,-100,0,1600]);
            var rH = Math.abs(newtons_method(1, 1e-5, [1,0,-1 * Math.pow(userTriangleS, 2),0,Math.pow(areaVal, 2)]));
            // var rH = Math.sqrt(pow(userTriangleS, 2) - Math.pow((2 * areaVal) / , 2))
            slider.noUiSlider.set(rH);
            return false;
        }
    });

    $('#tlado, #theight, #rheight, #area').keyup(function(event) {
        this.value = this.value.replace(/[^(\d\.)]/g, '');
    });
    $(window).resize(function() { init(); });
    $('.container').css({ 'opacity': '1' });
});
