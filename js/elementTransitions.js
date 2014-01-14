/*
  elementTransitions.js
*/
var PageTransitions = window.PageTransitions = (function($) {
  var startElement = 0,
  animEndEventNames = {
    'WebkitAnimation': 'webkitAnimationEnd',
    'OAnimation': 'oAnimationEnd',
    'msAnimation': 'MSAnimationEnd',
    'animation': 'animationend'
  }

  function getTransitionPrefix() {
    var b = document.body || document.documentElement;
    var s = b.style;
    var p = 'animation';
    if(typeof s[p] == 'string')
      return 'animation';

    // Tests for vendor specific prop
    v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'],
    p = p.charAt(0).toUpperCase() + p.substr(1);
    for( var i=0; i<v.length; i++ ) {
      if(typeof s[v[i] + p] == 'string')
        return v[i] + p;
    }
    return false;
  }
  // animation end event name
  animEndEventName = animEndEventNames[getTransitionPrefix()];

  function init() {
    $(".et-page").each(function() {
      $(this).data('originalClassList', $(this).attr('class'));
    });
    $(".et-wrapper").each(function() {
      $(this).data('isAnimating', false);
      $(this).children(".et-page").eq(startElement).addClass('et-page-current');
    });

    $(".et-rotate").click(function() {
      animate($(this));
    });
  }

  function animate(block, callback) {
    nextPage($(block).closest('.et-wrapper'), $(block).data('direction'), $(block).attr('et-out'), $(block).attr('et-in'), callback);
  }

  function nextPage(block, direction, outClass, inClass, callback) {
    block = $(block);
    console.log(outClass);
    inClass = formatClass(inClass);
    outClass = formatClass(outClass);
    var $pages = block.children('.et-page'),
        pagesCount = $pages.length,
        endCurrPage = false,
        endNextPage = false;

    if(block.data('isAnimating')) {
      return false;
    }

    block.data('isAnimating', true);

    var $currPage = $('.et-page-current');

    if(direction == 'next'){
      var $nextPage = $currPage.next().addClass('et-page-current');
    }
    else{
      var $nextPage = $currPage.prev().addClass('et-page-current');
    }

    $currPage.addClass(outClass).on(animEndEventName, function() {
      $currPage.off(animEndEventName);
      endCurrPage = true;
      if(endNextPage) {
        if(jQuery.isFunction(callback)) {
          callback(block, $nextPage, $currPage);
        }
        onEndAnimation($currPage, $nextPage, block);
      }
    });

    $nextPage.addClass(inClass).on(animEndEventName, function() {
      $nextPage.off(animEndEventName);
      endNextPage = true;
      if(endCurrPage) {
        onEndAnimation($currPage, $nextPage, block);
      }
    });
  }

  function onEndAnimation($outpage, $inpage, block) {
    resetPage($outpage, $inpage);
    block.data('isAnimating', false);
  }

  function resetPage($outpage, $inpage) {
    $outpage.attr('class', $outpage.data( 'originalClassList'));
    $inpage.attr('class', $inpage.data( 'originalClassList') + ' et-page-current');
  }
  
  function goTo(index){
    $('.et-wrapper .et-page').removeClass('et-page-current');
    $('.et-wrapper .et-page:nth-child(' + index + ')').addClass('et-page-current');
  }

  function formatClass(str) {
    classes = str.split(" ");
    output = "";
    for(var n=0; n<classes.length; n++){
      output += " pt-page-" + classes[n];
    }
    return output;
  }
  return {
    init : init,
    nextPage: nextPage,
    animate: animate,
    goTo: goTo
  };
})(jQuery);

jQuery(function($) {
  PageTransitions.init();
  $(window).on('hashchange', function(e){
    var index = window.location.hash.split('/')[1];
    PageTransitions.goTo(index);
  });
  $(window).trigger('hashchange');
});
