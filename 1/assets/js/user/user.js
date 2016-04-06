$( document ).ready(function() {
	$("section").height($(window).height());

	 var stickyNav = function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > 300) {
            $('header').addClass('selected');
        } else {
            $('header').removeClass('selected');
        }
    };
       
    

    $(window).scroll(function () {
        stickyNav();
    });

     $(".index li a").click(function(event) {
        event.preventDefault();
        console.log();
        $('html, body').animate({
            scrollTop: $("#"+$(this).data("nav")).offset().top
        }, 500);
    });
})

