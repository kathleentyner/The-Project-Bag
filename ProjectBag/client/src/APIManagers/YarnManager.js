import React from "react";

const baseUrl = "/api/yarn";

export const getAllYarn = () => {
    return fetch(baseUrl) 
    .then((res) => res.json())
};

//return a single project found by ID
export const getYarnById= (id) => {
    return fetch(`/api/yarn/${id}`).then((res) => res.json())
}

export const addYarn = (singleYarn) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(singleYarn)
    });
}

export const deleteYarn = (id) => {
    return fetch(`/api/yarn/${id}`, {
      method: "DELETE",
    })
    .then(() => getAllYarn())
};

  export const editYarn = (yarn) => {
   
    return fetch(`${baseUrl}/${yarn.Id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(yarn)
    })}
    //search the database
export const searchYarns = (query)=> { 
    return fetch(`${baseUrl}/search?query=${query}&sortDesc=true`)
    .then((res)=> res.json())
  };