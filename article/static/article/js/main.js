
var $animationSpeed = 500;


$(document).ready(function(){

//------ cover drugs+me collapsable content ----------------------------------
  $("#title-drugs").hover(function() {
      $('#title-drugs-button').animate({
        marginTop:'+=9px',
        marginLeft:'+=9px'
      }, $animationSpeed);
      $("#title-drugs-collapse").removeClass("hidden");
      $("#title-drugs-collapse").animate({
        opacity: 1
      }, $animationSpeed);
      return false;
    },function(){

      $( this ).removeClass( "anim" );
      $('#title-drugs-button').animate({
        marginTop:'-=9px',
        marginLeft:'-=9px'
      }, $animationSpeed);
      $("#title-drugs-collapse").animate({
        opacity: 0
      }, $animationSpeed, function(){
        $("#title-drugs-collapse").addClass("hidden");
        return false;
      });
      return false;
  });

  $("#title-me").hover(function(){
      $('#title-me-button').animate({
        marginTop:'+=9px',
        marginLeft:'+=9px'
      }, $animationSpeed);
      $("#title-me-collapse").removeClass("hidden");
      $("#title-me-collapse").animate({
        opacity: 1
      }, $animationSpeed);
      return false;
    },function(){
      $('#title-me-button').animate({
        marginTop:'-=9px',
        marginLeft:'-=9px'
      }, $animationSpeed);
      $("#title-me-collapse").animate({
        opacity: 0
      }, $animationSpeed, function(){
        $("#title-me-collapse").addClass("hidden");
        return false;
    });
    return false;
  });
//------------------ front page bottom buttons ------------------------------

  // $('.home-button').click(function(){
  //   $('p', this).toggleClass('hidden');
  //   $(this).siblings().find('p').addClass('hidden');
  // })

//   $('#home-buttons a').click(function (e) {
//   e.preventDefault()
//   $(this).tab('show')
// })
});
