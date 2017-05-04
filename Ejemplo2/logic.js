/*
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
    if (pastH.toFixed(0) == nvaH.toFixed(0)) return;
     setTimeout(function () {
        updateLabels(pastH);
        if(nvaH.toFixed(0)>pastH.toFixed(0) )
            transitionUpdate(++pastH, nvaH);
        if(nvaH.toFixed(0)<pastH.toFixed(0))
            transitionUpdate(--pastH, nvaH);
    }, 10);
} 
*/
function getY(perimetro, x)
{
    var res = -perimetro + ((x*Math.PI).toFixed(1)/2) + parseFloat(x);
    return (res/(-2)).toFixed(1);
}
function onChangeArea(x,y)
{
    var area =  x*y + (Math.PI * Math.pow(x/2,2))/2;
    $("#area").val(area.toFixed(1));
    return area;
}
function onChangeX(perimetro, x)
{
    $("#input_x").val(x);
    $("#lbl_x").html(x);
    $("#lbl_y").html(getY(perimetro, x));
    onChangeArea(x, getY(perimetro, x));
}
function onChangePer(perimetro, x)
{
    if(perimetro < (((x*Math.PI).toFixed(1)/2) + parseFloat(x)))
        return false;
    $("#input_per").val(perimetro);
    onChangeX(perimetro, x);
    onChangeArea(x, getY(perimetro, x));
}
$(document).ready(function(){
    //Resize
    $("#mySVG").width($(window).width());
    $("#mySVG").height($(window).height()*0.50);
    $(window).resize(function(){
        $("#mySVG").width($(window).width());
        $("#mySVG").height($(window).height()*0.50);
        console.log($(window).width() + "x" + $(window).height());
    });
    //Vars
    var perimetro = $("#mySlider_per").val(); $("#input_per").val(perimetro);
    var x = $("#mySlider_x").val(); $("#input_x").val(x);
    var y = getY(perimetro, x);
    var A = (x * y) + ( ( Math.PI * Math.pow(x/2, 2) ) / 2 );
    //Startup
    onChangeX(perimetro,x);
    //Events
    $("#mySlider_x").on("input", function()
    {
        onChangeX(perimetro, x);
        x = $("#mySlider_x").val();
        
    });
    $("#mySlider_per").on("input", function()
    {
        onChangePer(perimetro, x);
        perimetro = $("#mySlider_per").val();
        
    });
    
});