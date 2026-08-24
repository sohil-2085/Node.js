import taskEvents from "../events/taskEvent.js";

taskEvents.on("task-created", (newTask) => {
  console.log(`This notification is for ${newTask.title}`)
})

