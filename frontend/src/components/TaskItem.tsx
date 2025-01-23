import React from "react";
import { ListItem, ListItemText, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function TaskItem({ task, onEdit, onDelete }) {
  return (
    <ListItem
      secondaryAction={
        <>
          <IconButton edge="end" aria-label="edit" onClick={onEdit}>
            <EditIcon />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </>
      }
    >
      <ListItemText
        primary={task.title}
        secondary={
          <>
            <Typography component="span" variant="body2" color="text.primary">
              {task.description}
            </Typography>
            {" — " + new Date(task.timestamp).toLocaleString()}
          </>
        }
      />
    </ListItem>
  );
}

export default TaskItem;
