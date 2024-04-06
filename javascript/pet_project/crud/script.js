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

function handleSubmitForm(e) {
  e.preventDefault();
  const isValidForm = validationForm();
  if (isValidForm) {
    createCategory();
  }
}

renderData();
btnCreateElement.addEventListener("click", handleSubmitForm);
