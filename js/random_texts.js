var RandomTexts = window.RandomTexts = function(root, textsFile){
  var that = this;

  function changeText(){
    var newText = that.texts[Math.floor(Math.random()*that.texts.length)];
    var shortText = newText;
    if(newText.length > 280){
      shortText = newText.substring(0, 280) + '...';
    }
    that.text.html(shortText);
    that.text.prop('title', newText);
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
var advices = window.advices = new RandomTexts('#advices', 'slide_49_texts.json');
