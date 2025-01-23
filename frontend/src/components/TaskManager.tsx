import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import { fetchTasks, createTask, updateTask, deleteTask } from "../api/taskApi";
import Navbar from "./Navbar";

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      setTasks([newTask, ...tasks]);
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleUpdateTask = async (taskId, taskData) => {
    try {
      const updatedTask = await updateTask(taskId, taskData);
      setTasks(tasks.map((task) => (task._id === taskId ? updatedTask : task)));
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <>
      <AppBar position="static">
        {/* Navbar */}
        <Navbar />
      </AppBar>
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 4,
            mb: 4,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsFormOpen(true)}
          >
            Add Todo
          </Button>
        </Box>
        {isFormOpen && (
          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setIsFormOpen(false)}
          />
        )}
        {editingTask && (
          <TaskForm
            task={editingTask}
            onSubmit={(taskData) => handleUpdateTask(editingTask._id, taskData)}
            onCancel={() => setEditingTask(null)}
          />
        )}
        <TaskList
          tasks={tasks}
          onEditTask={setEditingTask}
          onDeleteTask={handleDeleteTask}
        />
      </Container>
    </>
  );
}

export default TaskManager;
