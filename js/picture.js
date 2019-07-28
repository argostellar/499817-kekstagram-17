'use strict';

// picture.js - модуль для отрисовки миниатюры в полноформатное изображение;
(function () {
  var photosArray = [];
  var onLoadSuccess = function (photos) {
    photosArray = photos.slice();
  };

  var onLoadError = function (errorMessage) {
    window.utility.createMessage(errorMessage, 'red');
  };

  window.server.load(onLoadSuccess, onLoadError);

  var picture = document.querySelector('.big-picture');
  var imageWrap = picture.querySelector('.big-picture__img');
  var image = imageWrap.querySelector('img');
  var likesCount = picture.querySelector('.likes-count');
  var commentsCount = picture.querySelector('.comments-count');
  var commentsLoader = picture.querySelector('.comments-loader');
  var closeButton = picture.querySelector('.big-picture__cancel');

  var social = picture.querySelector('.social');
  var commentsField = social.querySelector('.social__comments');
  var description = social.querySelector('.social__caption');
  var commentsMeter = social.querySelector('.social__comment-count');


  // window.utility.open(picture);
  // commentsMeter.classList.add('visually-hidden');
  // commentsLoader.classList.add('visually-hidden');

  var renderComment = function (commentData) {
    var AVATAR_WIDTH = 35;
    var AVATAR_HEIGHT = 35;
    var comment = document.createElement('li');
    comment.classList.add('social__comment');
    var avatar = document.createElement('img');
    comment.insertAdjacentElement('afterbegin', avatar);
    avatar.src = commentData.avatar;
    avatar.alt = 'Аватар комментатора фотографии';
    avatar.width = AVATAR_WIDTH;
    avatar.height = AVATAR_HEIGHT;
    var text = document.createElement('p');
    comment.insertAdjacentElement('beforeend', text);
    text.classList.add('social__text');
    text.textContent = commentData.message;
    // console.log('COMMENT: ');
    // console.log(comment);
    return comment;
  };

  var clearCommentField = function () {
    var commentsCollection = social.querySelectorAll('.social__comment');
    var commentsArray = Array.from(commentsCollection);
    if (commentsLoader.classList.contains('visually-hidden')) {
      commentsLoader.classList.remove('visually-hidden');
    }
    commentsArray.forEach(function (comment) {
      comment.remove();
    });
  };

  var addComments = function (commentDatum) {
    // console.log('COMMENT DATUM: ');
    // console.log(commentDatum);
    var fragment = document.createDocumentFragment();
    var renderingPart = 0;
    if (commentDatum.length <= 5) {
      for (var i = 0; i < commentDatum.length; i++) {
        // console.log(commentDatum[i]);
        renderingPart = renderComment(commentDatum[i]);
        // console.log('RENDERING PART: ');
        // console.log(renderingPart);
        fragment.appendChild(renderingPart);
      }
    } else {
      for (var j = 0; j < 5; j++) {
        // console.log(commentDatum[i]);
        renderingPart = renderComment(commentDatum[j]);
        // console.log('RENDERING PART: ');
        // console.log(renderingPart);
        fragment.appendChild(renderingPart);
      }
    }
    // console.log('FRAGMENT: ');
    // console.log(fragment);
    return fragment;
  };

  var changeCounterValue = function (initialArray, changingArray) {
    var maxValue = 0;
    var currentValue = 0;
    var displayedValue = 0;
    if (initialArray.length <= 5) {
      maxValue = initialArray.length;
      displayedValue = maxValue;
    } else {
      maxValue = initialArray.length;
      currentValue = changingArray.length;
      displayedValue = maxValue - currentValue;
    }

    commentsMeter.textContent = displayedValue + ' из ' + maxValue + ' комментариев';
  };

  var renderPartOfComments = function (array) {
    var portion = array;
    if (array.length <= 5) {
      portion = array.splice(0, array.length);
    } else if (array.length > 5) {
      portion = array.splice(0, 5);
    }
    var renderedPortion = addComments(portion);
    // console.log('RENDERED PORTION: ');
    // console.log(renderedPortion);
    commentsField.appendChild(renderedPortion);
  };

  var openPicture = function (photo) {
    window.utility.open(picture);

    var initialArray = 0;
    var arrayOfComments = 0;

    clearCommentField();
    image.src = photo.url;
    likesCount.textContent = photo.likes;
    commentsCount.textContent = photo.comments.length;
    initialArray = photo.comments;
    // console.log('ИЗНАЧАЛЬНЫЙ МАССИВ: ');
    // console.log(initialArray);
    arrayOfComments = initialArray.slice();
    // console.log('КОПИЯ МАССИВА: ');
    // console.log(arrayOfComments);
    renderPartOfComments(arrayOfComments);
    changeCounterValue(initialArray, arrayOfComments);
    description.textContent = photo.description;

    if (initialArray.length <= 5) {
      commentsLoader.classList.add('visually-hidden');
    } else {
      var onCommentsLoaderClick = function () {
        // console.log('КОПИЯ МАССИВА ПРИ КЛИКЕ ДО ОБРАБОТКИ: ');
        // console.log(arrayOfComments);
        renderPartOfComments(arrayOfComments);
        // console.log('CLICK!');
        // console.log('КОПИЯ МАССИВА ПРИ КЛИКЕ: ');
        // console.log(arrayOfComments);
        changeCounterValue(initialArray, arrayOfComments);
        if (arrayOfComments.length === 0) {
          commentsLoader.classList.add('visually-hidden');
          commentsLoader.removeEventListener('click', onCommentsLoaderClick);
        }
      };

      commentsLoader.addEventListener('click', onCommentsLoaderClick);
    }
  };

  var getPhotoData = function (evt) {
    var element = evt.target;
    var attribute = element.getAttribute('data-number');
    var attributeNumber = parseInt(attribute, 10);
    var numberIndex = attributeNumber - 1;
    var currentObject = photosArray[numberIndex];
    return currentObject;
  };

  var onPictureOpen = function (evt) {
    if (evt.target.className === 'picture__img') {
      openPicture(getPhotoData(evt));
      document.addEventListener('keydown', onCloseEscPress);
    }
  };

  var onCloseClick = function () {
    window.utility.close(picture);
  };

  var onCloseEscPress = function (evt) {
    if (evt.keyCode === window.global.ESC) {
      window.utility.close(picture);
      document.removeEventListener('keydown', onCloseEscPress);
    }
  };

  document.addEventListener('click', onPictureOpen);
  closeButton.addEventListener('click', onCloseClick);

  window.picture = openPicture;
})();
