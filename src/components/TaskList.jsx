import React, { useContext, useEffect } from "react";
import { TaskContext } from "../contexts/TaskContext";
import { Link } from "react-router-dom";
import { fetchTasks } from "../api/api";

const TaskList = () => {
  const { tasks, error, loading, loadTasks } = useContext(TaskContext);

  useEffect(() => {
    loadTasks();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h2>Tasks</h2>
      {tasks.length ? (
        <>
          {tasks.map((task) => (
            <div key={task.id} style={{ display: "flex", gap: "10px" }}>
              <Link to={`/task/${task.id}`}>
                <div>
                  <p>{task.title}</p>
                </div>
              </Link>
            </div>
          ))}
        </>
      ) : (
        <p>No Tasks</p>
      )}
      <Link to="/add">
        <button>ADD</button>
      </Link>
    </>
  );
};

export default TaskList;
