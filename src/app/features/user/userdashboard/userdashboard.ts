import { Component, inject, signal } from '@angular/core';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { Employee } from '../../../models/employee.model';
import { currentUser } from '../../../core/state/auth.state';

@Component({
  selector: 'app-userdashboard',
  imports: [],
  templateUrl: './userdashboard.html',
  styleUrl: './userdashboard.css',
})
export class Userdashboard {
  private employeeService =inject(EmployeeService);
  loading=signal(true)
  employee = signal<Employee | null>(null);

  ngOnInit(){
     setTimeout(()=>{
        this.loading.set(false)
        this.loadcurrentuser()
     },500)
  }

  loadcurrentuser(){
     let empid=currentUser()?.employeeId
     this.employeeService.getEmployeeById(empid!).subscribe({
           next:(res)=>{
               this.employee.set(res)
           },
           error:(err)=>{
              console.log(err)
           }
     })
  }

}
