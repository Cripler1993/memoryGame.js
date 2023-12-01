const cards = document.querySelectorAll(".card");
const count = document.querySelector(".counter__value");
const modalwrapper = document.querySelector(".modal__wrapper");
const counter = document.querySelector(".counter");

let cardOne;
let cardTwo;
let matchedCards = 0;
let disableDesk = false;

// кликая по любому из элементов переменной card, используем функция flipCard
cards.forEach(function (elem) {
  elem.addEventListener("click", flipCard);
});

//функция принимает параметр эвент
// переменная кликед кард определяется как свойство таргет.
// если cardOne не определена
// переменная card one определяется как clicked card(площадь по которой кликнули)
// кликнутой карте добавляем класс флип

function flipCard(event) {
  let clickedCard = event.target;
  if (!disableDesk && clickedCard != cardOne) {
    clickedCard.classList.add("flip");
    if (!cardOne) {
      cardOne = clickedCard;
      return;
    }
    cardTwo = clickedCard;
    disableDesk = true;
    let firstLink = cardOne.querySelector("img").src;
    let secondLink = cardTwo.querySelector("img").src;
    compareCards(firstLink, secondLink);
  }
}

function compareCards(img1, img2) {
  if (img1 == img2) {
    matchedCards++;
    count.innerText = matchedCards;
    if (matchedCards == 8) {
      setTimeout(function () {
        counter.classList.add("hidden");
        modalwrapper.classList.add("active");
        return;
      }, 1000);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = "";
    cardTwo = "";
    disableDesk = false;
    return;
  }
  setTimeout(function () {
    cardOne.classList.remove("flip");
    cardTwo.classList.remove("flip");
    cardOne = "";
    cardTwo = "";
    disableDesk = false;
  }, 1000);
}
