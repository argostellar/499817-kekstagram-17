'use strict';

// clear.js - модуль отчистки фотографий
(function () {
  var picturesBlock = document.querySelector('.pictures');

  var clear = function () {
    var picturesCollection = picturesBlock.querySelectorAll('.picture');
    var pictures = Array.from(picturesCollection);
    pictures.forEach(function (it) {
      picturesBlock.removeChild(it);
    });
  };

  window.clear = clear;

})();
