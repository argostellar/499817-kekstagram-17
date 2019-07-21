'use strict';

// server.js - взаимодействие с сервером
(function () {
  var GET_URL = 'https://js.dump.academy/kekstagram/data';

  var imgFilter = document.querySelector('.img-filters');

  var load = function (onLoad, onError) {

    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
        // console.log(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open('GET', GET_URL);
    xhr.send();

    imgFilter.classList.remove('img-filters--inactive');
  };

  window.server = (function () {
    return {
      load: load,
      imgFilter: imgFilter
    };
  })();

})();
