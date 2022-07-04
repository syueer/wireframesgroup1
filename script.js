// new TaskManager instance
let newTasks = new TaskManager()

//Selector
const dateDisplay = document.getElementById('dateDisplay')
const taskInput = document.getElementById('taskname');
const descriptionInput = document.getElementById('taskdescription');
const taskDate = document.querySelector('#taskdate');
const resetButton = document.getElementById('reset-button')
const filterStatus = document.getElementById('filter-status')
const filterPriority = document.getElementById('filter-priority')
const btnClose = document.querySelector('.btn-close')
const taskSubmit = document.getElementById('task-submit');
const assigneeInput = document.getElementById('assignee');
const statusInput = document.getElementById('status');
const priority = document.getElementById('priority');
const error = document.getElementById('submitErr');

//display Date function
const displayDate = () => {
  const todaysDate = new Date();
  const day = todaysDate.getDate();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const thisMonth = months[todaysDate.getMonth()];
  const thisYear = todaysDate.getFullYear();
  dateDisplay.innerText = `Today is ${day}  ${thisMonth}  ${thisYear}.`;
}
displayDate()

//Name validation
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

// reset Task form
const resetTask = () => {
  taskInput.value = ''
  descriptionInput.value = ''
  taskDate.value = ''
}
resetButton.onclick = () => {
  resetTask()
}

// filter by task status
filterStatus.onchange = (e) => {
  let filterTasks = newTasks.filterByStatus(e.target.value)
  newTasks.render(filterTasks)
}

//filter by task priority
filterPriority.onchange = (e) => {
  let filterTasks = newTasks.filterByPriority(e.target.value)
  newTasks.render(filterTasks)
}

// Submit button validation

// error.style.display = 'block';
// error.style.visibility = 'hidden';



const submit = () => {
  let isTaskNameValid = validateName()
  let isTaskDescriptionValid = validateDescription()
  let isTaskDateValid = validateDate()
  if (isTaskNameValid && isTaskDescriptionValid && isTaskDateValid) {
    newTasks.addTask(taskInput.value, descriptionInput.value, assigneeInput.value, taskDate.value, statusInput.value, priority.value)
    newTasks.render(newTasks.tasks)
    resetTask()
    btnClose.click()
  } else {
    error.style.display = 'block';
  }
}
taskSubmit.onclick = () => {
  submit()
}
