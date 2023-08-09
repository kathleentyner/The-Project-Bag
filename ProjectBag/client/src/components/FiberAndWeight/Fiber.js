import React from "react";
import { Link } from "react-router-dom";

//This function is in charge of the contents of each individual project. It uses the prop "project" to get state from Project.js
export const Fiber = ({ fiber }) => {

  return (
      <tbody>
        <tr>
          <td>{fiber.name}</td>
          
    
        </tr>
      </tbody>
  );
};