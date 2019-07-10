'use strict';

// задание 7 - подробности -----------------------------------------------------------
(function () {
// фунция "снятия" класса hidden
var open = function (hiddenBlock) {
  hiddenBlock.classList.remove('hidden');
};

var close = function (block) {
  block.classList.add('hidden');
};

var Coordinate = function (x, y) {
  this.x = x;
  this.y = y;
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

var closeModal = function () {
  close(uploadForm);
  document.removeEventListener('keydown', onModalEscPress);
};

var onModalEscPress = function (evt) {
  if (evt.keyCode === KeyboardCode.ESC) {
    closeModal();
  }
};

// обработчик для закрытия окна на enter
var onModalEnterPress = function (evt) {
  if (evt.keyCode === KeyboardCode.ENTER) {
    closeModal();
  }
};

var onFieldFocus = function (evt) {
  if (evt.target === commentTextField || hashtag) {
    console.log(evt);
    document.removeEventListener('keydown', onModalEscPress);
  }
};

// можно ли сделать проверку на это условие?
// evt.tagName === textarea || input

var onFieldBlur = function (evt) {
  if (evt.target === commentTextField || hashtag) {
    document.addEventListener('keydown', onModalEscPress);
  }
};

})();
