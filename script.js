let todoInput; //miejsce, gdzie użytkownik wpisuje treść zadania;
let errorInfo; // info o braku zadań / konieczności wpisania tekstu;
let addBtn; // przycisk ADD - dodaje nowe elementy do listy;
let ulList; // lista zadań, tagi UL;

let popup;
let popupInput;
let popupInfo;
let popupAddBtn;
let popupCloseBtn;


const main = () => {
  prepareDOMElements()
  prepareDOMEvents()
  ulList.firstChild ? errorInfo.textContent = '' : errorInfo.textContent = 'Brak zadań na liście.';
}

const prepareDOMElements = () => {
  todoInput = document.querySelector('.todo-input');
  errorInfo = document.querySelector('.error-info');
  addBtn = document.querySelector('.btn-add');
  ulList = document.querySelector('.todolist ul');

  popup = document.querySelector('.popup');
  popupInfo = document.querySelector('.popup-info');
  popupInput = document.querySelector('.popup-input');
  popupAddBtn = document.querySelector('.accept');
  popupCloseBtn = document.querySelector('.cancel');
}

const prepareDOMEvents = () => {
  addBtn.addEventListener('click', addTask);
  ulList.addEventListener('click', checkClick);
  popupAddBtn.addEventListener('click', changeToDoText);
  popupCloseBtn.addEventListener('click', closeEditToDo);
  todoInput.addEventListener('keydown', enterKeyCheck);
  popupInput.addEventListener('keydown', enterKeyCheck);
}

document.addEventListener('DOMContentLoaded', main);

const addTask = () => {
  if(todoInput.value !== '') {
    const newToDo = document.createElement('li');
    newToDo.textContent = `${todoInput.value}`
    toolsArea(newToDo);
    ulList.append(newToDo);
    errorInfo.textContent = '';
  } else {
    errorInfo.textContent = 'Wpisz treść zadania!';
  }
};

const toolsArea = (newToDo) => {
  const tools = document.createElement('div');
  tools.classList.add('tools');

  const complete = document.createElement('button');
  complete.classList.add('complete');
  complete.innerHTML = `<i class="fas fa-check"></i>`;

  const edit = document.createElement('button');
  edit.classList.add('edit');
  edit.textContent = 'EDIT';

  const del = document.createElement('button');
  del.classList.add('delete');
  del.innerHTML = `<i class="fas fa-times"></i>`

  tools.append(complete, edit, del)
  newToDo.append(tools);
}

const checkClick = (e) => {
  if(e.target.matches('.complete')) {
    e.target.closest('li').classList.toggle('completed')
    e.target.classList.toggle('completed');
  } else if(e.target.matches('.edit')) {
    editToDo(e);
  } else if(e.target.matches('.delete')) {
    deleteToDo(e);
  }
}

const editToDo = (e) => {
  toDoEdit = e.target.closest('li');
  popupInput.value = toDoEdit.firstChild.textContent;
  popup.style.display = 'flex';
  popupInput.focus();
}

const closeEditToDo = () => {
  popupInfo.textContent = '';
  popup.style.display = 'none';
}

const changeToDoText = () => {
  if(popupInput.value !== '') {
    toDoEdit.firstChild.textContent = popupInput.value;
    popupInfo.textContent = '';
    closeEditToDo();
  } else {
    popupInfo.textContent = 'Wpisz poprawioną treść zadania!';
  }
}

const deleteToDo = (e) => {
  e.target.closest('li').remove();
  ulList.firstChild ? errorInfo.textContent = '' : errorInfo.textContent = 'Brak zadań na liście.';
}

const enterKeyCheck = (e) => {
  if(e.key === 'Enter' && e.target.closest('.todo-input')) {
    addTask();
  } else if (e.key === 'Enter' && e.target.closest('.popup-input')) {
    changeToDoText();
  }
}