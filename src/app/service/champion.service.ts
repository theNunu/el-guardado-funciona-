import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChampionI } from '../model/Champion';
@Injectable({
  providedIn: 'root'
})
export class ChampionService {

  apiUrl = 'http://localhost:3000/champion';

  constructor(private http:HttpClient) { }


  getAll(){
    return this.http.get<ChampionI[]>(this.apiUrl);
  }


  get(idC: number){
    return this.http.get<ChampionI>(this.apiUrl + '/' + idC);
  }


  create(data: ChampionI){
    return this.http.post(this.apiUrl,data);
  }


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
