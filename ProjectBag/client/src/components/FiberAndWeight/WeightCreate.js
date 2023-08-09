import {useState} from "react"
import {useNavigate} from "react-router-dom"
import "./FiberAndWeight.css"

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import { addWeight } from "../../APIManagers/WeightManager";



export const WeightForm = () => {
    const navigate = useNavigate()
    const [weight, update] = useState({
        name: "",
        userId: 0
     
    })
    const handleSave = (event) => {
        event.preventDefault()

        const weightToAPI = {
            Name: weight.name,
            UserId: 1
          
        }
        return addWeight(weightToAPI).then(navigate(`/notions`))
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
                 New Yarn Weight
                </Typography>
                
              </Container>
            </Box>         
              </ThemeProvider>    
              <form className="projectform">
              <fieldset>
                    <div className="form-group">
                        <label htmlFor="description"><strong>Yarn Weight: </strong> </label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={weight.name}
                            onChange={ 
                                (event) => {
                                const copy = {...weight} 
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