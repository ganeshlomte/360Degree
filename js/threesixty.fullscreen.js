/*global $, window, CanvasLoader, jQuery, alert, requestAnimationFrame, cancelAnimationFrame */
/*jslint browser:true, devel:true */

/*!
 * 360 degree Image Slider Fullscreen plugin v1.0.0
 * http://gaurav.jassal.me/lab
 *
 * Copyright 2013, gaurav@jassal.me
 * Dual licensed under the MIT or GPL Version 3 licenses.
 *
 */


(function($) {
  "use strict";
  $.ThreeSixtyFullscreen = function (el, options) {
    var plugin = this,
      $el = el,
      opts = options,
      $button = $('<a href="#">Fullscreen</a>'),
      isFullscreen = false;

    // Attach event to the plugin
    $button.bind('click', function(event) {
      plugin.onClickHandler.apply(this, event);
    });

    /**
     * Set styles for the plugin interface.
     * @return {Object} this
     */
    plugin.setStyles = function() {
      $button.css({
        'z-index': 12,
        'display': 'block',
        'position': 'absolute',
        'background': 'url(assets/fs.png) no-repeat',
        'width': '20px',
        'height': '20px',
        'text-indent': '-99999px',
        'right': '5px',
        'bottom': '50px',
        'background-position': '0px -20px'
      });
      return this;
    };

    /**
     * Initilize the fullscreen plugin
     * @param  {Object} opt override options
     */
    plugin.init = function() {
      plugin.setStyles();
      $el.prepend($button);
    };

    plugin.onClickHandler = function(e) {
      var elem;
      if(typeof $el.attr('id') !== 'undefined') {
        elem = document.getElementById($el.attr('id'));
      } else if(typeof $el.parent().attr('id') !== 'undefined'){
        elem = document.getElementById($el.parent().attr('id'));
      } else {
        return false;
      }

      plugin.toggleFullscreen(elem);
    };

    plugin.toggleButton = function () {
      if(isFullscreen) {
        $button.css({
          'background-position': '0px 0px'
        });
      } else {
        $button.css({
          'background-position': '0px -20px'
        });
      }
    };

    plugin.toggleFullscreen = function (elem) {
      if(isFullscreen) {
        plugin.cancelfullscreen(elem);
        isFullscreen = false;
      } else {
        plugin.fullscreen(elem);
        isFullscreen = true;
      }
      plugin.toggleButton();
    };

    plugin.fullscreen = function (elem) {
      if (!document.mozFullScreen && !document.webkitFullScreen) {
        if (elem.mozRequestFullScreen) {
          elem.mozRequestFullScreen();
        } else {
          elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
      } else {
        if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else {
          document.webkitCancelFullScreen();
        }
      }
    };

    plugin.cancelfullscreen = function (elem) {
      if(document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if(document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    };

    // Esc code start here
    document.addEventListener('fullscreenchange', escExitHandler);
    document.addEventListener('webkitfullscreenchange', escExitHandler);
    document.addEventListener('mozfullscreenchange', escExitHandler);
    document.addEventListener('MSFullscreenChange', escExitHandler);
    function escExitHandler() {
        if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            isFullscreen = false;
            $button.css({
              'background-position': '0px -20px'
            });
        }
    };

    plugin.init();
  };
}(jQuery));
