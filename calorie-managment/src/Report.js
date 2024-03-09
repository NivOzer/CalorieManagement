import { React, useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import App from "./App.js";
import idb from "./idb.js";
function Report(props) {
  const [filteredItems, setFilteredItems] = useState([]);
  const { month, year } = props;

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

    // console.log(filteredItems);
  }, []);

  return (
    <div className="Report">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Id</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Number of Calories</TableCell>
              <TableCell align="left">Category</TableCell>
              <TableCell align="left">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
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

      <Stack
        className="graphs"
        justifyContent="center"
        direction="row"
        spacing={5}
        sx={{ width: "100%" }}
      >
        <Box sx={{ flexGrow: 0, width: "34.2%" }}>
          <SparkLineChart
            data={[1, 4, 2, 5]}
            xAxis={{
              scaleType: "time",
              data: [
                new Date(2022, 5, 1),
                new Date(2022, 5, 2),
                new Date(2022, 5, 5),
                new Date(2022, 5, 6),
              ],
              valueFormatter: (value) => value.toISOString().slice(0, 10),
            }}
            height={100}
            showTooltip
            showHighlight
          />
        </Box>
        <Box sx={{ flexGrow: 0, width: "34.2%" }}>
          <SparkLineChart
            plotType="bar"
            data={[1, 4, 2, 5]}
            height={100}
            showTooltip
            showHighlight
            xAxis={{
              scaleType: "band",
              data: [
                new Date(2016, 0, 1),
                new Date(2017, 0, 1),
                new Date(2018, 0, 1),
                new Date(2019, 0, 1),
              ],
              valueFormatter: (value) => value.getFullYear(),
            }}
          />
        </Box>
      </Stack>
    </div>
  );
}

export default Report;
