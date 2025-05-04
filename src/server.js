// server.js
import express from "express";
import cors from "cors";
import oracledb from "oracledb";
import { connectToOracle } from "./db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
const port = 3000;

app.get("/getLoans", async (req, res) => {
  let connection;
  try {
    connection = await connectToOracle();
    // const result = await connection.execute(`SELECT * FROM loans`);
    // res.json(result.rows);
    res.json({ message: "Hello from Oracle DB!" });
  } catch (err) {
    console.error("Oracle DB error:", err);
    res.status(500).json({ error: "Failed to fetch data from Oracle DB" });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (closeError) {
        console.error("Error closing connection", closeError);
      }
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
