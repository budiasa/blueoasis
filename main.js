var accordion = (function(){

  var $accordion = $('.js-accordion');
  var $accordion_header = $accordion.find('.js-accordion-header');
  var $accordion_item = $('.js-accordion-item');

  // default settings
  var settings = {
    // animation speed
    speed: 400,

    // close all other accordion items if true
    oneOpen: false
  };

  return {
    // pass configurable object literal
    init: function($settings) {
      $accordion_header.on('click', function() {
        accordion.toggle($(this));
      });

      $.extend(settings, $settings);

      // ensure only one accordion is active if oneOpen is true
      if(settings.oneOpen && $('.js-accordion-item.active').length > 1) {
        $('.js-accordion-item.active:not(:first)').removeClass('active');
      }

      // reveal the active accordion bodies
      $('.js-accordion-item.active').find('> .js-accordion-body').show();
    },
    toggle: function($this) {

      if(settings.oneOpen && $this[0] != $this.closest('.js-accordion').find('> .js-accordion-item.active > .js-accordion-header')[0]) {
        $this.closest('.js-accordion')
               .find('> .js-accordion-item')
               .removeClass('active')
               .find('.js-accordion-body')
               .slideUp()
      }

      // show/hide the clicked accordion item
      $this.closest('.js-accordion-item').toggleClass('active');
      $this.next().stop().slideToggle(settings.speed);
    }
  }
})();

// video source https://www.videezy.com/random-objects/2313-electric-bulb-hd-stock-video

var container = document.getElementById('container');
var video = document.getElementById('video-background');


// Resize
function adapt() {
  var container_width = container.offsetWidth;
  var container_height = container.offsetHeight;

  video.style.height = "auto";
  video.style.width = container_width + "px";

  if(video.offsetHeight < container_height) {
    video.style.height = container_height + "px";
    video.style.width = "auto";
  }

  // 處理video置中位置
  video.style.top = (((video.offsetHeight - container_height) / 2 ) * -1) + 'px';
  video.style.left = (((video.offsetWidth - container_width) / 2 ) * -1) + 'px';
}

// events
window.addEventListener('load', adapt);
window.addEventListener('resize', adapt);

$(document).ready(function(){
  accordion.init({ speed: 300, oneOpen: true });
});
