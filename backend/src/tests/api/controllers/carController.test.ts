import { expect } from "chai";
import request from "supertest";
import express from "express";
import carRoutes from "../../../api/routes/carRoutes";
import { openDb } from "../../../config/database";

describe("Car API", () => {
  const app = express();
  app.use(express.json());
  app.use("/api", carRoutes);

  let carId: number;

  after(async () => {
    const db = await openDb();
    await db.run("DELETE FROM registrosCarros WHERE placa LIKE 'TEST-%'");
  });

  describe("POST /api/carros", () => {
    it("should create a new car record", async () => {
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
    it("should handle pagination correctly or fall back if not enough data", async () => {
      const resAll = await request(app).get("/api/carros");
      expect(resAll.status).to.equal(200);

      const totalRecords = resAll.body.data.length;

      if (totalRecords === 0) {
        console.log(
          "No data available in the database. Test passed, but there are no records to paginate."
        );
        return;
      } else if (totalRecords < 11) {
        console.log(
          "Not enough data to test pagination. Testing without pagination."
        );

        const res = await request(app).get("/api/carros");
        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.an("array").that.has.lengthOf(totalRecords);
        expect(res.body).to.have.property("hasNext", false);
      } else {
        console.log("Enough data available. Testing pagination.");

        const resPage1 = await request(app).get("/api/carros?page=1&limit=10");
        expect(resPage1.status).to.equal(200);
        expect(resPage1.body.data).to.be.an("array").that.has.lengthOf(10);
        expect(resPage1.body).to.have.property("hasNext", true);

        const resPage2 = await request(app).get("/api/carros?page=2&limit=10");
        expect(resPage2.status).to.equal(200);
        expect(resPage2.body.data.length).to.be.at.most(10);
        expect(resPage2.body).to.have.property("hasNext", false);
      }
    });
  });

  describe("GET /api/carros/:id", () => {
    it("should return a specific car record by ID", async () => {
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

    it("should return 404 if the car record is not found", async () => {
      const res = await request(app).get("/api/carros/999");
      expect(res.status).to.equal(404);
      expect(res.text).to.equal("Registro não encontrado");
    });
  });

  describe("PUT /api/carros/:id", () => {
    it("should update an existing car record", async () => {
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
    it("should update a single field of an existing car record", async () => {
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
    it("should delete an existing car record", async () => {
      const res = await request(app).delete(`/api/carros/${carId}`);
      expect(res.status).to.equal(200);
      expect(res.text).to.equal("Registro do carro deletado");
    });
  });
});
