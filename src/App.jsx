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
      }}
    >
      <CountrySelector />
    </Box>
  );
}

export default App;
