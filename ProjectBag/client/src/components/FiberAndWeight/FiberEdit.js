import {useState, useEffect} from "react"
import {useNavigate, useParams} from "react-router-dom"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import { editFiber, getFiberById } from "../../APIManagers/FiberManager";
import narrowlogo from '../Nav/narrowlogo.png';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';



export const FiberEdit = () => {
    const navigate = useNavigate()
    const {fiberId} = useParams();
    const [fiber, update] = useState({
        name: "",
       userId: 0

    })
    useEffect(() => {
        getFiberById(fiberId)
            .then((fiber) => {
                update(fiber)
            })
    }, [fiberId]);
    
    const handleSave = (event) => {
        event.preventDefault()

        const fiberToEdit = {
            Id: parseInt(fiberId),
            Name: fiber.name,
       
        }
        return editFiber(fiberToEdit).then(navigate(`/notions`))
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
                      Edit Fiber Type
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

                      Fill out this form to edit your fiber type.
                      </Typography>
                      < fieldset>
                    <div className="form-group">
                        <label htmlFor="description">Fiber Type: </label>
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
                     
                
                 <Button variant="contained" color="secondary" onClick={(clickEvent) => handleSave(clickEvent)} >
                  Submit
                 </Button>
                   
            </form>  
            </Card>
            </Box> 
            </ThemeProvider>    
    </>
        )}