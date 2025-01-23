import React from "react"
import { List } from "@mui/material"
import TaskItem from "./TaskItem"

function TaskList({ tasks, onEditTask, onDeleteTask }) {
  return (
    <List>
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} onEdit={() => onEditTask(task)} onDelete={() => onDeleteTask(task._id)} />
      ))}
    </List>
  )
}

export default TaskList

