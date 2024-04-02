/* Nav icon */
const navBtn = document.querySelector('.header__nav-btn');
const navIcon = document.querySelector('.nav-icon');
const row = document.querySelector('.header__row');

navBtn.addEventListener('click', function () {
    navIcon.classList.toggle('nav-icon--active');
    row.classList.toggle('header__row--mobile');
    document.body.classList.toggle("no-scroll");
    document.body.classList.toggle("position-fixed");
});

/* Slider track */
const track = document.querySelector(".our-works__slider-track");
const slideButtons = document.querySelectorAll(".our-works__btn");
const sliderScrollbar = document.querySelector(".our-works__scrollbar");
const scrollbarThumb = sliderScrollbar.querySelector(".our-works__scrollbar-thumb");
const item = document.querySelector(".our-works__img");

let itemWidth = item.clientWidth;
let gapWidth = parseInt(getComputedStyle(track).getPropertyValue("column-gap"));
let maxScrollLeft = track.scrollWidth - track.clientWidth;

const updateScrollThumbPosition = function () {
    const scrollPosition = track.scrollLeft;
    const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = `${thumbPosition}px`;
}

const handleSlideButton = function () {
    slideButtons[0].disabled = track.scrollLeft <= 0;
    slideButtons[1].disabled = track.scrollLeft >= maxScrollLeft;
}

const initSlider = function () {
    scrollbarThumb.addEventListener("mousedown", function (e) {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

        const handleMouseMove = function (e) {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;

            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            scrollbarThumb.style.left = `${boundedPosition}px`;
            track.scrollLeft = scrollPosition;
        }

        const handleMouseUp = function () {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    slideButtons.forEach(button => {
        button.addEventListener("click", function () {
            const direction = button === slideButtons[0] ? -1 : 1;
            const scrollAmount = (itemWidth + gapWidth) * direction;
            track.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

    track.addEventListener("scroll", function () {
        handleSlideButton();
        updateScrollThumbPosition();
    });
}

const updateSlider = function () {
    itemWidth = item.clientWidth;
    gapWidth = parseInt(getComputedStyle(track).getPropertyValue("column-gap"));
    maxScrollLeft = track.scrollWidth - track.clientWidth;

    updateScrollThumbPosition();
}

window.addEventListener("load", initSlider);
window.addEventListener("resize", updateSlider);

/* Modal window popup-models */
const popupModels = document.querySelector(".popup-models");
const cardsGridModels = document.querySelector(".models__cards");
const cardModels = document.querySelector(".card");
const closeButtonModels = document.querySelector(".popup-models__close");

cardsGridModels.addEventListener("click", function (e) {
    if (e.target.closest(".card")) {
        popupModels.classList.add("popup-models--open");

        document.body.classList.add("no-scroll");
    }
});

closeButtonModels.addEventListener("click", function (e) {
    popupModels.classList.remove("popup-models--open");

    document.body.classList.remove("no-scroll");

})

/* Image switching */
const imagesGrid = document.querySelector(".popup-models__images");
const images = document.querySelectorAll(".popup-models__img");
const mainImg = document.querySelector(".popup-models__main-img");

imagesGrid.addEventListener("click", function (e) {
    for (let i = 0; i < 3; i++) {
        if (e.target.closest(`.popup-models__img_${i + 1}`)) {
            pictureFull = images[i + 1].cloneNode();
            mainImg.innerHTML = "";
            mainImg.append(pictureFull);
        }
    }
});

/* Modal window popup-application */
const popupApplication = document.querySelector(".popup-application");
const openButtonApplication = document.querySelector(".popup-models__btn");
const closeButtonApplication = document.querySelector(".popup-application__close");

openButtonApplication.addEventListener("click", function (e) {
    popupApplication.classList.add("popup-application--open");

    document.body.classList.add("no-scroll");
});

closeButtonApplication.addEventListener("click", function (e) {
    popupApplication.classList.remove("popup-application--open");

    document.body.classList.remove("no-scroll");
})

/* Modal window popup-call */
const popupCall = document.querySelector(".popup-call");
const openButtonCall = document.querySelector(".nav__call");
const closeButtonCall = document.querySelector(".popup-call__close");

openButtonCall.addEventListener("click", function (e) {
    popupCall.classList.add("popup-call--open");

    document.body.classList.add("no-scroll");
});

closeButtonCall.addEventListener("click", function (e) {
    popupCall.classList.remove("popup-call--open");

    document.body.classList.remove("no-scroll");
})

/* Tabs */
function tabs() {
    const tabs = document.querySelectorAll('.tabs');

    tabs.forEach(tab => {
        const tabsBtn = tab.querySelectorAll('.tabs__btn');
        const tabItems = tab.querySelectorAll('.tabs__item');

        tabsBtn.forEach(item => {
            item.addEventListener('click', function () {
                const currentBtn = item;
                const tabId = currentBtn.getAttribute('data-tab');
                const currentTab = document.querySelector(tabId);

                if (!currentBtn.classList.contains('active')) {
                    tabsBtn.forEach(item => {
                        item.classList.remove('active');
                    });

                    tabItems.forEach(item => {
                        item.classList.remove('active');
                    });

                    currentBtn.classList.add('active');
                    currentTab.classList.add('active');
                }
            });
        });

        const selectGaleries = document.querySelector('.tabs__select');

        if (selectGaleries) {
            selectGaleries.addEventListener('change', function (e) {
                const selectedIndex = selectGaleries.selectedIndex;
                const selectedOption = selectGaleries.options[selectedIndex];
                const tabId = selectedOption.getAttribute('data-tab');
                const currentTab = document.querySelector(tabId);

                tabItems.forEach(item => {
                    item.classList.remove('active');
                });

                currentTab.classList.add('active');
            });
        }

        tabsBtn[0].click();
    });
}

tabs();