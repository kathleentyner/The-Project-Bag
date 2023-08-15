import {useState} from "react"
import {useNavigate} from "react-router-dom"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import { addWeight } from "../../APIManagers/WeightManager";
import narrowlogo from '../Nav/narrowlogo.png';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';



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
                      New Yarn Weight Category
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

                          Fill out this field to add a new yarn weight.
                      </Typography>
                      < fieldset>
                    <div className="form-group">
                        <label htmlFor="description">Yarn Weight: </label>
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
                     
                
                 <Button variant="contained" color="primary" onClick={(clickEvent) => handleSave(clickEvent)} >
                  Submit
                 </Button>
                   
            </form>  
            </Card>
            </Box> 
            </ThemeProvider>    
    </>
        )}