import { Router } from "express";
import {
  CriarRegistro,
  TodosRegistros,
  AtualizaRegistro,
  DeletaRegistro,
  AtualizaCampoRegistro,
  RegistroPorId,
} from "../controllers/carController";

const router = Router();

router.post("/carros", CriarRegistro);
router.get("/carros", TodosRegistros);
router.get("/carros/:id", RegistroPorId);
router.put("/carros/:id", AtualizaRegistro);
router.patch("/carros/:id", AtualizaCampoRegistro);
router.delete("/carros/:id", DeletaRegistro);

export default router;
