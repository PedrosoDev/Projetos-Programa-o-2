const maskElement = document.querySelectorAll("[data-mascara]");

const functionMasks = {
  matricula: maskMatricula,
  calendario: maskCalendario,
};

document.body.addEventListener("keydown", (event) => {
  const element = event.target;
  const maskName = element.dataset.mascara;
  const functionMascara = functionMasks[maskName];
  functionMascara(event, element);
});

function maskMatricula(event, element) {
  const key = event.key;
  const length = element.value.length;

  if ((isNaN(key) || length >= 10) && key != "Backspace") {
    event.preventDefault();
    return;
  }
}

function maskCalendario(event, element) {
  const key = event.key;
  const length = element.value.length;

  if ((isNaN(key) || length >= 10) && key != "Backspace") {
    event.preventDefault();
    return;
  }

  if ((length == 2 || length == 5) && key != "Backspace") {
    element.value += "/";
  }
}
