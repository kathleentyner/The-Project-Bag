import React from "react";

const baseUrl = "/api/projectyarn";

export const getAllPY = () => {
    return fetch(baseUrl) 
    .then((res) => res.json())
};

//return a single project found by ID
export const getPYById = (id) => {
    return fetch(`/api/projectyarn/${id}`).then((res) => res.json())
}

export const addPY = (singlePY) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(singlePY)
    });
}

export const deletePY = (projectYarn) => {
    return fetch(baseUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(projectYarn)

    })
      .then(() => getAllPY())
  };

//   export const editPY = (py=> {
   
//     return fetch(`/api/projectyarn/${py.Id}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(py)
//     }).then(() => getAllPY())
//   })