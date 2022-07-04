let tasks = new TaskManager()

//display Date
const todaysDate = new Date();
const day = todaysDate.getDate();
// const thisMonth = todaysDate.getMonth()+1;
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const thisMonth = months[todaysDate.getMonth()];
const thisYear = todaysDate.getFullYear();

document.getElementById('dateDisplay').innerText = `Today is ${day}  ${thisMonth}  ${thisYear}.`;

const resetButton = document.getElementById('reset-button')


//Name validation
const taskInput = document.getElementById('taskname');
//const nameValue = document.getElementById('taskname').value;
const validateName = () => {
  if (taskInput.value.length === 0) {
    taskInput.style.border = '1px solid red';
    return false
  } else if (taskInput.value.length < 8) {
    document.getElementById('taskNameErr').style.display = 'block';
    taskInput.style.border = '1px solid red';
    return false
  } else {
    document.getElementById('taskNameErr').style.display = 'none';
    taskInput.style.border = '1px solid #ced4da';
    return true
  }
}
taskInput.addEventListener('blur', validateName);



//Description validation
const descriptionInput = document.getElementById('taskdescription');
const validateDescription = () => {
  if (descriptionInput.value.length === 0) {
    descriptionInput.style.border = '1px solid red';
    return false
  } else if (descriptionInput.value.length > 15) {
    document.getElementById('taskDescriptionErr').style.display = 'block';
    descriptionInput.style.border = '1px solid red';
    return false
  } else {
    document.getElementById('taskDescriptionErr').style.display = 'none';
    descriptionInput.style.border = '1px solid #CED4DA';
    return true
  }
}
descriptionInput.addEventListener('blur', validateDescription);

//Date validation
const taskDate = document.querySelector('#taskdate');
const validateDate = () => {
  if (taskDate.value === '') {
    taskDate.style.border = '1px solid red'
    return false
  }
  let inputDate = new Date(taskDate.value)
  let currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0);
  if (inputDate < currentDate) {
    document.getElementById('dateErr').style.display = 'block';
    taskDate.style.border = '1px solid red'
    return false
  } else {
    document.getElementById('dateErr').style.display = 'none';
    taskDate.style.border = '1px solid #ced4da'
    return true
  }

}
taskDate.onblur = () => {
  validateDate()
}
// Submit button validation

const taskSubmit = document.getElementById('task-submit');
const error = document.getElementById('submitErr');

error.style.display = 'block';
error.style.visibility = 'hidden';

const assigneeInput = document.getElementById('assignee');
const statusInput = document.getElementById('status');
const priority = document.getElementById('priority');

const resetTask = () => {
  taskInput.value = ''
  descriptionInput.value = ''
  taskDate.value = ''
}

resetButton.onclick = () => {
  resetTask()
}


const submit = () => {
  let btnClose = document.querySelector('.btn-close')
  let isTaskNameValid = validateName()
  let isTaskDescriptionValid = validateDescription()
  let isTaskDateValid = validateDate()
  if (isTaskNameValid && isTaskDescriptionValid && isTaskDateValid) {
    // console.log(priority.value)
    tasks.addTask(taskInput.value, descriptionInput.value, assigneeInput.value, taskDate.value, statusInput.value, priority.value)
    tasks.render()
    resetTask()
    btnClose.click()
  } else {
    error.style.visibility = 'visible';
  }
}
