'use strict';

var messageParts = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var nameValues = [
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
  }
  if (isSimple) {
    commentText = generateMessageText(messageTextArray[firstPart]);
    return commentText;
  }
  commentText = generateMessageText(messageTextArray[firstPart], messageTextArray[secondPart]);
  return commentText;
};


// функция генерации объекта коментария
var generateComment = function (messageTextArray, nameValueArray) {
  var comment = {};
  var commentAvatar = 'img/avatar-' + randomNumber(1, 6) + '.svg';
  comment.avatar = commentAvatar;
  var commentText = generateCommentText(messageTextArray, randomTrueFalse());
  comment.message = commentText;
  var commentName = nameValueArray[randomNumber(0, nameValueArray.length - 1)];
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

// функция генерации url фото
var generatePhotoUrlArray = function (arrayMaxRange, arrayMinRange) {
  var urlNumber = 0;
  var urlArray = [];
  var array = [];
  if (arrayMinRange) {
    array = generateRangedArray(arrayMinRange, arrayMaxRange);
    urlNumber = array[randomNumber(arrayMinRange, array.length)];
  }
  array = generateRangedArray(1, arrayMaxRange);
  for (var i = 0; i < array.length; i++) {
    var arrayRandom = randomNumber(1, array.length);
    urlNumber = array[arrayRandom];
    var url = 'photos/' + urlNumber + '.jpg';
    urlArray[i] = url;
  }
  return urlArray;
};


var bobo = generatePhotoUrlArray(25);
console.log(bobo);

// функция проверки url
var urlCheck = function (arrayMaxRange, arrayMinRange) {
  var url = generatePhotoUrl(arrayMaxRange, arrayMinRange);
  for (var i = 0; i < array; i++) {
    if (url === url) {
      url = generatePhotoUrl(arrayMaxRange, arrayMinRange);
    }
  }
  return url;
};


// функция генерации объекта Фото
var generatePhotoObject = function (commentObjectsArray, commentsAmount) {
  var photoObject = {};
  // photos/i.jpg, где i это число от 1 до 25. Адреса картинок не должны повторяться.
  // создавать ли здесь функцию с генерацией массива объектов url
  // ( и функцией единичной генерации)
  var photoObjectUrl = 4;
  photoObject.url = photoObjectUrl;
  var photoObjectLikes = randomNumber(15, 200);
  photoObject.likes = photoObjectLikes;
  // цикл с генерацией комментариев
  var photoObjectComments = 0;
  photoObject.comments = photoObjectComments;
};

// функция генерации массива объектов Фото
var generatePhotoObjectsArray = function () {
  var photoArray = [];
  return photoArray;
};
