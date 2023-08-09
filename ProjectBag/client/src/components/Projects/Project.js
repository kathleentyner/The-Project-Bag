import React from "react";
import { Link } from "react-router-dom";

//This function is in charge of the contents of each individual project. It uses the prop "project" to get state from Project.js
export const Project = ({ project }) => {

  return (
      <tbody>
        <tr>
          <td>{project.patternName}</td>
          <td>{`${project.designer}`}</td>
          <td><Link to={`/project/${project.id}`}>Details</Link></td>
        </tr>
      </tbody>
  );
};