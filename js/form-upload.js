'use strict';

// form-upload.js - модуль, который отвечает за отправку данных формы на сервер;
(function () {
  var uploadControl = window.form.uploadControl;
  var uploadForm = window.form.uploadForm;
  var uploadFormItem = window.form.upload.querySelector('.img-upload__form');

  var successTemplate = document.querySelector('#success');
  var errorTemplate = document.querySelector('#error');
  var awaitingTemplate = document.querySelector('#messages');
  var main = document.querySelector('main');

  var createUploadMessage = function () {
    var message = awaitingTemplate.content.cloneNode(true);
    return message;
  };

  var uploadMessage = createUploadMessage();

  var showUpload = function () {
    main.appendChild(uploadMessage);
  };

  var hideUpload = function () {
    var currentMessage = main.querySelector('.img-upload__message--loading');
    main.removeChild(currentMessage);
  };

  var createSuccessMessage = function () {
    var message = successTemplate.content.cloneNode(true);
    main.appendChild(message);
    var currentBlock = main.querySelector('.success');
    // console.log(currentBlock);
    var successButton = currentBlock.querySelector('.success__button');
    // console.log(successButton);
    var onSuccessButtonClick = function () {
      main.removeChild(currentBlock);
      successButton.removeEventListener('click', onSuccessButtonClick);
    };
    successButton.addEventListener('click', onSuccessButtonClick);

    var onEscPressClose = function (evt) {
      if (evt.keycode === window.global.ESC) {
        main.removeChild(currentBlock);
        document.removeEventListener('keydown', onEscPressClose);
      }
    };

    var onOutsideAreaClickClose = function (evt) {
      if (evt.currentTarget !== currentBlock) {
        main.removeChild(currentBlock);
        document.removeEventListener('click', onOutsideAreaClickClose);
      }
    };

    document.addEventListener('keydown', onEscPressClose);
    document.addEventListener('click', onOutsideAreaClickClose);
  };

  // var createErrorMessage = function () {};

  var createMessage = function (template) {
    var message = template.content.cloneNode(true);
    var currentBlock = '';
    main.appendChild(message);
    if (template === successTemplate) {
      currentBlock = main.querySelector('.success');
      var successButton = currentBlock.querySelector('.success__button');
      var onSuccessButtonClick = function () {
        main.removeChild(currentBlock);
        successButton.removeEventListener('click', onSuccessButtonClick);
      };
      successButton.addEventListener('click', onSuccessButtonClick);
    } else if (template === errorTemplate) {
      currentBlock = message.querySelector('.error');
      var errorButton = currentBlock.querySelector('.error__button');
      var onErrorButtonClick = function () {
        main.removeChild(currentBlock);
        errorButton.removeEventListener('click', onErrorButtonClick);
      };
      errorButton.addEventListener('click', onErrorButtonClick);
    }

    var onEscPressClose = function (evt) {
      if (evt.keycode === window.global.ESC) {
        main.removeChild(currentBlock);
        document.removeEventListener('keydown', onEscPressClose);
      }
    };

    var onOutsideAreaClickClose = function (evt) {
      // console.log(currentBlock);
      if (evt.target !== currentBlock) {

        main.removeChild(currentBlock);
        document.removeEventListener('click', onOutsideAreaClickClose);
      }
    };

    document.addEventListener('keydown', onEscPressClose);
    document.addEventListener('click', onOutsideAreaClickClose);
  };

  var onLoadSuccess = function (response) {
    // createMessage(successTemplate);
    createSuccessMessage();
    if (response !== null) {
      window.utility.close(uploadForm);
      uploadControl.value = null;
      hideUpload();
    }
  };

  var onLoadError = function () {
    createMessage(errorTemplate);
    window.utility.close(uploadForm);
    // console.log(message);
  };

  var onFormSubmissionSend = function (evt) {
    evt.preventDefault();
    showUpload();
    window.server.save(new FormData(uploadFormItem), onLoadSuccess, onLoadError);
  };

  uploadFormItem.addEventListener('submit', onFormSubmissionSend);
})();
