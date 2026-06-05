import { Component, inject, signal } from '@angular/core';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { Employee } from '../../../models/employee.model';
import { currentUser } from '../../../core/state/auth.state';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-detail',
  imports: [RouterLink],
  templateUrl: './employee-detail.html',
  styleUrl: './employee-detail.css',
})
export class EmployeeDetail {
  private employeeService = inject(EmployeeService)
  employee = signal<Employee | null>(null)
  loading = signal(false)

  ngOnInit() {
    this.loadEmployee(currentUser()?.employeeId as string)
  }

  loadEmployee(id: string) {
    this.loading.set(true);
    this.employeeService.getEmployeeById(id).subscribe({
      next: (res) => {
        setTimeout(() => {
          this.employee.set(res);
          this.loading.set(false)
        }, 500);
      },
      error: (err) => {
        this.loading.set(false);
        console.log(err)
      }
    });
  }



}
