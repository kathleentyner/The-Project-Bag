import React from "react";

const baseUrl = "/api/resource";

export const getAllResources = () => {
    return fetch(baseUrl) 
    .then((res) => res.json())
};

//return a single project found by ID
export const getResourceById = (id) => {
    return fetch(`/api/resource/${id}`).then((res) => res.json())
}

export const addResource = (singleresource) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(singleresource)
    });
}

export const deleteResource = (id) => {
    return fetch(`/api/resource/${id}`, {
      method: "DELETE",
    })
      .then(() => getAllResources())
  };

  export const editResource = (resource) => {
   
    return fetch(`${baseUrl}/${resource.Id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(resource)
    })}