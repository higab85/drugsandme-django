
var $animationSpeed = 500;

//Makes new selector (icontains) which is a case insensitive contains for Jquery
//(needed for search)
jQuery.expr[':'].icontains = function(a, i, m) {
  return jQuery(a).text().toUpperCase()
      .indexOf(m[3].toUpperCase()) >= 0;
};


$(document).ready(function(){

  var $currentDrug = $('meta[name=drug-name]').attr("content");

//------ cover drugs+me collapsable content ----------------------------------
  $("#title-drugs").hover(function() {
      var $displacedMarginLeft = "9px";
      var $displacedMarginTop = "9px";
      if($(window).width() < 768){
          $displacedMarginLeft = "1.5vw";
          $displacedMarginTop = "1.5vw";
        }

      $("#title-drugs-collapse").stop().removeClass("hidden");
      $('#title-drugs-button').animate({
        marginTop: $displacedMarginTop,
        marginLeft: $displacedMarginLeft
      }, $animationSpeed);
      $("#title-drugs-collapse").animate({
        opacity: 1
      }, $animationSpeed);
      return false;
    },function(){
      $('#title-drugs-button').stop().animate({
        marginTop:'0px',
        marginLeft:'0px'
      }, $animationSpeed);
      $("#title-drugs-collapse").stop().animate({
        opacity: 0
      }, $animationSpeed, function(){
        $("#title-drugs-collapse").stop().addClass("hidden");
        return false;
      });
      return false;
  });

  $("#title-me").stop().hover(function(){
      var $displacedMarginLeft = "433px";
      var $displacedMarginTop = "9px";
      if($(window).width() < 768){
          $displacedMarginLeft = "57.9vw";
          $displacedMarginTop = "1.5vw";
        }
      $("#title-me-collapse").stop().removeClass("hidden");
      $("#title-me-collapse").stop().animate({
        opacity: 1
      }, $animationSpeed);
      $('#title-me-button').stop().animate({
        marginTop: $displacedMarginTop,
        marginLeft: $displacedMarginLeft
      }, $animationSpeed);
      return false;
    },function(){
      var $originalMarginLeft = "424px";
      var $originalMarginTop = "0px";
      if($(window).width() < 768){
          $originalMarginLeft = "56.5vw";
          $originalMarginTop = "0vw";
        }
      $("#title-me-collapse").stop().animate({
        opacity: 0
      }, $animationSpeed, function(){
        $("#title-me-collapse").stop().addClass("hidden");
        return false;
    });
      $('#title-me-button').stop().animate({
        marginTop: $originalMarginTop,
        marginLeft: $originalMarginLeft
      }, $animationSpeed, function(){
        $('#title-me-button').stop().removeAttr('style');
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

  // adds theme-light-color to hovered content item, and only removes the class
  // if that element isn't active
  $('#sidebar a').hover(function(){
    $(this).addClass('theme-light-color');
  },function(){
    if(!$(this).parent().hasClass('active'))
      $(this).removeClass('theme-light-color');
  });

  // Flips .thing-to-take
  $('.thing-to-take').click(function(){
    $(this).toggleClass('flipped');
    $(this).children().toggleClass('hidden');
  });

  // Toggles stages on harm-reduction table
  $('.harm-reduction-stage-indicator').click(function(){
    $(this).parents().children().removeClass('active');
    $(this).parents().children().removeClass('theme-light-bg');
    $(this).addClass('active');
    $(this).addClass('theme-light-bg');
    $('#harm-reduction-stage-descriptions p').text( $(this).find("p").html());
  })

  // Makes first drug in #interactions-combo-addition the current drug
  $('.current-drug-name').text( $currentDrug);

  // Selects drug in combo chart:
  // - makes selected drug background-color change to color
  // - adds new info to #interactions-combo
  $('#interactions-table').on("click", ".drug-to-combine", function(){
    $('.drug-to-combine').addClass('combo-not-active');
    $('.drug-to-combine.active').removeClass('active');
    $(this).removeClass('combo-not-active');
    $(this).addClass('active');
    $('#interactions-combo-addition-temp').text($(this).find('h5').html());
    $('#interactions-combo-result').html($(this).find('div').html());
  })
  // Deactivates an activated drug if it is clicked on.
  $('#interactions-table').on("click", '.active', function(){
    $(this).addClass('combo-not-active');
    $(this).removeClass('active');
    $('#interactions-combo-addition-temp').text("?");
    $('#interactions-combo-result').html("<h4 class=\"funky\">SELECT A DRUG</h4><p>Click one of the drugs below and see how it mixes with " + $currentDrug + "</p>");
  })

  // Lets you peek into the colour of the drug by only hovering over it
  $(".combo-not-active").hover(function(){
    $(this).removeClass('combo-not-active');
  },function(){
    if(!$(this).hasClass('active'))
      $(this).addClass('combo-not-active');
  })

  // will add activate boxes on mobile startpage:
  // - add class active
  // - expand information box
  // - make sure only one box is activated
  $('#mobile-info-boxes>div').click(function(){
    if($(this).hasClass('active')){
      $(this).find('p').addClass('hidden');
      $(this).removeClass('active');
    }else{
      $('#mobile-info-boxes .active').find('p').addClass('hidden');
      $('#mobile-info-boxes .active').removeClass('active');
      $(this).addClass('active');
      $(this).find('p').removeClass('hidden');
    }
  })

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
