import { Link, useNavigate, navigate } from "react-router-dom"
import "./Header.css"
import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export const Header = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate()
            
              const handleChange = (event, newValue) => {
                setValue(newValue);
              };
            
              return (
                <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                  <Tabs value={value} onChange={handleChange} centered>
                    <Tab  label="Home" href="/" />
                    <Tab label="Projects" href="/project" />
                    <Tab label="Yarn" href="/yarn" />
                    <Tab label="Resources" href="/resource" />
                     <Tab label ="Manage Account" href="/manage" />
                    </Tabs>
                </Box>
)}