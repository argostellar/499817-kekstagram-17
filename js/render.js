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

  var createPhoto = function (photoObject) {

    var pictureElement = pictureTemplate.cloneNode(true);

    var url = pictureElement.querySelector('img');
    url.src = photoObject.url;

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
