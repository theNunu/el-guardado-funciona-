import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { AddChampionComponent } from '../add-champion/add-champion.component';
import { ChampionI } from '../../model/Champion';
import { Subscription } from 'rxjs';
import { ChampionService } from '../../service/champion.service';
import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-champion',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatDialogModule,
    MatTableModule, CommonModule],
  templateUrl: './champion.component.html',
  styleUrl: './champion.component.css'
})
export class ChampionComponent implements OnInit, OnDestroy {


  constructor(private service: ChampionService, private dialog: MatDialog) { }

  ngOnInit(): void { // CON ESTO SE MOSTRARA LA TABLA DE CAMPEONES  
    this.getAllChampion(); // llama a la funcion getAllChampion

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // se desuscribe de la suscripcion
  }

  empList: ChampionI[] = []; // lista de campeones
  dataSource!: MatTableDataSource<ChampionI>; // la interface ChampionI
  displayedColumns: string[] = ['id', 'name_C', 'rol_C', 'history','fotoBase64', 'action']; // columnas de la tabla para el frotend(icluyendo botones)
  subscription = new Subscription();

  getAllChampion() { // trae funciones del service
    let sub = this.service.getAll().subscribe(item => {
      this.empList = item;
      this.dataSource = new MatTableDataSource(this.empList); // la interface ChampionI
    })
    this.subscription.add(sub);
  }

  addChampion() {
    this.openpopup(0);
  }

  deleteChampion(empId: number) { // funcion para eliminar campeon
    if (confirm("¿Estas seguro de eliminar el campeon?")) {
      let sub = this.service.delete(empId).subscribe(res => { // llama a la funcion delete del service
        this.getAllChampion(); // mensaje de exito
        
      })
      this.subscription.add(sub); // se agrega la suscripcion
    }
  }


  editChampion(empId: number) { // funcion para editar campeon
    this.openpopup(empId);
  }


  openpopup(empid: number) { // funcion para abrir el popup
    this.dialog.open(AddChampionComponent, {
      width: '50%',
      exitAnimationDuration: '500ms',
      enterAnimationDuration: '500ms',
      data: {
        'code': empid
      }
    }).afterClosed().subscribe(o => {
      this.getAllChampion();
    })
  }


}
