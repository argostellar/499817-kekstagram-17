'use strict';

// data.js - модуль, который создаёт данные;
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

  // серверное взаимодействие -------------------------------------

  var onLoadSuccess = function (photos) {
    photos.forEach(function (photo) {
      var currentPhoto = createPhoto(photo);
      fragment.appendChild(currentPhoto);
    });
    picturesBlock.appendChild(fragment);
  };

  var onLoadError = function (errorMessage) {
    createMessage('red', errorMessage);
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

  window.server.load(onLoadSuccess, onLoadError);

})();
