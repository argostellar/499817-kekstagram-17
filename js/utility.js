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

  var getRandomElement = function (array) {
    var randomElementIndex = Math.floor(Math.random() * array.length);
    return array[randomElementIndex];
  };

  var getRandomNumber = function () {
    var randomNumber = Math.floor(Math.random() * 25);
    return randomNumber;
  };

  var compareValues = function (left, right) {
    var currentValue = 0;
    if (left > right) {
      currentValue = -1;
    } else if (left < right) {
      currentValue = 1;
    } else if (left === right) {
      currentValue = 0;
    }
    return currentValue;
  };

  var createMessage = function (message) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; outline: 2px solid white; text-align: center; background-color: rbga(255, 0, 0, 0.8);';
    node.style.position = 'fixed';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);

    node.addEventListener('click', function () {
      node.classList.add('hidden');
    });
  };

  window.utility = {
    open: open,
    close: close,
    getRandomElement: getRandomElement,
    getRandomNumber: getRandomNumber,
    createMessage: createMessage,
    compareValues: compareValues
  };

})();
