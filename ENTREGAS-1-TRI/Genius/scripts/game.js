class Game {
  #sequence;
  #genius;
  #isPlayerTurn;

  constructor(genius) {
    this.#sequence = [];
    this.#genius = genius;
    this.#isPlayerTurn = true;

    this.colorsElementList.forEach((element) => {
      element.addEventListener("animationend", () => {
        this.stopAnimation(element);
      });

      element.addEventListener("animationstart", (event) => {
        const audio = event.target.querySelector("audio");
        audio.play();
      });
    });
  }

  nextTurn() {
    this.#sequence.push(this.#generateRandomColor);

    this.playAnimationAllColors(0);
  }

  playAnimationAllColors(index) {
    this.#isPlayerTurn = index >= this.#sequence.length;

    if (index >= this.#sequence.length) {
      return;
    }

    const current = this.#sequence[index];

    if (index == 0) {
      this.playAnimation(this.colorElement(current));
      this.playAnimationAllColors(++index);
      return;
    }

    const element = this.colorElement(this.#sequence[index - 1]);

    element.addEventListener(
      "animationend",
      () => {
        setTimeout(() => {
          this.#isPlayerTurn = index >= this.#sequence.length;
          this.playAnimation(this.colorElement(current));
          this.playAnimationAllColors(++index);
        }, 0);
      },
      { once: true }
    );
  }

  colorElement(index) {
    return this.colorsElementList[index];
  }

  isCorrectColor(element, currentColorPosition) {
    const indexClickedElement = this.colorsElementList.indexOf(element);

    return indexClickedElement == this.#sequence[currentColorPosition];
  }

  get playerPoints() {
    return this.#sequence.length - 1 < 0 ? 0 : this.#sequence.length - 1;
  }

  get isPlayerPlaying() {
    return this.#sequence.length > 0;
  }

  get sequence() {
    return this.#sequence;
  }

  get isPlayerTurn() {
    return this.#isPlayerTurn;
  }

  get colorsElementList() {
    return Array.from(this.#genius.querySelectorAll("div"));
  }

  get #generateRandomColor() {
    return Math.trunc(Math.random() * 4);
  }

  playAnimation(div) {
    div.classList.add("animate");
  }

  stopAnimation(div) {
    div.classList.remove("animate");
  }
}

export default Game;
