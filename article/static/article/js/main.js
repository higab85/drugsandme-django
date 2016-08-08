
var $animationSpeed = 500;

//Makes new selector (icontains) which is a case insensitive contains for Jquery
//(needed for search)
jQuery.expr[':'].icontains = function(a, i, m) {
  return jQuery(a).text().toUpperCase()
      .indexOf(m[3].toUpperCase()) >= 0;
};


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

// ---------- Search -------------------------------------------

  $('#searchText').on('input', function(){
      //unentitle item if any is entitled
      if($('.item-link').hasClass('entitled')){
          $('.entitled').unEntitle();
      }

      $(window).keyup(function(event){
          "use strict";
          var searchquery = document.getElementById("searchText").value.toLowerCase();

          //hide and show items
          $(".item ul:icontains('" + searchquery + "')").parentsUntil(this, '.item').removeClass('hidden');
          $(".item ul:not(:icontains('" + searchquery + "'))").parentsUntil(this, '.item').addClass('hidden');
          if(searchquery == ""){
            $("#item-picker").addClass('hidden');
          }
          else {
            $("#item-picker").removeClass('hidden');
            if(event.keyCode == 13){
                window.location.href = $(".tag:icontains('" + searchquery + "')").parentsUntil(this, '.item').find(">:first-child").attr("href");
              }

          }

         //changes h5 to tag names
          $(".tag:icontains('" + searchquery + "')").each(function(){
              var current = $(this).text();
              $(this).parentsUntil(this, '.item').find("h5").html(current);
              $(this).parentsUntil(this, '.item').find("h5").removeClass('hidden');
            //capitalise first letter of element
            $('.item-name').css('textTransform', 'capitalize');
          });

      });
  });

// This is part of the contents page which will highlight when we scroll
  $('body').scrollspy({
    target: '.bs-docs-sidebar',
    offset: 40
  });
// This is to make the sidebar fixed only after the cover
  $("#sidebar").affix({
    offset: {
      top: 480
    }
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
