var inPreview = (/\/admin\/design/.test(top.location.pathname));

$('.product-option-selection-title').click(function(e) {
  $('.product-option-list').toggleClass('visible');
});

var nav_position = $('.header-nav-container').offset().top;
var header_nav_height = $('.header-nav-container').outerHeight();

$(window).on("scroll", function(e) {
  if ($(window).scrollTop() > nav_position) {
    $('.header-nav-container').addClass("fixed");
    $('body').css('padding-top',header_nav_height+'px');
  } else {
     $('.header-nav-container').removeClass("fixed");
     $('body').css('padding-top',0);
  }

});