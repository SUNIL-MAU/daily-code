let currentSlide = 0;

function moveSlider(direction) {
  const slider = document.querySelector(".card-slider");
  const cards = document.querySelectorAll(".card");
  const cardWidth = cards[0].offsetWidth + 30; // Including margin
  const visibleCards = Math.floor(
    document.querySelector(".card-wrapper").offsetWidth / cardWidth
  );
  const totalCards = cards.length;

  // Update currentSlide based on direction
  currentSlide += direction;

  // Infinite scrolling logic: wrap around when reaching end or start
  if (currentSlide < 0) {
    currentSlide = totalCards - visibleCards;
    slider.style.transition = "none"; // Disable transition for seamless wrapping
    slider.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
    setTimeout(() => {
      slider.style.transition = "transform 0.5s ease-in-out"; // Re-enable transition
    }, 0);
  } else if (currentSlide >= totalCards) {
    currentSlide = 0;
    slider.style.transition = "none";
    slider.style.transform = `translateX(0)`;
    setTimeout(() => {
      slider.style.transition = "transform 0.5s ease-in-out";
    }, 0);
  }

  // Normal move slider for current card set
  slider.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
}

window.addEventListener("resize", () => {
  // Recalculate the slider when window is resized
  moveSlider(0);
});
