import React from "react";
import { Link } from "react-router-dom";

//This function is in charge of the contents of each individual project. It uses the prop "project" to get state from Project.js
export const Yarn = ({ yarn }) => {

  return (
      <tbody>
        <tr>
          <td>{yarn.brand}</td>
          <td>{`${yarn.fiberTag.name}`}</td>
          <td>{`${yarn.weightTag.name}`}</td>
        </tr>
      </tbody>
  );
};