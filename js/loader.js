function Loader(){
  this.slides = $(".slides");
  var that = this;

  this.loadFile = function (fileName, onload){
    return $.get(fileName + '.html').success(function(data){
      that.slides.html(data);
      if(onload != undefined){ onload(); }
    });
  }
}

var loader = window.loader = new Loader();
loader.loadFile('slide_1');
