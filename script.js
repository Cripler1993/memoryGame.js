const cards = document.querySelectorAll(".card");
const count = document.querySelector(".counter__value");
const modalwrapper = document.querySelector(".modal__wrapper");
const counter = document.querySelector(".counter");
const modalCloseBtn = document.querySelector(".modal__btn");

let cardOne;
let cardTwo;
let matchedCards = 0;
// блокируем доску изначально отрицаем засчет булевского значения
let disableDesk = false;

shuffleCards();

// если переменная disable desk false?? и переменная clickedCard не равна cardOne
// кликнутой карте добавляем класс флип
// если cardOne не определена
// переменная card one определяется как clicked card(площадь по которой кликнули)
// заканчиваем функцию
// сardTwo определяем так же как ClickedCard
// disableDesk получает значение true, таким образом не можем нажать на другие карты и начать цикл сравнения

//определяем две переменные firLink и secLink как сслыку на изображение. С помощью
// метода querySelector спускаемся к ребенку кликнутой первой и второй карты(cardOne и cardTwo)

// записываем функцию compareCards которая принимает в себя как аргументы переменные firLink и secLink

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

// объявляем функцию compareCards которая на вход принимает два параметра (img1, img2)

//  если img1 равна img2, то увеличиваем значение matchedCards на 1
// так же в текст константы каунт записываем значение переменной matchedCards
// внутри первой if инструкции открываем второе условие "если matchedCards равна 8", то
// используем функцию задержки и внутри добавляем константе count(счетчик) класс hidden
// и константе modalWrapper добавляем класс active
// заканчиваем выполнение функции задержки

// так же если значение истинно у переменной cardOne и cardTwo убираем возмжоность осуществления клика
// обнуляем переменные cardOne и cardTwo
// переменная disableDesk приобретает значение false, таким образом снова можем осуществить клик по карте
// заканчиваем выполнение функции

// если условие If не выполняется(ложно), то мы пользуемся функцией встроенной задержки
// убираем класс flip у переменных cardOne и cardTwo
// обнуляем значение переменных cardOne и cardTwo
// переменная disableDesk приобретает значение false

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
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);
  setTimeout(function () {
    cardOne.classList.remove("flip", "shake");
    cardTwo.classList.remove("flip", "shake");
    cardOne = "";
    cardTwo = "";
    disableDesk = false;
  }, 1000);
}

//объявляем функцию shuffleCards которая перемешивает карты в произвольном порядке
// обнуляем значения переменных cardOne и cardTwo
// обнуляем переменную matchedCards, присваиваем значение false переменной disableDesk
// счетчику присваиваем значение matchedCards
// создаем массив из 16 чисел, который впоследствии присвоим как порядковые номера каждой паре карточек
// сортируем массив numberArr, объявляем условие по принципу которого будет сортироваться массив

// начинаем процесс перемешивания
// убираем у всех карт активный класс flip
// объявляем переменную в которую присваиваем html элемент картинки
// в src картинки присваиваем значение из массива
// добавляем слушатели на картояки (т.к. ранее убирали их чтобы нельзя было кликнуть на уже открытые карточки)

function shuffleCards() {
  cardOne = "";
  cardTwo = "";
  matchedCards = 0;
  disableDesk = false;
  count.innerText = matchedCards;
  let numberArr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  numberArr.sort(function () {
    if (Math.random() > 0.5) {
      return 1;
    } else {
      return -1;
    }
  });
  cards.forEach(function (elem, index) {
    elem.classList.remove("flip");
    let cardImg = elem.querySelector("img");
    cardImg.src = `./img/img-${numberArr[index]}.png`;
    elem.addEventListener("click", flipCard);
  });
}

//добавляем слушатель на кнопку закрытия
// делаем счетчик видимым
// скрываем модальное окно выигрыша
// добавляем функцию перемешивания карточек

modalCloseBtn.addEventListener("click", function () {
  counter.classList.remove("hidden");
  modalwrapper.classList.remove("active");
  shuffleCards();
});
