
import React from "react";
import {useState} from "react";


const apiUrl = "https://localhost:5001";

export const login = (userObject) => {
  return fetch(`${apiUrl}/user/getbyemail?email=${userObject.email}`)
  .then((r) => r.json())
    .then((user => {
      if(user.id){
        localStorage.setItem("user", JSON.stringify(user));
        return user
      }
      else{
        return undefined
      }
    }));
    
};

export const logout = () => {
      localStorage.clear()
};

export const register = (userObject) => {
  return  fetch(`/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObject),
  })
  .then((response) => response.json())
    .then((savedUserProfile) => {
      localStorage.setItem("user", JSON.stringify(savedUserProfile))
    });
};

export const getAllUsers = () => {
  return fetch(`${apiUrl}/api/user`)
  .then((r) => r.json())
};

export const getUserById = (id) => {
  return fetch(`${apiUrl}/api/user/${id}`).then((r) => r.json());
};

// export const editUserProfile = (userProfile) => {
//   return fetch(`/api/userprofile/${userProfile.id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(userProfile)
//   })
//   .then(() => getAllUserProfiles());
// }

// //Retrieve user types
// export const getAllUserTypes = () => {
//   return fetch(`${apiUrl}/api/userprofile/GetUserTypes`)
//   .then((r) => r.json())
// }

// //Change the user type
// export const updateUserType = (userProfileId, userTypeId) => {
//   return fetch(`${apiUrl}/api/userprofile/UpdateUserType/${userProfileId}/${userTypeId}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(userTypeId)
//   })
// }


// return (
//   <UserProfileContext.Provider value={{ isLoggedIn, login, logout, register,  }}>
//      {props.children}
//   </UserProfileContext.Provider>
// );
