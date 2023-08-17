import {useEffect, useState } from "react"
import {useNavigate, useParams, Link } from "react-router-dom"
import {editResource, getResourceById, deleteResource} from "../../APIManagers/ResourceManager"
import "./Form.css"
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import narrowlogo from '../Nav/narrowlogo.png'
import Card from '@mui/material/Card';
import {Alert } from "reactstrap";


export const ResourceEdit = () => {
    const [showAlert, setShowAlert] = useState(false)
    const navigate = useNavigate();
    const { id } = useParams();
    const { resourceId } = useParams();


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
    const handleDelete = () => {
        deleteResource(resource.id).then(() => {
          setShowAlert(false)
          navigate(`/resource`)
        });
      };
    
      const handleCancel = () => {
        setShowAlert(false) 
      }
    
      const deleteResourceAlert = () => {
        return (<>
        <Alert color="danger" key={'danger'}>
        <Typography paddingLeft={6} paddingBottom={3} align="left" color="#545454" fontFamily={'sans-serif'} >
    
          Are you sure you want to delete this resource?
          <br></br><Link style={{ color: '#38B6FF'}}  onClick={handleDelete}>Yes</Link> / <Link style={{ color: '#F2EEE3' }} onClick={handleCancel}>No</Link>
          </Typography>
    </Alert>
        </>)
      }


    const theme = createTheme({
        palette: {
            light: '#0494AD',
            main: '#00768B',
            dark: '#015362',

            background: {
                default: '#F2EEE3',
            },

            secondary: {
                main: "#00768B"
            }
        }
    });
    return (<>
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
                        Use This Page to Manage Your Resource. Fill Out the Form to Update Your Resource; or Click the Delete Button to Remove it from Your Resource Library.
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

                            Fill out this form to edit your resource.
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
                     <Button variant='contained'  color='secondary'onClick={(clickEvent) => handleSave(clickEvent)} >
                  Save
                 </Button>
                 <Button sx={{  margin: 3, }} variant="contained" color='main'
        align="left"
        padding={5}
       
        onClick={() => {
          setShowAlert(true);      
        }}> 
        Delete
      </Button>
        {showAlert && deleteResourceAlert()}
            </form>   
            </Card>
            </Box>
               </ThemeProvider>
    </>
    )
}