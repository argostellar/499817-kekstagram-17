'use strict';

// debounce.js - модуль устранения "дребезга"
/*
(function () {
  var DEBOUNCE_INTERVAL = 500; // ms

  window.debounce = function () {
    window.global.isFilterReloadEnable = false;
    window.setTimeout(function () {
      window.global.isFilterReloadEnable = true;
    }, DEBOUNCE_INTERVAL);
  };
})();
*/
/*
(function () {
  var DEBOUNCE_INTERVAL = 300; // ms

  var lastTimeout;
  window.debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };
})();
*/


(function () {
  var DEBOUNCE_INTERVAL = 300; // ms

  window.debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      var onComplete = function () {
        cb.apply(null, parameters);
      };
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(onComplete, DEBOUNCE_INTERVAL);
    };
  };
})();

