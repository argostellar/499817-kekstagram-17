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
  /*

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
  // текущее условие: evt.tagName === 'textarea' || evt.tagName === 'input'
  // старое условие: evt.target === commentTextField || evt.target === hashtag

  var onFieldBlur = function (evt) {
    if (evt.tagName === 'textarea' || 'input') {
      document.addEventListener('keydown', onModalEscPress);
    }
  };
  */

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
  window.utility = {
    open: open,
    close: close,
    // closeModal: closeModal,
    // onModalEscPress: onModalEscPress,
    // onModalEnterPress: onModalEnterPress,
    // onFieldFocus: onFieldFocus,
    // onFieldBlur: onFieldBlur
  };

})();
