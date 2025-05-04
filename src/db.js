import oracledb from "oracledb";

export async function connectToOracle() {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password: process.env.ORACLE_PASS,
      connectString:
        "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=h3oracle.ad.psu.edu)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=orclpdb.ad.psu.edu)))",
    });

    // Show the version of the Oracle Database
    console.log(
      "Connected to Oracle Database:",
      (await connection.execute("SELECT * FROM v$version")).rows[0][0]
    );
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log("Connection closed");
      } catch (err) {
        console.error(err);
      }
    }
  }
}
