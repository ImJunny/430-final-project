import oracledb from "oracledb";

export async function connectToOracle() {
  try {
    const connection = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password: process.env.ORACLE_PASS,
      connectString:
        "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=h3oracle.ad.psu.edu)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=orclpdb.ad.psu.edu)))",
    });

    console.log("Connected to Oracle Database");
    return connection;
  } catch (err) {
    console.error("Connection failed:", err);
    throw err;
  }
}
