
import { pool } from "../db.js";

export const ping = async (req, res) => {
    const [result] = await pool.query("select 1+3 as result");
    //res.json('PONG');
    res.json(result[0]);
  }