import React, { useState, useEffect } from "react"
import { TextField, Button, Box, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"

function TaskForm({ task, onSubmit, onCancel }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDescription(task.description)
    }
  }, [task])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ title, description })
    setTitle("")
    setDescription("")
  }

  return (
    <Dialog open={true} onClose={onCancel}>
      <DialogTitle>{task ? "Edit Task" : "Add New Task"}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            margin="normal"
            multiline
            rows={3}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {task ? "Update" : "Add"} Task
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TaskForm

