var mainMenu = (function () {
  var mainMenu = {};

  mainMenu.show = function () {
    document.querySelector("body").classList.add("main-menu-opened");
  };

  mainMenu.hide = function () {
    document.querySelector("body").classList.remove("main-menu-opened");
  };

  mainMenu.selectPage = function (element) {
    var targetPage = document.querySelector(element);

    if (!targetPage) {
      return;
    }

    var targetPageOrder = 0;
    var pages = document.querySelectorAll(".main-nav .nav-page");

    for (let i = 0; i < pages.length; i++) {
      if (pages[i].id === targetPage.id) {
        targetPageOrder = i;
      }

      pages[i].classList.remove("selected");
    }

    for (let i = 0; i < pages.length; i++) {
      pages[i].style.left = "-" + targetPageOrder * 100 + "%";
    }

    targetPage.classList.add("selected");
  };

  return {
    show: mainMenu.show,
    hide: mainMenu.hide,
    selectPage: mainMenu.selectPage,
  };
})();
