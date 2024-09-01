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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var supertest_1 = __importDefault(require("supertest"));
var express_1 = __importDefault(require("express"));
var carRoutes_1 = __importDefault(require("../../../api/routes/carRoutes"));
var database_1 = require("../../../config/database");
describe("Carros API", function () {
    var app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use("/api", carRoutes_1.default);
    var carId;
    after(function () { return __awaiter(void 0, void 0, void 0, function () {
        var db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, database_1.openDb)()];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.run("DELETE FROM registrosCarros WHERE placa LIKE 'TEST-%'")];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe("POST /api/carros", function () {
        it("deveria criar um novo recorde de carro", function () { return __awaiter(void 0, void 0, void 0, function () {
            var uniqueRenavam, newCar, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uniqueRenavam = "1234567890".concat(Math.floor(Math.random() * 10000));
                        newCar = {
                            placa: "TEST-".concat(Math.floor(Math.random() * 10000)),
                            chassi: "9BWZZZ377VT00425".concat(Math.floor(Math.random() * 10000)),
                            renavam: uniqueRenavam,
                            modelo: "Golf",
                            marca: "Volkswagen",
                            ano: 2020,
                        };
                        return [4 /*yield*/, (0, supertest_1.default)(app).post("/api/carros").send(newCar)];
                    case 1:
                        res = _a.sent();
                        (0, chai_1.expect)(res.status).to.equal(201);
                        (0, chai_1.expect)(res.body).to.have.property("id");
                        carId = res.body.id;
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("GET /api/carros", function () {
        it("deve lidar com a paginação corretamente ou retroceder se não houver dados suficientes", function () { return __awaiter(void 0, void 0, void 0, function () {
            var resAll, totalRecords, res, resPage1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app).get("/api/carros")];
                    case 1:
                        resAll = _a.sent();
                        (0, chai_1.expect)(resAll.status).to.equal(200);
                        totalRecords = resAll.body.data.length;
                        if (!(totalRecords === 0)) return [3 /*break*/, 2];
                        console.log("Não há dados disponíveis no banco de dados. Teste aprovado, mas não há registros para paginar.");
                        return [2 /*return*/];
                    case 2:
                        if (!(totalRecords < 11)) return [3 /*break*/, 4];
                        console.log("Dados insuficientes para testar a paginação. Teste sem paginação.");
                        return [4 /*yield*/, (0, supertest_1.default)(app).get("/api/carros")];
                    case 3:
                        res = _a.sent();
                        (0, chai_1.expect)(res.status).to.equal(200);
                        (0, chai_1.expect)(res.body.data).to.be.an("array").that.has.lengthOf(totalRecords);
                        (0, chai_1.expect)(res.body).to.have.property("hasNext", false);
                        return [3 /*break*/, 6];
                    case 4:
                        console.log("Dados suficientes disponíveis. Testando paginação.");
                        return [4 /*yield*/, (0, supertest_1.default)(app).get("/api/carros?page=1&limit=10")];
                    case 5:
                        resPage1 = _a.sent();
                        (0, chai_1.expect)(resPage1.status).to.equal(200);
                        (0, chai_1.expect)(resPage1.body.data).to.be.an("array").that.has.lengthOf(10);
                        (0, chai_1.expect)(resPage1.body).to.have.property("hasNext", true);
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); });
    });
    describe("GET /api/carros/:id", function () {
        it("deve retornar um registro específico do carro por ID", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app).get("/api/carros/".concat(carId))];
                    case 1:
                        res = _a.sent();
                        (0, chai_1.expect)(res.status).to.equal(200);
                        (0, chai_1.expect)(res.body).to.be.an("object");
                        (0, chai_1.expect)(res.body).to.have.property("id", carId);
                        (0, chai_1.expect)(res.body).to.have.property("placa");
                        (0, chai_1.expect)(res.body).to.have.property("chassi");
                        (0, chai_1.expect)(res.body).to.have.property("renavam");
                        (0, chai_1.expect)(res.body).to.have.property("modelo");
                        (0, chai_1.expect)(res.body).to.have.property("marca");
                        (0, chai_1.expect)(res.body).to.have.property("ano");
                        return [2 /*return*/];
                }
            });
        }); });
        it("deve retornar 404 se o registro do carro não for encontrado", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app).get("/api/carros/999")];
                    case 1:
                        res = _a.sent();
                        (0, chai_1.expect)(res.status).to.equal(404);
                        (0, chai_1.expect)(res.text).to.equal("Registro não encontrado");
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("PUT /api/carros/:id", function () {
        it("deve atualizar um registro de carro existente", function () { return __awaiter(void 0, void 0, void 0, function () {
            var uniqueRenavam, updatedCar, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uniqueRenavam = "3234567890".concat(Math.floor(Math.random() * 10000));
                        updatedCar = {
                            placa: "XYZ-".concat(Math.floor(Math.random() * 10000)),
                            chassi: "9BWZZZ377VT00425".concat(Math.floor(Math.random() * 10000)),
                            renavam: uniqueRenavam,
                            modelo: "Polo",
                            marca: "Volkswagen",
                            ano: 2021,
                        };
                        return [4 /*yield*/, (0, supertest_1.default)(app)
                                .put("/api/carros/".concat(carId))
                                .send(updatedCar)];
                    case 1:
                        res = _a.sent();
                        (0, chai_1.expect)(res.status).to.equal(200);
                        (0, chai_1.expect)(res.text).to.equal("Registro do carro atualizado");
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("PATCH /api/carros/:id", function () {
        it("deve atualizar um único campo de um registro de carro existente", function () { return __awaiter(void 0, void 0, void 0, function () {
            var updatedField, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updatedField = {
                            placa: "DEF-".concat(Math.floor(Math.random() * 10000)),
                        };
                        return [4 /*yield*/, (0, supertest_1.default)(app)
                                .patch("/api/carros/".concat(carId))
                                .send(updatedField)];
                    case 1:
                        res = _a.sent();
                        (0, chai_1.expect)(res.status).to.equal(200);
                        (0, chai_1.expect)(res.text).to.equal("Campo placa atualizado com sucesso");
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("DELETE /api/carros/:id", function () {
        it("deve excluir um registro de carro existente", function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app).delete("/api/carros/".concat(carId))];
                    case 1:
                        res = _a.sent();
                        (0, chai_1.expect)(res.status).to.equal(200);
                        (0, chai_1.expect)(res.text).to.equal("Registro do carro deletado");
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
