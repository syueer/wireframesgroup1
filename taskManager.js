// create Task Card HTML
const createTaskHtml = (name, description, assignedTo, dueDate, status, priority) => {
  const taskHtml = `
  <div class="col-sm-6">
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Task</h5>
      <p class="card-text">
        Task Name: ${name}
        <br />
        Description: ${description}
        <br />
        Assignee: ${assignedTo}
        <br />
        Date: ${dueDate}
        <br />
        Status: ${status}
        <br />
        Priority: ${priority}
      </p>
      <a
        href="#"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        >Edit</a
      >
      <a href="#" class="btn btn-primary">Delete</a>
    </div>
  </div>
</div>`
  return taskHtml
}

// The TaskManager Class
class TaskManager {
  constructor(currentId = 0) {
    this.currentId = currentId
    this.tasks = []
  }

  addTask(inputName, inputDescription, inputAssignee, inputDate, inputStatus = 'todo', inputPriority) {
    let taskObject = { currentId: ++this.currentId, name: inputName, description: inputDescription, assignedTo: inputAssignee, dueDate: inputDate, status: inputStatus, priority: inputPriority }
    this.tasks.push(taskObject)
  }

  render(renderTasks) {
    let tasksHtmlList = []
    tasksHtmlList = renderTasks.map(task => {
      let date = new Date(task.dueDate)
      let formattedDate = (date.toLocaleDateString())
      return createTaskHtml(task.name, task.description, task.assignedTo, formattedDate, task.status, task.priority)
    })
    let tasksHtml = tasksHtmlList.join('\n')
    const taskList = document.getElementById('taskList')
    taskList.innerHTML = tasksHtml
  }
}
