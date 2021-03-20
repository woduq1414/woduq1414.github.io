$(document).ready(function(){
  $('figure.highlight').each(function(x, r){
    if ($(r).find('table').length < 1){
      $(r).find('pre').css('padding', '5px');
    }
  });
  $('#postContent img').parent('p').css('text-align', 'center');

  $("#postContent img").each(function (index, item) {
    $(item).wrap(`<a data-fancybox="gallery" href="${$(item).attr("src")}"> </a>`)
  })

});
