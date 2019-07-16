'use strict';

// utility.js - универсальные утилитарные функции
(function () {
  // задание 7 - подробности -----------------------------------------------------------
  // фунция "снятия" класса hidden

  var open = function (hiddenBlock) {
    hiddenBlock.classList.remove('hidden');
  };

  var close = function (block) {
    block.classList.add('hidden');
  };

  window.utility = {
    open: open,
    close: close,
  };

})();
