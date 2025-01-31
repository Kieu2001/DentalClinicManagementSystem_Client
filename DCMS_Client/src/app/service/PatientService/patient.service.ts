import { IAddAppointment } from './../../model/IAppointment';
import { CognitoService } from '../cognito.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private test = 'https://gf4tlb2kyi.execute-api.ap-southeast-1.amazonaws.com/dev';

  constructor(private http: HttpClient) { }
  getPatientPhoneNumber(sdt:string):Observable<any> {
      let idToken = sessionStorage.getItem("id_Token");
      console.log("id token", idToken);
      const headers = new HttpHeaders({
        'Authorization': `${idToken}`,
        'Content-Type':'application/json'
      });

      return this.http.get(`${this.test}/patient/phone-number/${sdt}`, { headers });
    }
    getPatientList(paging:number):Observable<any>{
      let idToken = sessionStorage.getItem("id_Token");
      const headers = new HttpHeaders({
        'Authorization': `${idToken}`,
        'Content-Type':'application/json'
      });
      return this.http.get(`${this.test}/patient/name/${paging}`, {headers});
    }
    getPatientById(id:string){
      let idToken = sessionStorage.getItem("id_Token");
      const headers = new HttpHeaders({
        'Authorization': `${idToken}`,
        'Content-Type':'application/json'
      });
      return this.http.get(`${this.test}/patient/${id}`, {headers})
    }
    deletePatient(id:string){
      let idToken = sessionStorage.getItem("id_Token");
      const headers = new HttpHeaders({
        'Authorization': `${idToken}`,
        'Content-Type':'application/json'
      });
      return this.http.delete(`${this.test}/patient/${id}`, {headers});
    }
    getPatientByName(name:string, paging:number):Observable<any>{
      let idToken = sessionStorage.getItem("id_Token");
      const headers = new HttpHeaders({
        'Authorization': `${idToken}`,
        'Content-Type':'application/json'
      });
      return this.http.get(`${this.test}/patient/name/${name}/${paging}`, {headers});
    }
    updatePatient(patient:any, id:any){
      let idToken = sessionStorage.getItem("id_Token");
      const headers = new HttpHeaders({
        'Authorization': `${idToken}`,
        'Content-Type':'application/json'
      });
      const requestBody = JSON.stringify(patient);
      return this.http.put(`${this.test}/patient/${id}`, requestBody, {headers});
    }
    addPatient(patient:any){
      let idToken = sessionStorage.getItem("id_Token");
      const headers = new HttpHeaders({
        'Authorization': `${idToken}`,
        'Content-Type':'application/json'
      });
      const requestBody = JSON.stringify(patient);
      return this.http.post(`${this.test}/patient`, requestBody, {headers});
    }
}
