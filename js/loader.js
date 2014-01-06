function Loader(){
  this.slides = $(".slides");
  var that = this;

  this.loadFile = function (fileName, onload){
    return $.get(fileName + '.html').success(function(data){
      that.slides.append(data);
      if(onload != undefined){ onload(); }
    });
  }

  that.loadFile('slides_0_3', function(){
    that.loadFile('slides_4_7', function(){
      that.loadFile('slides_8_11', function(){
        that.loadFile('slides_12_15', function(){
          Reveal.initialize({
            width: 1276,
            height: 638,
            controls: false,
            progress: false,
            history: false,
            center: true,
            keyboard: true,
            overview: false,

            theme: Reveal.getQueryHash().theme,
            transition: Reveal.getQueryHash().transition || 'default',

            dependencies: [
              { src: 'lib/js/classList.js', condition: function() { return !document.body.classList; } },
              { src: 'plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
              { src: 'plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
              { src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
              { src: 'plugin/zoom-js/zoom.js', async: true, condition: function() { return !!document.body.classList; } },
              { src: 'plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } }
            ]
          });
        });
      });
    });
  });
}

var loader = window.loader = new Loader();
