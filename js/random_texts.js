var RandomTexts = window.RandomTexts = function(root, textsFile){
  var that = this;

  function changeText(){
    that.text.html(that.texts[Math.floor(Math.random()*that.texts.length)]);
  }
  that.changeText = changeText;

  function init(){
    that.root = $(root);
    that.text = $('.response', that.root);

    $.get(textsFile).success(function(data){
      that.texts = data;
      changeText();
    });

    $('.change-text', that.root).click(function(){
      changeText();
      return false;
    });
  }


  init();
};

var whats = window.whats = new RandomTexts('#whats-crowdfunding', 'slide_18_texts.json');
var government = window.government = new RandomTexts('#government', 'slide_36_texts.json');
