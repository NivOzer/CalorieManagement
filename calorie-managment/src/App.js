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

//TODO: Commenting
//TODO: PDF
//TODO: Video
//TODO: Test Version

function App() {
  //Using React states for dynamically changing the form and inputs
  const [numOfCalories, setNumOfCalories] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState();
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  //A button to show / unshow the calorie report
  const [showReport, setShowReport] = useState(false);

  //Using snack/Toast for a more friendly user interaction
  const [openSnack, setOpenSnack] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  //Accorindg to the buttons event listeners being clicked apply the according handleFunctions described below:
  //While month has change , change its value in month state
  const handleMonthChange = (e) => {
    const inputValue = e.target.value;
    console.log(e);
    if (e.nativeEvent.data === null) {
      if (month >= 10) {
        setMonth(parseInt(month / 10)); // Remove the last character
      } else setMonth("");
    } else if (!isNaN(inputValue) && inputValue > 0 && inputValue < 13) {
      setMonth(e.target.value);
    }
  };
  //While year has change , change its value in year state
  const handleYearChange = (e) => {
    const inputValue = e.target.value;
    if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 2099) {
      setYear(e.target.value);
    }
  };
  //While the numberOfCalories section has change , change its value in numberOfCalories state
  const handlenumOfCaloriesChange = (e) => {
    const inputValue = e.target.value;
    if (!isNaN(inputValue)) {
      setNumOfCalories(e.target.value);
    }
  };
  //While the description section has change , change its value in the description state
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  //While the Category section has been chosen from the list of given options , change its value in category state
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  //While the date has change , change its value in date state
  const handleDateChange = (newDate) => {
    // Convert the newDate value to a formatted date string
    const formattedDate = dayjs(newDate).format("MMM DD YYYY");
    // Update the date state
    setDate(formattedDate);
  };
  //While the reset button for the submit a food section has been clicked , reset all the fields in the submit section
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
  //While the reset button for the Report section has been clicked , reset all the fields in the Report(show) section
  const handleResetReport = () => {
    if (!month && !year) {
      return;
    }
    setMonth("");
    setYear("");
    handleSnack("info", "Cleared all reporting fields");
  };
  //when the show report button has been clicked , toggle the show report state to show the report
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
  //if a snack/toast has been invoked , check its severity and message oto display it in the correct way
  const handleSnack = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setOpenSnack(true);
  };
  //when the handle submit button has been clicked , collect all the input data from the submit section and as an item , add it to the Calorie management database
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
        .then(() => handleReset())
        .catch((error) => {
          console.error(error);
        });
    });
  };
  //Extra coloring and customization for Material UI.js library
  const theme = createTheme({
    palette: {
      primary: {
        main: "#424242",
      },
    },
  });
  //Opens  an IndexDB data base named caloriesdb on you local machine (tested on chrome browser)
  let dbPromise = idb.openCalorisDB("caloriesdb", 1);

  //Returns HTML elements as a component and conditionally renders the Report component based on the shoowReport state (activated when clicked)
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
        {description && `${description}, `}
        {numOfCalories && `${numOfCalories}, `}
        {category && `${category}, `}
        {/^[a-zA-Z]{3} \d{2} \d{4}$/.test(date) && date}
      </h1>
      {showReport && (
        <Report month={+month} year={+year} handleSubmit={handleSubmit} />
      )}
    </div>
  );
}

export default App;
