var inPreview = (/\/admin\/design/.test(top.location.pathname));

$('.product-option-selection-title').click(function(e) {
  $('.product-option-list').toggleClass('visible');
});