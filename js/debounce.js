'use strict';

// debounce.js - модуль устранения "дребезга"
(function () {
  var DEBOUNCE_INTERVAL = 500; // ms

  var lastTimeout = null;

  var debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };

  window.debounce = debounce;
})();

