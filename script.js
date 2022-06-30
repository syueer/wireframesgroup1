let tasks = new TaskManager()

const todaysDate = new Date();
const day = todaysDate.getDate();
// const thisMonth = todaysDate.getMonth()+1;
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const thisMonth = months[todaysDate.getMonth()];
const thisYear = todaysDate.getFullYear();

document.getElementById('dateDisplay').innerText = `Today is ${day}  ${thisMonth}  ${thisYear}.`;

//Name validation

const taskInput = document.getElementById('taskname');
//const nameValue = document.getElementById('taskname').value;
const validateName = () => {

  if (taskInput.value.length === 0) {
    taskInput.style.border = '1px solid red';
  } else if (taskInput.value.length < 8) {
    document.getElementById('taskNameErr').style.display = 'block';
    taskInput.style.border = '1px solid red';
  } else {
    document.getElementById('taskNameErr').style.display = 'none';
    taskInput.style.border = '1px solid #ced4da';
  }
}
taskInput.addEventListener('blur', validateName);

//Description validation
const descriptionInput = document.getElementById('taskdescription');
const validateDescription = () => {
  if (descriptionInput.value.length === 0) {
    descriptionInput.style.border = '1px solid red';
  } else if (descriptionInput.value.length > 15) {
    document.getElementById('taskDescriptionErr').style.display = 'block';
    descriptionInput.style.border = '1px solid red';
  } else {
    document.getElementById('taskDescriptionErr').style.display = 'none';
    descriptionInput.style.border = '1px solid #CED4DA';
  }
}
descriptionInput.addEventListener('blur', validateDescription);

//Date validation
const taskDate = document.querySelector('#taskdate');
const dateValidation = () => {
  if (taskDate.value === '') {
    taskDate.style.border = '1px solid red'
    return
  }
  let inputDate = new Date(taskDate.value)
  let currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0);
  if (inputDate < currentDate) {
    document.getElementById('dateErr').style.display = 'block';
    taskDate.style.border = '1px solid red'
  } else {
    document.getElementById('dateErr').style.display = 'none';
    taskDate.style.border = '1px solid #ced4da'
  }

}
taskDate.onblur = () => {
  dateValidation()
}
// Submit button validation

const taskSubmit = document.getElementById('task-submit');
const error = document.getElementById('submitErr');

error.style.display = 'block';
error.style.visibility = 'hidden';

const assigneeInput = document.getElementById('assignee');
const statusInput = document.getElementById('status');

const validationForm = () => {
  if (taskInput.value === '' && descriptionInput.value === '' && taskDate.value === '') {
    taskInput.style.border = '1px solid red';
    descriptionInput.style.border = '1px solid red';
    taskDate.style.border = '1px solid red';
    error.style.visibility = 'visible';
    return false;
  } else if (descriptionInput.value === '' && taskDate.value === '') {
    descriptionInput.style.border = '1px solid red';
    taskDate.style.border = '1px solid red';
    error.style.visibility = 'visible';

  } else if (taskInput.value === '' && descriptionInput.value === '') {
    taskInput.style.border = '1px solid red';
    descriptionInput.style.border = '1px solid red';
    error.style.visibility = 'visible';

  } else if (taskInput.value === '' && taskDate.value === '') {
    taskInput.style.border = '1px solid red';
    error.style.visibility = 'visible';
  } else if (descriptionInput.value === '') {
    descriptionInput.style.border = '1px solid red';
    error.style.visibility = 'visible';
  } else if (taskInput.value === '') {
    taskInput.style.border = '1px solid red';
    error.style.visibility = 'visible';
  } else if (taskDate.value === '') {
    taskDate.style.border = '1px solid red';
    error.style.visibility = 'visible';
  }
  else {
    document.getElementById('submitConfirm').style.display = 'block';
    return true;
  }
}
const taskList = document.getElementById('taskList')
const submit = () => {
  if (validationForm()) {
    tasks.addTask(taskInput.value, descriptionInput.value, assigneeInput.value, taskDate.value, statusInput.value)
    console.log(tasks)
    tasks.render()
    taskInput.value = ''
    descriptionInput.value = ''
    taskDate.value = ''
  }
}
