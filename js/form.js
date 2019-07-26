'use strict';

// form.js - работа с формой загрузки изображения
(function () {
  var uploadForm = window.form.uploadForm;
  var uploadControl = window.form.upload.querySelector('#upload-file');
  var uploadCancel = window.form.upload.querySelector('.img-upload__cancel');

  var onUploadChange = function (evt) {
    if (evt.value !== 0) {
      window.utility.open(uploadForm);
      window.slider.setDefaultConditions();
      document.addEventListener('keydown', onModalEscPress);
    }
  };

  var closeModal = function () {
    window.utility.close(uploadForm);
    document.removeEventListener('keydown', onModalEscPress);
  };

  var onModalEscPress = function (evt) {
    if (evt.keyCode === window.global.ESC) {
      closeModal();
    }
  };

  // обработчик для закрытия окна на enter
  var onModalEnterPress = function (evt) {
    if (evt.keyCode === window.global.ENTER) {
      closeModal();
    }
  };

  var onFieldFocus = function (evt) {
    if (evt.target === commentTextField || evt.target === hashtag) {
      document.removeEventListener('keydown', onModalEscPress);
    }
  };

  var onFieldBlur = function (evt) {
    if (evt.target === commentTextField || evt.target === hashtag) {
      document.addEventListener('keydown', onModalEscPress);
    }
  };

  uploadControl.addEventListener('change', onUploadChange);


  // закрытие формы редактирования загружаемого изображения


  var onCloseClick = function () {
    window.utility.close(uploadForm);
    window.slider.resetConditions();
  };

  uploadCancel.addEventListener('click', onCloseClick);

  // 4.2 ---------------------------------------------------------


  uploadCancel.addEventListener('keydown', onModalEscPress);
  uploadCancel.addEventListener('keydown', onModalEnterPress);

  var text = document.querySelector('.text');
  var commentTextField = text.querySelector('.text__description');
  var hashtag = text.querySelector('.text__hashtags');

  hashtag.addEventListener('blur', onFieldBlur);
  hashtag.addEventListener('focus', onFieldFocus);

  commentTextField.addEventListener('blur', onFieldBlur);
  commentTextField.addEventListener('focus', onFieldFocus);

  var onClosePressEsc = function () {
    window.utility.close(uploadForm);
    window.slider.resetConditions();
    document.removeEventListener('keydown', onClosePressEsc);
  };

  uploadCancel.addEventListener('keydown', onClosePressEsc);
})();
