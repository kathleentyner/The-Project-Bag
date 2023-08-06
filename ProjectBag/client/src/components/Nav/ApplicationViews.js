import React from "react";
import { Route, Routes } from "react-router-dom";
import  {Home } from "../Nav/Home";
import { ProjectList } from "../Projects/ProjectList";
import { ProjectDetails } from "../Projects/ProjectDetails";
import { ProjectForm } from "../Projects/ProjectCreate";
import { YarnList } from "../Yarn/YarnList";
import { YarnDetails } from "../Yarn/YarnDetails";
import { ProjectYarn } from "../ProjectYarn/ProjectYarn";
import { FiberAndWeight} from "../FiberAndWeight/FiberAndWeight";
import { FiberForm } from "../FiberAndWeight/FiberCreate";
import { WeightForm } from "../FiberAndWeight/WeightCreate";
import { YarnForm } from "../Yarn/YarnCreate";



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
          <Route path ="/notions" element = {<FiberAndWeight /> } />
          <Route path="/fiber/new" element = {<FiberForm />} />
          <Route path ="/weight/new" element = {<WeightForm/> } />
          <Route path ="/yarn/new" element = {<YarnForm/> } />

    </Routes>
   );
 
}
