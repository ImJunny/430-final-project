// server.js
import express from "express";
import cors from "cors";
import oracledb from "oracledb";
import { connectToOracle } from "./db.js";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

app.get("/getLoans", async (req, res) => {
  const { user_uuid } = req.query;
  console.log("GETTING LOANS FOR USER " + user_uuid);
  let connection;
  try {
    connection = await connectToOracle();
    const result = await connection.execute(
      `SELECT * FROM loans WHERE user_uuid = :user_uuid`,
      [user_uuid],
      {
        outFormat: oracledb.OUT_FORMAT_OBJECT,
      }
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data from Oracle DB" });
  } finally {
    if (connection) connection.close();
  }
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  let connection;

  try {
    connection = await connectToOracle();
    const query = `SELECT * FROM users WHERE email = :email AND pass = :pass`;
    const result = await connection.execute(query, [email, password], {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });

    if (result.rows.length > 0)
      res.json({
        message: "Sign-in successful",
        user_uuid: result.rows[0].USER_UUID,
        role: result.rows[0].ROLE,
      });
    else res.status(401).json({ error: "Invalid email or password" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to process sign-in" });
  } finally {
    if (connection) await connection.close();
  }
});

app.post("/signup", async (req, res) => {
  const { email, first_name, last_name, password, role } = req.body;
  console.log(req.body);
  let connection;

  try {
    connection = await connectToOracle();
    const uuid = uuidv4().slice(0, 10);
    const insertQuery = `INSERT INTO users (user_uuid, email, first_name, last_name, pass, role) VALUES (:user_uuid, :email, :first_name, :last_name, :pass, :role)`;
    await connection.execute(
      insertQuery,
      [uuid, email, first_name, last_name, password, role],
      { autoCommit: true }
    );
    res.json({ message: "Sign-up successful", user_uuid: uuid, role });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to process sign-in" });
  } finally {
    if (connection) await connection.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
