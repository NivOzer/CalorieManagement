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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import idb from "./idb.js";
import Report from "./Report.js";

function App() {
  const [numOfCalories, setNumOfCalories] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState();
  const [showReport, setShowReport] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleMonthChange = (e) => {
    const inputValue = e.target.value;
    if (!isNaN(inputValue) && inputValue > 0 && inputValue < 13) {
      setMonth(e.target.value);
    }
  };

  const handleYearChange = (e) => {
    const inputValue = e.target.value;
    if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 2099) {
      setYear(e.target.value);
    }
  };

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
    if (!numOfCalories && !description && !category && !date) {
      return;
    }
    setNumOfCalories("");
    setDescription("");
    setCategory("");
    setDate("");
    handleSnack("info", "Cleared all submitting fields");
  };

  const handleResetReport = () => {
    if (!month && !year) {
      return;
    }
    setMonth("");
    setYear("");
    handleSnack("info", "Cleared all reporting fields");
  };

  const handleShowReport = () => {
    if (!month || !year) {
      if (showReport) {
        setShowReport(!showReport);
        if (!month || !year) {
          return;
        }
      }
      handleSnack("error", "Missing a feature");
      return;
    }
    setShowReport(!showReport);
  };

  const handleSnack = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setOpenSnack(true);
  };

  const handleSubmit = () => {
    if (!numOfCalories || !description || !category || !date) {
      handleSnack("error", "Missing a feature");
      return;
    }
    const item = {
      numOfCalories: numOfCalories,
      description: description,
      category: category,
      date: date,
    };

    console.log(date);

    dbPromise.then((db) => {
      idb
        .addCalories(db, item)
        .then((message) => {
          console.log(message);
          handleSnack("success", "Submitted Successfully", true);
        })
        .then(handleReset())
        .catch((error) => {
          console.error(error);
        });
    });
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#424242",
      },
    },
  });

  let dbPromise = idb.openCalorisDB("caloriesdb", 1);

  return (
    <div className="App">
      <div className="tool-bars">
        <div className="submit-bar">
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
            <InputLabel id="demo-simple-select-filled-label">
              Category
            </InputLabel>
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

          <ThemeProvider theme={theme}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleSubmit}
              sx={{ minWidth: 142, minHeight: 56 }}
            >
              Submit
            </Button>
          </ThemeProvider>
        </div>

        <Snackbar
          className="Submit-Alerts"
          open={openSnack}
          autoHideDuration={3000} // 3 seconds
          onClose={() => setOpenSnack(false)}
        >
          <Alert
            severity={snackbarSeverity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>

        <div className="report-bar">
          <div className="report-bar-left">
            <IconButton
              aria-label="delete"
              size="large"
              onClick={handleResetReport}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>

            <TextField
              id="month"
              label="Month"
              variant="filled"
              value={month}
              onChange={handleMonthChange}
            />
            <TextField
              id="year"
              label="Year"
              variant="filled"
              value={year}
              onChange={handleYearChange}
              sx={{ minWidth: 459 }}
            />
          </div>
          <div className="report-bar-right">
            <ThemeProvider theme={theme}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleShowReport}
                sx={{ minWidth: 120, minHeight: 56 }}
              >
                Show Report
              </Button>
            </ThemeProvider>
          </div>
        </div>
      </div>
      <h1>
        {numOfCalories && `${numOfCalories}, `}
        {description && `${description}, `}
        {category && `${category}, `}
        {/^[a-zA-Z]{3} \d{2} \d{4}$/.test(date) && date}
      </h1>
      {showReport && <Report month={+month} year={+year} />}
    </div>
  );
}

export default App;
