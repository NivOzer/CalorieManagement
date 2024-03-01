import logo from "./logo.svg";
import "./App.css";
import { React } from "react";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
