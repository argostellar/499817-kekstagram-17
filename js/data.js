'use strict';

// data.js - модуль, который создаёт данные;
(function () {


  // серверное взаимодействие -------------------------------------

  var onLoadSuccess = function (photos) {
    window.render(photos);
  };

  var onLoadError = function (errorMessage) {
    window.utility.createMessage('red', errorMessage);
  };

  window.server.load(onLoadSuccess, onLoadError);

})();
