'use strict';

// picture.js - модуль для отрисовки миниатюры в полноформатное изображение;
(function () {
  var AVATAR_WIDTH = 35;
  var AVATAR_HEIGHT = 35;
  var COMMENTS_UPLOAD_AMOUNT = 5;

  var photoItems = [];
  var onLoadSuccess = function (photos) {
    photoItems = photos.slice();
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

  var renderComment = function (commentData) {
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

  var addComments = function (commentData) {
    console.log(commentData);
    var fragment = document.createDocumentFragment();
    var upperLimit = 0;
    if (commentData.length <= COMMENTS_UPLOAD_AMOUNT) {
      upperLimit = commentData.length;
    } else if (commentData.length > COMMENTS_UPLOAD_AMOUNT) {
      upperLimit = COMMENTS_UPLOAD_AMOUNT;
    }
    for (var j = 0; j < upperLimit; j++) {
      var renderingPart = renderComment(commentData[j]);
      fragment.appendChild(renderingPart);
    }
    return fragment;
  };

  var changeCounterValue = function (initialArray, changingArray) {
    var maxValue = 0;
    var currentValue = 0;
    var displayedValue = 0;
    if (initialArray.length <= COMMENTS_UPLOAD_AMOUNT) {
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
    if (array.length <= COMMENTS_UPLOAD_AMOUNT) {
      portion = array.splice(0, array.length);
    } else if (array.length > COMMENTS_UPLOAD_AMOUNT) {
      portion = array.splice(0, COMMENTS_UPLOAD_AMOUNT);
    }
    var renderedPortion = addComments(portion);
    commentsField.appendChild(renderedPortion);
  };

  var openPicture = function (photo) {
    if (!picture.classList.contains('hidden')) {
      clearCommentField();
    };
    window.utility.open(picture);

    var initialArray = 0;
    var arrayOfComments = 0;

    clearCommentField();
    image.src = photo.url;
    likesCount.textContent = photo.likes;
    commentsCount.textContent = photo.comments.length;
    initialArray = photo.comments;
    arrayOfComments = initialArray.slice();
    renderPartOfComments(arrayOfComments);
    changeCounterValue(initialArray, arrayOfComments);
    description.textContent = photo.description;

    if (initialArray.length <= COMMENTS_UPLOAD_AMOUNT) {
      commentsLoader.classList.add('visually-hidden');
    } else {
      var onCommentsLoaderClick = function () {
        renderPartOfComments(arrayOfComments);
        changeCounterValue(initialArray, arrayOfComments);
        if (arrayOfComments.length === 0) {
          commentsLoader.classList.add('visually-hidden');
          commentsLoader.removeEventListener('click', onCommentsLoaderClick);
        }
      };

      commentsLoader.addEventListener('click', onCommentsLoaderClick);
    }
  };

  var getPhotoData = function (evtTarget) {
    var element = evtTarget;
    var attribute = element.dataset.number;
    var attributeNumber = parseInt(attribute, 10);
    var numberIndex = attributeNumber - 1;
    var currentObject = photoItems[numberIndex];
    return currentObject;
  };

  var onPictureOpen = function (evt) {
    var clickState = (evt.target.className === 'picture__img');
    var enterCode = (evt.keyCode === window.global.ENTER);
    var enterTarget = (evt.target.className === 'picture');
    var enterState = (enterCode && enterTarget);
    if (clickState || enterState) {
      var eventTarget = evt.target;
      if (enterState) {
        var nodeList = evt.target.childNodes;
        var nodeArray = Array.from(nodeList);
        var node = nodeArray.find(function (element) {
          var item = element;
          if (item.classList === undefined) {
            item = false;
          } else if (item.classList.contains('picture__img')) {
            item = element;
          }
          return item;
        });
        eventTarget = node;
      }
      openPicture(getPhotoData(eventTarget));
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
  document.addEventListener('keydown', onPictureOpen);
  closeButton.addEventListener('click', onCloseClick);

  window.picture = openPicture;
})();
