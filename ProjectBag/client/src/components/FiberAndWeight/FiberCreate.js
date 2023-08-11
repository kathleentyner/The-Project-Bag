import {useState} from "react"
import {useNavigate} from "react-router-dom"

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import { addFiber } from "../../APIManagers/FIberManager";
import narrowlogo from '../Nav/narrowlogo.png';


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
        return addFiber(fiberToAPI).then(navigate(`/notions`))
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
        <Container>
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
              align="center"
            />
          </Box>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
Add A New Fiber Category          </Typography>      
</Container>
            </Box>
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
                   
                
                 <Button color="primary" variant="contained" onClick={(clickEvent) => handleSave(clickEvent)} >
                  Submit
                 </Button>
                 </form>

                 </ThemeProvider>  
              
    </>
        )}