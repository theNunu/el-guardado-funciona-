import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChampionI } from '../model/Champion';
@Injectable({
  providedIn: 'root'
})
export class ChampionService {

  apiUrl = 'http://localhost:3000/champion';

  constructor(private http: HttpClient) { }


  getAll() {
    return this.http.get<ChampionI[]>(this.apiUrl);
  }

  get(id_C: number) {
    return this.http.get<ChampionI>(this.apiUrl + '/' + id_C);
  }

  create(data: ChampionI) {
    console.log(data.id + " fue creado");
    console.log(data.name_C + " fue creado");
    console.log( "imagen guardada: " + data.fotoBase64);
    return this.http.post(this.apiUrl, data);
  }

  delete(empId: number) {
    console.log(empId + " fue eliminado");
    
    return this.http.delete(this.apiUrl + '/' + empId);
  }

  update(data: ChampionI) {
    console.log(data.id + " fue actualizado");
    console.log(data.name_C + " fue actualizado");

    return this.http.put(this.apiUrl + '/' + data.id, data);
  }

  // enviarFormulario(formData: FormData): Observable<any> {
  //   return this.http.post(this.apiUrl, formData);
  // }


  // GetAll(){
  //   return this.http.get<EmployeeI[]>(this.apiUrl);
  // }

  // Get(empId: number){
  //   return this.http.get<EmployeeI>(this.apiUrl + '/' + empId);
  // }

  // Create(data: EmployeeI){
  //   return this.http.post(this.apiUrl,data);
  // }

}
