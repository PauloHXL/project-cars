import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CarrosService } from './carros.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AddCarDialogComponent } from '../add-car-dialog/add-car-dialog.component';

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

@Component({
  selector: 'app-registro-de-carros',
  templateUrl: './registro-de-carros.component.html',
  styleUrls: ['./registro-de-carros.component.scss'],
})
export class RegistroDeCarrosComponent implements OnInit {
  displayedColumns: string[] = [
    'placa',
    'chassi',
    'renavam',
    'marca',
    'modelo',
    'ano',
    'created_at',
  ];
  dataSource: MatTableDataSource<Carro> = new MatTableDataSource();

  selectedCar: Carro | null = null;
  isEditing: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private carrosService: CarrosService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.carrosService.getCarros().subscribe((response) => {
      this.dataSource.data = response.data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  highlightRow(event: Event) {
    const element = event.currentTarget as HTMLElement;
    element.style.backgroundColor = '#424b54';
  }

  resetRow(event: Event) {
    const element = event.currentTarget as HTMLElement;
    element.style.backgroundColor = '';
  }

  selectCar(carro: Carro) {
    this.selectedCar = carro;
    this.isEditing = false;
  }

  toggleEdit() {
    if (this.isEditing && this.selectedCar) {
      this.updateCar(this.selectedCar);
    } else {
      this.isEditing = true;
    }
  }

  saveEdit() {
    if (this.selectedCar) {
      this.updateCar(this.selectedCar);
    }
  }

  cancelEdit() {
    if (this.selectedCar) {
      this.selectedCar = {
        id: this.selectedCar.id,
        placa: this.selectedCar.placa || '',
        chassi: this.selectedCar.chassi || '',
        renavam: this.selectedCar.renavam || '',
        marca: this.selectedCar.marca || '',
        modelo: this.selectedCar.modelo || '',
        ano: this.selectedCar.ano || 0,
        created_at: this.selectedCar.created_at || '',
        updated_at: this.selectedCar.updated_at || null,
      };
    }
    this.isEditing = false;
  }

  updateCar(carro: Carro) {
    this.carrosService.updateCar(carro.id, carro).subscribe(
      (response) => {
        console.log('Resposta do servidor:', response);
        this.snackBar.open(response.message, 'Fechar', {
          duration: 3000,
        });
        const index = this.dataSource.data.findIndex(
          (item) => item.id === carro.id
        );
        if (index !== -1) {
          this.dataSource.data[index] = { ...carro };
          this.dataSource._updateChangeSubscription();
        }

        this.isEditing = false;
        this.selectedCar = null;
      },
      (error) => {
        this.snackBar.open('Erro ao atualizar o carro!', 'Fechar', {
          duration: 3000,
        });
        console.error('Erro ao atualizar o carro:', error);
      }
    );
  }

  confirmDeleteCar(carro: Carro) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: 'Tem certeza que deseja deletar este carro?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteCar(carro);
      }
    });
  }

  deleteCar(carro: Carro) {
    this.carrosService.deleteCar(carro.id).subscribe(
      () => {
        this.snackBar.open('Carro deletado com sucesso!', 'Fechar', {
          duration: 3000,
        });
        this.selectedCar = null;
        this.ngOnInit();
      },
      (error) => {
        this.snackBar.open('Erro ao deletar o carro!', 'Fechar', {
          duration: 3000,
        });
      }
    );
  }

  openAddCarDialog(): void {
    const dialogRef = this.dialog.open(AddCarDialogComponent, {
      width: '400px',
      data: {
        placa: '',
        chassi: '',
        renavam: '',
        modelo: '',
        marca: '',
        ano: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addCar(result);
      }
    });
  }

  addCar(newCar: Carro): void {
    this.carrosService.addCar(newCar).subscribe(
      (response) => {
        this.snackBar.open('Carro adicionado com sucesso!', 'Fechar', {
          duration: 3000,
        });
        this.ngOnInit();
      },
      (error) => {
        this.snackBar.open('Erro ao adicionar o carro!', 'Fechar', {
          duration: 3000,
        });
      }
    );
  }
}
