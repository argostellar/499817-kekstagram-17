'use strict';

// global.js - глобальные константы и переменные
(function () {
  // перечисление кодов клавиатуры
  var KeyboardCode = {
    ESC: 27,
    ENTER: 13
  };

  var effectsStats = {
    'chrome': {
      currentEffect: 'grayscale',
      convertedValue: 0.01,
      bottomValue: 0,
      topValue: 1,
      unitsOfMeasure: ''
    },
    'sepia': {
      currentEffect: 'sepia',
      convertedValue: 0.01,
      bottomValue: 0,
      topValue: 1,
      unitsOfMeasure: ''
    },
    'marvin': {
      currentEffect: 'invert',
      convertedValue: 1,
      bottomValue: 0,
      topValue: 100,
      unitsOfMeasure: '%'
    },
    'phobos': {
      currentEffect: 'blur',
      convertedValue: 0.03,
      bottomValue: 0,
      topValue: 3,
      unitsOfMeasure: 'px'
    },
    'heat': {
      currentEffect: 'brightness',
      convertedValue: 0.02,
      bottomValue: 1,
      topValue: 3,
      unitsOfMeasure: ''
    },
    'none': {
      currentEffect: '',
      convertedValue: 0,
      bottomValue: 0,
      topValue: 0,
      unitsOfMeasure: ''
    }
  };

  var isFilterReloadEnable = true;
  // или сделать как в демке, не через объект, а отдельными переменными,
  // не свойствами объекта?
  // var ESC_KEYCODE = 27;
  // var ENTER_KEYCODE = 13;

  window.global = {
    ESC: KeyboardCode.ESC,
    ENTER: KeyboardCode.ENTER,
    effectsStats: effectsStats,
    isFilterReloadEnable: isFilterReloadEnable
  };

})();
