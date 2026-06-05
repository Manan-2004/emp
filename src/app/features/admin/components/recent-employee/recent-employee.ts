import { Component, computed, inject, signal } from '@angular/core';
import { EmployeeService } from '../../../../core/services/employee/employee.service';
import { Employee } from '../../../../models/employee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recent-employee',
  imports: [],
  templateUrl: './recent-employee.html',
  styleUrl: './recent-employee.css',
})
export class RecentEmployee {
  private employeeService = inject(EmployeeService);
  employees = signal<Employee[]>([]);
  loading = signal(false);
  private router = inject(Router)

  ngOnInit() {
    this.loaddata()
  }

  loaddata() {
    this.loading.set(true);
    this.employeeService.getEmployees().subscribe({
      next: (res) => {
        setTimeout(() => {
          this.employees.set(res);
          this.loading.set(false);
        }, 500);
      },
      error: (err) => {
        console.log(err)
        this.loading.set(false);
      }
    });
  }

  recentEmployees = computed(() =>
    [...this.employees()].reverse().slice(0, 5)
  );

  viewemployee(id: string) {
    this.router.navigate([`/admin/employees/${id}`])
  }

}
