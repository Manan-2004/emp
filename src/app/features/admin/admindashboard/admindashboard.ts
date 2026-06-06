import { Component, computed, inject, signal } from '@angular/core';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { Employee } from '../../../models/employee.model';
import { RecentEmployee } from "../components/recent-employee/recent-employee";

@Component({
  selector: 'app-admindashboard',
  imports: [RecentEmployee],
  templateUrl: './admindashboard.html',
  styleUrl: './admindashboard.css',
})
export class Admindashboard {
  private employeeService = inject(EmployeeService);
  employees = signal<Employee[]>([]);
  loading = signal(false);

  ngOnInit() {
    this.loadDashboardData()
  }

  loadDashboardData() {
    this.loading.set(true);
    this.employeeService.getEmployees().subscribe({
      next: (res) => {
        setTimeout(() => {
          this.employees.set(res);
          this.loading.set(false);
        },500)
      },
      error: (err) => {
        this.loading.set(false);
        console.log(err)
      }
    });
  }

  totalEmployees = computed(() =>
    this.employees().length
  );

  activeEmployees = computed(() =>
    this.employees().filter(
      emp => emp.status === 'Active'
    ).length
  );

  inactiveEmployees = computed(() =>
    this.employees().filter(
      emp => emp.status === 'Inactive'
    ).length
  );

  totalDepartments = computed(() =>
    new Set(
      this.employees().map(
        emp => emp.department
      )
    ).size
  );

  recentEmployees = computed(() =>
    [...this.employees()].reverse().slice(0, 5)
  );

}
