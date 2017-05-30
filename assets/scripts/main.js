/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */
(function($) {
  var col = $(".col-item");
  //var pageHeader = $(".panel-banner");
  //var siteURL = MyAjax.site_url;
  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var Sage = {
    // All pages
    'common': {
      init: function() {
        // JavaScript to be fired on all pages
        console.log("common");
        //Equal Height
        function initGlobalfunc() {
          AOS.init({
            offset: 0,
            delay: 0,
            easing: 'ease',
            duration: 0,
            disable: 'mobile',
            once: true,
            startEvent: 'DOMContentLoaded'
          });
          //text styling
          /*
          $('.text-animate').textillate({
            loop: false,
            minDisplayTime: 2000,
            // type: 'word',
            in : {
              effect: 'fadeIn',
              delayScale: 0.5,
              delay: 0,
              sync: false,
            }
          });
          */
          // blazy
          $(".filter-work").click(function() {
            $(this).toggleClass("open");
          });
          var buttonFilter;
          // init Isotope
          var $grid = $('.grid').isotope({
            itemSelector: '.col-item',
            filter: function() {
              var $this = $(this);
              var buttonResult = buttonFilter ? $this.is(buttonFilter) : true;
              return buttonResult;
            }
          });
          // layout Isotope after each image loads
          $grid.imagesLoaded().progress(function() {
            $grid.isotope('layout');
          });
          $('#filters').on('click', 'button', function() {
            buttonFilter = $(this).attr('data-filter');
            $grid.isotope();
            bLazy.revalidate();
          });
          //aria-expanded
          // change is-checked class on buttons
          $('.button-group').each(function(i, buttonGroup) {
            var $buttonGroup = $(buttonGroup);
            $buttonGroup.on('click', 'button', function() {
              $buttonGroup.find('.is-checked').removeClass('is-checked');
              $(this).addClass('is-checked');
            });
          });
          // debounce so filtering doesn't happen every millisecond
          function debounce(fn, threshold) {
            var timeout;
            return function debounced() {
              if (timeout) {
                clearTimeout(timeout);
              }

              function delayed() {
                fn();
                timeout = null;
              }
              setTimeout(delayed, threshold || 100);
            };
          }
          var bLazy = new Blazy({
            success: function(ele) {
              // Image has loaded
            },
            error: function(ele, msg) {
              if (msg === 'missing') {
                // Data-src is missing
              } else if (msg === 'invalid') {
                // Data-src is invalid
              }
            }
          });
          //needed once pjax is on
          setTimeout(function() {
            bLazy.revalidate();
          }, 100);
          //show thumbnails when user is at top
          /*
            var bodyTop = $('body').offset().top;
            console.log(bodyTop);  
            
            $(window).on( 'load scroll', function(){
                console.log(bodyTop);
                
              
                  if ($(window).scrollTop() >= 100) {
                    
                        $('.barba-container').removeClass("_colors");
                       
                    } else {
                         $('.barba-container').addClass("_colors");
                    }
                });
                */
          if ($(".intro-content")[0]) {
            $('.sidebar').affix({
              offset: {
                top: $('.intro').offset().top - 20,
                bottom: $('footer').outerHeight() + 50
              }
            });
          }
        }
        initGlobalfunc();
        var lastElementClicked;
        Barba.Pjax.init();
        Barba.Prefetch.init();
        Barba.Dispatcher.on('linkClicked', function(el) {
          lastElementClicked = el;
        });
        var ExpandTransition = Barba.BaseTransition.extend({
          start: function() {
            this.originalThumb = lastElementClicked;
            //console.log(this);
            //home page promise only
            if (this.originalThumb.className === "intro-thumb") {
              // console.log("true");
              Promise.all([this.newContainerLoading, this.enlargeThumb(), this.scrollTop()]).then(this.showNewPage.bind(this));
            } else {
              //every other page
              // console.log("false");
              Promise.all([this.newContainerLoading, this.fadeOut(), this.scrollTop()]).then(this.fadeIn.bind(this));
            }
          },
          //Scrollto Top
          scrollTop: function() {
            var deferred = Barba.Utils.deferred();
            var obj = {
              y: window.pageYOffset
            };
            TweenLite.to(obj, 0.4, {
              y: 0,
              onUpdate: function() {
                if (obj.y === 0) {
                  deferred.resolve();
                }
                window.scroll(0, obj.y);
              },
              onComplete: function() {
                deferred.resolve();
              }
            });
            return deferred.promise;
          },
          fadeOut: function() {
            /**
             * this.oldContainer is the HTMLElement of the old Container
             */
            $(".brand-bg svg .st_logo").stop(true, true).delay(100).animate({
              opacity: 1
            }, 300);
            $("#barba-wrapper").addClass("is_active");
            //$(".js-ripple").addClass("is-active"); 
            return $(this.oldContainer).stop(true, true).delay(600).animate({
              opacity: 0
            }, 600).promise();
          },
          fadeIn: function() {
            /**
             * this.newContainer is the HTMLElement of the new Container
             * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
             * Please note, newContainer is available just after newContainerLoading is resolved!
             */
            $('.barba-container').addClass("_colors");
            var _this = this;
            var $el = $(this.newContainer);
            $(this.oldContainer).hide();
            $el.css({
              visibility: 'visible',
              opacity: 0
            });
            $el.stop(true, true).delay(300).animate({
              opacity: 1
            }, 300, function() {
              /**
               * Do not forget to call .done() as soon your transition is finished!
               * .done() will automatically remove from the DOM the old Container
               */
              //add class
              $("#barba-wrapper").removeClass("is_active");
              initGlobalfunc();
              _this.done();
              //$("#barba-wrapper").removeClass("is_animated");
            });
            $(".brand-bg svg .st_logo").stop(true, true).delay(300).animate({
              opacity: 0
            }, 300);
            $(".col-item a .project-bg").stop(true, true).delay(1000).animate({
              opacity: 0
            }, 300, function() {
              $('.barba-container').removeClass("_colors");
              $(this).css("opacity", "");
            });
          },
          //Home enlarge
          enlargeThumb: function() {
            var deferred = Barba.Utils.deferred();
            $("#barba-wrapper").addClass("is_animated");
            $(".brand-bg svg .st_logo").stop(true, true).delay(300).animate({
              opacity: 1
            }, 300);
            var thumbPosition = this.originalThumb.getBoundingClientRect();
            var colItem = $(this.originalThumb).closest('.col-item').find('.project-bg');
            // console.log(colItem.data("color"));
            var bgColor = colItem.data("color");
            //this.cloneThumb = this.originalThumb.cloneNode(true);
            this.cloneThumb = this.originalThumb.childNodes[3].cloneNode(true);
            // console.log(this.cloneThumb);
            var scrollTop = $(window).scrollTop(),
              elementOffset = $(colItem).offset().top,
              distance = (elementOffset - scrollTop);
            this.oldContainer.appendChild(this.cloneThumb);
            var animation = new TimelineMax({
              onComplete: selectNextElement
            });
            animation.to(colItem, 0.6, {
              opacity: "1",
              zIndex: "99",
              top: "-" + elementOffset + "px",
              bottom: "-100vh",
              ease: Power0.easeNone
            }).to(colItem, 0.6, {
              left: "-100vw",
              right: "-100vw",
              ease: Power0.easeNone
            });

            function selectNextElement() {
              deferred.resolve();
            }
            return deferred.promise;
          },
          showNewPage: function(bgColor) {
            // this.newContainer.style.visibility = 'visible';
            var _this = this;
            var $el = $(this.newContainer);
            var colItem = $(this.originalThumb).closest('.col-item').find('.project-bg');
            //console.log(colItem);
            var bgColor = colItem.data("color");
            //console.log(bgColor);
            //this.newContainer.style = bgColor;
            this.cloneThumb = this.originalThumb.childNodes[3].cloneNode(true);
            this.newContainer.appendChild(this.cloneThumb);
            var animation = new TimelineMax();
            animation.to(this.cloneThumb, 0, {
              top: "0",
              bottom: "0",
              left: "0",
              right: "0",
              position: "fixed"
            }).to(this.cloneThumb, 0.8, {
              opacity: "0",
              ease: Power0.easeNone
            }).to(this.cloneThumb, 0, {
              zIndex: "-1",
              width: "100%",
              height: "0",
              ease: Power0.easeNone
            });
            //when finished	
            $el.stop(true, true).delay(200).animate({
              opacity: 1
            }, 200, function() {
              initGlobalfunc();
            });
            $(".brand-bg svg .st_logo").stop(true, true).delay(300).animate({
              opacity: 0
            }, 300, function() {
              $("#barba-wrapper").removeClass("is_animated");
            });
            this.done();
            //
          }
        });
        //if user coming form home
        var ShrinkTransition = Barba.BaseTransition.extend({
          start: function() {
            //this.newContainerLoading.then(this.shrinkImage.bind(this));
            Promise.all([this.newContainerLoading, this.scrollTop()]).then(this.shrinkImage.bind(this));
          },
          //Scrollto Top
          scrollTop: function() {
            var deferred = Barba.Utils.deferred();
            var obj = {
              y: window.pageYOffset
            };
            TweenLite.to(obj, 0.4, {
              y: 0,
              onUpdate: function() {
                if (obj.y === 0) {
                  deferred.resolve();
                }
                window.scroll(0, obj.y);
              },
              onComplete: function() {
                deferred.resolve();
              }
            });
            return deferred.promise;
          },
          shrinkImage: function() {
            var _this = this;
            // this.oldContainer.style.zIndex = '10';
            /* 
            $(this.oldContainer).stop(true, true).animate({
              opacity: 0
            }, 300);
            */
            $("#barba-wrapper").addClass("is_animated");
            $("#barba-wrapper").addClass("is_active");
            $(".brand-bg svg .st_logo").stop(true, true).animate({
              opacity: 1
            }, 300);
            console.log("hello there");
            //this.newContainer.style.visibility = 'visible';
            var href = Barba.HistoryManager.prevStatus().url.split('/').pop();
            //var destThumb = this.newContainer.querySelector('a[href="' + href + '"]');
            // var destThumbPosition = destThumb.getBoundingClientRect();
            var fullImage = this.oldContainer.querySelector('.project-bg');
            if (fullImage) {
              //TweenLite.to($rsContent, 0.4, {opacity:"0.10", delay:0.5, ease:Power2.easeOut});  
              var animation = new TimelineMax({
                onComplete: goBack
              });
              animation.to(fullImage, 0.6, {
                opacity: "1",
                zIndex: "990",
                top: "0",
                bottom: "0",
                left: "0",
                right: "0",
                width: "100%",
                height: "100%",
                ease: Power0.easeNone
              }).to(fullImage, 0.6, {
                delay: "0.1",
                left: "-100%",
                ease: Power0.easeNone
              });

              function goBack() {
                _this.done();
                initGlobalfunc();
                $("#barba-wrapper").removeClass("is_active");
                $(".brand-bg svg .st_logo").stop(true, true).animate({
                  opacity: 0
                }, 300, function() {
                  $("#barba-wrapper").removeClass("is_animated");
                });
              }
            } else {
              _this.done();
              initGlobalfunc();
              $("#barba-wrapper").removeClass("is_active");
              $(".brand-bg svg .st_logo").stop(true, true).animate({
                opacity: 0
              }, 300, function() {
                $("#barba-wrapper").removeClass("is_animated");
              });
            }
          }
        });
        Barba.Pjax.getTransition = function() {
          var transitionObj = ExpandTransition;
          // console.log(Barba.HistoryManager.prevStatus().namespace);
          if (Barba.HistoryManager.prevStatus().namespace === 'projects single-projects') {
            // console.log(Barba.HistoryManager.prevStatus().namespace);
            transitionObj = ShrinkTransition;
            //console.log("projects transition out?")
          }
          return transitionObj;
        };
        //end
      },
      finalize: function() {
        // JavaScript to be fired on all pages, after page specific JS is fired
      }
    },
    // Home page
    'home': {
      init: function() {
        // JavaScript to be fired on the home page
        console.log("home");
        //add class on project hover
        /*
        $('.col-item > .thumbnail').hover(function() {
          $('body').addClass('_active');
        }, function() {
          $('body').removeClass('_active');
        });
		*/
      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
      }
    },
    'single_projects': {
      init: function() {
        console.log("single projects")
      }
    },
    // work  page
    'work': {
      init: function() {
        // JavaScript to be fired on the about us page
        console.log("work");
      }
    },
    // contact page
    'contact': {
      init: function() {
        // JavaScript to be fired on the contact page
        console.log("contact");
        $('.form-container input').click(function() {
          if ($(this).is(':focus')) {
            $('body').addClass('show-form-overlay');
          }
        });
        $('.form-overlay').click(function() {
          $('body').removeClass('show-form-overlay');
          return false;
        });
        //conact form
        $("#contactForm").validator().on("submit", function(event) {
          if (event.isDefaultPrevented()) {
            // handle the invalid form...
            formError();
            submitMSG(false, "Did you fill out the form properly?");
          } else {
            // everything looks good!
            event.preventDefault();
            submitForm();
          }
        });

        function submitForm() {
          // Initiate Variables With Form Content
          var data = {
            "name": $("#name").val(),
            "email": $("#email").val(),
            "message": $("#message").val(),
            "url": $("#url").val(),
            "action": "submit"
          }
          data = $(this).serialize() + "&" + $.param(data);
          $.ajax({
            type: "POST",
            url: "/wp-content/themes/frh/lib/form-process.php",
            data: data,
            success: function(text) {
              if (text == "success") {
                formSuccess();
              } else {
                formError();
                submitMSG(false, text);
              }
            }
          });
        }

        function formSuccess() {
          launchform();
          $("#contactForm")[0].reset();
          submitMSG(true, "")
        }

        function formError() {
          $("#contactForm").removeClass().addClass('no_good').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass('no_good');
          });
        }

        function submitMSG(valid, msg) {
          if (valid) {
            var msgClasses = "h4 text-left animated text-success";
          } else {
            var msgClasses = "h4 text-left text-danger";
          }
          $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
        }
        //end form
        /* 
        $('#activateForm').click(function() {
            $('#supaForm').addClass('formActive');
            $('#step1').addClass('stepOn');
            $('#step1 input').focus();
            return false
          });
          
          $('#step1 .nextArrow').click(function() {
            $('#step1').addClass('stepOff');
            $('#step2').addClass('stepOn');
            $('#step2 input').focus();
            $('hr').addClass('quarter');
          });
          $('#step2 .nextArrow').click(function() {
            $('#step2').addClass('stepOff');
            $('#step3').addClass('stepOn');
            $('#step3 textarea').focus();
            $('#supaForm').addClass('messageStep');
            $('.firstTitle').attr('id', 'removeTitle');
            $('.secondTitle').addClass('addTitle');
            $('.subtitle').attr('id', 'removeTitle');
            $('.secondSubtitle').addClass('addSubtitle');
            $('hr').addClass('threeQuarters');
          });
          
          */
        function launchform() {
          console.log("launch!");
          $('#contactForm').addClass('messageAway');
          $('.secondTitle').attr('id', 'removeTitle');
          $('.thirdTitle').addClass('addTitleThird');
          $('.secondSubtitle').attr('id', 'removeTitle');
          $('hr').addClass('full');
          $('.rocketContainer').addClass('liftOff');
          $('.skyBG').attr('id', 'activeSky');
          $('.clouds').attr('id', 'activeClouds');
        }
        /*
         
         
         // enter key for next step
         jQuery(document).on('keydown', '#step1 input', function(ev) {
           if (ev.which === 13) {
             // Will change backgroundColor to blue as example
             $('#step1').addClass('stepOff');
             $('#step2').addClass('stepOn');
             $('#step2 input').focus();
             $('hr').addClass('quarter');
             // Avoid form submit
             return false;
           }
         })
         
       
         
         jQuery(document).on('keydown', '#step2 input', function(ev) {
             if (ev.which === 13) {
               // Will change backgroundColor to blue as example
               $('#step2').addClass('stepOff');
               $('#step3').addClass('stepOn');
               $('#step3 textarea').focus();
               $('#contactForm').addClass('messageStep');
               $('.firstTitle').attr('id', 'removeTitle');
               $('.secondTitle').addClass('addTitle');
               $('.subtitle').attr('id', 'removeTitle');
               $('.secondSubtitle').addClass('addSubtitle');
               $('hr').addClass('threeQuarters');
               // Avoid form submit
               return false;
             }
           })
           // input focus on next steps
         $('#step1 .inputText').keyup(function() {
           var searchQuery = $(this).val();
           if (searchQuery === '') {
             $('#step1 .nextArrow').removeClass('displayBlock');
           } else {
             $('#step1 .nextArrow').addClass('displayBlock');
           };
         });
         $('#step2 .inputText').keyup(function() {
           var searchQuery = $(this).val();
           if (searchQuery === '') {
             $('#step2 .nextArrow').removeClass('displayBlock');
           } else {
             $('#step2 .nextArrow').addClass('displayBlock');
           };
         });
         $('#step3 textarea').keyup(function() {
           var searchQuery = $(this).val();
           if (searchQuery === '') {
             $('#step3 .nextArrow').removeClass('displayBlock');
           } else {
             $('#step3 .nextArrow').addClass('displayBlock');
           };
         });
         
         */
      }
    },
  };
  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var fire;
      var namespace = Sage;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';
      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      // Fire common init JS
      UTIL.fire('common');
      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });
      $(function() {
        function myInit() {
          // Initialize sliders and stuff in here.
        }
        // Call myInit when document is ready.
        myInit();
        // Call myInit again after each AJAX load.
        Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container, newPageRawHTML, HTMLElementContainer) {
          var currentPage = currentStatus.namespace;
          // console.log(currentPage);
          myInit();
          document.body.className = currentPage;
          //const link = currentStatus.url.split(window.location.origin)[1].substring(1);
          const link = currentStatus.url.split(window.location.origin)[1].substring(1); // get path of current page
          //console.log("just url " +currentStatus.url);
          //console.log("namespace"+currentStatus.namespace);
          //console.log("going to url " +currentStatus.url.split(window.location.origin)[1].substring(1));
          //console.log(currentStatus);
          const navigation = document.querySelector('.nav-primary');
          const navigationLinks = navigation.querySelectorAll('.menu-item');
          const navigationLinkIsActive = navigation.querySelector("li");
          $('.nav-primary').find('.active').removeClass('active');
          $('.nav-primary').find('.menu-' + currentPage).addClass('active');
          //console.log(navigationLinkIsActive);
          /*
          for (var i = navigationLinks.length - 1; i >= 0; i--) {
            if (navigationLinks[i].href==document.URL) {
                navigationLinks[i].setAttribute("class", "active");
            }
            };
            */
          //Array.prototype.forEach.call(navigationLinks, (navigationLink) => navigationLink.classList.remove('active')); // remove CSS class 'is-active' from all .navigation__links
          //navigationLinkIsActive.classList.add('active');
          $.each(currentPage.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
            UTIL.fire(classnm);
            UTIL.fire(classnm, 'finalize');
          });
        });
      });
      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    }
  };
  // Load Events
  $(document).ready(UTIL.loadEvents);
})(jQuery); // Fully reference jQuery after this point.
jQuery(document).ready(function() {
  if (jQuery("body").hasClass("home")) {
    //jQuery("#barba-wrapper").fadeOut();
    //start loader
    // jQuery("body").prepend("<div id='preloader'><div id='status'><div id='icons'></div></div></div>");
    jQuery('.barba-container').addClass("_colors");

    function ShowPageContent() {
      if (window.data.loaded) {
        // window loaded and animation complete, show page contents now
        jQuery('#status').fadeOut();
        jQuery('#preloader').delay(250).fadeOut('slow');
        jQuery('body').delay(250).fadeIn(500);
        jQuery(".col-item a .project-bg").stop(true, true).delay(1000).animate({
          opacity: 0
        }, 300, function() {
          jQuery('.barba-container').removeClass("_colors");
          jQuery(this).css("opacity", "");
        });
        //console.log("hello");
        // jQuery("#barba-wrapper").fadeIn();
      } else {
        // animation completed, but window not yet loaded; poll for loaded flag
        var waitLoopMs = 50;
        setTimeout(ShowPageContent, waitLoopMs);
      }
    }
    window.data = {
      loaded: false
    };
    jQuery(window).load(function() {
      window.data.loaded = true;
    });
    var pathObj = {
      "icons": {
        "strokepath": [
          {
            "path": "M99.224,180.362v4.245c46.623-1.108,84.342-38.827,85.45-85.45h-4.245  C179.319,143.449,143.516,179.253,99.224,180.362z",
            "duration": 200
            },
          {
            "path": "M99.224,9.489v4.245c44.292,1.109,80.095,36.913,81.204,81.204h4.245  C183.566,48.316,145.847,10.597,99.224,9.489z",
            "duration": 200
            },
          {
            "path": "M13.803,99.158H9.558c1.108,46.623,38.826,84.342,85.448,85.45v-4.245  C50.715,179.253,14.912,143.449,13.803,99.158z",
            "duration": 200
            },
          {
            "path": "M95.005,13.735V9.489c-46.622,1.108-84.34,38.827-85.448,85.45h4.245  C14.912,50.647,50.715,14.844,95.005,13.735z",
            "duration": 200
            },
          {
            "path": "M99.224,189.159v4.219c51.459-1.111,93.109-42.762,94.22-94.22h-4.219  C188.116,148.29,148.357,188.05,99.224,189.159z",
            "duration": 200
            },
          {
            "path": "M5.006,99.158H0.787c1.111,51.459,42.761,93.109,94.218,94.22v-4.219  C45.874,188.05,6.115,148.29,5.006,99.158z",
            "duration": 200
            },
          {
            "path": "M189.226,94.939h4.219c-1.111-51.46-42.762-93.111-94.22-94.222v4.219  C148.357,6.045,188.116,45.805,189.226,94.939z",
            "duration": 200
            },
          {
            "path": "M95.005,4.935V0.717C43.548,1.828,1.898,43.479,0.787,94.939h4.219C6.115,45.805,45.874,6.045,95.005,4.935z  ",
            "duration": 200
            },
          {
            "path": "M95.005,22.666v-4.219c-41.694,1.108-75.386,34.8-76.492,76.492h4.219  C23.836,55.572,55.637,23.771,95.005,22.666z",
            "duration": 200
            },
          {
            "path": "M22.732,99.158h-4.219c1.107,41.692,34.799,75.384,76.492,76.492v-4.219  C55.637,170.326,23.836,138.525,22.732,99.158z",
            "duration": 200
            },

          {
            "path": "M99.224,171.431v4.219c41.694-1.105,75.389-34.798,76.495-76.492h-4.219  C170.397,138.527,138.594,170.329,99.224,171.431z",
            "duration": 200
            },
          {
            "path": "M171.501,94.939h4.219c-1.107-41.694-34.801-75.387-76.495-76.492v4.219  C138.593,23.768,170.397,55.57,171.501,94.939z",
            "duration": 200
            },
          {
            "path": "M45.63,51.319h41.178v13.973H60.717v22.877h26.091v13.973H60.717v40.683H45.63V51.319z",
            "duration": 200
            },
          {
            "path": "M91.114,142.826V51.319H106.2v37.097h26.339V51.319h15.086v91.506h-15.086v-40.56H106.2v40.56H91.114z",
            "duration": 200
            }
        ],
        "dimensions": {
          "width": 195,
          "height": 195
        }
      }
    };
    /* 
     Setup and Paint your lazyline! 
     */
    jQuery('#icons').lazylinepainter({
      "svgData": pathObj,
      "strokeWidth": 1,
      "strokeColor": "#0275d8",
      "onComplete": ShowPageContent,
    }).lazylinepainter('paint');
    //remove
    var loadDelayMs = 3000; // minimum delay (5.1 sec, based on sum of your durations, above)
    //setTimeout(ShowPageContent, loadDelayMs);
    //end
  }
});