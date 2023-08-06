import React from "react";
import { Link } from "react-router-dom";

export const Yarn = ({ yarn }) => {

  return (
      <tbody>
        <tr>
          <td>{yarn.brand}</td>
         
        </tr>
      </tbody>
  );
};