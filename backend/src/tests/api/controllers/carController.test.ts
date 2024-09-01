import { expect } from "chai";
import request from "supertest";
import express from "express";
import carRoutes from "../../../api/routes/carRoutes";
import { openDb } from "../../../config/database";

describe("Carros API", () => {
  const app = express();
  app.use(express.json());
  app.use("/api", carRoutes);

  let carId: number;

  after(async () => {
    const db = await openDb();
    await db.run("DELETE FROM registrosCarros WHERE placa LIKE 'TEST-%'");
  });

  describe("POST /api/carros", () => {
    it("deveria criar um novo recorde de carro", async () => {
      const uniqueRenavam = `1234567890${Math.floor(Math.random() * 10000)}`;
      const newCar = {
        placa: `TEST-${Math.floor(Math.random() * 10000)}`,
        chassi: `9BWZZZ377VT00425${Math.floor(Math.random() * 10000)}`,
        renavam: uniqueRenavam,
        modelo: "Golf",
        marca: "Volkswagen",
        ano: 2020,
      };

      const res = await request(app).post("/api/carros").send(newCar);
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property("id");
      carId = res.body.id;
    });
  });

  describe("GET /api/carros", () => {
    it("deve lidar com a paginação corretamente ou retroceder se não houver dados suficientes", async () => {
      const resAll = await request(app).get("/api/carros");
      expect(resAll.status).to.equal(200);

      const totalRecords = resAll.body.data.length;

      if (totalRecords === 0) {
        console.log(
          "Não há dados disponíveis no banco de dados. Teste aprovado, mas não há registros para paginar."
        );
        return;
      } else if (totalRecords < 11) {
        console.log(
          "Dados insuficientes para testar a paginação. Teste sem paginação."
        );

        const res = await request(app).get("/api/carros");
        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.an("array").that.has.lengthOf(totalRecords);
        expect(res.body).to.have.property("hasNext", false);
      } else {
        console.log("Dados suficientes disponíveis. Testando paginação.");

        const resPage1 = await request(app).get("/api/carros?page=1&limit=10");
        expect(resPage1.status).to.equal(200);
        expect(resPage1.body.data).to.be.an("array").that.has.lengthOf(10);
        expect(resPage1.body).to.have.property("hasNext", true);
      }
    });
  });

  describe("GET /api/carros/:id", () => {
    it("deve retornar um registro específico do carro por ID", async () => {
      const res = await request(app).get(`/api/carros/${carId}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property("id", carId);
      expect(res.body).to.have.property("placa");
      expect(res.body).to.have.property("chassi");
      expect(res.body).to.have.property("renavam");
      expect(res.body).to.have.property("modelo");
      expect(res.body).to.have.property("marca");
      expect(res.body).to.have.property("ano");
    });

    it("deve retornar 404 se o registro do carro não for encontrado", async () => {
      const res = await request(app).get("/api/carros/999");
      expect(res.status).to.equal(404);
      expect(res.text).to.equal("Registro não encontrado");
    });
  });

  describe("PUT /api/carros/:id", () => {
    it("deve atualizar um registro de carro existente", async () => {
      const uniqueRenavam = `3234567890${Math.floor(Math.random() * 10000)}`;
      const updatedCar = {
        placa: `XYZ-${Math.floor(Math.random() * 10000)}`,
        chassi: `9BWZZZ377VT00425${Math.floor(Math.random() * 10000)}`,
        renavam: uniqueRenavam,
        modelo: "Polo",
        marca: "Volkswagen",
        ano: 2021,
      };

      const res = await request(app)
        .put(`/api/carros/${carId}`)
        .send(updatedCar);
      expect(res.status).to.equal(200);
      expect(res.text).to.equal("Registro do carro atualizado");
    });
  });

  describe("PATCH /api/carros/:id", () => {
    it("deve atualizar um único campo de um registro de carro existente", async () => {
      const updatedField = {
        placa: `DEF-${Math.floor(Math.random() * 10000)}`,
      };

      const res = await request(app)
        .patch(`/api/carros/${carId}`)
        .send(updatedField);
      expect(res.status).to.equal(200);
      expect(res.text).to.equal("Campo placa atualizado com sucesso");
    });
  });

  describe("DELETE /api/carros/:id", () => {
    it("deve excluir um registro de carro existente", async () => {
      const res = await request(app).delete(`/api/carros/${carId}`);
      expect(res.status).to.equal(200);
      expect(res.text).to.equal("Registro do carro deletado");
    });
  });
});
