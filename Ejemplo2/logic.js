function toRelativeSize(tH, rH)
{
   return 226-((200/tH)*rH);
}
function getTotalVolum()
{
    return  (Math.PI * Math.pow($("#userTotalR").val(),2) * $("#userTotalH").val()) / 3;
}
var flag;
function updateLabels(pastH)
{
    $("#svg_indRelH").attr("y1", pastH);
    $("#efectoAgua").attr("offset",(((pastH)/200)*100)-15 + "%");
    $("#nivelAgua").attr("offset",(((pastH)/200)*100)-10 + "%");
    $("#svg_topH").attr("points", " 222.66 " + pastH + " 202.33 " + pastH);
    if(pastH > 180)
        pastH = 180;
    $("#svg_txtRel").attr("transform", "matrix(0, 0.81, -1, 0, 225, "+ (pastH+5) + ")");
    
}
function transitionUpdate(pastH, nvaH) {
    $("input").prop( "disabled", true );
    //console.log(nvaH.toFixed(0) + " - " + pastH.toFixed(0));
    if (pastH.toFixed(0) == nvaH.toFixed(0)){
        $("input").prop( "disabled", false );
        return;
    }
     setTimeout(function () {
        updateLabels(pastH);
        flag = nvaH.toFixed(0)>pastH.toFixed(0);
        console.log(nvaH.toFixed(2) + ">" + pastH.toFixed(2));
        console.log(nvaH.toFixed(2) > pastH.toFixed(2) );
        console.log(flag);
        if(nvaH.toFixed(0)>pastH.toFixed(0) )
            transitionUpdate(++pastH, nvaH);
        if(nvaH.toFixed(0)<pastH.toFixed(0))
            transitionUpdate(--pastH, nvaH);
    }, 10);
} 

$(document).ready(function(){
    var slider = document.getElementById("slider");
    var relVol, totalVol;
    var volPerMin;
    var hInPx = 200;
    var nvaH = toRelativeSize($("#userTotalH").val(),($("#userRelH").val()));
    var pastH = nvaH;
    var rInPx = 100;
    var svg_totalR = document.getElementById("svg_totalR");
    var svg_totalH = document.getElementById("svg_totalH");
    var svg_relH = document.getElementById("svg_relH");
    $("#mySVG").width($(window).width());
    $("#mySVG").height($(window).height()*0.50);
    $(window).resize(function(){
        $("#mySVG").width($(window).width());
        $("#mySVG").height($(window).height()*0.50);
        console.log($(window).width() + "x" + $(window).height());
    });
    $("#userIn").css("display", "block");
    //Valores de las etiquetas svg
    svg_relH.innerHTML = $("#userRelH").val();
    svg_totalH.innerHTML = $("#userTotalH").val();
    svg_totalR.innerHTML = $("#userTotalR").val();
    //Eventos para actualizar etiquetas svg
    updateLabels(pastH);
    transitionUpdate(pastH,nvaH);
    $("#userTotalR").on("change", function(){
        totalVol = getTotalVolum();
        svg_totalR.innerHTML = $("#userTotalR").val();
    });
    $("#userTotalH").on("change", function(){
        console.log("F");
        totalVol = getTotalVolum();
        svg_totalH.innerHTML = $("#userTotalH").val();
        pastH = nvaH;
        nvaH = toRelativeSize($("#userTotalH").val(),($("#userRelH").val()));
        transitionUpdate(pastH,nvaH);
    });
    $("#userRelH").on("change", function(){
        var inputH = $("#userRelH").val();
        pastH = nvaH;
        nvaH = toRelativeSize($("#userTotalH").val(),inputH);
        if(nvaH < 26 ) nvaH = 26;
        if(nvaH > 226 ) nvaH = 226;
        $("#slider").val(inputH);
        $("#userRelH").val() <= $("#userTotalH").val() ? svg_relH.innerHTML = $("#userRelH").val() : svg_relH.innerHTML = $("#userTotalH").val();
        transitionUpdate(pastH,nvaH);
    });
    
    $("#slider").on("change", function() {
        var inputH = $("#slider").val();
        pastH = nvaH;
        nvaH = toRelativeSize($("#userTotalH").val(),inputH);
        if(nvaH < 26 ) nvaH = 26;
        if(nvaH > 226 ) nvaH = 226;
        $("#userRelH").val(inputH);
        $("#userRelH").val() <= $("#userTotalH").val() ? svg_relH.innerHTML = $("#userRelH").val() : svg_relH.innerHTML = $("#userTotalH").val();
        transitionUpdate(pastH,nvaH);
        
    });

    
});