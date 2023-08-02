import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import {Header }from "./components/Nav/Header"; 
import {ApplicationViews }from "./components/Nav/ApplicationViews";
import { useEffect } from 'react';
import {Authorize } from './components/User/Authorize';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);


    useEffect(() => {
        if (localStorage.getItem("user")) {
            setIsLoggedIn(true)

        }
    }, [isLoggedIn])

    return (
        <Router>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            {isLoggedIn ?
                <ApplicationViews />
                :
                <Authorize setIsLoggedIn={setIsLoggedIn} />
            }
        </Router>
    );
}

export default App;