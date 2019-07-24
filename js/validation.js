'use strict';

// validation.js - модуль, отвечающий за валидацию;
(function () {
  var upload = document.querySelector('.img-upload');
  var text = document.querySelector('.text');
  // var commentTextField = text.querySelector('.text__description');
  var hashtag = text.querySelector('.text__hashtags');
  var submit = upload.querySelector('.img-upload__submit');

  var validationDict = {
    'no #-sign': 'Отсутсвует решётка перед хэш-тегом. Хэш-тег начинается с символа # (решётка). ',
    'no content': 'Хеш-тег не может состоять только из одной решётки. ',
    'no spacing': 'Отсутсвует разделение пробелом. Хэш-теги разделяются пробелами. ',
    'no repeat': 'Один и тот же хэш-тег не может быть использован дважды. ',
    'too many hashtags': 'Нельзя указывать больше пяти хэш-тегов. ',
    'too long': 'Слишком длинный хэш-тег. Максимальная длина одного хэш-тега 20 символов, включая решётку. ',
    'register free': 'Теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом. '
  };

  var validationRules = 'Хэш-тег начинается с символа # (решётка).\n' +
   'Хеш-тег не может состоять только из одной решётки. \n' +
   'Хэш-теги разделяются пробелами. \n' +
   'Один и тот же хэш-тег не может быть использован дважды. \n' +
   'Нельзя указывать больше пяти хэш-тегов. \n' +
   'Максимальная длина одного хэш-тега 20 символов, включая решётку. \n' +
   'Теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом. ';

  var sortEmptyElements = function (element) {
    var identifier = 0;
    if (element === '') {
      identifier = -1;
    }
    return identifier;
  };

  var removeEmptyElement = function (array) {
    var currentArray = array;
    var isEmpty = currentArray.includes('');
    if (isEmpty === true) {
      currentArray = currentArray.sort(function (item) {
        return sortEmptyElements(item);
      });
      var indexArray = [];
      for (var i = 0; i < currentArray.length; i++) {
        if (currentArray[i] === '') {
          indexArray[i] = i;
        }
      }
      for (var j = 0; j < indexArray.length; j++) {
        currentArray.splice(indexArray[j], 1);

      }
    }
    return currentArray;
  };

  /*
  var checkUniversal = function (string, separator) {
    var array = string.split(separator);
  };
  */

  var validateHashtags = function () {
    // Получаем значение формы в виде строки
    var inputValue = hashtag.value;
    // Приводим значение строки к нижнему регистру
    inputValue = inputValue.toLowerCase();
    // console.log(inputValue);
    // Заводим "разделитель" в виде пробела (или любого количества пробелов)
    var separator = new RegExp('[ ]+');
    var valuesArray = inputValue.split(separator);
    var clearArray = removeEmptyElement(valuesArray);
    // console.log(valuesArray);
    // console.log('This is valuesArray: ' + valuesArray);
    // console.log(clearArray);
    var errorMessage = checkEqual(clearArray);
    hashtag.setCustomValidity(errorMessage);

  };

  // Проверка на наличие одинаковых хэш-тегов: не работает
  var checkEqual = function (array) {
    var error = '';
    var testArray = array.slice();
    // console.log(array);
    for (var i = 0; i < array.length; i++) {
      // console.log('Начало проверки. Текущий индекс: ' + i);
      var value = array[i];
      /* var removed = */
      testArray.splice(0, 1);
      // console.log('REMOVED: ' + removed);
      // console.log('THIS IS VALUE: ' + value);
      // console.log('Это тест: ' + testArray);
      if (testArray.includes(value)) {
        error = validationDict['no repeat'];
        // console.log('RED ALERT!!!');
      } /* else {console.log('CHECKED')} */
    }
    // console.log('ERROR: ' + error);
    return error;
  };

  var onSubmitValidate = function () {
    // evt.preventDefault();
    validateHashtags();
  };

  var onHashtagValidate = function () {
    // validateHashtags();
    hashtag.setCustomValidity(validationRules);
  };

  submit.addEventListener('click', onSubmitValidate);
  hashtag.addEventListener('invalid', onHashtagValidate);

})();
