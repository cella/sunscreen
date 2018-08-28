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

$('.close-errors').click(function(e) {
  $('.error-modal').hide();
});

$('.product-option-list li').not('.disabled').click(function() {
  var option_id = $(this).data("option-id");
  if (option_id > 0) {
    $('#option').val(option_id);
    $('.product-form').submit();
  }
});

$('.cart-item-remove').click(function(e) {
  $(this).closest('li').find('input.option-quantity').val(0).closest('form').submit();
  return false;
});
$('.option-quantity').blur(function(e) {
  $(this).closest('form').submit();
  return false;
});
