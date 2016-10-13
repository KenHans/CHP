
  var TabsSelect = {

    init: function() {
      this.makeSelectMenu();
      this.bindUIfunctions();
    },

    bindUIfunctions: function() {
      // Delegation
      $("body")
        .on("click", ".transformer-tabs li:not('.active') a[href^='#']", function(event) {
          TabsSelect.changeTab(this.hash, this);
          event.preventDefault();
        })
        .on("change", ".transformer-tabs select", function(event) {
          TabsSelect.changeTab(this.value, this);
          event.preventDefault();
        });
    },

    changeTab: function(hash, el) {
      // activate correct anchor (visually)
  $("[href=" + hash + "]").parent().addClass("active").siblings().removeClass("active");
      // activate correct div (visually)
    //  $div.addClass("active").siblings().removeClass("active");
  $(hash).addClass("active").siblings().removeClass("active");

      //Update the select option of the select box too
     // $select.val(hash);
      $("[value=" + hash + "]").parent().val(hash);

      // update URL, no history addition
      if ( !$("html").hasClass("no-history") ) {
         window.history.replaceState("", "", hash);
      }
    },


    makeSelectMenu: function() {

      // Create the dropdown base
      $("<span class='tabs-heading'></span><select class='tabs-select-menu' aria-label='Select an option'/>").appendTo(".transformer-tabs");

      // Populate dropdown with menu items
      $(".transformer-tabs").each(function(){
          var $nav = $(this), $select = $nav.find("select");
          var selectHeading =  $nav.attr("data-mobile-heading");
          $nav.find(".tabs-heading").text(selectHeading);
          $nav.find("a").each(function() {
             var el = $(this);

             $("<option />", {
                 "value"   : el.attr("href"),
                 "text"    : el.text()
             }).appendTo($select);
          });

      });
    }
  };

// initialise th tabs func
$( document ).ready(function() {
    if ($(".tabs").length) {// call tabs func
    TabsSelect.init();
  }
});