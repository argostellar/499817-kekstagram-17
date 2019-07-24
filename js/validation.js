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
      // console.log('Это удалённые: ' + removed);
    }
    // console.log(indexArray);
    // console.log('Текущий момент: ' + currentArray);
    return currentArray;
  };

  var validateHashtags = function () {
    var inputValue = hashtag.value;
    var separator = new RegExp(' ');
    var valuesArray = inputValue.split(separator);
    var copiedArray = valuesArray.map(function (item) {
      var newItem = item.toLowerCase();
      return newItem;
    });
    var clearArray = removeEmptyElement(copiedArray);
    // console.log('This is valuesArray: ' + valuesArray);
    // console.log(copiedArray);
    /*
    valuesArray.forEach(function (value) {
      checkHashtag(value);
    });
    */
    checkHashtag(clearArray);

  };

  var checkEqual = function (array, error) {
    for (var i = 0; i < array.length; i++) {
      var check = array.find(function (arrayItem) {
        var right = array[i + 1];
        var left = array[i - 1];
        if (right === arrayItem && left === arrayItem) {
          return true;
        }
        return false;
      });
      // console.log(check);
      if (check === true) {
        error = validationDict['no repeat'];
      }
    }
    return error;
  };

  var checkAmount = function (array, error) {
    if (array.length > 5) {
      error = validationDict['too many hashtags'];
      return error;
    }
    return error;
  };

  var checkLength = function (array, error) {
    array.forEach(function (arrayItem) {
      if (arrayItem.length > 20) {
        error = validationDict['too long'];
      }
      return error;
    });
    return error;
  };

  var checkHashtag = function (hashtagItems) {
    var validationError = null;
    var errorArray = [];
    errorArray[0] = checkAmount(hashtagItems, validationError);
    errorArray[1] = checkLength(hashtagItems, validationError);
    errorArray[2] = checkEqual(hashtagItems, validationError);
    // console.log(errorArray);
    var errorMessage = errorArray.join('');
    // console.log(errorMessage);
    hashtag.setCustomValidity(errorMessage);
  };

  var onSubmitValidate = function () {
    // evt.preventDefault();
    validateHashtags();
  };

  submit.addEventListener('click', onSubmitValidate);

})();
