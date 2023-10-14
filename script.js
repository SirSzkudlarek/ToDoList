let todoInput //miejsce, gdzie użytkownik wpisuje treść zadania;
let errorInfo // info o braku zadań / konieczności wpisania tekstu;
let addBtn // przycisk ADD - dodaje nowe elementy do listy;
let ulList // lista zadań, tagi UL;
let dataId;

const main = () => {
  prepareDOMElements()
  prepareDOMEvents()
  ulList.firstChild ? errorInfo.textContent = '' : errorInfo.textContent = 'Brak zadań na liście.';
}

const prepareDOMElements = () => {
  todoInput = document.querySelector('.todo-input');
  errorInfo = document.querySelector('.error-info');
  addBtn = document.querySelector('.btn-add');
  removeBtn = document.querySelector('.delete')
  ulList = document.querySelector('.todolist ul');
  dataId = 1;
}

const prepareDOMEvents = () => {
  addBtn.addEventListener('click', addTask);
}

document.addEventListener('DOMContentLoaded', main);

const addTask = () => {
  if(todoInput.value !== '') {
    let liList = document.createElement('li');
    ulList.append(liList);
    liList.outerHTML = `
      <li data-id=test${dataId}>${todoInput.value}
        <div class="tools">
          <button class="complete"><i class="fas fa-check"></i></button>
          <button class="edit">EDIT</button>
          <button class="delete"><i class="fas fa-times"></i></button>
        </div>
      </li>
    `
    dataId++;
    errorInfo.textContent = '';
  } else {
    errorInfo.textContent = 'Wpisz treść zadania!';
  }
};

const removeTask = (e) => {
  e.target.remove() // Write code for remove btn, we are trying with e.targer -> closest li element.
}

