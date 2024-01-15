import { TextField, Button, Box, Select, MenuItem, FormControl, InputLabel  } from '@mui/material';
import React from 'react';
import './Forms.css';
import { useState } from 'react';

export const Forms = ({filter, onFilterChange}) => {
    
  const handleInputChange = (name, value) => {
    onFilterChange({ ...filter, [name]: value });
  };

  const handleClearFilters = () => {
    onFilterChange({
      MinPrice: '',
      MaxPrice: '',
      ProductName:'',
    });
  };

  return (
    <Box className="MainBox">
      <Box className="BoxWidth">
      <TextField
          id="TextInput"
          label="Szukaj"
          name="ProductName"
          value={filter.ProductName}
          onChange={(e) => handleInputChange('ProductName', e.target.value)}
      />
      </Box>
    
  Cena
  <Box className="BoxWidth">
    <TextField
      id="TextInput"
      label="od"
      name="MinPrice"
      value={filter.MinPrice}
      onChange={(e) => handleInputChange('MinPrice', e.target.value)}

    />
      <TextField
      id="TextInput"
      label="do"
      name="MaxPrice"
      value={filter.MaxPrice} 
      onChange={(e) => handleInputChange('MaxPrice', e.target.value)}
    />
    </Box>
    Dostępność
    <Box className="BoxWidth" mr={2}>
      <FormControl fullWidth >
        <InputLabel >Dostępność</InputLabel>
        <Select
          label="wybierz jedno z trzech 0, 1 lub 2"
          name="IsAvailable"
          value={filter.IsAvailable || ''}
          onChange={(e) => handleInputChange('IsAvailable', e.target.value)}
        >
          <MenuItem value={false}>Niedostępny</MenuItem>
          <MenuItem value={true}>Dostępny</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <Button variant="outlined" onClick={handleClearFilters}> 
      Wyczyść filtry
    </Button>
  </Box>
)};

export default Forms;
