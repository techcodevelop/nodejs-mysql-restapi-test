import { Router } from "express";
 // cuando importas un propio archivo se pone la extension

import {ping} from '../controllers/index.controllers.js'

const router = Router();

router.get("/ping", ping);

export default router;
