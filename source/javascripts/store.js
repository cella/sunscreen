var inPreview = (/\/admin\/design/.test(top.location.pathname));

API.onError = function(errors) {
  var errorList = $('.error-list');
  $.each(errors, function(index, error) {
    errorList.append('<div class="error-list-item">').html(error);
  });
  $('.error-modal').show();
}

$('.product-form').submit(function(e) {
  e.preventDefault();
  // var quantity = $(".product-quantity").val()
  // , itemID = $("#option").val()
  // , addButton = $('.add-to-cart-button')
  // , optionDropdown = $('.product-option-selection');
  // if (addButton.length) {
  //   var addMethod = addButton;
  //   var updateElement = addButton;
  //   var addText = addButton.html();
  // }
  // else {
  //   var addMethod = optionDropdown;
  //   var updateElement = $('.product-option-selection-button');
  //   var addText = updateElement.html();
  // }
  // var addedText = addMethod.data('added-text')
  // , addingText = addMethod.data('adding-text')
  // if (!addMethod.hasClass('adding')) {
  //   if (quantity > 0 && itemID > 0) {
  //     addMethod.addClass('adding');
  //     addMethod.blur();
  //     Cart.addItem(itemID, quantity, function(cart) {
  //       setTimeout(function() {
  //         if ($('.product-option-selection-button').length) {
  //           $('.product-option-list').toggleClass('visible');
  //         }
  //         updateElement.html(addingText);
  //         setTimeout(function() {
  //           updateElement.html(addedText);
  //           $('.cart-item-count').html(cart.item_count);
  //           $('.cart-item-count').removeClass('no-items');
  //           addMethod.removeClass('adding');
  //           setTimeout(function() {
  //             updateElement.html(addText);
  //           }, 900)
  //         }, 600);
  //       }, 300);
  //     });
  //   }
  // }
});

$('.product-option-selection-button').click(function(e) {
  var selected = this;
  $('.product-option-selection-button').each(function() {
    if(this === selected) {
      $(this).find("span").text($(this).data("option-title"))
      $(this).toggleClass('opened');
      $(this).parent().toggleClass("selected");
      $(this).parent().find('.product-option-list').toggleClass('visible');
    } else {
      $(this).parent().removeClass("selected");
      $(this).removeClass("opened");
      $(this).parent().find('.product-option-list').removeClass('visible');
    }
  });

});


// $('.product-option-list li').not('.disabled').keypress(function (e) {
//   if (e.keyCode == 13) {
//     addItemToCart($(this));
//   }
// });
//
// $('.product-option-list li').not('.disabled').click(function() {
//   addItemToCart($(this));
// });

$('.product-option-list li').click(function() {
  var text = $(this).text();
  $(this).parent().parent().find(".product-option-selection-button span").text(text);
  $(this).parent().parent().find(".product-option-selection-button").toggleClass("opened");
  $(this).parent().toggleClass('visible');
  $(this).parent().parent().toggleClass("selected");
  updateAddToCart();
});

function updateAddToCart() {
  var disabled = false;
  $('.product-option-selection-button').each(function() {
    console.log($(this).text());
    if($(this).text().indexOf("Select") >= 0) {
      disabled = true;
      return
    }
  });
  $('.add-to-cart-button').prop('disabled', disabled);
}


function addItemToCart(selectedOption) {
  var option_id = selectedOption.data("option-id");
  if (option_id > 0) {
    $('#option').val(option_id);
    $('.product-form').submit();
  }
}

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

$('.open-overlay').click(function(e) {
  var screen_width = $(window).width();
  if (screen_width <= 767) {
    $(this).parent().addClass('overlay-open');
    $('body').addClass('no-scroll');
  }
});

$('.close-overlay').click(function(e) {
  e.preventDefault();
  $(this).parent().removeClass('overlay-open');
  $('body').removeClass('no-scroll');
});

$('.close-errors').click(function(e) {
  $('.error-modal').hide();
});

$(document).on('keyup',function(e) {
  if (e.keyCode == 27) {
    if ($('.error-modal').is(":visible")) {
      $('.error-modal').hide();
    }
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

$('.contact-form input[type="text"], .contact-form textarea').focus(function(){
  $(this).parents('.contact-form-group').addClass('focused');
});

$('.contact-form input[type="text"], .contact-form textarea').blur(function(){
  var inputValue = $(this).val();
  if (inputValue.length == 0) {
    $(this).removeClass('filled');
    $(this).parents('.contact-form-group').removeClass('focused');
  } else {
    $(this).addClass('filled');
  }
})

$(document).ready(function() {
  $('.contact-form input[type="text"], .contact-form textarea').each(function(){
    var inputValue = $(this).val();
    if (inputValue.length > 0) {
      $(this).addClass('filled');
      $(this).parents('.contact-form-group').addClass('focused');
    }
  })
  autoExpand($('textarea')[0]);
  if ($('.all-similar-products').length) {
    var num_products = $('.all-similar-products > a').length;
    var elements = $('.all-similar-products').children().toArray();
    var num_to_display = 3;
    for (var i=1; i<=num_to_display; i++) {
      var randomIndex = getRandomIndex(elements);
      $('.similar-product-list').append($('.all-similar-products').children().eq(randomIndex));
      elements.splice(randomIndex, 1);
      $('.similar-product-list .similar-product-list-image').each(function() {
        $(this).attr("src",$(this).data("src"));
      })
    }
    $('.all-similar-products').remove();
  }
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

function autoExpand(textarea) {
  if (textarea) {
    if (textarea.value) {
      textarea.style.height = 'inherit';
      var height = textarea.scrollHeight;
      textarea.style.height = height + 'px';
    }
  }
};

function getRandomIndex(elements) {
  return Math.floor(Math.random() * elements.length);
}
