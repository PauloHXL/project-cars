"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriarRegistro = CriarRegistro;
exports.BuscaRegistroPorId = BuscaRegistroPorId;
exports.BuscaRegistros = BuscaRegistros;
exports.AtualizaRegistro = AtualizaRegistro;
exports.AtualizaCampo = AtualizaCampo;
exports.DeletaRegistro = DeletaRegistro;
exports.ContarRegistros = ContarRegistros;
var database_1 = require("./../../config/database");
function CriarRegistro(car) {
    return __awaiter(this, void 0, void 0, function () {
        var db, created, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, database_1.openDb)()];
                case 1:
                    db = _a.sent();
                    created = new Date();
                    return [4 /*yield*/, db.run("INSERT INTO registrosCarros (placa, chassi, renavam, modelo, marca, ano, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
                            car.placa,
                            car.chassi,
                            car.renavam,
                            car.modelo,
                            car.marca,
                            car.ano,
                            created.toISOString(),
                            null,
                        ])];
                case 2:
                    result = _a.sent();
                    if (typeof result.lastID === "number") {
                        return [2 /*return*/, result.lastID]; // Retorne o ID do novo registro
                    }
                    else {
                        throw new Error("Failed to retrieve the ID of the new record");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function BuscaRegistroPorId(id) {
    return __awaiter(this, void 0, void 0, function () {
        var db, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, database_1.openDb)()];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.get("SELECT * FROM registrosCarros WHERE id = ?", [
                            id,
                        ])];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result || null];
            }
        });
    });
}
//export async function TodosRegistros(): Promise<Car[]> {
//  const db = await openDb();
//  return db.all("SELECT * FROM registrosCarros");
//}
function BuscaRegistros(page, limit) {
    return __awaiter(this, void 0, void 0, function () {
        var db, offset;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, database_1.openDb)()];
                case 1:
                    db = _a.sent();
                    offset = (page - 1) * limit;
                    return [2 /*return*/, db.all("SELECT * FROM registrosCarros LIMIT ? OFFSET ?", [
                            limit,
                            offset,
                        ])];
            }
        });
    });
}
function AtualizaRegistro(id, car) {
    return __awaiter(this, void 0, void 0, function () {
        var db, updated_at;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, database_1.openDb)()];
                case 1:
                    db = _a.sent();
                    updated_at = new Date();
                    return [4 /*yield*/, db.run("UPDATE registrosCarros SET placa = ?, chassi = ?, renavam = ?, modelo = ?, marca = ?, ano = ?, updated_at = ? WHERE id = ?", [
                            car.placa,
                            car.chassi,
                            car.renavam,
                            car.modelo,
                            car.marca,
                            car.ano,
                            formatDate(updated_at),
                            id,
                        ])];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function AtualizaCampo(id, campo, valor) {
    return __awaiter(this, void 0, void 0, function () {
        var db, updatedNow;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, database_1.openDb)()];
                case 1:
                    db = _a.sent();
                    updatedNow = new Date();
                    return [4 /*yield*/, db.run("UPDATE registrosCarros SET ".concat(campo, " = ?, updated_at = ? WHERE id = ?"), [valor, formatDate(updatedNow), id])];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function DeletaRegistro(id) {
    return __awaiter(this, void 0, void 0, function () {
        var db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, database_1.openDb)()];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.run("DELETE FROM registrosCarros WHERE id = ?", [id])];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function ContarRegistros() {
    return __awaiter(this, void 0, void 0, function () {
        var db, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, database_1.openDb)()];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.get("SELECT COUNT(*) as count FROM registrosCarros")];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result.count];
            }
        });
    });
}
function formatDate(date) {
    var day = String(date.getDate()).padStart(2, "0");
    var month = String(date.getMonth() + 1).padStart(2, "0");
    var year = date.getFullYear();
    var hours = String(date.getHours()).padStart(2, "0");
    var minutes = String(date.getMinutes()).padStart(2, "0");
    var seconds = String(date.getSeconds()).padStart(2, "0");
    return "".concat(day, "/").concat(month, "/").concat(year, " ").concat(hours, ":").concat(minutes, ":").concat(seconds);
}
