'use strict';

var MESSAGE_PARTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var NAME_VALUES = [
  'Артём',
  'Босс Кекс',
  'Фицджеральд',
  'Василий',
  'Мария',
  'Елена',
  'Константин',
  'Алина'
];

// стоит ли создать функцию которая будет генерировать объект "комментатор",
// с чётко зафиксированными именем и аватаркой?
// тогда помимо самой функции, нужно будет создать функцию генерации массива комментаторов
// из которого уже будут вытаскиваться данные и затем подставляться в объект комментария

// функция получения случайного числа из заданного диапазона (работает)
var randomNumber = function (minValue, maxValue) {
  var number = Math.floor(maxValue * Math.random());
  if (number < minValue) {
    number = minValue;
    number += Math.floor(minValue * Math.random());
  }
  return number;
};

// функция случайного значения правды или лжи (работает)
var randomTrueFalse = function () {
  var state = 0;
  state = Math.round(Math.random());
  return state;
};

// функция генерации массива чисел с заданным диапазоном (работает)
var generateRangedArray = function (lowerNumberBorder, upperNumberBorder) {
  var length = upperNumberBorder - lowerNumberBorder;
  var array = [];
  for (var i = 0; i <= length; i++) {
    array[i] = lowerNumberBorder + i;
  }
  return array;
};

// функция генерации текста сообщения (склеивания) из одной или двух строк (работает)
var generateMessageText = function (firstPart, secondPart) {
  var messageText = 0;
  if (secondPart) {
    messageText = firstPart + ' ' + secondPart;
  } else {
    messageText = firstPart;
  }
  return messageText;
};

// функция генерации текста из массива
var generateCommentText = function (messageTextArray, isSimple) {
  var commentText = 0;
  var firstPart = randomNumber(0, messageTextArray.length);
  var secondPart = randomNumber(0, messageTextArray.length);

  for (var i = 0; i < messageTextArray.length; i++) {
    // правильно ли реализована проверка и смена значения переменной?
    if (firstPart === secondPart) {
      secondPart = randomNumber(0, messageTextArray.length);
    }
    if (firstPart === secondPart && i === messageTextArray.length - 1) {
      i = 0;
    }
  }
  if (isSimple) {
    commentText = generateMessageText(messageTextArray[firstPart]);
    return commentText;
  }
  commentText = generateMessageText(messageTextArray[firstPart], messageTextArray[secondPart]);
  return commentText;
};

// функция генерации объекта "Комментатор" (работает)
var generateCommentator = function (nameValue, numberValue) {
  var commentator = {};
  var commentatorAvatar = 'img/avatar-' + numberValue + '.svg';
  commentator.avatar = commentatorAvatar;
  var commentatorName = nameValue;
  commentator.name = commentatorName;

  return commentator;
};

// функция генерации массива объектов "Комментатор" (работает)
var generateCommentatorArray = function (nameValueArray) {
  var commentatorArray = [];
  for (var i = 0; i < nameValueArray.length; i++) {
    var singleCommentator = generateCommentator(nameValueArray[i], i + 1);
    commentatorArray[i] = singleCommentator;
  }
  return commentatorArray;
};

// функция генерации объекта коментария
var generateComment = function (messageTextArray, nameValueArray) {
  var comment = {};
  var commentatorArray = generateCommentatorArray(nameValueArray);
  var randomCommentator = randomNumber(0, commentatorArray.length - 1);
  var commmentAvatar = commentatorArray[randomCommentator].avatar;
  comment.avatar = commmentAvatar;
  var commentText = generateCommentText(messageTextArray, randomTrueFalse());
  comment.message = commentText;
  var commentName = commentatorArray[randomCommentator].name;
  comment.name = commentName;
  return comment;
};

// функция генерации массива объектов комменатриев (работает(вроде))
var generateCommentsArray = function (messageTextArray, nameValueArray, arrayLength) {
  var commentArray = [];
  for (var i = 0; i < arrayLength; i++) {
    commentArray[i] = generateComment(messageTextArray, nameValueArray);
  }
  return commentArray;
};

// функция генерации url фото (работает)
var generatePhotoUrlArray = function (arrayMaxRange, arrayMinRange) {
  var urlArray = [];
  var array = [];
  if (arrayMinRange) {
    array = generateRangedArray(arrayMinRange, arrayMaxRange);
    urlNumber = array[randomNumber(arrayMinRange, array.length)];
  }
  array = generateRangedArray(1, arrayMaxRange);
  for (var i = 0; i < array.length; i++) {
    var urlNumber = 0;
    urlNumber = array[i];
    var url = 'photos/' + urlNumber + '.jpg';
    urlArray[i] = url;
  }
  return urlArray;
};

// функция генерации объекта Фото
var generatePhotoObject = function (urlAmount, commentsAmount, messageTextArray, nameValueArray, arrayLength) {
  var photoObject = {};
  // здесь реализована уникальность каждого адреса (без повтора)

  var photoObjectUrl = 0;
  var urlRange = urlAmount;
  var urlArray = generatePhotoUrlArray(urlRange);
  var urlRandom = randomNumber(1, urlArray.length);
  photoObjectUrl = urlArray[urlRandom];
  // urlArray.splice(urlRandom, 1, urlArray[urlRandom + 1]);
  // конец реализации

  photoObject.url = photoObjectUrl;
  var photoObjectLikes = randomNumber(15, 200);
  photoObject.likes = photoObjectLikes;
  // цикл с генерацией комментариев
  var photoObjectComments = [];
  for (var i = 0; i < commentsAmount; i++) {
    var commentsArray = generateCommentsArray(messageTextArray, nameValueArray, arrayLength);
    photoObjectComments[i] = commentsArray[i];
  }
  photoObject.comments = photoObjectComments;
  return photoObject;
};


// функция генерации массива объектов Фото (работает)
var generatePhotoObjectsArray = function (photoAmount, commentsAmount, messageTextArray, nameValueArray, arrayLength) {
  var photoArray = [];
  for (var i = 0; i < photoAmount; i++) {
    var singeObject = generatePhotoObject(photoAmount, commentsAmount, messageTextArray, nameValueArray, arrayLength);

    photoArray[i] = singeObject;
    if (singeObject.url === photoArray[i].url) {
      var urlArray = generatePhotoUrlArray(photoAmount);
      if (singeObject.url !== urlArray[i]) {
        singeObject.url = urlArray[i];
      }
    }
  }
  return photoArray;
};

// Реализация заполнения -------------------------------------

// куда будут добавлятся фото
var picturesBlock = document.querySelector('.pictures');
// поиск шаблона
var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
// создаём фрагмент, который будем добавлять на страницу
var fragment = document.createDocumentFragment();

// Создание элементов

var createPhoto = function (photoObject) {

  var pictureElement = pictureTemplate.cloneNode(true);

  var url = pictureElement.querySelector('img');
  url.src = photoObject.url;

  var likes = pictureElement.querySelector('.picture__likes');
  likes.textContent = photoObject.likes;

  var comments = pictureElement.querySelector('.picture__comments');
  var singleComment = photoObject.comments;
  comments.textContent = singleComment.length;

  return pictureElement;

};

var createAmountOfPhotos = function (photoAmount, commentsAmount, messageTextArray, nameValueArray, arrayLength) {
  var somePictures = generatePhotoObjectsArray(photoAmount, commentsAmount, messageTextArray, nameValueArray, arrayLength);
  for (var j = 0; j < somePictures.length; j++) {
    var singlePhoto = 0;
    singlePhoto = somePictures[j];
    var finalObject = createPhoto(singlePhoto);
    fragment.appendChild(finalObject);
  }
  picturesBlock.appendChild(fragment);
};

// Добавление элементов на страницу
createAmountOfPhotos(25, 3, MESSAGE_PARTS, NAME_VALUES, 30);

// задание 7 - подробности -----------------------------------------------------------

// фунция "снятия" класса hidden
var open = function (hiddenBlock) {
  hiddenBlock.classList.remove('hidden');
};

var close = function (block) {
  block.classList.add('hidden');
};

// 1.2 ===============================

var upload = document.querySelector('.img-upload');
var uploadControl = upload.querySelector('#upload-file');
// var uploadControlLabel = upload.querySelector('.img-upload__control');
var uploadForm = upload.querySelector('.img-upload__overlay');

// правильно ли реализована эта функция? А именно проверка условия
var onUploadChange = function (evt) {
  if (evt.value !== 0) {
    open(uploadForm);
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

uploadControl.addEventListener('change', onUploadChange);

// 2.1 =================================

var scale = uploadForm.querySelector('.scale');
var scaleValue = scale.querySelector('.scale__control--value');
var scaleSmaller = scale.querySelector('.scale__control--smaller');
var scaleBigger = scale.querySelector('.scale__control--bigger');
var preview = uploadForm.querySelector('.img-upload__preview');
var previewImage = preview.querySelector('img');

// Стоит ли записать эти числа в формате констант?
var basicValue = 100;
var stepValue = 25;
var maxValue = 100;
var minValue = 25;

scaleValue.value = basicValue + '%';
var basicScaleValue = basicValue + '%';

var increaseValue = function () {
  var currentValue = parseInt(scaleValue.value, 10);
  if (currentValue < maxValue) {
    currentValue += stepValue;
    if (currentValue > maxValue) {
      currentValue = maxValue;
    }
  }
  scaleValue.value = currentValue + '%';
};


var decreaseValue = function () {
  var currentValue = parseInt(scaleValue.value, 10);
  if (currentValue > minValue) {
    currentValue -= stepValue;
    if (currentValue < minValue) {
      currentValue = minValue;
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


var effectLevel = upload.querySelector('.effect-level');
// var effectLevelValue = effectLevel.querySelector('.effect-level__value');
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

var Coordinate = function (x, y) {
  this.x = x;
  this.y = y;
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
  close(uploadForm);
  resetConditions();
};

uploadCancel.addEventListener('click', onCloseClick);

// 4.2 ---------------------------------------------------------

// перечисление кодов клавиатуры
var KeyboardCode = {
  ESC: 27,
  ENTER: 13
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

uploadCancel.addEventListener('keydown', onModalEscPress);
uploadCancel.addEventListener('keydown', onModalEnterPress);


var text = document.querySelector('.text');
var commentTextField = text.querySelector('.text__description');

var hashtag = text.querySelector('.text__hashtags');

var onFieldFocus = function (evt) {
  if (evt.target === commentTextField || hashtag) {
    document.removeEventListener('keydown', onModalEscPress);
  }
};

// evt.tagName === textarea || input

var onFieldBlur = function (evt) {
  if (evt.target === commentTextField || hashtag) {
    document.addEventListener('keydown', onModalEscPress);
  }
};

commentTextField.addEventListener('blur', onFieldBlur);
commentTextField.addEventListener('focus', onFieldFocus);

hashtag.addEventListener('blur', onFieldBlur);
hashtag.addEventListener('focus', onFieldFocus);

var onClosePressEsc = function () {
  close(uploadForm);
  resetConditions();
  document.removeEventListener('keydown', onClosePressEsc);
};

uploadCancel.addEventListener('keydown', onClosePressEsc);

// 5.1 -------------------------------------

