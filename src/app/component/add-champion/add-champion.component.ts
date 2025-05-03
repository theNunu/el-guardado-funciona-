import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ChampionI } from '../../model/Champion';
import { ChampionService } from '../../service/champion.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({

  selector: 'app-add-champion',
  standalone: true,
  imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule,
    MatButtonModule, MatSelectModule, MatInputModule, MatDatepickerModule, CommonModule],
  templateUrl: './add-champion.component.html',
  styleUrl: './add-champion.component.css'
  
})
export class AddChampionComponent implements OnInit {
  fotoBase64: string = ''; // Property to store the base64 image

  

  title = 'agregar un campeon nuevo!!!';
  dialdodata: any;
  isEdit = false;

  constructor(private service: ChampionService, private ref: MatDialogRef<AddChampionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { } // inyeccion del servicio

  empForm = new FormGroup({
    id: new FormControl(0), // id del campeon
    name_C: new FormControl('', [Validators.required]),    // nombre del campeon
    rol_C: new FormControl('', [Validators.required]),     // rol del campeon          
    history: new FormControl('', [Validators.required]), // historia del campeon    
    fotoBase64: new FormControl('', [Validators.required]),           
  })

  ngOnInit(): void { //PARA ACTUALIZAR

    this.dialdodata = this.data; // se obtiene el id del campeon
    if (this.dialdodata.code > 0) { // si el id no es 0
      this.title = 'campeon actualizado';
      this.isEdit = true;
      this.service.get(this.dialdodata.code).subscribe(item => {
        let _data = item;
        if (_data != null) {
          this.empForm.setValue({
            id: _data.id,
            name_C: _data.name_C,
            rol_C: _data.rol_C,
            history: _data.history,
            fotoBase64: _data.fotoBase64
          })
          //ínea para actualizar la vista previa:
          this.fotoBase64 = _data.fotoBase64; // Sincroniza para mostrar la imagen en la vista
        }
      })
    }
  }


  saveChampion() {
    if (this.empForm.valid) {
      let _data: ChampionI = {
        id: this.empForm.value.id as number,
        name_C: this.empForm.value.name_C as string, // nombre del campeon
        rol_C: this.empForm.value.rol_C as string, // rol del campeon     
        history: this.empForm.value.history as string, // historia del campeon
        fotoBase64: this.empForm.value.fotoBase64 || '' // aquí se usa la imagen cargada
      }




      if (this.isEdit) {
          this.service.update(_data).subscribe(item => { //funcion create del service
            alert("El campeon fue ACTUALIZADO con exito!!!"); // mensaje de exito
            this.closepopup(); // cierra el popup
          });
        } else {
        this.service.create(_data).subscribe(item => {
          alert("SE HA GUARDADO UN NUEVO CAMPEON!!"); // mensaje de exito
          this.closepopup(); // cierra el popup
        })
      }
    }
  }

  closepopup() {
    this.ref.close(); // cierra el popup
  }

  // para la subida de imagenes

  onFileChange(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.fotoBase64 = reader.result as string; //  fotoBase64: string = ''; // Property to store the base64 image(LLAMA A LA VARIABLE QUE ESTA HASTA ARRIBA)
      this.empForm.get('fotoBase64')?.setValue(this.fotoBase64); // <-- sincroniza el FormGroup
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }
  


}
