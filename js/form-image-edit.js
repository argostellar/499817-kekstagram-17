'use strict';

// form-image-edit.js - модуль управления слайдером;
(function () {
  var scale = window.form.scale;
  var scaleValue = window.form.scaleValue;
  var scaleSmaller = scale.querySelector('.scale__control--smaller');
  var scaleBigger = scale.querySelector('.scale__control--bigger');

  var Value = window.form.Value;

  scaleValue.value = Value.BASIC + '%';

  var increaseValue = function () {
    var currentValue = parseInt(scaleValue.value, 10);
    if (currentValue < Value.MAX) {
      currentValue += Value.STEP;
      if (currentValue > Value.MAX) {
        currentValue = Value.MAX;
      }
    }
    scaleValue.value = currentValue + '%';
  };


  var decreaseValue = function () {
    var currentValue = parseInt(scaleValue.value, 10);
    if (currentValue > Value.MIN) {
      currentValue -= Value.STEP;
      if (currentValue < Value.MIN) {
        currentValue = Value.MIN;
      }
    }
    scaleValue.value = currentValue + '%';
  };

  var zoomImage = function () {
    window.form.previewImage.style.transform = 'scale(' + parseInt(scaleValue.value, 10) / 100 + ')';
  };

  var onButtonClick = function (evt) {
    if (evt.target === scaleSmaller) {
      decreaseValue();
      zoomImage();
    } else if (evt.target === scaleBigger) {
      increaseValue();
      zoomImage();
    }
  };

  scaleSmaller.addEventListener('click', onButtonClick);
  scaleBigger.addEventListener('click', onButtonClick);
})();
