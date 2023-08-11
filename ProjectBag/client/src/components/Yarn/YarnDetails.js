import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {deleteYarn, getYarnById } from "../../APIManagers/YarnManager"
import {Alert } from "reactstrap";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import narrowlogo from '../Nav/narrowlogo.png'

export const YarnDetails = () => {
    const [yarn, setYarn] = useState();
    const [showAlert, setShowAlert] = useState(false)
    const { id } = useParams();
    const navigate = useNavigate();
   
  
    useEffect(() => {
      getYarnById(id).then(setYarn)
     
    }, [])
  
    if (!yarn) {
      return null;
    }
    
  
    const handleDelete = () => {
      deleteYarn(yarn.id).then(() => {
        setShowAlert(false)
        navigate(`/yarn`)
      });
    };
  
    const handleCancel = () => {
      setShowAlert(false) 
    }
  
    const deleteYarnAlert = () => {
      return (<>
      <Alert color="danger" key={'danger'}>
        Are you sure you want to delete this yarn?
        <br></br><Link onClick={handleDelete}>Yes</Link> / <Link onClick={handleCancel}>No</Link>
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
    
          secondary:{
            main: "#00768B"
          }
    }});

    return (
      <>
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
              justify='center'>
                    <Container >
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
                        </Container>
              
                <Typography variant="h5" align="center" color="#545454"  paragraph>
                What's In Your Stash?
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
        
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
       >
        <Grid item xs={3}>
        <Card sx={{ maxWidth:800} }  display ="flex">
   <CardActionArea>
   <CardMedia
        component="img"
        height="140"
        image={yarn.yarnUrl} 
        alt= "single project"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {yarn.brand}
        </Typography>
        <Typography variant="body2" color="#545454">
        <List sx={{ width: '100%', maxWidth: 700, bgcolor: '#F2EEE3' }}>
        <ListItem sx={{ bgcolor: '#F2EEE3'}}  >         
        <ListItemText sx={{color:"#545454"}} primary="Color" secondary= {yarn.color} />
        </ListItem>
        <ListItem sx={{ bgcolor: '#F2EEE3'}}  >         
        <ListItemText sx={{color:"#545454"}}  primary="Quantity" secondary={yarn.quantity} />
      </ListItem>
      <ListItem sx={{ bgcolor: '#F2EEE3'}}  >         
        <ListItemText sx={{color:"#545454"}}  primary="Fiber" secondary= {yarn.fiberTag.name} />
      </ListItem>
      <ListItem sx={{ bgcolor: '#F2EEE3'}}  >         
        <ListItemText sx={{color:"#545454"}}  primary="Yarn Weight" secondary= {yarn.weightTag.name} />
      </ListItem>
    </List>
        </Typography>
       
        <Button variant="contained" 
        padding={1} color='secondary'
        align="center"  onClick={() => navigate(`/yarn/edit/${yarn.id}`)}>Edit</Button>
     
     <><Button
        variant="outline"
        align="center"
        color='secondary'
        padding={1}
        onClick={() => {
          setShowAlert(true);      
        }}> 
        Delete
      </Button>
        {showAlert && deleteYarnAlert()}
        </>
      </CardContent>
    </CardActionArea>
</Card>


        </Grid>      
       </Grid>
       </ThemeProvider>
       </>
    )
    }