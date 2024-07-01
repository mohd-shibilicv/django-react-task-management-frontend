import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskList from "./components/TaskList";
import { TaskProvider } from "./contexts/TaskContext";
import TaskForm from "./components/TaskForm";
import TaskDetail from "./components/TaskDetail";
import NotFound404 from "./components/common/NotFound404";

function App() {
  return (
    <Router>
      <TaskProvider>
        <Routes>
          <Route exact path="/" element={<TaskList />} />
          <Route path="/add" element={<TaskForm />} />
          <Route path="/task/:taskId" element={<TaskDetail />} />
          <Route path="/task/:taskId/edit" element={<TaskForm />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </TaskProvider>
    </Router>
  );
}

export default App;
