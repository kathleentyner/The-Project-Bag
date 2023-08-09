import React from "react";
import { Link } from "react-router-dom";

export const Resource = ({ resource }) => {

  return (
      <tbody>
        <tr>
          <td>{resource.type}</td>
         
        </tr>
      </tbody>
  );
};