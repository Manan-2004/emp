import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../../../constants/api-endpoints';
import { Employee } from '../../../models/employee.model';

@Injectable({
  providedIn: 'root',
})

export class EmployeeService {
  private http = inject(HttpClient)

  //get employees
  getEmployees() {
    return this.http.get<Employee[]>(
      API_ENDPOINTS.EMPLOYEES
    );
  }

  //get employee by id
  getEmployeeById(id:string){
     return this.http.get<Employee>(
        `${API_ENDPOINTS.EMPLOYEES}/${id}`
     )
  }

  //add employee
  addEmployee(employee:Employee){
     return this.http.post(
       API_ENDPOINTS.EMPLOYEES,employee
     )
  }
 
  //update employee
  updateEmployee(id:string,employee:Employee){
     return this.http.put<Employee>(
      `${API_ENDPOINTS.EMPLOYEES}/${id}`,employee
     )
  }

  //delete employee
  deleteEmployee(id:string){
     return this.http.delete(
       `${API_ENDPOINTS.EMPLOYEES}/${id}`
     )
  }

}
