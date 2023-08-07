//this component represents a single tag obj. It includes all of the buttons associated with the single tag,  - edit, delete, and assign (to assign to a post), it also has remove from a post, which is not functioning. i do not have logic included ti determine whether or not a button is displayed. 

import {useState, useEffect} from "react";
import { Card, CardBody, CardFooter, Button, Alert} from "reactstrap";
import { Link } from "react-router-dom";
import { addPY, deletePY, getPYById} from "../../APIManagers/ProjectYarnManager";
import { useNavigate, useParams } from "react-router-dom";


export const ManageProjectYarn = ({ yarn, project}) => {
// const [projectYarn, update] = useState({
//   projectId: "", 
//   yarnId: "",
// } )
// const {id } = useParams();
// const [showAlert, setShowAlert] = useState(false) //the confirmation pop-up box. 
const navigate = useNavigate()


//create a post-tag to save to a post
const savePY = () => {
    // event.preventDefault()
    const newPY = { //map 
        projectId: project.id,
        yarnId: yarn.id
    }

//add the tag to the post and return to the post details page 
    addPY(newPY).then((yarn) => {
      navigate(`/project/${project.id}`)
        
    });
}

// //not totally sure what's happening. I believe it is getting the specific post-tag for a post then adding it to an array of tags for the post. Looking at the tag id?
// useEffect(() => {
//     getPYById(project.id) //route param
//         .then((pyArray)=>
//       {
//             update(pyArray) 
//         })
// }, [id]) //watch state - param


// //these components are not working -- they should remove a tag from a post and return the user back to the post details page
const handleRemoveYarn = () => {
  const pjToRemove = {
      yarnId: yarn.id, 
      projectId: project.id
    }
deletePY(pjToRemove) .then(() => {
//  setShowAlert(false)
navigate(`/project/${project.id}`)
  });
 };
//for the popup alerts if after the users clicks the remove button they will be given the option to cancel.
// const handleCancel = () => {
//   setShowAlert(false) 
//  }
// // //the popup box displayed when a user clicks remove tag. Yes - the tag will be removed, no - cancel
// const removePYAlert = () => {
//    return (<>
//  <Alert color="danger" key={'danger'}>
//     Are you sure you want to remove this yarn from your project?
//     <br></br><Link onClick={handleRemoveYarn}>Yes</Link> / <Link onClick={handleCancel}>No</Link>
//   </Alert>
//    </>)
//  }


  return (
      <Card className="m-4">

        <CardBody>

            
              <strong>Brand: {yarn.brand}; Colorway: {yarn.color}</strong> 
              <button className="btn btn-primary" onClick={()=>{ savePY() }}>
              Add Yarn
          </button>   
          <Button 
        onClick={(clickEvent) => handleRemoveYarn(clickEvent)}
            className="btn btn-primary">
           Remove
        </Button>
 
       
       
        </CardBody>
      </Card>
  )}
  export default ManageProjectYarn