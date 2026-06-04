import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../../core/services/employee/employee.service';
import { Employee } from '../../../../models/employee.model';

@Component({
  selector: 'app-employee-detail',
  imports: [],
  templateUrl: './employee-detail.html',
  styleUrl: './employee-detail.css',
})
export class EmployeeDetail {
  private route = inject(ActivatedRoute);
  private employeeService = inject(EmployeeService);
  employee = signal<Employee | null>(null);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeService.getEmployeeById(id).subscribe({
        next: (res) => {
          this.employee.set(res);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }

  }

}
