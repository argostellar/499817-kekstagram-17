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
}

// функция генерации массива объектов "Комментатор" (работает)
var generateCommentatorArray = function (nameValueArray) {
  var commentatorArray = [];
  for (var i = 0; i < nameValueArray.length; i++) {
    var singleCommentator = generateCommentator(nameValueArray[i], i + 1);
    commentatorArray[i] = singleCommentator;
  }
  return commentatorArray;
}

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

// Реализация заполнения

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
  // изменил реализацию вставки комментариев, но там сейчас некрасивая вставка
  // строчки сливаются в белую линию, как я понимаю, это изменится в следующих
  // заданиях?
  for (var i = 0; i < singleComment.length; i++) {
  comments.textContent = singleComment[i].message;
  }

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




