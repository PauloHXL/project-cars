"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var carController_1 = require("../controllers/carController");
var router = (0, express_1.Router)();
router.post("/cars", carController_1.CriarRegistro);
router.get("/cars", carController_1.TodosRegistros);
exports.default = router;
