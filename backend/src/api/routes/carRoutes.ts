import { Router } from "express";
import { CriarRegistro, TodosRegistros } from "../controllers/carController";

const router = Router();

router.post("/cars", CriarRegistro);
router.get("/cars", TodosRegistros);

export default router;
