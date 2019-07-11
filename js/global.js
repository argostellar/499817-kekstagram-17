'use strict';

// global.js - глобальные константы и переменные
(function () {
  // перечисление кодов клавиатуры
  var KeyboardCode = {
    ESC: 27,
    ENTER: 13
  };
  // или сделать как в демке, не через объект, а отдельными переменными,
  // не свойствами объекта?
  // var ESC_KEYCODE = 27;
  // var ENTER_KEYCODE = 13;

  window.global = {
    ESC: KeyboardCode.ESC,
    ENTER: KeyboardCode.ENTER
  };

})();
