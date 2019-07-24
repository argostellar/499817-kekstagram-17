'use strict';

// form.js - работа с формой загрузки изображения (фильтры эффектов, хэштеги, комментарий)
// модуль, который работает с формой редактирования изображения.
(function () {
  var upload = document.querySelector('.img-upload');
  var uploadControl = upload.querySelector('#upload-file');
  var uploadForm = upload.querySelector('.img-upload__overlay');

  // правильно ли реализована эта функция? А именно проверка условия
  var onUploadChange = function (evt) {
    if (evt.value !== 0) {
      window.utility.open(uploadForm);
      setDefaultConditions();
      document.addEventListener('keydown', onModalEscPress);
    }
  };

  var setPinDefaultPosition = function () {
    updateSliderStats();
    var maxPinPosition = SliderStats.WIDTH + 'px';
    pin.style.left = maxPinPosition;
    depth.style.width = '100%';
  };

  var setDefaultConditions = function () {
    // перемещение пина на максимальное значение
    setPinDefaultPosition();
    effectLevel.classList.add('hidden');
  };

  var closeModal = function () {
    window.utility.close(uploadForm);
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
    if (evt.target === commentTextField || evt.target === hashtag) {
      document.removeEventListener('keydown', onModalEscPress);
    }
  };

  var onFieldBlur = function (evt) {
    if (evt.target === commentTextField || evt.target === hashtag) {
      document.addEventListener('keydown', onModalEscPress);
    }
  };

  uploadControl.addEventListener('change', onUploadChange);

  // 2.1 =================================

  var scale = uploadForm.querySelector('.scale');
  var scaleValue = scale.querySelector('.scale__control--value');
  var scaleSmaller = scale.querySelector('.scale__control--smaller');
  var scaleBigger = scale.querySelector('.scale__control--bigger');
  var preview = uploadForm.querySelector('.img-upload__preview');
  var previewImage = preview.querySelector('img');

  var Value = {
    BASIC: 100,
    STEP: 25,
    MAX: 100,
    MIN: 25
  };

  scaleValue.value = Value.BASIC + '%';
  var basicScaleValue = Value.BASIC + '%';

  var increaseValue = function () {
    var currentValue = parseInt(scaleValue.value, 10);
    if (currentValue < Value.MAX) {
      currentValue += Value.STEP;
      if (currentValue > Value.MAX) {
        currentValue = Value.MAX;
      }
    }
    scaleValue.value = currentValue + '%';
  };


  var decreaseValue = function () {
    var currentValue = parseInt(scaleValue.value, 10);
    if (currentValue > Value.MIN) {
      currentValue -= Value.STEP;
      if (currentValue < Value.MIN) {
        currentValue = Value.MIN;
      }
    }
    scaleValue.value = currentValue + '%';
  };

  var zoomImage = function () {
    previewImage.style.transform = 'scale(' + parseInt(scaleValue.value, 10) / 100 + ')';
  };

  var onButtonClick = function (evt) {
    if (evt.target === scaleSmaller) {
      decreaseValue();
      zoomImage();
    } else if (evt.target === scaleBigger) {
      increaseValue();
      zoomImage();
    }
  };

  scaleSmaller.addEventListener('click', onButtonClick);
  scaleBigger.addEventListener('click', onButtonClick);

  // 2.2 ==============================


  var effectsList = upload.querySelector('.effects__list');


  var applyEffect = function (effectValue) {
    effectLevel.classList.remove('hidden');
    previewImage.removeAttribute('class');
    previewImage.style.filter = '';
    previewImage.classList.add('effects__preview--' + effectValue);
    if (effectValue === 'none') {
      previewImage.removeAttribute('class');
      effectLevel.classList.add('hidden');
    }
    setPinDefaultPosition();
  };

  var onRadioClick = function (evt) {
    applyEffect(evt.target.value);
  };

  effectsList.addEventListener('click', onRadioClick);

  // слайдер

  var currentRadio = function () {
    var current = effectsList.querySelector('input:checked');
    return current;
  };

  var Coordinate = function (x, y) {
    this.x = x;
    this.y = y;
  };

  var effectLevel = upload.querySelector('.effect-level');
  var slider = effectLevel.querySelector('.effect-level__line');
  var depth = effectLevel.querySelector('.effect-level__depth');
  var pin = effectLevel.querySelector('.effect-level__pin');

  var SliderStats = {
    WIDTH: 0,
    LEFT: 0,
    RIGHT: 0
  };

  var getSliderStats = function () {
    var stats = {};
    stats.width = slider.offsetWidth;
    stats.left = 0;
    stats.right = slider.offsetWidth;
    return stats;
  };

  var updateSliderStats = function () {
    SliderStats.WIDTH = getSliderStats().width;
    SliderStats.LEFT = getSliderStats().left;
    SliderStats.RIGHT = getSliderStats().right;
  };

  var calculateChangeValue = function () {
    var value = 0;
    var pinCurrentLoc = pin.offsetLeft;
    // пропорция определения величины
    value = (100 * pinCurrentLoc) / (SliderStats.WIDTH);
    // в итоге, функция должна вернуть значение изменения пина
    return value;
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

  var changeLevel = function (effect, effectValue) {
    var currentEffect = '';
    var changeValue = 0;
    var convertedValue = 0;
    var bottomValue = 0;
    var topValue = 0;
    var currentUnits = 0;

    previewImage.style.filter = '';

    currentEffect = effectsStats[effect].currentEffect;
    convertedValue = effectsStats[effect].convertedValue;
    bottomValue = effectsStats[effect].bottomValue;
    topValue = effectsStats[effect].topValue;
    currentUnits = effectsStats[effect].unitsOfMeasure;

    changeValue = bottomValue + effectValue * convertedValue;

    if (changeValue > topValue) {
      changeValue = topValue;
    }
    if (changeValue < bottomValue) {
      changeValue = bottomValue;
    }

    previewImage.style.filter = currentEffect + '(' + changeValue + currentUnits + ')';
  };

  pin.addEventListener('mousedown', function (evt) {
    var startCoords = new Coordinate(evt.clientX);
    var onPinMouseMove = function (moveEvt) {
      var changedCoords = new Coordinate(moveEvt.clientX);
      var shift = {
        x: startCoords.x - changedCoords.x
      };
      startCoords = new Coordinate(moveEvt.clientX);
      var position = pin.offsetLeft - shift.x;
      if (position > SliderStats.RIGHT) {
        position = SliderStats.RIGHT;
      }
      if (position < SliderStats.LEFT) {
        position = SliderStats.LEFT;
      }
      var positionPercent = (position / SliderStats.WIDTH) * 100;
      pin.style.left = position + 'px';
      depth.style.width = positionPercent + '%';
      changeLevel(currentRadio().value, calculateChangeValue());
    };
    var onPinMouseUp = function () {
      changeLevel(currentRadio().value, calculateChangeValue());
      document.removeEventListener('mousemove', onPinMouseMove);
      document.removeEventListener('mouseup', onPinMouseUp);
    };
    document.addEventListener('mousemove', onPinMouseMove);
    document.addEventListener('mouseup', onPinMouseUp);
  });


  // закрытие формы редактирования загружаемого изображения
  var uploadCancel = upload.querySelector('.img-upload__cancel');

  var resetConditions = function () {
    uploadControl.value = '';
    scaleValue.value = basicScaleValue;
    previewImage.style.transform = 'scale(1)';
    previewImage.style.filter = '';
    previewImage.removeAttribute('class');
    setPinDefaultPosition();
  };

  var onCloseClick = function () {
    window.utility.close(uploadForm);
    resetConditions();
  };

  uploadCancel.addEventListener('click', onCloseClick);

  // 4.2 ---------------------------------------------------------


  uploadCancel.addEventListener('keydown', onModalEscPress);
  uploadCancel.addEventListener('keydown', onModalEnterPress);


  var text = document.querySelector('.text');
  var commentTextField = text.querySelector('.text__description');
  var hashtag = text.querySelector('.text__hashtags');
  var submit = upload.querySelector('.img-upload__submit');

  var validationDict = {
    'no #-sign': 'отсутсвует решётка перед хэштегом. хэш-тег начинается с символа # (решётка)',
    'no content': 'хеш-тег не может состоять только из одной решётки',
    'no spacing': 'отсутсвует разделение пробелом. хэш-теги разделяются пробелами',
    'no repeat': 'один и тот же хэш-тег не может быть использован дважды',
    'too many hashtags': 'нельзя указывать больше пяти хэш-тегов',
    'too long': 'слишком длинный хэштег. максимальная длина одного хэш-тега 20 символов, включая решётку',
    'register free': 'теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом'
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
        if (right === arrayItem) {
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

  hashtag.addEventListener('blur', onFieldBlur);
  hashtag.addEventListener('focus', onFieldFocus);

  commentTextField.addEventListener('blur', onFieldBlur);
  commentTextField.addEventListener('focus', onFieldFocus);

  var onClosePressEsc = function () {
    window.utility.close(uploadForm);
    resetConditions();
    document.removeEventListener('keydown', onClosePressEsc);
  };

  uploadCancel.addEventListener('keydown', onClosePressEsc);

})();
