window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(document.querySelectorAll('.tel'), function (input) {
    var keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___ ____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i)
      }
      var reg = matrix.substr(0, this.value.length).replace(/_+/g,
        function (a) {
          return "\\d{1," + a.length + "}"
        }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5) this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

  });

});
document.addEventListener("DOMContentLoaded", () => {
  var accordeonButtons = document.getElementsByClassName("accordeon__button");

  //пишем событие при клике на кнопки - вызов функции toggle
  for (var i = 0; i < accordeonButtons.length; i++) {
    var accordeonButton = accordeonButtons[i];

    accordeonButton.addEventListener("click", toggleItems, false);
  }

  //пишем функцию
  function toggleItems() {

    // переменная кнопки(актульная) с классом
    var itemClass = this.className;

    // добавляем всем кнопкам класс close
    for (var i = 0; i < accordeonButtons.length; i++) {
      accordeonButtons[i].className = "accordeon__button closed";
    }

    // закрываем все открытые панели с текстом
    var pannels = document.getElementsByClassName("accordeon__panel");
    for (var z = 0; z < pannels.length; z++) {
      pannels[z].style.maxHeight = 0;
    }

    // проверка. если кнопка имеет класс close при нажатии
    // к актуальной(нажатой) кнопке добававляем активный класс
    // а панели - которая находится рядом задаем высоту
    if (itemClass == "accordeon__button closed") {
      this.className = "accordeon__button active";
      var panel = this.nextElementSibling;
      panel.style.maxHeight = panel.scrollHeight + "px";
    }

  }
});

document.addEventListener('DOMContentLoaded', function () {
  $('.articmodal-close').click(function (e) {
    $.arcticmodal('close');

  });
  $('.a1').click(function (e) {
    e.preventDefault();
    $('#popup-call').arcticmodal({
    });
  });
  $('.a2, .link').click(function (e) {
    e.preventDefault();
    $('#popup-call2').arcticmodal({
    });
  });

});
document.addEventListener("DOMContentLoaded", () => {
  $(document).ready(function () {
    $('[data-submit]').on('click', function (e) {
      e.preventDefault();
      $(this).parents('form').submit();
    })
    $.validator.addMethod(
      "regex",
      function (value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
      },
      "Please check your input."
    );
    function valEl(el) {

      el.validate({
        rules: {
          tel: {
            required: true,
            regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
          },
          name: {
            required: true
          },
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          tel: {
            required: 'Заполните поле',
            regex: 'Телефон может содержать символы + - ()'
          },
          name: {
            required: 'Заполните поле',
          },
          text: {
            required: 'Заполните поле',
          },
          email: {
            required: 'Заполните поле',
            email: 'Неверный формат E-mail'
          }
        },
        submitHandler: function (form) {
          $('#loader').fadeIn();
          var $form = $(form);
          var $formId = $(form).attr('id');
          switch ($formId) {
            case 'popupResult':
              $.ajax({
                type: 'POST',
                url: $form.attr('action'),
                data: $form.serialize(),
              })
                .always(function (response) {
                  setTimeout(function () {
                    $('#loader').fadeOut();
                  }, 800);
                  setTimeout(function () {
                    $.arcticmodal('close');
                    $('#popup-thank').arcticmodal({});
                    $form.trigger('reset');
                    //строки для остлеживания целей в Я.Метрике и Google Analytics
                  }, 1100);

                });
              break;
          }
          return false;
        }
      })
    }

    $('.js-form').each(function () {
      valEl($(this));
    });
    $('[data-scroll]').on('click', function () {
      $('html, body').animate({
        scrollTop: $($.attr(this, 'data-scroll')).offset().top
      }, 2000);
      event.preventDefault();
    })
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const catalogLink = document.querySelector(".catalog");
  const accordeon = document.querySelector(".menu__accordeon");
  const menuBtns = document.querySelectorAll(".menu__btn");

  // Открытие/закрытие каталога
  catalogLink.addEventListener("click", function (e) {
    e.preventDefault();
    this.classList.toggle("active");
    accordeon.classList.toggle("open");
  });

  // Открытие/закрытие пунктов внутри аккордеона
  menuBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      // Закрываем все остальные
      menuBtns.forEach(b => {
        if (b !== this) {
          b.classList.remove("active");
          b.nextElementSibling.style.maxHeight = null;
        }
      });

      this.classList.toggle("active");

      const content = this.nextElementSibling;
      if (this.classList.contains("active")) {
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        content.style.maxHeight = null;
      }
    });
  });
});
document.addEventListener('DOMContentLoaded', function () {
  const swiper1 = new Swiper('.swiper1', {
    slidesPerView: 'auto',
    navigation: {
      nextEl: '.swiper-button-next1',
      prevEl: '.swiper-button-prev1',
    },
    allowTouchMove: window.innerWidth <= 1200, // разрешить свайп только на мобилках
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 0,
        loop: true,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 10,
        slidesPerView: 2
      },
      992: {
        spaceBetween: 20,
        slidesPerView: 2
      },
      1200: {
        slidesPerView: 'auto'
      }
    }
  });
  window.swiper2 = new Swiper('.swiper2', {
    speed: 800, // скорость анимации
    loop: true,
    autoHeight: true,
    slidesPerView: 1,
    spaceBetween: 0,

    effect: "fade", // эффект плавного исчезновения/появления
    fadeEffect: {
      crossFade: true // плавное перекрытие
    },

    pagination: {
      el: ".swiper-pagination2",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next2",
      prevEl: ".swiper-button-prev2",
    },
    observer: true,
    observeParents: true,
    observeSlideChildren: true,

    on: {
      slideChangeTransitionStart: () => {
        document.querySelectorAll('.swiper-slide .info__box').forEach(box => {
          box.classList.remove('fade-up');
        });
      },
      slideChangeTransitionEnd: () => {
        const activeSlide = document.querySelector('.swiper-slide-active .info__box');
        if (activeSlide) {
          activeSlide.classList.add('fade-up');
        }
      }
    }
  });
  const swiper3 = new Swiper('.swiper3', {
    slidesPerView: '1',
    spaceBetween: 10,
    navigation: {
      nextEl: '.swiper-button-next3',
      prevEl: '.swiper-button-prev3',
    },
    pagination: {
      el: ".swiper-pagination3",
      clickable: true,
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 10,
        loop: true,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 10,
        slidesPerView: 1
      },
      992: {
        spaceBetween: 10,
        slidesPerView: 1
      },
      1200: {
        slidesPerView: '1',
        spaceBetween: 10,
      }
    }
  });
  const swiper4 = new Swiper('.swiper4', {
    slidesPerView: '3',
    spaceBetween: 40,
    navigation: {
      nextEl: '.swiper-button-next4',
      prevEl: '.swiper-button-prev4',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        spaceBetween: 20,
        slidesPerView: 2
      },
      576: {
        spaceBetween: 10,
        slidesPerView: 2
      },
      767: {
        spaceBetween: 10,
        slidesPerView: 2
      },
      992: {
        spaceBetween: 20,
        slidesPerView: 2
      },
      1200: {
        slidesPerView: '3',
        spaceBetween: 40,
      }
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".inf").forEach(infoBlock => {
    const links = infoBlock.querySelectorAll(".info__link");
    const contents = infoBlock.querySelectorAll(".info__content");

    links.forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        const target = this.getAttribute("data-target");

        // Убираем active у всех ссылок в текущем блоке
        links.forEach(l => l.classList.remove("active"));

        // Ставим active на все ссылки в текущем блоке с таким же target
        infoBlock.querySelectorAll(`.info__link[data-target="${target}"]`)
          .forEach(l => l.classList.add("active"));

        // Скрываем все контенты в текущем блоке
        contents.forEach(c => c.style.display = "none");

        // Показываем все контенты в текущем блоке с таким же target
        infoBlock.querySelectorAll(`.info__content[data-target="${target}"]`)
          .forEach(c => c.style.display = "flex");
      });
    });

    // Показываем первую группу в каждом блоке
    const firstTarget = links[0]?.getAttribute("data-target");
    if (firstTarget) {
      infoBlock.querySelectorAll(`.info__content[data-target="${firstTarget}"]`)
        .forEach(c => c.style.display = "flex");
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  let menuBtn = document.querySelector('.menu-btn');
  let menu = document.querySelector('.menu');
  menuBtn.addEventListener('click', function () {
    menuBtn.classList.toggle('active');
    menu.classList.toggle('active');
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const filterBtn = document.querySelector(".filter-open");
  const closeBtn = document.querySelector(".close");

  if (filterBtn && closeBtn) {
    filterBtn.addEventListener("click", () => {
      // переключаем display
      if (closeBtn.style.display === "none" || closeBtn.style.display === "") {
        closeBtn.style.display = "block";
      } else {
        closeBtn.style.display = "none";
      }
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const рычаги = document.querySelectorAll(".show");

  рычаги.forEach(рычаг => {
    const дверца = рычаг.nextElementSibling; // соседний блок (.info__right)
    const табличка = рычаг.querySelector("p");

    рычаг.addEventListener("click", () => {
      рычаг.classList.toggle("active");
      дверца.classList.toggle("visible");

      if (рычаг.classList.contains("active")) {
        табличка.textContent = "Свернуть описание региона";
      } else {
        табличка.textContent = "Развернуть описание региона";
      }

      // 👉 обновляем высоту swiper2
      if (window.swiper2 && typeof window.swiper2.updateAutoHeight === "function") {
        // небольшая задержка, чтобы браузер успел применить изменения высоты
        setTimeout(() => {
          window.swiper2.updateAutoHeight(300);
        }, 50);
      }
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {

  (function ($) {
    var elActive = '';
    $.fn.selectCF = function (options) {

      var settings = $.extend({
        color: "#888888",
        backgroundColor: "#FFFFFF",
        change: function () { },
      }, options);

      return this.each(function () {

        var selectParent = $(this);
        list = [],
          html = '';

        var width = $(selectParent).width();
        $(selectParent).hide();

        if ($(selectParent).children('option').length == 0) { return; }

        $(selectParent).children('option').each(function () {
          if ($(this).is(':selected')) { s = 1; title = $(this).text(); } else { s = 0; }
          list.push({
            value: $(this).attr('value'),
            text: $(this).text(),
            selected: s,
          })
        })

        var style = " background: " + settings.backgroundColor + "; color: " + settings.color + " ";

        html += "<ul class='selectCF'>";
        html += "<li>";
        html += "<span class='arrowCF ion-chevron-right' style='" + style + "'></span>";
        html += "<span class='titleCF' style='" + style + "; width:" + width + "px'>" + title + "</span>";
        html += "<span class='searchCF' style='" + style + "; width:" + width + "px'><input style='color:" + settings.color + "' /></span>";
        html += "<ul>";
        $.each(list, function (k, v) {
          s = (v.selected == 1) ? "selected" : "";
          html += "<li value='" + v.value + "' class='" + s + "'>" + v.text + "</li>";
        })
        html += "</ul>";
        html += "</li>";
        html += "</ul>";

        $(selectParent).after(html);
        var customSelect = $(this).next('ul.selectCF');
        var seachEl = customSelect.children('li').children('.searchCF');
        var seachElOption = customSelect.children('li').children('ul').children('li');
        var seachElInput = seachEl.children('input');

        $(customSelect).unbind('click').bind('click', function (e) {
          e.stopPropagation();
          if ($(this).hasClass('onCF')) {
            elActive = '';
            $(this).removeClass('onCF');
            $(this).removeClass('searchActive'); seachElInput.val('');
            seachElOption.show();
          } else {
            if (elActive != '') {
              $(elActive).removeClass('onCF');
              $(elActive).removeClass('searchActive'); seachElInput.val('');
              seachElOption.show();
            }
            elActive = $(this);
            $(this).addClass('onCF');
            seachEl.children('input').focus();
          }
        })

        var optionSelect = customSelect.children('li').children('ul').children('li');
        $(optionSelect).bind('click', function (e) {
          var value = $(this).attr('value');
          if (!$(this).hasClass('selected')) {
            $(optionSelect).removeClass('selected');
            $(this).addClass('selected');
            customSelect.children('li').children('.titleCF').html($(this).html());
            $(selectParent).val(value);
            settings.change.call(selectParent);
          }
        })

        seachEl.children('input').bind('keyup', function (e) {
          var value = $(this).val();
          if (value) {
            customSelect.addClass('searchActive');
            seachElOption.each(function () {
              if ($(this).text().search(new RegExp(value, "i")) < 0) {
                $(this).fadeOut();
              } else {
                $(this).fadeIn();
              }
            })
          } else {
            customSelect.removeClass('searchActive');
            seachElOption.fadeIn();
          }
        })
      });
    };
    $(document).click(function () {
      if (elActive != '') {
        $(elActive).removeClass('onCF');
        $(elActive).removeClass('searchActive');
      }
    })
  }(jQuery));

  $(function () {
    var clearBtn = $(".clear-filters");

    $(".select").selectCF({
      change: function () {
        let hasSelected = false;
        $(".select").each(function () {
          if ($(this).val() !== "") {
            hasSelected = true;
          }
        });

        if (hasSelected) {
          clearBtn.show();
        } else {
          clearBtn.hide();
        }
      }
    });

    clearBtn.on("click", function () {
      $(".select").each(function () {
        $(this).val("");
        var firstOption = $(this).find("option:first").text();
        var customSelect = $(this).next(".selectCF");

        customSelect.find(".titleCF").text(firstOption);
        customSelect.find("li").removeClass("selected");
        customSelect.find("li[value='']").addClass("selected");
      });

      $(this).hide();
    });
  });

});
document.addEventListener("DOMContentLoaded", () => {
  $(document).ready(function () {
    $(".youtube-link").grtyoutube({
      autoPlay: true
    });
  });

  (function ($) {

    $.fn.grtyoutube = function (options) {

      return this.each(function () {

        // Get video ID
        var getvideoid = $(this).attr("youtubeid");

        // Default options
        var settings = $.extend({
          videoID: getvideoid,
          autoPlay: true
        }, options);

        // Convert some values
        if (settings.autoPlay === true) { settings.autoPlay = 1 } else { settings.autoPlay = 0 }

        // Initialize on click
        if (getvideoid) {
          $(this).on("click", function () {
            $("body").append('<div class="grtvideo-popup">' +
              '<div class="grtvideo-popup-content">' +
              '<span class="grtvideo-popup-close">&times;</span>' +
              '<iframe class="grtyoutube-iframe" src="https://www.youtube.com/embed/' + settings.videoID + '?rel=0&wmode=transparent&autoplay=' + settings.autoPlay + '&iv_load_policy=3" allowfullscreen frameborder="0"></iframe>' +
              '</div>' +
              '</div>');
          });
        }

        // Close the box on click or escape
        $(this).on('click', function (event) {
          event.preventDefault();
          $(".grtvideo-popup-close, .grtvideo-popup").click(function () {
            $(".grtvideo-popup").remove();
          });
        });

        $(document).keyup(function (event) {
          if (event.keyCode == 27) {
            $(".grtvideo-popup").remove();
          }
        });
      });
    };
  }(jQuery));
});
// Замена <img class="svg"> на inline SVG
document.addEventListener("DOMContentLoaded", () => {
  const svgImages = document.querySelectorAll('img.svg');

  svgImages.forEach(img => {
    const imgURL = img.getAttribute('src');

    fetch(imgURL)
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'image/svg+xml');
        let svg = xmlDoc.querySelector('svg');

        if (!svg) return;

        // Перенос ID
        if (img.id) {
          svg.setAttribute('id', img.id);
        }

        // Перенос классов
        const classes = img.getAttribute('class');
        if (classes) {
          svg.setAttribute('class', `${classes} replaced-svg`);
        }

        // Удаление некорректных xmlns
        svg.removeAttribute('xmlns:a');

        // Добавление viewBox, если его нет
        if (!svg.getAttribute('viewBox') && svg.getAttribute('height') && svg.getAttribute('width')) {
          svg.setAttribute('viewBox', `0 0 ${svg.getAttribute('width')} ${svg.getAttribute('height')}`);
        }

        // Замена <img> на <svg>
        img.parentNode.replaceChild(svg, img);
      })
      .catch(error => {
        console.error(`Ошибка при загрузке SVG: ${imgURL}`, error);
      });
  });
});

