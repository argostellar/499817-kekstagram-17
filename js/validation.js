'use strict';

// validation.js - модуль, отвечающий за валидацию;
(function () {
  var upload = document.querySelector('.img-upload');
  var text = document.querySelector('.text');
  var commentTextField = text.querySelector('.text__description');
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

   var commentValidity = 'Комментарий не может быть больше 140 символов. ';

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

  var validateHashtags = function () {
    var inputValue = hashtag.value;
    inputValue = inputValue.toLowerCase();
    var separator = new RegExp('[ ]+');
    var valuesArray = inputValue.split(separator);
    var clearArray = removeEmptyElement(valuesArray);
    var errorMessage = checkEqual(clearArray);
    hashtag.setCustomValidity(errorMessage);
  };

  // Проверка на наличие одинаковых хэш-тегов: работает
  var checkEqual = function (array) {
    var error = '';
    var testArray = array.slice();
    for (var i = 0; i < array.length; i++) {
      var value = array[i];
      testArray.splice(0, 1);
      if (testArray.includes(value)) {
        error = validationDict['no repeat'];
      }
    }
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

  var onCommentValidate = function () {
    commentTextField.setCustomValidity(commentValidity);
  };

  commentTextField.addEventListener('invalid', onCommentValidate);
  submit.addEventListener('click', onSubmitValidate);
  hashtag.addEventListener('invalid', onHashtagValidate);

})();

