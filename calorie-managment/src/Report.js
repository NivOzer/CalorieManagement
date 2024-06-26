//Niv Ozer :208993329
//Valeria Shafran :320954258
//Chen Skanderany :206508541

//React essentials imports
import { React, useState, useEffect } from "react";
//Import Material UI Javascript library
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
//import sparkLineChart with material UI for graph presenting
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
//idb.js is the js library for handling the indexDB database
import idb from "./idb.js";
//initialize Report component
function Report(props) {
  const [filteredItems, setFilteredItems] = useState([]);
  const { month, year, handleSubmit } = props;
  //use effect for rendering everytime handleSubmit has changed for dynamic experience
  useEffect(() => {
    // Function to generate report
    async function generateReport(month, year) {
      try {
        // Open the IndexedDB database
        const db = await idb.openCalorisDB("caloriesdb", 1);

        // Retrieve all items from IndexedDB
        const allItems = await idb.getAllItems(db);

        // Filter items by month and year
        const filteredItems = allItems.filter((item) => {
          const itemDate = new Date(item.date);
          const itemMonth = itemDate.getMonth() + 1; // Months are zero-based (0 = January), so add 1
          const itemYear = itemDate.getFullYear();

          return itemMonth === month && itemYear === year;
        });

        // Update state with the filtered items
        await setFilteredItems(filteredItems);
        console.log(filteredItems);
      } catch (error) {
        console.error("Error generating report:", error);
      }
    }

    // Call generateReport function
    generateReport(month, year);
  }, [handleSubmit]);

  //calculates the sum of calories for every week in the specific month to show weekly progress
  function calculateWeeklySum(filteredItems) {
    const weekSum = [0, 0, 0, 0];

    filteredItems.forEach(({ date, numOfCalories }) => {
      const dayOfMonth = new Date(date).getDate();
      const weekIndex = Math.floor((dayOfMonth - 1) / 7);
      weekSum[weekIndex] += +numOfCalories;
    });

    return weekSum;
  }

  const weekSum = calculateWeeklySum(filteredItems, month, year);

  return (
    <div className="Report">
      {/**generates the tableContainer */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {/**Report columns would be Id,Description,Number of Calories,DAte */}
              <TableCell align="left">Id</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Number of Calories</TableCell>
              <TableCell align="left">Category</TableCell>
              <TableCell align="left">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/**Assigning values to table cells */}
            {filteredItems.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.id}
                </TableCell>
                <TableCell align="left">{item.description}</TableCell>
                <TableCell align="left">{item.numOfCalories}</TableCell>
                <TableCell align="left">{item.category}</TableCell>
                <TableCell align="left">{item.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/**Visualize graphs 3 types */}
      <Stack
        className="graphs"
        justifyContent="center"
        direction="row"
        spacing={5}
        sx={{ width: "100%" }}
      >
        {/**graph with area */}
        <Box sx={{ flexGrow: 0, width: "34.2%" }}>
          <SparkLineChart
            data={[weekSum[0], weekSum[1], weekSum[2], weekSum[3]]}
            xAxis={{
              scaleType: "band",
              data: ["Week 1", "Week 2", "Week 3", "Week 4"],
            }}
            height={100}
            showTooltip
            showHighlight
            area
          />
        </Box>
        {/**graph without area */}
        <Box sx={{ flexGrow: 0, width: "34.2%" }}>
          <SparkLineChart
            data={[weekSum[0], weekSum[1], weekSum[2], weekSum[3]]}
            xAxis={{
              scaleType: "band",
              data: ["Week 1", "Week 2", "Week 3", "Week 4"],
            }}
            height={100}
            showTooltip
            showHighlight
            curve="monotoneY"
          />
        </Box>
        {/**bar plot */}
        <Box sx={{ flexGrow: 0, width: "34.2%" }}>
          <SparkLineChart
            plotType="bar"
            data={[weekSum[0], weekSum[1], weekSum[2], weekSum[3]]}
            height={100}
            showTooltip
            showHighlight
            xAxis={{
              scaleType: "band",
              data: ["Week 1", "Week 2", "Week 3", "Week 4"],
            }}
          />
        </Box>
      </Stack>
    </div>
  );
}

export default Report;
