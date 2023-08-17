import {useEffect, useState} from "react"
import {useNavigate } from "react-router-dom"
import {addResource} from "../../APIManagers/ResourceManager"
import "./Form.css"
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import narrowlogo from '../Nav/narrowlogo.png';
import Card from '@mui/material/Card';



export const ResourceForm = () => {
    const navigate = useNavigate()

    const [resource, update] = useState({
        type: "",
        title: "",
        description: "",
        resourceUrl: ""
       
     
    })

    const handleSave = (event) => {
        event.preventDefault()

        const resourceToAPI = {
            Type: resource.type,
            Title: resource.title,
            Description: resource.description,
            ResourceUrl: resource.resourceUrl        
        }

        // how to navigate to the project I just created?
        return addResource(resourceToAPI).then(navigate(`/resource`))
    }
  
    const theme = createTheme({
        palette: {
            light: '#0494AD',
            main: '#00768B',
            dark: '#015362',
         
            background: {
            default: '#F2EEE3',
            },
      
            secondary:{
              main: "#00768B"
            }
      }});
    
        return ( <>
<ThemeProvider theme={theme}>
          <CssBaseline />

          <Box
              sx={{
                  bgcolor: '#F2EEE3',
                  pt: 8,
                  pb: 6,
              }}

              display='flex'
              alignItems='center'
              justify='center'
          >
              <Container >
                  <Box
                      sx={{
                          display: 'flex',
                          justifyContent: "center"
                      }}
                  >
                      <img
                          alt='Project Bag logo'
                          src={narrowlogo}
                          width={800}
                          align='center'

                      />
                  </Box>
             
              <Stack
                  sx={{ pt: 4 }}
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                  > <Typography variant="h5" align="center" color="#545454" paragraph>
                Add a resource to your library
                </Typography>
              </Stack>
              </Container>
          </Box>
          <Box
              sx={{
                  justifyContent: "center",
                  display: "flex"
              }}
          >
              <Card sx={{ bgcolor: '#F2EEE3', marginBottom: 10, padding: 5 }} bgcolor="#545454" >
                  <form style={{ width: 600, }}>
                      <Typography variant="h6" align="center" color="#545454" paragraph>

                          Fill out this form to add a new resource.
                      </Typography>

                      <fieldset>
                    <div className="form-group">
                        <label htmlFor="description">Type: </label>
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
                        <label htmlFor="title">Title:  </label>
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
                        <label htmlFor="description">Description: </label>
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
                        <label htmlFor="description">Add a Link: </label>
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
                    
                  
                 <Button variant="contained" color='secondary'  onClick={(clickEvent) => handleSave(clickEvent)} >
                  Submit
                 </Button>
                   
            </form>                 
            </Card>
</Box>
</ThemeProvider>    
    </>
        )}