// new TaskManager instance
let newTasks = new TaskManager()

//Selector
const taskInput = document.getElementById('taskname');
const taskNameErr = document.getElementById('taskNameErr')
const descriptionInput = document.getElementById('taskdescription');
const taskDescriptionErr = document.getElementById('taskDescriptionErr')
const taskDate = document.querySelector('#taskdate');
const dataErr = document.getElementById('dateErr')
const resetButton = document.getElementById('reset-button')
const filterStatus = document.getElementById('filter-status')
const filterPriority = document.getElementById('filter-priority')
const taskSubmit = document.getElementById('task-submit');
const error = document.getElementById('submitErr');

//display Date function
const displayDate = () => {
  const todaysDate = new Date();
  const day = todaysDate.getDate();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const thisMonth = months[todaysDate.getMonth()];
  const thisYear = todaysDate.getFullYear();
  document.getElementById('dateDisplay').innerText = `Today is ${day}  ${thisMonth}  ${thisYear}.`;
}
displayDate()

//Name validation
const validateName = () => {
  if (taskInput.value.length === 0) {
    taskInput.style.border = '1px solid red';
    return false
  } else if (taskInput.value.length < 8) {
    taskNameErr.style.display = 'block';
    taskInput.style.border = '1px solid red';
    return false
  } else {
    taskNameErr.style.display = 'none';
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
    taskDescriptionErr.style.display = 'block';
    descriptionInput.style.border = '1px solid red';
    return false
  } else {
    taskDescriptionErr.style.display = 'none';
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
    dataErr.style.display = 'block';
    taskDate.style.border = '1px solid red'
    return false
  } else {
    dataErr.style.display = 'none';
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
  taskInput.style.border = '1px solid #ced4da';
  descriptionInput.style.border = '1px solid #CED4DA';
  taskDate.style.border = '1px solid #ced4da';
  taskNameErr.style.display = 'none';
  taskDescriptionErr.style.display = 'none';
  dataErr.style.display = 'none';
  error.style.display = 'none';
}
resetButton.onclick = (e) => {
  resetTask()
}


// filter function
const filterTask = (filterCondition) => (
  newTasks.tasks.filter(task =>
    (filterCondition[0] === 'All' ? true : task.status === filterCondition[0]) &&
    (filterCondition[1] === 'All' ? true : task.priority === filterCondition[1])
  ))

let filterCondition = ['All', 'All']
filterStatus.onchange = (e) => {
  filterCondition[0] = e.target.value
  let filterResult = filterTask(filterCondition)
  newTasks.render(filterResult)
}

filterPriority.onchange = (e) => {
  filterCondition[1] = e.target.value
  let filterResult = filterTask(filterCondition)
  newTasks.render(filterResult)
}

// Submit button validation
const submit = () => {
  const priority = document.getElementById('priority');
  const statusInput = document.getElementById('status');
  const assigneeInput = document.getElementById('assignee');
  let isTaskNameValid = validateName()
  let isTaskDescriptionValid = validateDescription()
  let isTaskDateValid = validateDate()
  if (isTaskNameValid && isTaskDescriptionValid && isTaskDateValid) {
    newTasks.addTask(taskInput.value, descriptionInput.value, assigneeInput.value, taskDate.value, statusInput.value, priority.value)
    newTasks.render(newTasks.tasks)
    resetTask()
    document.querySelector('.btn-close').click()
  } else {
    error.style.display = 'block';
  }
}
taskSubmit.onclick = () => {
  submit()
}
