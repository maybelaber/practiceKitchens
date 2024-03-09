/* Nav icon */
const navBtn = document.querySelector('.header__nav-btn');
const navIcon = document.querySelector('.nav-icon');
const row = document.querySelector('.header__row');

navBtn.addEventListener('click', function () {
    navIcon.classList.toggle('nav-icon--active');
    row.classList.toggle('header__row--mobile');
    document.body.classList.toggle("no-scroll");
});

/* Slider track */
const track = document.querySelector(".our-works__slider-track");
const slideButtons = document.querySelectorAll(".our-works__btn");
const sliderscrollbar = document.querySelector(".our-works__scrollbar");
const scrollbarThumb = sliderscrollbar.querySelector(".our-works__scrollbar-thumb");
const item = document.querySelector(".our-works__img");

let itemWidth = item.clientWidth;
let gapWidth = parseInt(getComputedStyle(track).getPropertyValue("column-gap"));
let maxScrollLeft = track.scrollWidth - track.clientWidth;

const updateScrollThumbPosition = function () {
    const scrollPosition = track.scrollLeft;
    const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderscrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = `${thumbPosition}px`
}

const handleSlideButton = function () {
    slideButtons[0].disabled = track.scrollLeft <= 0;
    slideButtons[1].disabled = track.scrollLeft >= maxScrollLeft;
}

const initSlider = function () {
    scrollbarThumb.addEventListener("mousedown", function (e) {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        const maxThumbPosition = sliderscrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

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