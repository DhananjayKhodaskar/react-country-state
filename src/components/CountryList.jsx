import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Divider,
} from "@mui/material";

const CountrySelector = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [states, setStates] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://countriesnow.space/api/v0.1/countries/states"
        );
        setCountries(response.data.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const countryData = countries.find(
      (country) => country.name === selectedCountry
    );
    setStates(countryData ? countryData.states : []);
  }, [selectedCountry, countries]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#222831",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <Box>
        <Typography variant="h4" sx={{ backgroundColor: "#393E46" }}>
          Countries
        </Typography>
        <Divider sx={{ backgroundColor: "#222831" }} />
        <List
          sx={{
            maxHeight: "100vh",
            overflow: "auto",
            backgroundColor: "#393E46",
          }}
        >
          {countries.map((country) => (
            <ListItem
              key={country.iso3}
              button
              onClick={() => setSelectedCountry(country.name)}
              selected={country.name === selectedCountry}
              sx={{
                "&:hover": {
                  backgroundColor: "#EEEEEE",
                  cursor: "pointer",
                  color: "#222831",
                },
                backgroundColor:
                  country.name === selectedCountry ? "#00ADB5" : "transparent",
              }}
            >
              <ListItemText primary={country.name} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box>
        <Typography variant="h4" sx={{ backgroundColor: "#393E46" }}>
          States in {selectedCountry}
        </Typography>
        <Divider sx={{ backgroundColor: "#393E46" }} />
        <List
          sx={{
            maxHeight: "100vh",
            overflow: "auto",
            cursor: "pointer",
            backgroundColor: "#393E46",
          }}
        >
          {states.length > 0 ? (
            states.map((state) => (
              <ListItem key={state.state_code}>
                <ListItemText primary={state.name} />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No states available." />
            </ListItem>
          )}
        </List>
      </Box>
    </Box>
  );
};

export default CountrySelector;
