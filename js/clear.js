'use strict';

// clear.js - модуль отчистки фотографий
(function () {
  var picturesBlock = document.querySelector('.pictures');

  var clear = function () {
    var picturesCollection = picturesBlock.querySelectorAll('.picture');
    var picturesArray = Array.from(picturesCollection);
    picturesArray.forEach(function (it) {
      picturesBlock.removeChild(it);
    });
  };

  window.clear = clear;

})();
