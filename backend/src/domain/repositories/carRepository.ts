import { openDb } from "./../../config/database";
import { Car } from "../models/carModel";

export async function CriarRegistro(car: Car): Promise<number> {
  const db = await openDb();
  const created = new Date();

  const result = await db.run(
    "INSERT INTO registrosCarros (placa, chassi, renavam, modelo, marca, ano, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      car.placa,
      car.chassi,
      car.renavam,
      car.modelo,
      car.marca,
      car.ano,
      formatDate(created),
      null,
    ]
  );

  if (typeof result.lastID === "number") {
    return result.lastID;
  } else {
    throw new Error("Falha ao recuperar o ID do novo registro");
  }
}

export async function BuscaRegistroPorId(id: number): Promise<Car | null> {
  const db = await openDb();
  const result = await db.get("SELECT * FROM registrosCarros WHERE id = ?", [
    id,
  ]);
  return result || null;
}

//export async function TodosRegistros(): Promise<Car[]> {
//  const db = await openDb();
//  return db.all("SELECT * FROM registrosCarros");
//}

export async function BuscaRegistros(
  page?: number,
  limit?: number
): Promise<Car[]> {
  const db = await openDb();

  if (page && limit) {
    const offset = (page - 1) * limit;
    return db.all("SELECT * FROM registrosCarros LIMIT ? OFFSET ?", [
      limit,
      offset,
    ]);
  } else {
    return db.all("SELECT * FROM registrosCarros");
  }
}

export async function AtualizaRegistro(id: number, car: Car): Promise<void> {
  const db = await openDb();
  const updated_at = new Date();
  await db.run(
    `UPDATE registrosCarros SET placa = ?, chassi = ?, renavam = ?, modelo = ?, marca = ?, ano = ?, updated_at = ? WHERE id = ?`,
    [
      car.placa,
      car.chassi,
      car.renavam,
      car.modelo,
      car.marca,
      car.ano,
      formatDate(updated_at),
      id,
    ]
  );
}

export async function AtualizaCampo(
  id: number,
  campo: string,
  valor: any
): Promise<void> {
  const db = await openDb();
  const updatedNow = new Date();
  await db.run(
    `UPDATE registrosCarros SET ${campo} = ?, updated_at = ? WHERE id = ?`,
    [valor, formatDate(updatedNow), id]
  );
}

export async function DeletaRegistro(id: number): Promise<void> {
  const db = await openDb();
  await db.run(`DELETE FROM registrosCarros WHERE id = ?`, [id]);
}

export async function ContarRegistros(): Promise<number> {
  const db = await openDb();
  const result = await db.get("SELECT COUNT(*) as count FROM registrosCarros");
  return result.count;
}

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
