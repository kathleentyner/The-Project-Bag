import { Link, useNavigate, navigate } from "react-router-dom"
import "./Header.css"
import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

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
      },
      primary: {
        main:'#F2EEE3'
      }
}});




export const Header = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate()
            
              const handleChange = (event, newValue) => {
                setValue(newValue);
              };
            
              return (
                <ThemeProvider theme={theme}>
                  <CssBaseline/>
                <Box sx={{ width: '100%', bgcolor: 'light'}}>


                  <Tabs value={value} onChange={handleChange} centered color='primary'  indicatorColor="primary" textColor='primary'
>
                    <Tab textColor='primary' label="Home" color="main" href="/" />
                    <Tab textColor='primary' label="Projects" href="/project" />
                    <Tab textColor='primary' label="Yarn Stash" href="/yarn" />
                     <Tab textColor='primary' label ="Notions" href="/notions" />
                     <Tab textColor='primary' label ="Resources" href="/resource" />

                    </Tabs>
                 
                </Box>
                </ThemeProvider>
)}
