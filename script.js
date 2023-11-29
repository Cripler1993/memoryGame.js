const cards = document.querySelectorAll(".card");

let cardOne;
let cardTwo;
let matchedCards = 0;

cards.forEach(function (elem) {
  elem.addEventListener("click", flipCard);
});

function flipCard(event) {
  let clickedCard = event.target;
  if (!cardOne) {
    cardOne = clickedCard;
    return;
  }
  clickedCard.classList.add("flip");
}
