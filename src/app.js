import express from "express";
import employeesRoutes from "./routes/employees.routes.js";
import indexRoutes from "./routes/index.routes.js";


const app = express();

app.use(express.json())  // convierte los datos recibidos a json

app.use('/api',employeesRoutes);

app.use(indexRoutes);

app.use((req, res, next)=>{

    res.status(404).json({
        message:'endpoint not found'
    })
})

// veriifar

export default app;
