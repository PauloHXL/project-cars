import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Carro {
  id: number;
  placa: string;
  chassi: string;
  renavam: string;
  marca: string;
  modelo: string;
  ano: number;
  created_at: string;
  updated_at: string | null;
}

interface CarrosResponse {
  hasNext: boolean;
  data: Carro[];
}

@Injectable({
  providedIn: 'root',
})
export class CarrosService {
  private apiUrl = 'http://localhost:3001/api/v1/carros';

  constructor(private http: HttpClient) {}

  addCar(newCar: Carro): Observable<any> {
    return this.http.post(this.apiUrl, newCar);
  }

  getCarros(): Observable<CarrosResponse> {
    return this.http.get<CarrosResponse>(this.apiUrl);
  }

  updateCar(id: number, carro: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, carro);
  }

  deleteCar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
