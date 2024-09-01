import { Car } from "../models/carModel";
import {
  CriarRegistro,
  BuscaRegistros,
  ContarRegistros,
  AtualizaRegistro,
  DeletaRegistro,
  AtualizaCampo,
  BuscaRegistroPorId,
} from "../repositories/carRepository";

export async function adicionaCarro(car: Car): Promise<number> {
  return await CriarRegistro(car);
}

export async function buscaCarroPorId(id: number): Promise<Car | null> {
  return BuscaRegistroPorId(id);
}

//xport async function buscaCarros(): Promise<Car[]> {
// return TodosRegistros();
//

export async function buscaCarros(
  page: number,
  limit: number
): Promise<{ data: Car[]; hasNext: boolean }> {
  const totalRecords = await ContarRegistros();
  const carros = await BuscaRegistros(page, limit);

  const hasNext = page * limit < totalRecords;

  return { hasNext, data: carros };
}

export async function atualizaCarro(id: number, car: Car): Promise<void> {
  await AtualizaRegistro(id, car);
}

export async function atualizaCampoCarro(
  id: number,
  campo: string,
  valor: any
): Promise<void> {
  await AtualizaCampo(id, campo, valor);
}

export async function deletaCarro(id: number): Promise<void> {
  await DeletaRegistro(id);
}
