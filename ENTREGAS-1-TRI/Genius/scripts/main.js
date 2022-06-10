import Game from "./game.js";

const mainGenius = document.getElementById("genius");
const menu = document.getElementById("menu");
const button = menu.querySelector("button");
const points = menu.querySelector("p");

const mainCounter = document.getElementById("counter");
const textCounter = mainCounter.querySelector("h1");

let isPlayerError = false;
let game = new Game(mainGenius);

button.addEventListener("click", () => {
  if (button.innerHTML == "Parar") {
    clearGenius();
    return;
  }

  mainCounter.classList.remove("notVisibility");

  counterStart(3);
});

let currentColorPosition = 0;

mainGenius.addEventListener("click", (event) => {
  if (!game.isPlayerPlaying) {
    return;
  }

  if (!game.isPlayerTurn && isPlayerError) {
    return;
  }

  if (!game.isCorrectColor(event.target, currentColorPosition)) {
    isPlayerError = true;
    event.target.addEventListener(
      "animationend",
      () => {
        clearGenius();
        let counter = 2;
        const idInterval = setInterval(() => {
          if (counter < 0) {
            clearInterval(idInterval);
            return;
          }
          game.colorsElementList.forEach((element) => {
            game.playAnimation(element);
          });
          counter--;
        }, 500);
      },
      { once: true }
    );
    return;
  }

  currentColorPosition++;

  if (currentColorPosition >= game.sequence.length) {
    currentColorPosition = 0;
    setTimeout(() => {
      game.nextTurn();
      points.innerHTML = `${game.playerPoints}`;
    }, 3 * 500);
  }
});

mainGenius.addEventListener("click", (event) => {
  if (!game.isPlayerTurn && isPlayerError) {
    return;
  }

  game.playAnimation(event.target);
});

function clearGenius() {
  game = new Game(mainGenius);
  button.innerHTML = "Iniciar";
  points.innerHTML = "0";
  isPlayerError = false;
}

function counterStart(counter) {
  if (counter < 0) {
    mainCounter.classList.add("notVisibility");
    setTimeout(() => {
      game = new Game(mainGenius);

      button.innerHTML = "Parar";

      game.nextTurn();
    }, 500);
    return;
  }

  textCounter.innerHTML = `${counter == 0 ? "Vai" : counter}`;
  textCounter.classList.add("animate");
  textCounter.addEventListener(
    "animationend",
    () => {
      textCounter.classList.remove("animate");
      setTimeout(() => {
        counterStart(counter - 1);
      }, 0);
    },
    { once: true }
  );
}
