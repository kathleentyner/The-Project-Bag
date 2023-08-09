//this component creates the post-tag obj. It represents a single tag assigned to a post  

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { CardLink, Table } from "reactstrap";
import { getProjectById } from "../../APIManagers/ProjectManager";
import { getAllYarn } from "../../APIManagers/YarnManager";
import { ManageProjectYarn} from "../ProjectYarn/ManageProjectYarn";


export const ProjectYarn = () => {
//state for posts and tags - watching id
    const [project, setProject] = useState({});
    const [yarns, setYarns] = useState([]);
    const { id } = useParams();

    
// get the tags
    const getYarns = () => { //get all the tags for the post.
        getAllYarn().then(yarn=> setYarns(yarn));
    };
    
   //get the posts
     
   const getProjects = () => { //the the post by post id
    getProjectById(id).then(singleProject => setProject(singleProject));
  };
    
      useEffect(() => { //load data into component
        getYarns();
        getProjects();
    }, []);

     

    return (
        <div className="m-5">
            <h1>{project.patternName}</h1>
            
                <CardLink href={`/project/${id}`}>
                    Go back to my project
                </CardLink>
            
            <div className="mx-5 mt-2 mb-5">
                <Table>
                    <thead>
                        <tr>
                            <th>
                                My Yarn Stash
                            </th>
                          
                        </tr>
                    </thead>
                   
                    {yarns.map((yarn) => (
                        <ManageProjectYarn 
                        yarn={yarn}
                        project={project}
                         />
                    ))}

                </Table>
            </div>
        </div>)
}
// export default PostTags;