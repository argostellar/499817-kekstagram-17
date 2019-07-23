'use strict';

// render.js - отрисовка миниатюр фотографий на странице
(function () {

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
  var getUrlNumber = function (string) {
    var urlNumber = 0;
    // var part = new RegExp('photos/(\d).jpg');
    var firstPart = new RegExp('photos/');
    var secondPart = new RegExp('.jpg');
    var intermediateOne = string.split(firstPart);
    var intermediateTwo = intermediateOne[1].split(secondPart);
    urlNumber = parseInt(intermediateTwo, 10);
    return urlNumber;
  };

  var createPhoto = function (photoObject) {

    var pictureElement = pictureTemplate.cloneNode(true);

    var digit = getUrlNumber(photoObject.url);
    var url = pictureElement.querySelector('img');
    url.src = photoObject.url;
    // url.dataNumber = digit;
    url.setAttribute('data-number', digit);

    var likes = pictureElement.querySelector('.picture__likes');
    likes.textContent = photoObject.likes;

    var comments = pictureElement.querySelector('.picture__comments');
    var commentsAmount = photoObject.comments;
    comments.textContent = commentsAmount.length;

    return pictureElement;

  };

  var render = function (photos) {
    photos.forEach(function (photo) {
      var currentPhoto = createPhoto(photo);
      fragment.appendChild(currentPhoto);
    });
    picturesBlock.appendChild(fragment);
  };

  window.render = render;
})();
