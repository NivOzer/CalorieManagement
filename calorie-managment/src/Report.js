import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
function Report() {
  function createData(id, description, numOfCalories, category, date) {
    return { id, description, numOfCalories, category, date };
  }
  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24),
    createData("Ice cream sandwich", 237, 9.0, 37),
    createData("Eclair", 262, 16.0, 24),
    createData("Cupcake", 305, 3.7, 67),
    createData("Gingerbread", 356, 16.0, 49),
  ];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">id</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Number of Calories</TableCell>
            <TableCell align="left">Category</TableCell>
            <TableCell align="left">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="left">{row.description}</TableCell>
              <TableCell align="left">{row.numOfCalories}</TableCell>
              <TableCell align="left">{row.category}</TableCell>
              <TableCell align="left">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Report;
