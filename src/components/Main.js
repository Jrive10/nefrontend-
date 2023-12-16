import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";
import Profile from "./Profile";

function Main(props) {
  const [projects, setProjects] = useState(null);

  const URL = " https://casatrack-a21bc87c87bc.herokuapp.com";

  // Function to fetch projects
  const fetchProjects = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setProjects(data);
  };

  const createProject = async (project) => {
    await fetch(URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });
    fetchProjects();
  };

  const updateProject = async (id, project) => {
    await fetch(`${URL}/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });
    fetchProjects();
  };

  const deleteProject = async (id) => {
    await fetch(`${URL}/${id}`, {
      method: "delete",
    });
    fetchProjects();
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchProjects();
    };
    fetchData();
  }, []);

  return (
    <main className="container mx-auto p-4">
      <Routes>
        <Route
          path="/"
          element={<Index projects={projects} createProject={createProject} />}
        />
        <Route
          path="/projects/:id"
          element={<Show projects={projects} updateProject={updateProject} deleteProject={deleteProject} />}
        />
         <Route path="/" element={<Index projects={projects} createProject={createProject} />} />
        <Route path="/projects/:id" element={<Show projects={projects} updateProject={updateProject} deleteProject={deleteProject} />} />
        <Route path="/profile" element={<Profile />} /> 
      </Routes>
    </main>
  );
}

export default Main;
