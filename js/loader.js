function Loader(){
  this.slides = $(".slides");
  var that = this;

  this.loadFile = function (fileName, onload){
    return $.get(fileName + '.html').success(function(data){
      that.slides.append(data);
      if(onload != undefined){ onload(); }
    });
  }

  $(window).on('hashchange', function() {
    var slide = window.location.hash.split('/')[1];
    that.loadFile('slide_' + slide, function(){
      //pageTransitions.nextPage(1);
    });
  });
}

var loader = window.loader = new Loader();
loader.loadFile('slide_1', function(){
  //var $firstPage = $('section.pt-page:first');
  //$firstPage.addClass('pt-page-current');
});
