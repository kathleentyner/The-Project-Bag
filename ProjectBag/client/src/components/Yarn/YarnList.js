
import Button from '@mui/material/Button';
import { useEffect, useState, } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getAllYarn, searchYarns } from "../../APIManagers/YarnManager"
import { Yarn } from './Yarn';
import "./Yarn.css"
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import narrowlogo from '../Nav/narrowlogo.png'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';


export const YarnList = () => {
  const [yarn, setYarns] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState({})

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value)
  };

  const handleButtonClick = (event) => {
    event.preventDefault();

    searchYarns(searchTerm)
      .then((res) => {
        setSearchResults(res);
      })
  }
  const navigate = useNavigate()

  const getYarns = () => {
    getAllYarn().then(yarn => setYarns(yarn));
  }

  useEffect(() => {
    getYarns();
  }, [])


  const create = () => {
    navigate("/yarn/new")
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


  return (
    
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* Hero unit */}
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
                align="center"

              />
            </Box>

            <Typography variant="h5" align="center" color="#545454" paragraph>
              What's in My Yarn Stash
            </Typography>
            <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
              <Box m={1} display="flex" justifyContent="center" alignItems="center"marginBottom={10}>
                <Button onClick={create}>
                  Add A New Yarn
                </Button>
              </Box>
            </Stack>
            <form className='post-form'>
              <> <Typography gutterBottom variant='h6' color='#545454' component='div'>

                Search yarns by weight or fiber type
              </Typography>
                <Typography gutterBottom variant='body1' color='#545454' component='div'>
                  Enter a fiber or yarn weight:
                  <input
                    type='text'
                    id='searchTerm'
                    value={searchTerm}
                    onChange={handleSearchInput}
                  />
                </Typography>
              </>
              <Button
                onClick={(clickEvent) => handleButtonClick(clickEvent)}
                variant='contained'
                color='primary'
                sx={{ bgcolor: '#545454', color: '#F2EEE3' }}
              >
                Search
              </Button>
            </form>

            {searchResults.length > 0 && (
              <>
                <Typography gutterBottom variant='h5' color='#545454' component='div' marginTop={10}>
                  Search Results:
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    '& > :not(style)': {
                      m: 1,
                      width: 200,
                      height: 250,
                      paddingBottom: 20,
                    },
                  }}
                > <>

                    {searchResults.map((yarn) => (


                      <Card sx={{ maxWidth: 200, bgcolor: '#F2EEE3' }} key={yarn.id} >
                        <CardActionArea>
                          <CardMedia
                            component='img'
                            height='150'
                            width='150'
                            image={yarn.yarnUrl}
                            alt='yarn'
                          />
                          <CardContent onClick={() => navigate(`/yarn/${yarn.id}`)}
                          >
                            <Typography gutterBottom variant='body2' color='#545454' component='div'>
                              Brand: {yarn.brand}
                            </Typography>

                            <Button
                              sx={{ align: 'center', }}
                              variant='contained'
                              color='secondary'
                              onClick={() => navigate(`/yarn/${yarn.id}`)}
                            >
                              View
                            </Button>
                          </CardContent>
                        </CardActionArea>
                      </Card>

                    ))}
                  </>   </Box>
              </>
            )}
            < Typography gutterBottom variant='h5' color='#545454' component='div' marginTop={10}>
              My Yarns
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
                '& > :not(style)': {
                  m: 1,
                  width: 400,
                  height: 350,
                  paddingBottom: 20,

                },
              }
              }>

              {yarn.map((yarn) => (

                  <Card sx={{ maxWidth: 400, bgcolor: '#545454' }} key={yarn.id}  >
                    <CardActionArea>

                      <CardContent>
                        <CardMedia
                          component="img"
                          height="200"
                          width="200"
                          image={yarn.yarnUrl}
                          alt="yarn"
                        />
                        <Typography gutterBottom variant="h6" color='#F2EEE3' component="div">
                          Brand: {yarn.brand}
                        </Typography>
                        <Typography gutterBottom variant="body1" color='#F2EEE3' component="div">

                          Colorway: {yarn.color}
                        </Typography>
                        <Button sx={{ align: 'center', margin: 2 }} variant="contained" color='secondary'

                          onClick={() => navigate(`/yarn/${yarn.id}`)}>View
                          </Button>
                      </CardContent>
                    </CardActionArea>
                  </Card>
               ))}
                </Box>
              </Container>
              </Box>
          </ThemeProvider>
       )}