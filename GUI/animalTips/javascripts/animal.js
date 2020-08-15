$(function(){
  var timeoutId;
  $('.container > figure >  img').hover(function (e){
    var figcaption = this;
    timeoutId = setTimeout(function () {
      $(figcaption).next().fadeIn();
    }, 2000);
  }, function(e){
    clearInterval(timeoutId);
    $(this).next().stop();
    $(this).next().fadeOut();
  });
});
