import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteTask, fetchTask } from "../api/api";
import { formatDateTimeLocal } from "../utils/dateTime";

const TaskDetail = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState([]);

  useEffect(() => {
    fetchTask(taskId)
      .then((response) => setTask(response.data))
      .catch((error) => console.error("Error:", error));
  }, [taskId]);

  const handleDelete = () => {
    deleteTask(taskId)
      .then(() => {
        console.log("Task Deleted Successfully!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div>
        <h2>Task Details</h2>
        <p>
          <strong>Title:</strong> {task.title}
        </p>
        {task.description && (
          <p>
            <strong>Description:</strong> {task.description}
          </p>
        )}
        <p>
          <strong>Status:</strong> {task.status}
        </p>
        <p>
          <strong>Priority:</strong> {task.priority}
        </p>
        <p>
          <strong>Due Date:</strong> {formatDateTimeLocal(task.due_date)}
        </p>
      </div>
      <Link to={`/task/${taskId}/edit`}>
        <button>Edit</button>
      </Link>
      <button onClick={handleDelete}>Delete</button>
    </>
  );
};

export default TaskDetail;
