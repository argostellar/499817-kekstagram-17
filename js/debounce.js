'use strict';

// debounce.js - модуль устранения "дребезга"
(function () {
  var DEBOUNCE_INTERVAL = 500; // ms

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

