'use strict';

// picture.js - модуль для отрисовки миниатюры в полноформатное изображение;
(function () {
  var picture = document.querySelector('.big-picture');
  var image = picture.querySelector('.big-picture__img');
  var likesCount = picture.querySelector('.likes-count');
  var commentsCount = picture.querySelector('.comments-count');
  var comments = picture.querySelector('.social__comments');
  var description = picture.querySelector('.social__caption');
  var commentsMeter = picture.querySelector('.social__comment-count');
  var commentsLoader = picture.querySelector('.comments-loader');

  // window.utility.open(picture);
  // commentsMeter.classList.add('visually-hidden');
  // commentsLoader.classList.add('visually-hidden');

  var renderComment = function (commentData) {
    var AVATAR_AMOUNT = 6;
    var AVATAR_WIDTH = 35;
    var AVATAR_HEIGHT = 35;
    var random = window.utility.getRandomNumber(AVATAR_AMOUNT, true);
    var comment = document.createElement('li');
    comment.classList.add('social__comment');
    var avatar = document.createElement('img');
    comment.insertAdjacentElement('afterbegin', avatar);
    avatar.src = 'img/avatar-' + random + '.svg';
    avatar.alt = 'Аватар комментатора фотографии';
    avatar.width = AVATAR_WIDTH;
    avatar.height = AVATAR_HEIGHT;
    var text = document.createElement('p');
    comment.insertAdjacentElement('afterbegin', avatar);
    text.classList.add('social__text');
    // text.textContent = commentData.message;
    text.textContent = '{{текст комментария}}';
  };

  var openPicture = function (photo) {
    window.utility.open(picture);
    commentsMeter.classList.add('visually-hidden');
    commentsLoader.classList.add('visually-hidden');
    image.src = photo.url;
    likesCount.textContent = photo.likes;
    commentsCount.textContent = photo.comments.length;
    photo.comments.forEach(function (comment) {
      renderComment(comment);
    });
    description.textContent = photo.description;
  };
  window.picture = openPicture;
})();
