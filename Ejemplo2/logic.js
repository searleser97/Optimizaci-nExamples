function getLabelSize(tH, rH)
{
   return 226-((200/tH)*rH);
}
function updateLabels(nvaH)
{
    $("#svg_indRelH").attr("y1", nvaH);
    $("#efectoAgua").attr("offset",(((nvaH)/200)*100)-15 + "%");
    $("#nivelAgua").attr("offset",(((nvaH)/200)*100)-10 + "%");
    console.log(((nvaH)/200)*100);
    $("#svg_topH").attr("points", " 222.66 " + nvaH + " 202.33 " + nvaH);
    if(nvaH > 180)
        nvaH = 180;
    $("#svg_txtRel").attr("transform", "matrix(0, 0.81, -1, 0, 225, "+ (nvaH+5) + ")");
}
$(document).ready(function(){
    $("#mySVG").width($(window).width());
    $("#mySVG").height($(window).height()*0.50);
    $(window).resize(function(){
        $("#mySVG").width($(window).width());
        $("#mySVG").height($(window).height()*0.50);
        console.log($(window).width() + "x" + $(window).height());
    });
    var hInPx = 200;
    var nvaH = getLabelSize($("#userTotalH").val(),($("#userRelH").val()));
    console.log(nvaH);
    var rInPx = 100;
    var svg_totalR = document.getElementById("svg_totalR");
    var svg_totalH = document.getElementById("svg_totalH");
    var svg_relH = document.getElementById("svg_relH");
    //Valores de las etiquetas svg
    svg_relH.innerHTML = $("#userRelH").val();
    svg_totalH.innerHTML = $("#userTotalH").val();
    svg_totalR.innerHTML = $("#userTotalR").val();
    //Eventos para actualizar etiquetas svg
    updateLabels(nvaH);
    $("#userTotalR").on("change", function(){
        svg_totalR.innerHTML = $("#userTotalR").val();
    });
    $("#userTotalH").on("change", function(){
        svg_totalH.innerHTML = $("#userTotalH").val();
        nvaH = getLabelSize($("#userTotalH").val(),($("#userRelH").val()));
        updateLabels(nvaH);
    });
    $("#userRelH").on("change", function(){
        nvaH = getLabelSize($("#userTotalH").val(),($("#userRelH").val()));
        if(nvaH < 26 ) nvaH = 26;
        if(nvaH > 226 ) nvaH = 226;
        svg_relH.innerHTML = $("#userRelH").val();
        updateLabels(nvaH);

        console.log(nvaH);
});
    /*
    var slider = document.getElementById('slider');
    //var userH = document.getElementById("userH").value;
    var userR = document.getElementById("userR");
    var nivelAgua = $("#nivelAgua");
    
    noUiSlider.create(slider, {
        start: 4.33,
        connect: [true, false],
        step: 0.02,
        range: {
            'min': 0,
            'max': userH
        }
    });
    slider.noUiSlider.on('update', function(values, handle) {

        var rectangleH = values[handle];
        var rectangleW = ((userTriangleS * (userTriangleH - values[handle])) / userTriangleH);
        var rectangleHpercentage = rectangleH / userTriangleH * 100;

        $('.verticall').css({'height': rectangleHpercentage + '%'});

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


        slider.noUiSlider.updateOptions({
            range: {
                'min': 0,
                'max': userTriangleH
            }
        });
    });
   $("#nivelAgua").attr("offset", "50%")*/
});