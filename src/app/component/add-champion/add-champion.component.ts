import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ChampionI } from '../../model/Champion';
import { ChampionService } from '../../service/champion.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-champion',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule,
    MatButtonModule, MatSelectModule, MatInputModule, MatDatepickerModule],
  templateUrl: './add-champion.component.html',
  styleUrl: './add-champion.component.css'
})
export class AddChampionComponent {
  constructor(private service: ChampionService, private ref: MatDialogRef<AddChampionComponent>) { } // inyeccion del servicio




  title = 'agregar un campeon nuevo!!!';

  empForm = new FormGroup({
    id: new FormControl(0), // id del campeon
    nameC: new FormControl('', [Validators.required]),    // nombre del campeon
    rolC: new FormControl('', [Validators.required]),     // rol del campeon          
    history: new FormControl('', [Validators.required]), // historia del campeon                
  })


  saveChampion() {
    if (this.empForm.valid) {
      let _data: ChampionI = {
        id: this.empForm.value.id as number,
        nameC: this.empForm.value.nameC as string, // nombre del campeon
        rolC: this.empForm.value.rolC as string, // rol del campeon     
        history: this.empForm.value.history as string // historia del campeon
      }

      this.service.create(_data).subscribe(item => { //funcion create del service
        alert("El campeon fue creado con exito!!!"); // mensaje de exito
        this.closepopup(); // cierra el popup

      });

    }

  }

  closepopup() {
    this.ref.close(); // cierra el popup


  }


}
