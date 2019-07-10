'use strict';

// utility.js - универсальные утилитарные функции
(function () {
  window.utility = {
    open: open(),
    close: close(),
    // Coordinate: Coordinate(),
    closeModal: closeModal(),
    onModalEscPress: onModalEscPress(),
    onModalEnterPress: onModalEnterPress(),
    onFieldFocus: onFieldFocus(),
    onFieldBlur: onFieldBlur()
  };

  // задание 7 - подробности -----------------------------------------------------------
  // фунция "снятия" класса hidden

  var open = function (hiddenBlock) {
    hiddenBlock.classList.remove('hidden');
  };

  var close = function (block) {
    block.classList.add('hidden');
  };

  // как быть с конструктором? При импорте линтер ругается на заглавную букву
  /*
  var Coordinate = function (x, y) {
    this.x = x;
    this.y = y;
  };
  */

  // также возникает пробема с передачей параметра функции
  // раньше тут был uploadForm в close();
  var closeModal = function (block) {
    close(block);
    document.removeEventListener('keydown', onModalEscPress);
  };

  var onModalEscPress = function (evt) {
    if (evt.keyCode === window.global.ESC) {
      closeModal();
    }
  };

  // обработчик для закрытия окна на enter
  var onModalEnterPress = function (evt) {
    if (evt.keyCode === window.global.ENTER) {
      closeModal();
    }
  };

  var onFieldFocus = function (evt) {
    if (evt.tagName === 'textarea' || 'input') {
      document.removeEventListener('keydown', onModalEscPress);
    }
  };

  // можно ли делать проверку на это условие?
  // текущее условие: evt.tagName === textarea || input
  // старое условие: evt.target === commentTextField || hashtag

  var onFieldBlur = function (evt) {
    if (evt.tagName === 'textarea' || 'input') {
      document.addEventListener('keydown', onModalEscPress);
    }
  };

  /*

  var modalValuesDict = {
    'uploadCancel': 'uploadForm'
  };

  */

  /*

  var openModal = function () {
    open(uploadForm);
    document.addEventListener('keydown', onModalEscPress);
  };

  */

})();
