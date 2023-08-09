import {useState} from "react"
import {useNavigate} from "react-router-dom"
import "./FiberAndWeight.css"

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import { addFiber } from "../../APIManagers/FIberManager";



export const FiberForm = () => {
    const navigate = useNavigate()
    const [fiber, update] = useState({
        name: "",
        userId: 0
     
    })
    const handleSave = (event) => {
        event.preventDefault()

        const fiberToAPI = {
            Name: fiber.name,
            UserId: 1
          
        }
        return addFiber(fiberToAPI).then(navigate(`/fiber`))
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
                 New Fiber Type
                </Typography>
                
              </Container>
            </Box>         
              </ThemeProvider>    
              <form className="projectform">
              <fieldset>
                    <div className="form-group">
                        <label htmlFor="description"><strong>Fiber Type: </strong> </label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={fiber.name}
                            onChange={ 
                                (event) => {
                                const copy = {...fiber} 
                                copy.name = event.target.value 
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