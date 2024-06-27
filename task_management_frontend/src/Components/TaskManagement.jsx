import React, { useEffect, useState } from "react";
import axios from "axios";
import emailjs from "emailjs-com";
import { Link, useLocation, useNavigate } from "react-router-dom";

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "PENDING",
  });
  const [isAdding, setIsAdding] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:9090/api/tasks", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTasks(response.data);
        checkTaskDeadlines(response.data);
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };

    fetchTasks();

    const intervalId = setInterval(() => {
      fetchTasks();
    }, 86400000); // Check every 24 hours

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const pending = tasks.filter((task) => task.status === "PENDING");
    const inProgress = tasks.filter((task) => task.status === "IN_PROGRESS");
    const completed = tasks.filter((task) => task.status === "COMPLETED");
    setPendingTasks(pending);
    setInProgressTasks(inProgress);
    setCompletedTasks(completed);
  }, [tasks]);

  const checkTaskDeadlines = (tasks) => {
    console.log(tasks);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    console.log("tomorrow:: ", tomorrow);

    tasks.forEach((task) => {
      console.log("here");
      const taskDueDate = new Date(task.dueDate);
      console.log("taskduedate:: ", taskDueDate);
      if (taskDueDate.toDateString() === tomorrow.toDateString()) {
        console.log("here 2");
        sendEmailNotification(task);
      }
    });
    console.log("here3");
  };

  const sendEmailNotification = (task) => {
    const templateParams = {
      task_title: task.title,
      task_description: task.description,
      task_due_date: task.dueDate,
      user_email: localStorage.getItem("user_email"), // Assuming you store user email in local storage
      additional_message: `Dear User, you have a task titled "${task.title}" due tomorrow. Please make sure to complete it on time.`, // Additional message
      email_subject: `Reminder: Task "${task.title}" is due tomorrow!`, // Email subject
    };

    emailjs
      .send(
        "service_y9k7ogh",
        "template_yl5k7vs",
        templateParams,
        "Hg_wMwzLypPNXgVsZ"
      )
      .then((response) => {
        console.log("Email successfully sent!", response.status, response.text);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:9090/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  const handleUpdateTaskStatus = async (task, newStatus) => {
    try {
      const updatedTask = { ...task, status: newStatus };
      await axios.put(
        `http://localhost:9090/api/tasks/${task.id}`,
        updatedTask,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
    } catch (error) {
      console.error("Error updating task status", error);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleSaveTask = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:9090/api/tasks/${editingTask.id}`,
        editingTask,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setTasks(tasks.map((t) => (t.id === editingTask.id ? editingTask : t)));
      setEditingTask(null);
    } catch (error) {
      console.error("Error saving task", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingTask({ ...editingTask, [name]: value });
  };

  const handleAddTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9090/api/tasks",
        newTask,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setTasks([...tasks, response.data]);
      setIsAdding(false);
      setNewTask({
        title: "",
        description: "",
        dueDate: "",
        status: "PENDING",
      });
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_email");
    navigate("/");
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/6 bg-gray-200 p-4">
        <nav>
          <ul>
            <li className="mb-4">
              <Link
                to="/tasks"
                className={`block w-full text-left py-2 px-3 rounded ${
                  location.pathname === "/tasks"
                    ? "bg-blue-700 text-white"
                    : "bg-white text-black"
                }`}
              >
                My Tasks
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/calendar"
                className={`block w-full text-left py-2 px-3 rounded ${
                  location.pathname === "/calendar"
                    ? "bg-blue-700 text-white"
                    : "bg-white text-black"
                }`}
              >
                Calendar
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/profile"
                className={`block w-full text-left py-2 px-3 rounded ${
                  location.pathname === "/profile"
                    ? "bg-blue-700 text-white"
                    : "bg-white text-black"
                }`}
              >
                Profile
              </Link>
            </li>
            <li className="mt-4">
              <button
                onClick={handleLogout}
                className="block w-full text-left py-2 px-3 rounded bg-red-600 text-white"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="w-5/6 bg-blue-700 p-4">
        <div className="flex justify-between mb-4">
          <div className="w-1/3 bg-white p-4 rounded shadow mb-4">
            <h3 className="text-lg font-bold mb-2">Pending</h3>
            {pendingTasks.map((task) => (
              <div key={task.id} className="mb-4">
                {editingTask && editingTask.id === task.id ? (
                  <form onSubmit={handleSaveTask}>
                    <label className="block text-left mb-1">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={editingTask.title}
                      onChange={handleChange}
                      className="mb-2 p-2 w-full rounded border border-gray-300"
                    />
                    <label className="block text-left mb-1">Description</label>
                    <textarea
                      name="description"
                      value={editingTask.description}
                      onChange={handleChange}
                      className="mb-2 p-2 w-full rounded border border-gray-300"
                    />
                    <label className="block text-left mb-1">Due Date</label>
                    <input
                      type="date"
                      name="dueDate"
                      value={editingTask.dueDate}
                      onChange={handleChange}
                      className="mb-2 p-2 w-full rounded border border-gray-300"
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 text-white py-1 px-2 rounded hover:bg-blue-800 mr-2"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingTask(null)}
                      className="bg-red-600 text-white py-1 px-2 rounded hover:bg-red-800"
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <h4 className="font-semibold">{task.title}</h4>
                    <p>{task.description}</p>
                    <p>Due: {task.dueDate}</p>
                    <p>Status: {task.status}</p>
                    <button
                      onClick={() => handleEditTask(task)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-red-600 hover:underline ml-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() =>
                        handleUpdateTaskStatus(task, "IN_PROGRESS")
                      }
                      className="text-yellow-600 hover:underline ml-2"
                    >
                      Move to In Progress
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="w-1/3 bg-white p-4 rounded shadow mb-4 mx-2">
            <h3 className="text-lg font-bold mb-2">In Progress</h3>
            {inProgressTasks.map((task) => (
              <div key={task.id} className="mb-4">
                <h4 className="font-semibold">{task.title}</h4>
                <p>{task.description}</p>
                <p>Due: {task.dueDate}</p>
                <p>Status: {task.status}</p>
                <button
                  onClick={() => handleUpdateTaskStatus(task, "COMPLETED")}
                  className="text-green-600 hover:underline ml-2"
                >
                  Move to Completed
                </button>
                <button
                  onClick={() => handleUpdateTaskStatus(task, "PENDING")}
                  className="text-red-600 hover:underline ml-2"
                >
                  Move to Pending
                </button>
              </div>
            ))}
          </div>
          <div className="w-1/3 bg-white p-4 rounded shadow mb-4">
            <h3 className="text-lg font-bold mb-2">Completed</h3>
            {completedTasks.map((task) => (
              <div key={task.id} className="mb-4">
                <h4 className="font-semibold">{task.title}</h4>
                <p>{task.description}</p>
                <p>Due: {task.dueDate}</p>
                <p>Status: {task.status}</p>
                <button
                  onClick={() => handleUpdateTaskStatus(task, "IN_PROGRESS")}
                  className="text-yellow-600 hover:underline ml-2"
                >
                  Move to In Progress
                </button>
              </div>
            ))}
          </div>
        </div>
        {isAdding ? (
          <form
            onSubmit={handleAddTask}
            className="bg-white p-4 rounded shadow mb-4"
          >
            <h3 className="text-lg font-bold mb-2">Add New Task</h3>
            <label className="block text-left mb-1">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newTask.title}
              onChange={handleAddTaskChange}
              required
              className="mb-2 p-2 w-full rounded border border-gray-300"
            />
            <label className="block text-left mb-1">Description</label>
            <textarea
              name="description"
              placeholder="Description"
              value={newTask.description}
              onChange={handleAddTaskChange}
              required
              className="mb-2 p-2 w-full rounded border border-gray-300"
            />
            <label className="block text-left mb-1">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={newTask.dueDate}
              onChange={handleAddTaskChange}
              required
              className="mb-2 p-2 w-full rounded border border-gray-300"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800 mr-2"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-800"
            >
              Cancel
            </button>
          </form>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-black text-white py-2 px-4 rounded"
          >
            Add Task
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskManagement;
