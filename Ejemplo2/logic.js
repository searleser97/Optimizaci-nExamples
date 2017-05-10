
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
function responsive(JQueryObject, widthPer, heightPer)
{
    JQueryObject.width($(window).width()*(widthPer/100));
    JQueryObject.height($(window).height()*(heightPer/100));
}
$(document).ready(function(){
    //Resize
    responsive($("#mySVG"), 90, 50);
    //responsive($("#controls"), 90, 50);
    $(window).resize(function(){
        responsive($("#mySVG"), 90, 50);
      //  responsive($("#controls"), 90, 50);
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