import { Component, inject, signal } from '@angular/core';
import { EmployeeService } from '../../../../core/services/employee/employee.service';
import { Employee } from '../../../../models/employee.model';
import { Router } from '@angular/router';
import { MessagesServices } from '../../../../core/messages/messages-services';

@Component({
  selector: 'app-employee-list',
  imports: [],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList {
  private employeeService = inject(EmployeeService)
  private router = inject(Router)
  private messageservice = inject(MessagesServices)

  employees = signal<Employee[]>([]);

  ngOnInit() {
    this.loadEmployees()
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (res) => {
        this.employees.set(res)
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  viewemployee(id:string) {
    this.router.navigate([`/admin/employees/${id}`])
  }

  addemployee() {
    this.router.navigate(['/admin/employees/add'])
  }

  editemployee(id:string) {
    this.router.navigate([`/admin/employees/edit/${id}`])
  }

  deleteEmployee(id:string) {
    this.messageservice.confirmDelete("This employee will be permanently deleted")
      .then(res => {
        if (res.isConfirmed) {
          this.employeeService.deleteEmployee(id).subscribe({
            next: () => {
              this.messageservice.success('Employee deleted successfully');
              this.loadEmployees();
            },
            error:()=>{
                this.messageservice.error('Failed to delete employee');
            }
          })
        }
      })
  }


}
