import logo from "./logo.svg";
import "./App.css";
import { React, useState } from "react";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import idb from "./idb.js";

function App() {
  const [numOfCalories, setNumOfCalories] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());

  const handlenumOfCaloriesChange = (e) => {
    const inputValue = e.target.value;
    if (!isNaN(inputValue)) {
      setNumOfCalories(e.target.value);
    }
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleDateChange = (e) => {
    const stringDate = e.toString();
    // Extract day, month, and year
    const dateParts = stringDate.split(" ");
    const day = dateParts[2];
    const month = dateParts[1];
    const year = dateParts[3];
    // Construct the formatted date
    const formattedDate = `${day} ${month} ${year}`;
    setDate(formattedDate);
    console.log(formattedDate);
  };

  const handleReset = () => {
    setNumOfCalories("");
    setDescription("");
    setCategory("");
    setDate("");
  };

  let dbPromise = idb.openCalorisDB("caloriesdb", 1);

  const handleSubmit = () => {
    if (!numOfCalories || !description || !category) {
      alert("missing a feature");
      return;
    }
    const item = {
      numOfCalories: numOfCalories,
      description: description,
      category: category,
    };

    console.log(date);

    dbPromise.then((db) => {
      idb
        .addCalories(db, item)
        .then((message) => {
          console.log(message);
          handleReset();
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };

  return (
    <div className="App">
      <IconButton aria-label="delete" size="large" onClick={handleReset}>
        <DeleteIcon fontSize="inherit" />
      </IconButton>
      <TextField
        id="filled-basic"
        label="Number of Calories"
        variant="filled"
        value={numOfCalories}
        onChange={handlenumOfCaloriesChange}
      />
      <TextField
        id="filled-basic"
        label="Description"
        variant="filled"
        value={description}
        onChange={handleDescriptionChange}
      />
      <FormControl variant="filled" sx={{ m: 0, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={category}
          onChange={handleCategoryChange}
        >
          <MenuItem value={"Breakfast"}>Breakfast</MenuItem>
          <MenuItem value={"Lunch"}>Lunch</MenuItem>
          <MenuItem value={"Dinner"}>Dinner</MenuItem>
          <MenuItem value={"Other"}>Other</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="filled" sx={{ m: 0, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Date</InputLabel>
        <Select>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar date={date} onChange={handleDateChange} />
          </LocalizationProvider>
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
      <h1>
        {numOfCalories && `${numOfCalories}, `}
        {description && `${description}, `}
        {category && category}
      </h1>
    </div>
  );
}

export default App;
