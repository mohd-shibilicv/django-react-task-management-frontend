import React, { useEffect, useState } from "react";
import { createTask, fetchTask, updateTask } from "../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { formatDateTimeLocal } from "../utils/dateTime";

const TaskForm = () => {
  const { taskId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (taskId) {
      fetchTask(taskId)
        .then((response) => {
          const task = response.data;
          setTitle(task?.title);
          setDescription(task?.description);
          setStatus(task?.status);
          setPriority(task?.priority);
          setDueDate(formatDateTimeLocal(task?.due_date));
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [taskId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { title, description, status, priority, due_date: new Date(dueDate).toISOString() };
    const api = taskId ? updateTask : createTask;
    if (taskId) {
      api(taskId, newTask)
        .then((response) => {
          console.log("Task Successfully Updated:", response.data);
          navigate("/");
        })
        .catch((error) => {
          console.error("Error Updating the Task:", error);
        });
    } else {
      api(newTask)
        .then((response) => {
          console.log("Task Successfully Created:", response.data);
          navigate("/");
        })
        .catch((error) => {
          console.error("Error Creating the Task:", error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Task</h2>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          rows={3}
          name="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label htmlFor="status">Status</label>
        <select
          name="status"
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div>
        <label htmlFor="priority">Priority</label>
        <select
          name="priority"
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div>
        <label htmlFor="due_date">Due Date</label>
        <input
          type="datetime-local"
          name="due_date"
          id="due_date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <button type="submit">{taskId ? "Update Task" : "Add Task"}</button>
    </form>
  );
};

export default TaskForm;
