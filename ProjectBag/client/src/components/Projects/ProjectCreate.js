import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import {addProject, getAllProjects} from "../../APIManagers/ProjectManager"
import "./Form.css"
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import { getAllFibers } from "../../APIManagers/FIberManager";
import { getAllWeights } from "../../APIManagers/WeightManager";



export const ProjectForm = () => {
    const navigate = useNavigate()

    const [weights, setWeights] = useState([])
     const [fibers, setFibers] = useState([])

    const getFibers = () => {
         getAllFibers().then(allFibers => setFibers(allFibers));
   }
   const getWeights = () => {
    getAllWeights().then(allWeights => setWeights(allWeights));
}

    useEffect(() => {
        getFibers()
        getWeights()
     }, [])


    const [project, update] = useState({
        patternName: "",
        designer: "",
        patternUrl: "",
        photoUrl: "",
        notes: "",
        startDate: Date.now(),
        endDate: Date.now(),
        fiberId: 0,
        weightId: 0,
        userId: 0
     
    })

    const handleSave = (event) => {
        event.preventDefault()

        const projectToAPI = {
            PatternName: project.patternName,
            Designer: project.designer,
            PatternUrl: project.patternUrl,
            PhotoUrl: project.photoUrl,
            Notes: project.notes,
            StartDate: new Date().toISOString(),
            EndDate: new Date().toISOString(),
            FiberId: project.fiberId,
            WeightId: project.weightId,
            UserId: 1
          
        }

        // how to navigate to the project I just created?
        return addProject(projectToAPI).then(navigate(`/project`))
    }
  //I've found this method to be very useful when needing to select an item then add it to the database
  const selectListFiber = (event) => {
    const copy = {
        ...project
    }
    copy.fiberId = event.target.value
    update(copy)
}

const selectListWeight = (event) => {
    const copy = {
        ...project
    }
    copy.weightId = event.target.value
    update(copy)
}

const theme = createTheme();

    return ( <>
        <ThemeProvider theme={theme}>
          <CssBaseline />
    
            <Box
          sx={{
            bgcolor: '#d7e4fc',
            pt: 8,
            pb: 6,
          }}
        >
              <Container maxWidth="lg">
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="text.primary"
                  gutterBottom
                >
                 Project Details
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                What's On Your Needles?
                </Typography>
                <Stack
                  sx={{ pt: 4 }}
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                >
                </Stack>
              </Container>
            </Box>         
              </ThemeProvider>    
              <form className="projectform">
              <fieldset>
                    <div className="form-group">
                        <label htmlFor="description"><strong>Pattern Name: </strong> </label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={project.patternName}
                            onChange={ 
                                (event) => {
                                const copy = {...project} 
                                copy.patternName = event.target.value 
                                update(copy)
                            } 
                        }/>
                     </div>
                     </fieldset>
                     
                 <fieldset>
                    <div className="form-group">
                        <label htmlFor="description"><strong>Designer: </strong> </label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={project.designer}
                            onChange={ 
                                (event) => {
                                const copy = {...project} 
                                copy.designer = event.target.value 
                                update(copy)
                            } 
                        }/>
                     </div>
                     </fieldset>

                     <fieldset>
                    <div className="form-group">
                        <label htmlFor="description"><strong>Link to Pattern: </strong> </label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={project.patternUrl}
                            onChange={ 
                                (event) => {
                                const copy = {...project} 
                                copy.patternUrl = event.target.value 
                                update(copy)
                            } 
                        }/>
                     </div>
                     </fieldset>
                     <fieldset>
                    <div className="form-group">
                        <label htmlFor="description"><strong>Add Your Needles and Project Notes: </strong> </label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={project.notes}
                            onChange={ 
                                (event) => {
                                const copy = {...project} 
                                copy.notes = event.target.value 
                                update(copy)
                            } 
                        }/>
                     </div>
                     </fieldset>

                    <fieldset>
                    <div className="form-group">
                        <label htmlFor="fiber-select">Yarn Fiber Type</label>
                        {/* Select that category from the list!! */}
                        <select id="type"
                            value={
                                project.fiberId
                            }
                            onChange={
                                event => selectListFiber(event)
                        }>
                            <option value="0">Select the Fiber Type</option>
                            {
                            fibers.map(fiber => {
                                return <option value={fiber.id} key={
                                    fiber.id
                                }>
                                    {
                                    fiber.name
                                }</option>
                        })
                        } </select>  
                        </div>
                    </fieldset>

                    
                    <fieldset>
                    <div className="form-group">
                        <label htmlFor="weight-select">Yarn Weight</label>
                        {/* Select that category from the list!! */}
                        <select id="type"
                            value={
                                project.weightId
                            }
                            onChange={
                                event => selectListWeight(event)
                        }>
                            <option value="0">Select the Yarn Weight</option>
                            {
                            weights.map(weight => {
                                return <option value={weight.id} key={
                                    weight.id
                                }>
                                    {
                                    weight.name
                                }</option>
                        })
                        } </select>  
                         </div>
                        </fieldset>

                    <fieldset>
                    <div className="form-group">
                        <label htmlFor="description"><strong> Project Photo: </strong> </label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={project.photoUrl}
                            onChange={ 
                                (event) => {
                                const copy = {...project} 
                                copy.photoUrl = event.target.value 
                                update(copy)
                            } 
                        }/>
                     </div>
                     </fieldset>
                
                    
                 <Button variant="outlined"  onClick={(clickEvent) => handleSave(clickEvent)} >
                  Submit
                 </Button>
                   
            </form>   
    </>
        )}