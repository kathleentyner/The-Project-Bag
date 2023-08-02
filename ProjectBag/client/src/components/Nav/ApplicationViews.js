import React from "react";
import { Route, Routes } from "react-router-dom";
import  {Home } from "../Nav/Home";
import { ProjectList } from "../Projects/ProjectList";
import { ProjectDetails } from "../Projects/ProjectDetails";
export const ApplicationViews =() => {

    return(
        <Routes>
    
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<ProjectList /> } />      
          <Route path="/project/:id" element = {<ProjectDetails />} />
    </Routes>
   );
 
}
