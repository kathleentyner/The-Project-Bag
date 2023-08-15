import React from "react";

const baseUrl = "/api/weight";

export const getAllWeights = () => {
    return fetch(baseUrl) 
    .then((res) => res.json())
};

//return a single project found by ID
export const getWeightById = (id) => {
    return fetch(`/api/weight/${id}`).then((res) => res.json())
}

export const addWeight = (singleWeight) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(singleWeight)
    });
}

export const deleteWeight = (id) => {
    return fetch(`/api/weight/${id}`, {
      method: "DELETE",
    })
      .then(() => getAllWeights())
  };

  export const editWeight = (weight => {
   
    return fetch(`/api/weight/${weight.Id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(weight)
    }).then(() => getAllWeights())
  })