import React from "react";
import { Route, Routes } from "react-router-dom";
import  {Home } from "../Nav/Home";
import { ProjectList } from "../Projects/ProjectList";
import { ProjectDetails } from "../Projects/ProjectDetails";
import { ProjectForm } from "../Projects/ProjectCreate";
import { YarnList } from "../Yarn/YarnList";
import { YarnDetails } from "../Yarn/YarnDetails";
import { ProjectYarn } from "../ProjectYarn/ProjectYarn";
import { FiberList } from "../FiberAndWeight/FiberList";
import { FiberForm } from "../FiberAndWeight/FiberCreate";
import { FiberDetails } from "../FiberAndWeight/FiberDetails";
import { WeightForm } from "../FiberAndWeight/WeightCreate";
import { WeightDetails } from "../FiberAndWeight/WeightDetails";
import { WeightList } from "../FiberAndWeight/WeightList";
import { YarnForm } from "../Yarn/YarnCreate";
import { YarnEdit } from "../Yarn/YarnEdit"
import { ProjectEdit } from "../Projects/ProjectEdit"
import { ResourceEdit } from "../Resource/ResourceEdit";
import { ResourceForm } from "../Resource/ResourceCreate";
import { ResourceDetails } from "../Resource/ResourceDetails";
import { ResourceList } from "../Resource/ResourceList";
import { FiberAndWeight } from "../FiberAndWeight/FiberAndWeight";
export const ApplicationViews =() => {

    return(
        <Routes>
    
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<ProjectList /> } />      
          <Route path="/project/:id" element = {<ProjectDetails />} />
          <Route path="/project/new" element = {<ProjectForm />} />
          <Route path="/yarn" element={<YarnList /> } />      
          <Route path="/yarn/:id" element = {<YarnDetails />} />
          <Route path="/manageyarn/:id" element = {<ProjectYarn />} />
          <Route path ="/fiber" element = {<FiberList /> } />
          <Route path ="/fiber/:id" element = {<FiberDetails /> } />
          <Route path="/fiber/new" element = {<FiberForm />} />
          <Route path ="/weight" element = {<WeightList /> } />
          <Route path ="/weight/:id" element = {<WeightDetails /> } />
          <Route path ="/weight/new" element = {<WeightForm/> } />
          <Route path ="/yarn/new" element = {<YarnForm/> } />
          <Route path ="/yarn/edit/:yarnId" element = {<YarnEdit />} />
          <Route path ="/project/edit/:projectId" element = {<ProjectEdit />} />
          <Route path="/resource" element={<ResourceList /> } />      
          <Route path="/resource/:id" element = {<ResourceDetails />} />
          <Route path="/resource/new" element = {<ResourceForm />} />
          <Route path ="/resource/edit/:resourceId" element = {<ResourceEdit />} />
          <Route path="/notions" element={<FiberAndWeight /> } />      
          

    </Routes>
   );
 
}
