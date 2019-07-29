'use strict';

// form-slider.js - модуль управления слайдером;
(function () {
  var effectsList = window.form.upload.querySelector('.effects__list');
  var previewImage = window.form.previewImage;

  var applyEffect = function (effectValue) {
    effectLevel.classList.remove('hidden');
    previewImage.removeAttribute('class');
    previewImage.style.filter = '';
    previewImage.classList.add('effects__preview--' + effectValue);
    if (effectValue === 'none') {
      previewImage.removeAttribute('class');
      effectLevel.classList.add('hidden');
    }
    setPinDefaultPosition();
  };

  var onRadioClick = function (evt) {
    applyEffect(evt.target.value);
  };

  effectsList.addEventListener('click', onRadioClick);
  var getCurrentRadio = function () {
    var current = effectsList.querySelector('input:checked');
    return current;
  };

  var Coordinate = function (x, y) {
    this.x = x;
    this.y = y;
  };

  var effectLevel = window.form.effectLevel;
  var slider = effectLevel.querySelector('.effect-level__line');
  var depth = effectLevel.querySelector('.effect-level__depth');
  var pin = effectLevel.querySelector('.effect-level__pin');

  var SliderStats = {
    WIDTH: 0,
    LEFT: 0,
    RIGHT: 0
  };

  var getSliderStats = function () {
    var stats = {};
    stats.width = slider.offsetWidth;
    stats.left = 0;
    stats.right = slider.offsetWidth;
    return stats;
  };

  var updateSliderStats = function () {
    SliderStats.WIDTH = getSliderStats().width;
    SliderStats.LEFT = getSliderStats().left;
    SliderStats.RIGHT = getSliderStats().right;
  };

  var calculateChangeValue = function () {
    var value = 0;
    var pinCurrentLoc = pin.offsetLeft;
    // пропорция определения величины
    value = (100 * pinCurrentLoc) / (SliderStats.WIDTH);
    // в итоге, функция должна вернуть значение изменения пина
    return value;
  };


  var changeLevel = function (effect, effectValue) {
    var currentEffect = '';
    var changeValue = 0;
    var convertedValue = 0;
    var bottomValue = 0;
    var topValue = 0;
    var currentUnits = 0;

    previewImage.style.filter = '';

    currentEffect = window.global.effectsStats[effect].currentEffect;
    convertedValue = window.global.effectsStats[effect].convertedValue;
    bottomValue = window.global.effectsStats[effect].bottomValue;
    topValue = window.global.effectsStats[effect].topValue;
    currentUnits = window.global.effectsStats[effect].unitsOfMeasure;

    changeValue = bottomValue + effectValue * convertedValue;

    if (changeValue > topValue) {
      changeValue = topValue;
    }
    if (changeValue < bottomValue) {
      changeValue = bottomValue;
    }

    previewImage.style.filter = currentEffect + '(' + changeValue + currentUnits + ')';
  };

  pin.addEventListener('mousedown', function (evt) {
    var startCoords = new Coordinate(evt.clientX);
    var onPinMouseMove = function (moveEvt) {
      var changedCoords = new Coordinate(moveEvt.clientX);
      var shift = {
        x: startCoords.x - changedCoords.x
      };
      startCoords = new Coordinate(moveEvt.clientX);
      var position = pin.offsetLeft - shift.x;
      if (position > SliderStats.RIGHT) {
        position = SliderStats.RIGHT;
      }
      if (position < SliderStats.LEFT) {
        position = SliderStats.LEFT;
      }
      var positionPercent = (position / SliderStats.WIDTH) * 100;
      pin.style.left = position + 'px';
      depth.style.width = positionPercent + '%';
      changeLevel(getCurrentRadio().value, calculateChangeValue());
    };
    var onPinMouseUp = function () {
      changeLevel(getCurrentRadio().value, calculateChangeValue());
      document.removeEventListener('mousemove', onPinMouseMove);
      document.removeEventListener('mouseup', onPinMouseUp);
    };
    document.addEventListener('mousemove', onPinMouseMove);
    document.addEventListener('mouseup', onPinMouseUp);
  });


  var setPinDefaultPosition = function () {
    updateSliderStats();
    var maxPinPosition = SliderStats.WIDTH + 'px';
    pin.style.left = maxPinPosition;
    depth.style.width = '100%';
  };

  var resetRadio = function () {
    var activeRadio = getCurrentRadio();
    if (activeRadio) {
      activeRadio.checked = false;
    }
  };

  var setDefaultConditions = function () {
    // перемещение пина на максимальное значение
    setPinDefaultPosition();
    effectLevel.classList.add('hidden');
  };

  var resetConditions = function () {
    window.form.uploadControl.value = '';
    window.form.scaleValue.value = window.form.basicScaleValue;
    previewImage.style.transform = 'scale(1)';
    previewImage.style.filter = '';
    previewImage.removeAttribute('class');
    setPinDefaultPosition();
  };


  window.slider = {
    setDefaultConditions: setDefaultConditions,
    resetConditions: resetConditions,
    resetRadio: resetRadio
  };
})();
