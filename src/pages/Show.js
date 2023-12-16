import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Show(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const projects = props.projects || [];
  const project = projects.find((p) => p._id === id);

  const [editForm, setEditForm] = useState({
    projectName: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "",
    budget: 0,
    imageUrl: "", 
  });

  useEffect(() => {
    if (project) {
      setEditForm({
        projectName: project.projectName || "",
        description: project.description || "",
        startDate: project.startDate ? project.startDate.substring(0, 10) : "",
        endDate: project.endDate ? project.endDate.substring(0, 10) : "",
        status: project.status || "",
        budget: project.budget || 0,
        imageUrl: project.imageUrl || "", // Set imageUrl from the project data
      });
    }
  }, [project]);

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    const updatedValue = type === 'number' ? parseFloat(value) : value;
    setEditForm({ ...editForm, [name]: updatedValue });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.updateProject(id, editForm);
    navigate("/");
  };

  const removeProject = () => {
    props.deleteProject(id);
    navigate("/");
  };

  const handleImageChange = (event) => {
    const { name, value } = event.target;
    setEditForm({ ...editForm, [name]: value });
  };

  return (
    <div className="project">
      {project ? (
        <>
          <h1>{project.projectName}</h1>
          <p>Description: {project.description}</p>
          <img src={project.imageUrl} alt={`Image for ${project.projectName}`} />
          <p>Start Date: {project.startDate}</p>
          <p>End Date: {project.endDate}</p>
          <p>Status: {project.status}</p>
          <h3>Budget: {project.budget}</h3>
          <button id="delete" onClick={removeProject}>DELETE</button>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={editForm.projectName}
              name="projectName"
              placeholder="Project Title"
              onChange={handleChange}
            />
            <input
              type="text"
              value={editForm.description}
              name="description"
              placeholder="Project Description"
              onChange={handleChange}
            />
            <input
              type="date"
              value={editForm.startDate}
              name="startDate"
              onChange={handleChange}
            />
            <input
              type="date"
              value={editForm.endDate}
              name="endDate"
              onChange={handleChange}
            />
            <input
              type="text"
              value={editForm.status}
              name="status"
              placeholder="Status"
              onChange={handleChange}
            />
            <input
              type="number"
              value={editForm.budget}
              name="budget"
              placeholder="Budget"
              onChange={handleChange}
            />
            <input
              type="text"
              value={editForm.imageUrl}
              name="imageUrl"
              placeholder="Image URL" 
              onChange={handleImageChange} 
            />
            <input type="submit" value="Update Project" />
          </form>
        </>
      ) : (
        <p>Project not found</p>
      )}
    </div>
  );
}

export default Show;

