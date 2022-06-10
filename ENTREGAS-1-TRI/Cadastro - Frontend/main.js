const actionBar = document.querySelector(".action-bar");
const btAdd = actionBar.querySelector(".bt-add");
const container = document.querySelector(".container-data");
const templateModalAluno = container.querySelector("template.aluno");

btAdd.addEventListener("click", () => {
  const cloneModal = templateModalAluno.content.cloneNode(true);
  container.prepend(cloneModal);
});

container.addEventListener("focusin", (event) => {
  const input = event.target.closest("input");

  if (input) {
    const inputContainer = input.closest(".input-container");
    const label = inputContainer.querySelector("label");
    label.style.transform = "TranslateY(50%)";
  }
});

container.addEventListener("focusout", (event) => {
  const input = event.target.closest("input");

  if (input && !input.value) {
    const inputContainer = input.closest(".input-container");
    const label = inputContainer.querySelector("label");
    label.style.transform = "TranslateY(150%)";
  }
});

container.addEventListener("click", (event) => {
  const btClose = event.target.closest(".bt-close");
  const btSave = event.target.closest(".bt-save");
  const modal = event.target.closest(".modal");

  if (btSave) {
    const formElement = modal.querySelector("form");
    const formData = new FormData(formElement);
    saveInfo(formData);
  }

  if (btClose) {
    modal.remove();
  }
});
async function saveInfo(formData) {
  const request = await fetch("http://127.0.0.1:4000/aluno", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: formData.get("name"),
      birthDate: formData.get("birthDate"),
      registrationNumber: formData.get("registrationNumber"),
    }),
  });
}
