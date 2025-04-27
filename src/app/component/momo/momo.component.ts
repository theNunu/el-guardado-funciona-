import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ChampionI } from '../../model/Champion';
import { ChampionService } from '../../service/champion.service';
import { Subscription } from 'rxjs';
import { AddChampionComponent } from '../add-champion/add-champion.component';

@Component({
  selector: 'app-momo',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatDialogModule,
      MatTableModule, CommonModule],
  templateUrl: './momo.component.html',
  styleUrl: './momo.component.css'
})
export class MomoComponent {

   constructor(private service: ChampionService, private dialog: MatDialog) {}
    empList : ChampionI[] = [] ; // lista de empleados 
    dataSource!: MatTableDataSource<ChampionI>; // la interface EmployeeI
    
    displayedColumns: string[] = ['id', 'nameC', 'rolC', 'history']; // columnas de la tabla
  
    subscription = new Subscription();

    
  getallChampion() { // trae funciones del service
    let sub = this.service.getAll().subscribe(item => {
      this.empList = item;
      this.dataSource = new MatTableDataSource(this.empList);
    })
    this.subscription.add(sub);

  }
  

    addChampion() {
      this.dialog.open(AddChampionComponent, {
        width: '50%',
        exitAnimationDuration: '500ms',
        enterAnimationDuration: '500ms'
      }).afterClosed().subscribe(o=> {
        this.getallChampion();
      })
  
    }
  

}
