//THESE URL'S MUST MATCH EXACTLY HOW THEY SHOW IN SWAGGER (ie BACKEND)

 const baseUrl = "/api/project";

//all fo the projects in the database
export const getAllProjects = () => {
    return  fetch(baseUrl) 
    .then((res) => res.json())
};

//return a single project found by ID
export const getProjectById = (id) => {
    return fetch(`/api/project/${id}`).then((res) => res.json())
}

export const addProject = (singleProject) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(singleProject)
    });
}

export const deleteProject = (id) => {
    return fetch(`/api/project/${id}`, {
      method: "DELETE",
    })
      .then(() => getAllProjects())
  };

  export const editProject = (project) => {
    //make sure your parameter matches the one you are sending to the API
    return fetch(`${baseUrl}/${project.Id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(project)
    })
};
//search the database
export const searchProjects = (query)=> { 
    return fetch(`${baseUrl}/search?query=${query}&sortDesc=true`)
    .then((res)=> res.json())
  };