import $ from "jquery";

// ("use strict");
console.log("Custom JS LOADED");
// });
// setTimeout(() => {
$(function() {

  var $root = $(document);
  var ENV = {
    testClick(){
      console.log('test Click');
      $("body").toggleClass("mini-sidebar mini")
      // $(this).toggleClass('red blue');
    }
  }

  $root.on('click','#togglebtn',ENV.testClick);

  // $("#togglebtn").on("click", function() {
  //   console.log('BOOM');
  //   $("body").removeClass("mini-sidebar"), $("body").addClass("mini-sidebar");
  // })
  //  $("input,select,textarea").not("[type=submit]").jqBootstrapValidation(); 
  
  // $(function() {
  //   $(".preloader").fadeOut();
  // }),
  // $(document).on("click", ".mega-dropdown", function(e) {
  //   e.stopPropagation();
  // }),
//   $(function() {
//     var e = window.location,
//       i = $("ul.sidebar-menu a")
//         .filter(function() {
//           return this.href === e || 0 === e.href.indexOf(this.href);
//         })
//         .addClass("active")
//         .parent()
//         .parent()
//         .parent()
//         .parent()
//         .addClass("selected")
//         .parent();
//     i.is("li") && i.addClass("active");
//   });
//   // var e = function() {
//   //   var e = window.innerWidth > 0 ? window.innerWidth : this.screen.width;
//   //   e < 1170
//   //     ? ($("body").addClass("mini-sidebar"),
//   //       $(".mini-nav li.selected").addClass("cnt-none"),
//   //       $("#togglebtn").hide())
//   //     : ($("body").removeClass("mini-sidebar"),
//   //       $(".mini-nav > li.selected").removeClass("cnt-none"),
//   //       $("#togglebtn").show()),
//   //     e < 1549
//   //       ? ($("body").addClass("rmv-right-panel"),
//   //         $(".right-side-toggle i").addClass("ti-arrow-left"))
//   //       : ($("body").removeClass("rmv-right-panel"),
//   //         $(".right-side-toggle i").removeClass("ti-arrow-left"));
//   //   var i =
//   //     (window.innerHeight > 0 ? window.innerHeight : this.screen.height) - 1;
//   //   (i -= 55) < 1 && (i = 1),
//   //     i > 55 && $(".page-wrapper").css("min-height", i + "px");
//   // };
//   $(".mini-nav > li, #togglebtn").on("click", function() {
//     $("body").hasClass("rmv-sidebarmenu")
//       ? ($("body").trigger("resize"), $("#togglebtn").hide())
//       : ($("body").trigger("resize"), $("#togglebtn").show());
//   });
//   // $(window).ready(e),
//   //   $(window).on("resize", e),
//   //   $(".mini-nav > li, #togglebtn").on("click", function() {
//   //     $("body").hasClass("rmv-sidebarmenu")
//   //       ? ($("body").trigger("resize"), $("#togglebtn").hide())
//   //       : ($("body").trigger("resize"), $("#togglebtn").show());
//   //   }),
//   //   $(".mini-nav > li, #togglebtn").on("click", function() {
//   //     $("body").hasClass("mini-sidebar") &&
//   //       ($(".mini-nav > li.selected").removeClass("cnt-none"),
//   //       $("#togglebtn").show());
//   //   }),
//   //   $(".mini-nav")
//   //     .css("overflow", "hidden")
//   //     .parent()
//   //     .css("overflow", "visible"),
//   //   $("#togglebtn").on("click", function() {
//   //     $("#togglebtn").hide(), $(".mini-nav > li.selected").addClass("cnt-none");
//   //   }),
//   //   $(".mini-nav > li").on("click", function() {
//   //     $("#togglebtn").show();
//   //     $(".mini-nav > li.selected").removeClass("cnt-none");
//   //     $("body").removeClass("rmv-sidebarmenu");
//   //   });
//   // $(".mini-nav > li").on("click", function() {
//   //   console.log("addclass li mini nav");
//   //   $(".mini-nav > li.selected").removeClass("selected");
//   //   $(this).addClass("selected");
//   // });
//   ($.sidemenu = function(e) {
//     $(e).on("click", "li a", function(e) {
//       if (
//         $(this)
//           .next()
//           .is(".sub-menu") &&
//         $(this)
//           .next()
//           .is(":visible")
//       )
//         $(this)
//           .next()
//           .slideUp(300, function() {
//             $(this)
//               .next()
//               .removeClass("menu-open");
//           }),
//           $(this)
//             .next()
//             .parent("li")
//             .removeClass("active");
//       else if (
//         $(this)
//           .next()
//           .is(".sub-menu") &&
//         !$(this)
//           .next()
//           .is(":visible")
//       ) {
//         var i = $(this)
//           .parents("ul")
//           .first();
//         i
//           .find("ul:visible")
//           .slideUp(300)
//           .removeClass("menu-open"),
//           $(this)
//             .next()
//             .slideDown(300, function() {
//               $(this)
//                 .next()
//                 .addClass("menu-open"),
//                 i.find("li.active").removeClass("active"),
//                 $(this)
//                   .parent("li")
//                   .addClass("active");
//             });
//       }
//     });
//   }),
//   $.sidemenu($(".sidebar-menu")),
//   $("#togglebtn").on("click", function() {
//     $("body").removeClass("mini-sidebar"), $("body").addClass("mini-sidebar");
//   }),
//   $(".right-side-toggle").on("click", function() {
//     $("body").toggleClass("rmv-right-panel"),
//       $(".right-side-toggle i").toggleClass("ti-arrow-left");
//   }),
//   $(".floating-labels .form-control")
//     .on("focus blur", function(e) {
//       $(this)
//         .parents(".form-group")
//         .toggleClass("focused", "focus" === e.type || this.value.length > 0);
//     })
//     .trigger("blur"),
//   $(function() {
//     $('[data-toggle="tooltip"]').tooltip();
//   }),
//   $(function() {
//     $('[data-toggle="popover"]').popover();
//   }),
//   $(
//     ".mini-nav, .sidebar-menu, .right-side-panel, .message-center, .right-sidebar"
//   ).perfectScrollbar(),
//   $("body").trigger("resize"),
//   $(".list-task li label").on("click", function() {
//     $(this).toggleClass("task-done");
//   }),
//   $('a[data-action="collapse"]').on("click", function(e) {
//     e.preventDefault(),
//       $(this)
//         .closest(".card")
//         .find('[data-action="collapse"] i')
//         .toggleClass("ti-minus ti-plus"),
//       $(this)
//         .closest(".card")
//         .children(".card-body")
//         .collapse("toggle");
//   }),
//   $('a[data-action="expand"]').on("click", function(e) {
//     e.preventDefault(),
//       $(this)
//         .closest(".card")
//         .find('[data-action="expand"] i')
//         .toggleClass("mdi-arrow-expand mdi-arrow-compress"),
//       $(this)
//         .closest(".card")
//         .toggleClass("card-fullscreen");
//   }),
//   $('a[data-action="close"]').on("click", function() {
//     $(this)
//       .closest(".card")
//       .removeClass()
//       .slideUp("fast");
//   });
//   var i,
//     n = [
//       "skin-default",
//       "skin-green",
//       "skin-red",
//       "skin-blue",
//       "skin-purple",
//       "skin-megna",
//       "skin-default-dark",
//       "skin-green-dark",
//       "skin-red-dark",
//       "skin-blue-dark",
//       "skin-purple-dark",
//       "skin-megna-dark"
//     ];
//   function t(e) {
//     var i, t;
//     return (
//       $.each(n, function(e) {
//         $("body").removeClass(n[e]);
//       }),
//       $("body").addClass(e),
//       (i = "skin"),
//       (t = e),
//       "undefined" != typeof Storage
//         ? localStorage.setItem(i, t)
//         : window.alert(
//             "Please use a modern browser to properly view this template!"
//           ),
//       !1
//     );
//   }
//   (i = (function(e) {
//     if ("undefined" != typeof Storage) return localStorage.getItem(e);
//     window.alert("Please use a modern browser to properly view this template!");
//   })("skin")) &&
//     $.inArray(i, n) &&
//     t(i),
//     $("[data-skin]").on("click", function(e) {
//       $(this).hasClass("knob") || (e.preventDefault(), t($(this).data("skin")));
//     }),
//     $("#themecolors").on("click", "a", function() {
//       $("#themecolors li a").removeClass("working"),
//         $(this).addClass("working");
//     });
});
// }, 1000);
