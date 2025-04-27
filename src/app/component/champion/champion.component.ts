import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { AddChampionComponent } from '../add-champion/add-champion.component';
import { ChampionI } from '../../model/Champion';
import { Subscription } from 'rxjs';
import { ChampionService } from '../../service/champion.service';

@Component({
  selector: 'app-champion',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatDialogModule,
    MatTableModule, CommonModule],
  templateUrl: './champion.component.html',
  styleUrl: './champion.component.css'
})
export class ChampionComponent {

  constructor(private dialog: MatDialog) { }

  // constructor(private service: ChampionService, private dialog: MatDialog) { }
   empList: ChampionI[] = []; // lista de campeones
   dataSource!: MatTableDataSource<ChampionI>; // la interface EmployeeI

    //displayedColumns: string[] = ['id', 'nameC', 'rolC', 'history']; // columnas de la tabla

  subscription = new Subscription();

  // getallChampion() { // trae funciones del service
  //   let sub = this.service.getAll().subscribe(item => {
  //     this.empList = item;
  //     this.dataSource = new MatTableDataSource(this.empList);
  //   })
  //   this.subscription.add(sub);

  // }


  // addChampionb() {
  //   this.dialog.open(AddChampionComponent, {
  //     width: '50%',
  //     exitAnimationDuration: '500ms',
  //     enterAnimationDuration: '500ms'
  //   }).afterClosed().subscribe(o => {
  //     this.getallChampion();
  //   })
  // }

  addChampion() {
    this.dialog.open(AddChampionComponent, {
      width: '50%',
      exitAnimationDuration: '500ms',
      enterAnimationDuration: '500ms'
    }).afterClosed().subscribe(o => {
      //     this.getallChampion();
      //   })
    });


  }


}
