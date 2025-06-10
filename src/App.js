import React, {useState, useEffect} from 'react';
// import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";
// import TextForm from "./components/TextForm";
// import About from './components/About';
import Alert from './components/Alert';
import {Outlet} from "react-router-dom";

function App() {
  // Logic for determining the theme mode
  const [mode, setMode] = useState({
    theme: "light",
    text: "Dark Mode",
    classNameAttribute: "text-black"
  }); //State for  mode

  // State for alert messages
  const [alert, setAlert] = useState(null); // State for alert messages
  // Logic for showing alert messages
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
  };

  // Auto-dismiss logic in useEffect
  useEffect(() => {
    if (alert !== null) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 4000);

      // Cleanup timeout if alert changes or component unmounts
      return () => clearTimeout(timer);
    }
  }, [alert]);

  // Toggle mode function to switch between light and dark themes
  const toggleMode = () => {
    if (mode.theme === "light") {
      setMode({
        theme: "dark",
        text: "Light Mode",
        classNameAttribute: "text-white"
      });
      document.body.style.backgroundColor = "#27445D"; // Dark background
      document.body.style.color = "white"; // Dark text color

      showAlert ("Dark mode has been enabled", "success");
    }
    else
    {
      setMode({
        theme: "light",
        text: "Dark Mode",
        classNameAttribute: "text-black"
      });
      document.body.style.backgroundColor = "white"; // Light background
      document.body.style.color = "black"; // Light text color 

      showAlert ("Light mode has been enabled", "success");
    }
  };
  
  const heading="Enter the text to analyze";
  return (
    <>
      <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} />
      <Alert alert={alert} dismissAlert={() => {setAlert(null);}}/>
      <div className="container my-4">
        <Outlet context={{ heading, mode, showAlert }} />
        {/* <TextForm heading="Enter the text to analyze" mode={mode} showAlert={showAlert} /> */}
        {/* <About /> */}
      </div>
    </>
  );
}

export default App;
