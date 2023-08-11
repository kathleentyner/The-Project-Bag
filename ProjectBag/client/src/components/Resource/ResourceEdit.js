import {useEffect, useState } from "react"
import {useNavigate, useParams } from "react-router-dom"
import {editResource, getResourceById} from "../../APIManagers/ResourceManager"
import "./Form.css"
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';



export const ResourceEdit = () => {
    const navigate = useNavigate()
    const {resourceId } = useParams();
   
     const [resource, update] = useState({
        type: "",
        title: "",
        description: "",
        resourceUrl: ""
    })
    useEffect(() => {
        getResourceById(resourceId)
        .then((resources) => {
            update(resources)
        })
    }, [resourceId]);

    const handleSave = (event) => {
        event.preventDefault()

        const resourceToEdit = {
            Id: parseInt(resourceId),
            Type: resource.type,
            Title: resource.title,
            Description: resource.description,
            ResourceUrl: resource.resourceUrl, 
                  
        }


        return editResource(resourceToEdit).then(navigate(`/resource`))
    }
//I've found this method to be very useful when needing to select an item then add it to the database

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
                 Resource Details
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Update Your {resource.name} {resource.type} 
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
                        <label htmlFor="description"><strong>Type: </strong> </label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={resource.type}
                            onChange={ 
                                (event) => {
                                const copy = {...resource} 
                                copy.type = event.target.value 
                                update(copy)
                            } 
                        }/>
                     </div>
                     </fieldset>
                     <fieldset>
                    <div className="form-group">
                        <label htmlFor="description"><strong>Title: </strong> </label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={resource.title}
                            onChange={ 
                                (event) => {
                                const copy = {...resource} 
                                copy.title = event.target.value 
                                update(copy)
                            } 
                        }/>
                     </div>
                     </fieldset>
                 <fieldset>
                    <div className="form-group">
                        <label htmlFor="description"><strong>Description: </strong> </label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={resource.description}
                            onChange={ 
                                (event) => {
                                const copy = {...resource} 
                                copy.description = event.target.value 
                                update(copy)
                            } 
                        }/>
                     </div>
                     </fieldset>

                     <fieldset>
                    <div className="form-group">
                        <label htmlFor="description"><strong>Add A Link: </strong> </label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={resource.resourceUrl}
                            onChange={ 
                                (event) => {
                                const copy = {...resource} 
                                copy.resourceUrl = event.target.value 
                                update(copy)
                            } 
                        }/>
                     </div>
                     </fieldset>
                     <Button variant="outlined"  onClick={(clickEvent) => handleSave(clickEvent)} >
                  Save
                 </Button>
                   
            </form>   
    </>
        )}