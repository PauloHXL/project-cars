import { Request, Response } from "express";
import {
  adicionaCarro,
  buscaCarros,
  atualizaCarro,
  deletaCarro,
  atualizaCampoCarro,
  buscaCarroPorId,
} from "../../domain/services/carService";

export async function CriarRegistro(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = await adicionaCarro(req.body);
    res.status(201).json({ message: "Registro do carro criado", id });
  } catch (error: any) {
    console.error("Erro ao criar registro:", error);
    res.status(500).send(error.message);
  }
}

export async function RegistroPorId(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;
    const carro = await buscaCarroPorId(Number(id));

    if (carro) {
      res.json(carro);
    } else {
      res.status(404).send("Registro não encontrado");
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function TodosRegistros(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const page = parseInt(req.query.page as string, 10) || undefined;
    const limit = parseInt(req.query.limit as string, 10) || undefined;

    const { hasNext, data } = await buscaCarros(page, limit);

    res.json({ hasNext, data });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function AtualizaRegistro(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;
    await atualizaCarro(Number(id), req.body);
    res.status(200).send("Registro do carro atualizado");
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function AtualizaCampoRegistro(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;
    const [campo] = Object.keys(req.body);
    const valor = req.body[campo];

    await atualizaCampoCarro(Number(id), campo, valor);
    res.status(200).send(`Campo ${campo} atualizado com sucesso`);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}

export async function DeletaRegistro(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;
    await deletaCarro(Number(id));
    res.status(200).send("Registro do carro deletado");
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}
