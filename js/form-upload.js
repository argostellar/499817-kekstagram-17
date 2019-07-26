'use strict';

// form-upload.js - модуль, который отвечает за отправку данных формы на сервер;
(function () {
  var uploadControl = window.form.uploadControl;
  var uploadForm = window.form.uploadForm;
  var uploadFormItem = window.form.upload.querySelector('.img-upload__form');

  var successTemplate = document.querySelector('#success');
  var errorTemplate = document.querySelector('#error');
  var main = document.querySelector('main');

  var createMessage = function (template) {
    var message = template.content.cloneNode(true);
    main.appendChild(message);
    if (template === successTemplate) {
      var successButton = message.querySelector('.success__button');
      var onSuccessButtonClick = function () {
        window.utility.close(message);
        successButton.removeEventListener('click', onSuccessButtonClick);
      };
      successButton.addEventListener('click', onSuccessButtonClick);
    } else if (template === errorTemplate) {
      var errorButton = message.querySelector('.error__button');
      var onErrorButtonClick = function () {
        window.utility.close(message);
        errorButton.removeEventListener('click', onErrorButtonClick);
      };
      errorButton.addEventListener('click', onErrorButtonClick);
    }

    var onEscPressClose = function (evt) {
      if (evt.keycode === window.global.ESC) {
        window.utility.close(message);
        document.removeEventListener('keydown', onEscPressClose);
      }
    };

    var onOutsideAreaClickClose = function (evt) {
      if (evt.currentTarget !== message) {
        window.utility.close(message);
        document.removeEventListener('click', onOutsideAreaClickClose);
      }
    };

    document.addEventListener('keydown', onEscPressClose);
    document.addEventListener('click', onOutsideAreaClickClose);
  };

  var onLoadSuccess = function (message) {
    if (message === true) {
      createMessage(successTemplate);
      uploadControl.value = null;
    }
    // console.log(message);
  };

  var onLoadError = function (message) {
    if (message === true) {
      createMessage(errorTemplate);
    }
    // console.log(message);
  };

  var onFormSubmissionSend = function (evt) {
    evt.preventDefault();
    window.server.save(new FormData(uploadFormItem), onLoadSuccess, onLoadError);
    window.utility.close(uploadForm);
  };

  uploadFormItem.addEventListener('submit', onFormSubmissionSend);
})();
