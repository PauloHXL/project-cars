"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var carRoutes_1 = __importDefault(require("./api/routes/carRoutes"));
var database_1 = require("./config/database");
var app = (0, express_1.default)();
exports.app = app;
var PORT = process.env.PORT || 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/v1", carRoutes_1.default);
(0, database_1.openDb)().then(function (db) {
    db.exec("CREATE TABLE IF NOT EXISTS registrosCarros (id INTEGER PRIMARY KEY, placa VARCHAR(7) NOT NULL UNIQUE,chassi VARCHAR(17) NOT NULL UNIQUE, renavam VARCHAR(11) NOT NULL UNIQUE, marca VARCHAR(50) NOT NULL, modelo VARCHAR(50) NOT NULL, ano INT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)");
});
app.listen(PORT, function () {
    console.log("O servidor est\u00E1 rodando em http://localhost:".concat(PORT));
});
