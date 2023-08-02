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
     
    })

    const handleSave = (event) => {
        event.preventDefault()

        const projectToAPI = {
            Pattern: project.patternName,
            Designer: project.designer,
            PatternUrl: project.patternUrl,
            PhotoUrl: project.photoUrl,
            Notes: project.notes,
            StartDate: new Date().toISOString(),
            EndDate: new Date().toISOString(),
            FiberId: project.fiberId,
            WeightId: project.weightId
          
        }

        // how to navigate to the project I just created?
        return addProject(projectToAPI).then(navigate(`/project`))
    }

    // const selectList = (event) => {
    //     const copy = {
    //         ...post
    //     }
    //     copy.categoryId = event.target.value
    //     update(copy)
    // }

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
                 How Was Hoagie's Day?
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Record Hoagie's Big Feelings to Better Support His Wellbeing
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
            <form className="reactionform">
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="Date"><strong>Today's Date: </strong></label>
                        <input
                            required autoFocus
                            type="date"
                            className="form-control"
                            value={reaction.date}
                            onChange={ 
                                (event) => {
                                const copy = {...reaction} 
                                copy.date= event.target.value 
                                update(copy)
                            } 
                        }/>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="description"><strong> Upload a photo of Hoagie's Day: </strong> </label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={reaction.img}
                            onChange={ 
                                (event) => {
                                const copy = {...reaction} 
                                copy.img = event.target.value 
                                update(copy)
                            } 
                        }/>
                     </div>
                     </fieldset>
                
                
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="description"><strong>What Caused Hoagie To Meltdown: </strong> </label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={reaction.description}
                            onChange={ 
                                (event) => {
                                const copy = {...reaction} 
                                copy.description = event.target.value 
                                update(copy)
                            } 
                        }/>
                     </div>
                     </fieldset>
                    <fieldset>
                    <div className="form-group">
                        <label htmlFor="level"><strong>How Bad Was Hoagie's Day? </strong></label>
                <Box
                   m={1}
                   display="flex"
                   justifyContent="flex-start"
                   alignItems="left"
                   paddingTop={5}
                   paddingBottom={13}
                   paddingLeft={4}
                           >     
                        <Slider 
                        value = {value}
                         setValue ={setValue}/>  </Box>
    
                
                            </div>
                            </fieldset>
                     <div className =  "meds"><strong> Did Hoagie Get His Medications? </strong></div>
                     <div className="checkboxes">
                     <Checkbox
                        label="AM Meds?" 
                        value={reaction.am}
                        onChange={ 
                            () => {
                            const copy = {...reaction} 
                            copy.am = !reaction.am
                            update(copy)
                        } }/>
                        
                        <Checkbox
                        label="PM Meds?"
                        value={reaction.pm}
                        onChange={ 
                            () => {
                            const copy = {...reaction} 
                            copy.pm = !reaction.pm
                            update(copy)
                        } }/></div>
                      <div className ="seizure"><strong> Any Seizure Activity? </strong> </div>
                      <div className="checkboxes">
    
                        <Checkbox
                        label="Seizure"
                        value={reaction.seizure}
                        onChange={ 
                            () => {
                            const copy = {...reaction} 
                            copy.seizure = !reaction.seizure
                            update(copy)
                        } }/>
                    </div> 
                    <div className="form-group">
                        <label htmlFor="notes"><strong> General Health and Behavior Notes: </strong>  </label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={reaction.notes}
                            onChange={ 
                                (event) => {
                                const copy = {...reaction} 
                                copy.notes = event.target.value 
                                update(copy)
                            } 
                        }/>
                     </div> 
                    
                 <Button variant="outlined"  onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} >
                  Submit
                 </Button>
                   
            </form>   
    </>
        )}