import { pool } from "../db.js";

// export const getEmployees = (req, res) => res.send("getting empplloyees");

export const getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM EMPLOYEE");
    res.json(rows);
  } catch (e) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const getEmployee = async (req, res) => {
  try {
    //  throw new Error("Error inesperado");

    const id = req.params.id;
    const [rows] = await pool.query("SELECT * FROM EMPLOYEE WHERE ID=?", [id]);
    if (rows.length <= 0)
      return res.status(404).json({
        message: "Employee not found",
      });
    res.json(rows[0]);
  } catch (e) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const createEmployees = async (req, res) => {
  try {
    const { name, salary } = req.body;
    const [rows] = await pool.query(
      "insert into employee (name, salary) values (?, ?)",
      [name, salary]
    );
    res.send({ id: rows.insertId, name, salary });
  } catch (e) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const updateEmployees = async (req, res) => {
  const { id } = req.params;
  const { name, salary } = req.body;

  try {
    const [result] = await pool.query(
      "update employee set name= ifnull(?,name), salary= ifnull(?,salary) where id =?",
      [name, salary, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "Employee not found",
      });

    const [rows] = await pool.query("select * from employee where id=?", [id]);

    console.log(id, name, salary);

    res.json(rows[0]);
  } catch (e) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

export const deleteEmployees = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query("delete from EMPLOYEE WHERE ID=?", [id]);
    if (result.affectedRows.length <= 0)
      return res.status(404).json({
        message: "Employee not found",
      });
    res.sendStatus(204);
  } catch (e) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};
