'use strict';

// form-image.js - загрузка изображения в форму редактирования
(function () {
  // Иконка пользователя
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var input = window.form.uploadControl;
  var image = window.form.previewImage;

  input.addEventListener('change', function () {
    var file = input.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        image.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
