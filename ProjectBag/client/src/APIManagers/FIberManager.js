import React from "react";

const baseUrl = "/api/fiber";

export const getAllFibers = () => {
    return fetch(baseUrl) 
    .then((res) => res.json())
};

//return a single project found by ID
export const getFiberById = (id) => {
    return fetch(`/api/fiber/${id}`).then((res) => res.json())
}

export const addFiber = (singleFiber) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(singleFiber)
    });
}

export const deleteFiber = (id) => {
    return fetch(`/api/fiber/${id}`, {
      method: "DELETE",
    })
      .then(() => getAllFibers())
  };

  export const editFiber = (fiber => {
   
    return fetch(`/api/fiber/${fiber.Id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(fiber)
    })
});