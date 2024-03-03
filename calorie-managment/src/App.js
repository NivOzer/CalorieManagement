import logo from "./logo.svg";
import "./App.css";
import { React } from "react";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

function App() {
  return (
    <div className="App">
      <IconButton aria-label="delete" size="large">
        <DeleteIcon fontSize="inherit" />
      </IconButton>
      <TextField id="filled-basic" label="Item" variant="filled" />
      <TextField
        id="filled-basic"
        label="Number of Calories"
        variant="filled"
      />
      <TextField id="filled-basic" label="Description" variant="filled" />
      <FormControl variant="filled" sx={{ m: 0, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          // value={"Category"}
        >
          <MenuItem value={10}>Breakfast</MenuItem>
          <MenuItem value={20}>Lunch</MenuItem>
          <MenuItem value={30}>Dinner</MenuItem>
          <MenuItem value={30}>Other</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary">
        Submit
      </Button>
    </div>
  );
}

export default App;
