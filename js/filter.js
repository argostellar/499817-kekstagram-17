'use strict';

// filter.js - фильтрация изображений по параметрам
(function () {
  // Получение данных через xhr запрос
  var unsortedPhotos = [];
  var onLoadSuccess = function (photos) {
    unsortedPhotos = photos.slice();
  };
  var onLoadError = function (errorMessage) {
    window.utility.createMessage('red', errorMessage);
  };
  window.server.load(onLoadSuccess, onLoadError);

  var filters = window.server.imgFilter;
  var filterPopular = filters.querySelector('#filter-popular');
  var filterNew = filters.querySelector('#filter-new');
  var filterDiscussed = filters.querySelector('#filter-discussed');

  var OVERLIMIT_PHOTOS = 15;
  var currentPhotos = [];

  var getPopularSorting = function () {
    // Популярные — фотографии в изначальном порядке;
    currentPhotos = unsortedPhotos;

    filterPopular.classList.add('img-filters__button--active');
    filterNew.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');

    window.clear();
    window.render(currentPhotos);
  };
  var getNewSorting = function () {
    // Новые — 10 случайных, не повторяющихся фотографий;
    currentPhotos =
      unsortedPhotos.slice().sort(function () {
        var leftScore = window.utility.getRandomNumber();
        var rightScore = window.utility.getRandomNumber();
        window.utility.compareValues(leftScore, rightScore);
      })
      .splice(-(unsortedPhotos.length - OVERLIMIT_PHOTOS));

    filterPopular.classList.remove('img-filters__button--active');
    filterNew.classList.add('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');

    window.clear();
    window.render(currentPhotos);
    // window.debounce();
  };
  var getDiscussedSorting = function () {
    // Обсуждаемые — фотографии, отсортированные
    // в порядке убывания количества комментариев.
    currentPhotos =
      unsortedPhotos.slice().sort(function (left, right) {
        // менять поведение, смотреть как работает .sort
        var leftScore = left.comments.length;
        var rightScore = right.comments.length;
        window.utility.compareValues(leftScore, rightScore);
      });

    filterPopular.classList.remove('img-filters__button--active');
    filterNew.classList.remove('img-filters__button--active');
    filterDiscussed.classList.add('img-filters__button--active');

    window.clear();
    window.render(currentPhotos);
  };

  var onClickSort = function (evt) {
    if (evt.target === filterPopular) {
      getPopularSorting();
    } else if (evt.target === filterNew) {
      getNewSorting();
    } else if (evt.target === filterDiscussed) {
      getDiscussedSorting();
    }
  };

  filterPopular.addEventListener('click', onClickSort);
  filterNew.addEventListener('click', onClickSort);
  filterDiscussed.addEventListener('click', onClickSort);

})();
