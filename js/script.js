let tareas = [];

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputText = document.querySelector("#text");

  tareas.push({
    id: Date.now(),
    text: inputText.value,
    complete: false,
  });

  //   inputText.value = "";
  event.target.reset();

  localStorage.setItem("tareas", JSON.stringify(tareas));

  renderTareas();
});

const renderTareas = () => {
  tareas = JSON.parse(localStorage.getItem("tareas")) || [];

  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  tareas.forEach(
    (tarea) =>
      (tbody.innerHTML += `
    <tr>
        <td class="${tarea.complete ? "complete" : ""}">${tarea.text}</td>
        <td>
            <button type="button" data-id="${
              tarea.id
            }" class="btn-complete">Completar</button>
            <button type="button">Editar</button>
            <button type="button" onclick="borrarTarea(${
              tarea.id
            })">Borrar</button>
        </td>
    </tr>
  `)
  );
};

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-complete")) {
    completarTarea(e.target.dataset.id);
  }
});

const completarTarea = (id) => {
  tareas.forEach((tarea) => {
    if (tarea.id == id) {
      tarea.complete = !tarea.complete;
    }
  });

  localStorage.setItem("tareas", JSON.stringify(tareas));

  renderTareas();
};

const borrarTarea = (id) => {
  if (confirm("¿Esta seguro?")) {
    const filtradas = tareas.filter((tarea) => tarea.id != id);
    localStorage.setItem("tareas", JSON.stringify(filtradas));
    renderTareas();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  renderTareas();
});
