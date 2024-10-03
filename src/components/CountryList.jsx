import React, { useEffect, useRef, useState } from "react";
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
  const indiaRef = useRef(null);

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

  useEffect(() => {
    if (indiaRef.current) {
      indiaRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [countries]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
        gap: "2px",
      }}
    >
      <Box>
        <Typography
          variant="h4"
          sx={{ backgroundColor: "#393E46", cursor: "default" }}
        >
          Countries
        </Typography>
        <Divider sx={{ backgroundColor: "#222831" }} />
        <List
          sx={{
            maxHeight: "90vh",
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
              ref={country.name === "India" ? indiaRef : null}
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
        <Typography
          variant="h4"
          sx={{ backgroundColor: "#393E46", cursor: "default" }}
        >
          States in {selectedCountry}
        </Typography>
        <Divider sx={{ backgroundColor: "#222831" }} />
        <List
          sx={{
            maxHeight: "90vh",
            overflow: "auto",
            cursor: "default",
            backgroundColor: "#393E46",
            height: "100vh",
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
