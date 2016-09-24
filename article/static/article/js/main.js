
var $animationSpeed = 500;

//Makes new selector (icontains) which is a case insensitive contains for Jquery
//(needed for search)
jQuery.expr[':'].icontains = function(a, i, m) {
  return jQuery(a).text().toUpperCase()
      .indexOf(m[3].toUpperCase()) >= 0;
};

//smooth scroll on links
// $(function() {
// });

// will ckeck whether there is more to read on harm-reduction-stage-descriptions
// and if not, will hide 'read more' button
(function( $ ){
   $.fn.parentSizeChecker = function() {

     if($(this).find('div').first().height() < 300)
       $(this).find('div:nth-child(2)').addClass('hidden');
     else
       $(this).find('div:nth-child(2)').removeClass('hidden');

   };
})( jQuery );

$(document).ready(function(){

  var $currentDrug = $('meta[name=drug-name]').attr("content");

  // $("a[href='#*']:not([href='#'])").click(function(event){
  $("#sidebar li a").click(function(event){
          console.log('in the löp');
          event.preventDefault();
          $('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
      });
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

  $('.searchtext').on('input', function(){
      //unentitle item if any is entitled
      if($('.item-link').hasClass('entitled')){
          $('.entitled').unEntitle();
      }

      var thisSearchBox = this;
      $(window).keyup(function(event){
          "use strict";
          var searchquery = thisSearchBox.value.toLowerCase();

          //hide and show items
          $(".item ul:icontains('" + searchquery + "')").parentsUntil(this, '.item').removeClass('hidden');
          $(".item ul:not(:icontains('" + searchquery + "'))").parentsUntil(this, '.item').addClass('hidden');
          if(searchquery == ""){
            $(".item-picker").addClass('hidden');
          }
          else {
            $(".item-picker").removeClass('hidden');
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
    var $currentStage = $(this);
    $(this).parents().children().removeClass('active');
    $(this).parents().children().removeClass('theme-light-bg');
    $(this).addClass('active');
    $(this).addClass('theme-light-bg');
    $('#harm-reduction-stage-descriptions').removeClass('full-length');
    $('#harm-reduction-stage-descriptions:nth-child(2)').find('p').text('Read more');
    $('#harm-reduction-stage-descriptions div').first().replaceWith("<div class='harm-reduction-stage-description'>" + $currentStage.find("div").html() + "</div>");
    // will ckeck whether there is more to read on harm-reduction-stage-descriptions
    // and if not, will hide 'read more' button

    $('#harm-reduction-stage-descriptions').parentSizeChecker();

    // if($('#harm-reduction-stage-descriptions div').first().height() < 300)
    //   $('#harm-reduction-stage-descriptions div:nth-child(2)').addClass('hidden');
    // else
    //   $('#harm-reduction-stage-descriptions div:nth-child(2)').removeClass('hidden');
  })
  // gives harm-reduction "BEFORE" tab it's description
  $('#harm-reduction-stage-descriptions div').first().replaceWith("<div class='harm-reduction-stage-description'>" + $('.harm-reduction-stage-indicator').first().find("div").html() + "</div>");
  $('#harm-reduction-stage-descriptions').parentSizeChecker();

  // makes read-more buttons expand table so rest of
  // text is readable
  $('.read-more').click(function(){
    $(this).parent().toggleClass('full-length');
    if ($(this).parent().hasClass('full-length')) {
      $(this).find('p').text('Read less');
    }
    else{
      $(this).find('p').text('Read more');
    }
    $('#harm-reduction-stage-descriptions').parentSizeChecker();
  });

  // Makes first drug in #interactions-combo-addition the current drug
  $('.current-drug-name').text( $currentDrug);
  $('#interactions-table>a').each(function(){
    var $category = $(this).find('p').attr('class');
    $(this).addClass($category);
  });



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

  // ------------- Mobile nav bar-----------

  // collapses drug menu on navbar
  $('.mobile-nav-collapse-menu-collapsible').click(function(){
    $(this).find('img').toggleClass('box_rotate');
    $(this).find('ul').toggleClass('hidden');
  })
  // navbar buttons :
    $('.mobile-nav-button-menu').click(function(){
      if ($('#mobile-nav-collapse').hasClass('hidden')) {
        // toggling close icons
        $('#mobile-nav-button-menu').addClass('hidden');
        $('#mobile-nav-button-menu-close').removeClass('hidden');
        $('#mobile-nav-button-search').removeClass('hidden');
        $('#mobile-nav-button-search-close').addClass('hidden');
        // toggling correct collapse
        $('#mobile-nav-collapse').removeClass('hidden');
        $('#mobile-nav-collapse-menu').removeClass('hidden');
      }
      else if( $('#mobile-nav-collapse-search').hasClass('hidden') ){

        $('#mobile-nav-button-menu').removeClass('hidden');
        $('#mobile-nav-button-menu-close').addClass('hidden');
        $('#mobile-nav-button-search').removeClass('hidden');
        $('#mobile-nav-button-search-close').addClass('hidden');

        $('#mobile-nav-collapse-menu').addClass('hidden');
        $('#mobile-nav-collapse').addClass('hidden');
      }
      else if( $('#mobile-nav-collapse-menu').hasClass('hidden') ){

        $('#mobile-nav-button-menu').addClass('hidden');
        $('#mobile-nav-button-menu-close').removeClass('hidden');
        $('#mobile-nav-button-search').removeClass('hidden');
        $('#mobile-nav-button-search-close').addClass('hidden');

        $('#mobile-nav-collapse-search').addClass('hidden');
        $('#mobile-nav-collapse-menu').removeClass('hidden');
      }
    })

    $('.mobile-nav-button-search').click(function(){
      if ($('#mobile-nav-collapse').hasClass('hidden')) {

        $('#mobile-nav-button-search').addClass('hidden');
        $('#mobile-nav-button-search-close').removeClass('hidden');
        $('#mobile-nav-button-menu').removeClass('hidden');
        $('#mobile-nav-button-menu-close').addClass('hidden');

        $('#mobile-nav-collapse').removeClass('hidden');
        $('#mobile-nav-collapse-search').removeClass('hidden');
      }
      else if( $('#mobile-nav-collapse-menu').hasClass('hidden') ){

        $('#mobile-nav-button-search').removeClass('hidden');
        $('#mobile-nav-button-search-close').addClass('hidden');
        $('#mobile-nav-button-menu').removeClass('hidden');
        $('#mobile-nav-button-menu-close').addClass('hidden');

        $('#mobile-nav-collapse-search').addClass('hidden');
        $('#mobile-nav-collapse').addClass('hidden');
      }
      else if( $('#mobile-nav-collapse-search').hasClass('hidden') ){

        $('#mobile-nav-button-search').addClass('hidden');
        $('#mobile-nav-button-search-close').removeClass('hidden');
        $('#mobile-nav-button-menu').removeClass('hidden');
        $('#mobile-nav-button-menu-close').addClass('hidden');

        $('#mobile-nav-collapse-menu').addClass('hidden');
        $('#mobile-nav-collapse-search').removeClass('hidden');
      }
    })

    // brain-science content expander
    $('.brain-science>img').click(function(){
      $(this).parent().find('.brain-science-content').toggleClass('hidden');
      $(this).parent().find('.click-me-tip').toggleClass('hidden');
    })
  // end navbar buttons
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
