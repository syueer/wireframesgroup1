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
</div>
  `
  return taskHtml
}

// The TaskManager Class
class TaskManager {
  constructor(currentId = 0) {
    this.currentId = currentId
    this.tasks = []
  }

  addTask(curname, curdescription, curassignedTo, curdueDate, curstatus = 'todo') {
    let taskObject = { currentId: this.currentId++, name: curname, description: curdescription, assignedTo: curassignedTo, dueDate: curdueDate, status: curstatus }
    this.tasks.push(taskObject)
  }

  render() {
    let tasksHtmlList = []
    this.tasks.map(task => {
      let currentTask = task;
      let date = new Date(currentTask.dueDate)
      let formattedDate = (date.toLocaleDateString())
      let taskHtml = createTaskHtml(currentTask.name, currentTask.description, currentTask.assignedTo, formattedDate, currentTask.status)
      tasksHtmlList.push(taskHtml)
    })
    let tasksHtml = tasksHtmlList.join('\n')
    const taskList = document.getElementById('taskList')
    taskList.innerHTML = tasksHtml
  }
}