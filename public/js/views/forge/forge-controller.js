$(document).ready(function(){
    var dices_slider = $('.dices-slider.owl-carousel').owlCarousel(
        {
            center: true,
            items:1,
            loop:false,
            nav: true,
            navText: ["<img src='/assets/img/arrow-left.png'>","<img src='/assets/img/arrow-right.png'>"]
        }
    );

    dices_slider.on('changed.owl.carousel',function(property) {
        $("#dice-number").html(property.item.index+1);
    });

    $(".open-dice-button").click(function()
    {
        var current = $(this);
        current.parent().parent().addClass("wrap-invisible");
        $(".dices-slider").addClass("slider-controls-invisible");
        setTimeout(function()
        {
            current.parent().parent().addClass("wrap-hidden");
            $(".dices-slider").addClass("slider-controls-hidden");
            current.parent().parent().addClass("unwrap-display");
            setTimeout(function() {
                current.parent().parent().addClass("unwrap-visible");
            },10);
        },1000)
    });

    $(".dice-open-exit").click(function()
    {
        var current = $(this);
        current.parent().parent().removeClass("unwrap-visible");
        $(".dices-slider").removeClass("slider-controls-hidden");
        setTimeout(function()
        {
            current.parent().parent().removeClass("wrap-hidden");
            current.parent().parent().removeClass("unwrap-display");
            $(".dices-slider").removeClass("slider-controls-invisible");
            setTimeout(function() {
                current.parent().parent().removeClass("wrap-invisible");
            },10);
        },1000)
    });

});