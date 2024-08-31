import { Request, Response } from "express";
import { addCar, fetchCar } from "../../domain/services/carService";

export async function CriarRegistro(
  req: Request,
  res: Response
): Promise<void> {
  try {
    await addCar(req.body);
    res.status(201).send("Registro do carro criado");
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function TodosRegistros(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const cars = await fetchCar();
    res.json(cars);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}
