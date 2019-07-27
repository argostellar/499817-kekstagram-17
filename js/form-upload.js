'use strict';

// form-upload.js - модуль, который отвечает за отправку данных формы на сервер;
(function () {
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

  var showUpload = function () {
    var uploadMessage = createUploadMessage();
    main.appendChild(uploadMessage);
  };

  var hideUpload = function () {
    var currentMessage = main.querySelector('.img-upload__message--loading');
    main.removeChild(currentMessage);
  };

  var createMessage = function (template) {
    var message = template.content.cloneNode(true);
    var currentBlock = '';
    var innerBlock = '';
    main.appendChild(message);
    if (template === successTemplate) {
      currentBlock = main.querySelector('.success');
      innerBlock = main.querySelector('.success__inner');
      var successButton = currentBlock.querySelector('.success__button');
      var onSuccessButtonClick = function () {
        main.removeChild(currentBlock);
        successButton.removeEventListener('click', onSuccessButtonClick);
        document.removeEventListener('click', onOutsideAreaClickClose);
        document.removeEventListener('keydown', onEscPressClose);
      };
      successButton.addEventListener('click', onSuccessButtonClick);
    } else if (template === errorTemplate) {
      currentBlock = main.querySelector('.error');
      innerBlock = main.querySelector('.error__inner');
      var errorButtons = currentBlock.querySelectorAll('.error__button');
      errorButtons.forEach(function (errorButton) {
        var onErrorButtonClick = function () {
          main.removeChild(currentBlock);
          errorButton.removeEventListener('click', onErrorButtonClick);
          document.removeEventListener('click', onOutsideAreaClickClose);
          document.removeEventListener('keydown', onEscPressClose);
        };
        errorButton.addEventListener('click', onErrorButtonClick);
      });
    }

    var onEscPressClose = function (evt) {
      if (evt.keyCode === window.global.ESC) {
        main.removeChild(currentBlock);
        document.removeEventListener('keydown', onEscPressClose);
        document.removeEventListener('click', onOutsideAreaClickClose);
      }
    };

    var onOutsideAreaClickClose = function (evt) {
      if (evt.target !== innerBlock && evt.target === currentBlock) {
        main.removeChild(currentBlock);
        document.removeEventListener('click', onOutsideAreaClickClose);
        document.removeEventListener('keydown', onEscPressClose);
      }
    };

    document.addEventListener('keydown', onEscPressClose);
    document.addEventListener('click', onOutsideAreaClickClose);
  };

  var onLoadSuccess = function (response) {
    createMessage(successTemplate);
    if (response !== null) {
      window.utility.close(uploadForm);
      window.form.clearForm();
      window.slider.setDefaultConditions();
      window.slider.resetConditions();
      window.slider.resetRadio();
      hideUpload();
    }
  };

  var onLoadError = function (response) {
    if (response !== null) {
      createMessage(errorTemplate);
      window.utility.close(uploadForm);
      window.form.clearForm();
      hideUpload();
    }
  };

  var onFormSubmissionSend = function (evt) {
    evt.preventDefault();
    showUpload();
    window.server.save(new FormData(uploadFormItem), onLoadSuccess, onLoadError);
  };

  uploadFormItem.addEventListener('submit', onFormSubmissionSend);
})();
