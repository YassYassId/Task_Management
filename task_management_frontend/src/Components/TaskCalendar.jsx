import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

const TaskCalendar = () => {
  const [tasks, setTasks] = useState([]);
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
        const events = response.data.map((task) => ({
          id: task.id,
          title: task.title,
          start: task.dueDate,
          extendedProps: {
            description: task.description,
            status: task.status,
          },
        }));
        setTasks(events);
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };

    fetchTasks();
  }, []);

  const handleEventClick = (info) => {
    navigate("/tasks", { state: { taskId: info.event.id } });
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
      <div className="flex-1 p-4">
        <div className="bg-white p-4 rounded shadow h-full">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={tasks}
            eventClick={handleEventClick}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            eventContent={(eventInfo) => (
              <div className="cursor-pointer">{eventInfo.event.title}</div>
            )}
            height="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default TaskCalendar;
