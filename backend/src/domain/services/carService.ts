import { Car } from "../models/carModel";
import { CriarRegistro, TodosRegistros } from "../repositories/carRepository";

export async function addCar(car: Car): Promise<void> {
  await CriarRegistro(car);
}

export async function fetchCar(): Promise<Car[]> {
  return TodosRegistros();
}
