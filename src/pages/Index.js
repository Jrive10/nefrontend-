import { useState } from "react";
import { Link } from "react-router-dom";


function Index(props) {
  // State to hold formData for a new project
  const [newForm, setNewForm] = useState({
    projectName: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "",
    budget: 0,
    imageFile: null, // Add imageFile property to store the selected image
  });

  // handleChange function for form
  const handleChange = (event) => {
    const { name, value, type } = event.target;
    const updatedValue = type === 'number' ? parseFloat(value) : value;
    setNewForm({ ...newForm, [name]: updatedValue });
  };

  // handle submit function for form
  const handleSubmit = (event) => {
    event.preventDefault();
    props.createProject(newForm);
    setNewForm({
      projectName: "",
      description: "",
      startDate: "",
      endDate: "",
      status: "",
      budget: 0,
      imageFile: null, // Clear imageFile after submission
    });
  };

  // Function to display projects if loaded
  const loaded = () => {
    return props.projects.map((project) => (
      <div key={project._id} className="project">
        <Link to={`/projects/${project._id}`}>
          <h1>{project.projectName}</h1>
          <p>{project.description}</p>
          <img src={project.imageUrl} alt={`Image for ${project.projectName}`} />
          <h3>Budget: {project.budget}</h3>
        </Link>
      </div>
    ));
  };

  // Function to display while projects are loading
  const loading = () => {
    return <h1>Loading...</h1>;
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    // Store the selected image in a state variable
    setNewForm({ ...newForm, imageFile });
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newForm.projectName}
          name="projectName"
          placeholder="Project Title"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.description}
          name="description"
          placeholder="Project Description"
          onChange={handleChange}
        />

        <input
          type="number"
          value={newForm.budget}
          name="budget"
          placeholder="Budget"
          onChange={handleChange}
        />

        <div>
          <label htmlFor="image">Choose an Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
          />
        </div>

        <input type="submit" value="Create Project" />
      </form>

      {props.projects ? loaded() : loading()}
    </section>
  );
}

export default Index;

