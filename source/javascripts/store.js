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

$('.contact-form input, .contact-form textarea').focus(function(){
  $(this).parents('.contact-form-group').addClass('focused');
});

$('.contact-form input, .contact-form textarea').blur(function(){
  var inputValue = $(this).val();
  if ( inputValue == "" ) {
    $(this).removeClass('filled');
    $(this).parents('.contact-form-group').removeClass('focused');
  } else {
    $(this).addClass('filled');
  }
})

$(document).ready(function() {
  $('.contact-form input, .contact-form textarea').each(function(){
    var inputValue = $(this).val();
    if ( inputValue != "" ) {
      $(this).addClass('filled');
      $(this).parents('.contact-form-group').addClass('focused');
    }
  })
});

String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return hash;
};

if ($('.flash-message-text').length) {
  var announcementMessage = $('.flash-message-text').html();
  var hashedMessage = announcementMessage.hashCode();
  var cookieValue = getCookie('hide-announcement-message');
  if (cookieValue) {
    if (cookieValue != hashedMessage) {
      $('body').addClass('has-flash-message');
    }
  }
  else {
    $('body').addClass('has-flash-message');
  }
}

function setCookie(name,value,days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function eraseCookie(name) {
  document.cookie = name+'=; Max-Age=-99999999;';
}

$('.flash-message-close').click(function(e) {
  $('.flash-message').slideUp('fast', function() {
    $('body').removeClass('has-flash-message');
    setCookie('hide-announcement-message',hashedMessage,7);
  });
})

document.addEventListener('input', function (event) {
	if (event.target.tagName.toLowerCase() !== 'textarea') return;
	autoExpand(event.target);
}, false);

$(document).ready(function() {
  autoExpand($('textarea')[0])
});

var autoExpand = function (textarea) {
  if (textarea) {
    textarea.style.height = 'inherit';
    var height = textarea.scrollHeight;
    textarea.style.height = height + 'px';
  }
};