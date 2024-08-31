import { openDb } from "./../../config/database";
import { Car } from "../models/carModel";
const now = new Date();

export async function CriarRegistro(car: Car): Promise<void> {
  const db = await openDb();
  await db.run(
    "INSERT INTO registrosCarros (placa, chassi, renavam, modelo, marca, ano, created_at) VALUES (?, ?)",
    [car.placa, car.chassi, car.renavam, car.modelo, car.marca, car.ano, now]
  );
}

export async function TodosRegistros(): Promise<Car[]> {
  const db = await openDb();
  return db.all("SELECT * FROM registrosCarros");
}
