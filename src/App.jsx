import { useState } from "react";
import "./App.css";
import CountrySelector from "./components/CountryList";
import { Box } from "@mui/material";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        width: "100vw",
        color: "#EEEEEE",
        backgroundColor: "#222831",
        height: "100vh",
      }}
    >
      <CountrySelector />
    </Box>
  );
}

export default App;
