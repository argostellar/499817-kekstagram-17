'use strict';

// form-global.js - глобальные форм и переменные
(function () {
  var upload = document.querySelector('.img-upload');
  var uploadControl = upload.querySelector('#upload-file');
  var uploadForm = upload.querySelector('.img-upload__overlay');
  var preview = uploadForm.querySelector('.img-upload__preview');
  var previewImage = preview.querySelector('img');
  var scale = uploadForm.querySelector('.scale');
  var scaleValue = scale.querySelector('.scale__control--value');
  var effectLevel = upload.querySelector('.effect-level');
  var text = document.querySelector('.text');
  var commentTextField = text.querySelector('.text__description');
  var hashtag = text.querySelector('.text__hashtags');

  var Value = {
    BASIC: 100,
    STEP: 25,
    MAX: 100,
    MIN: 25
  };

  var basicScaleValue = Value.BASIC + '%';

  var clearForm = function () {
    uploadControl.value = '';
    hashtag.value = '';
    commentTextField.value = '';
  };


  window.form = {
    upload: upload,
    uploadControl: uploadControl,
    uploadForm: uploadForm,
    previewImage: previewImage,
    scale: scale,
    scaleValue: scaleValue,
    effectLevel: effectLevel,
    text: text,
    commentTextField: commentTextField,
    hashtag: hashtag,
    Value: Value,
    basicScaleValue: basicScaleValue,
    clearForm: clearForm
  };

})();
