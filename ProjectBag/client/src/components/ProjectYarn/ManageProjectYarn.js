import React, { useState, useEffect } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { addPY, deletePY } from "../../APIManagers/ProjectYarnManager";
import { useNavigate } from "react-router-dom";

export const ManageProjectYarn = ({ yarn, project }) => {
  const navigate = useNavigate();
  const [yarnAdded, setYarnAdded] = useState(false);

  useEffect(() => {
    if (project.yarns) { // Check if project.yarns exists
      const isYarnAdded = project.yarns.some(pYarn => pYarn.id === yarn.id);
      setYarnAdded(isYarnAdded);
    }
  }, [project.yarns, yarn.id]);

  const savePY = () => {
    const newPY = {
      projectId: project.id,
      yarnId: yarn.id,
    };

    addPY(newPY)
      .then(() => {
        navigate(`/project/${project.id}`);
      });
  };

  const handleRemoveYarn = () => {
    const pjToRemove = {
      yarnId: yarn.id,
      projectId: project.id,
    };

    deletePY(pjToRemove)
      .then(() => {
        navigate(`/project/${project.id}`);
      });
  };

  return (
    <Card className="m-4">
      <CardBody>
        <strong>
          Brand: {yarn.brand}; Colorway: {yarn.color}
        </strong>
        {yarnAdded ? (
          <Button onClick={handleRemoveYarn} className="btn btn-primary">
            Remove
          </Button>
        ) : (
          <button className="btn btn-primary" onClick={savePY}>
            Add Yarn
          </button>
        )}
      </CardBody>
    </Card>
  );
};

export default ManageProjectYarn;