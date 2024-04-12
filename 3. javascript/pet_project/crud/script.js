const btnCreateElement = document.querySelector(".btn-create");
const inputElement = document.querySelector(".cate");
const tbodyElement = document.querySelector(".tbody");

function getListCate() {
  return JSON.parse(localStorage.getItem("category")) || [];
}

function showError() {
  const showElement = inputElement.closest(".group").querySelector(".error");
  showElement.textContent = "Not empty";
}

function shoeSuccess() {
  const showElement = inputElement.closest(".group").querySelector(".error");
  showElement.textContent = "";
}

function validationForm() {
  let isValid = true;
  if (inputElement.value === "") {
    isValid = false;
    showError();
  } else {
    shoeSuccess();
  }
  return isValid;
}

function renderData() {
  const listCate = getListCate();
  let cateHTML = "";

  if (listCate && listCate.length > 0) {
    listCate.map(
      (item, idx) =>
        (cateHTML += `
        <tr>
            <td>${item.name}</td>
            <td>
            <button class="edit" data-id=${item.id}>Edit</button>
            <button class="delete" data-id=${item.id}>Delete</button>
            </td>
        </tr>
        `)
    );
  }

  tbodyElement.innerHTML = cateHTML;
}

function clearForm(element) {
  element.value = "";
}

function createCategory() {
  const listCate = getListCate();

  const newCate = {
    id: Math.floor(Math.random() * 1000),
    name: inputElement.value,
  };

  const listCateUpdated = [newCate, ...listCate];
  localStorage.setItem("category", JSON.stringify(listCateUpdated));
  renderData();
  clearForm(inputElement);
}

function updatedCategory() {
  const idCate = btnCreateElement.getAttribute("data-id");
  const listCate = getListCate();

  console.log(listCate);

  if (listCate && listCate.length > 0) {
    const updatedCate = listCate.map((item) => {
      if (item.id === +idCate) {
        return {
          id: +idCate,
          name: inputElement.value,
        };
      } else {
        return item;
      }
    });
    localStorage.setItem("category", JSON.stringify(updatedCate));
    renderData();
    btnCreateElement.classList.remove("edit");
    btnCreateElement.removeAttribute("data-id");
    btnCreateElement.textContent = "Tạo";
    clearForm(inputElement);
  }
}

function handleSubmitForm(e) {
  e.preventDefault();
  const isValidForm = validationForm();
  if (isValidForm) {
    if (e.target.classList.contains("edit")) {
      updatedCategory();
    } else {
      createCategory();
    }
  }
}

function handleAction(event) {
  const clicked = event.target;
  const listCate = getListCate();

  if (clicked.classList.contains("delete")) {
    const idCate = clicked.getAttribute("data-id");

    if (listCate && listCate.length > 0) {
      const updatedListCate = listCate.filter((item) => item.id !== +idCate);

      localStorage.setItem("category", JSON.stringify(updatedListCate));
      renderData();
    }
  }

  if (clicked.classList.contains("edit")) {
    const idCate = clicked.getAttribute("data-id");
    const listCate = getListCate();

    if (listCate && listCate.length > 0) {
      const udpatedCate = listCate.find((item) => item.id === +idCate);
      console.log(udpatedCate);

      inputElement.value = udpatedCate.name;

      btnCreateElement.textContent = "Update";
      btnCreateElement.setAttribute("data-id", udpatedCate.id);
      btnCreateElement.classList.add("edit");
    }
  }
}

renderData();
btnCreateElement.addEventListener("click", handleSubmitForm);
tbodyElement.addEventListener("click", handleAction);
